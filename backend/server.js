// Allows use of environment variables
require('dotenv').config()

const express = require("express");
const bodyParser = require('body-parser');
const path = require("path");
const app = express();

const axios = require("axios");
const cheerio = require("cheerio");
const cron = require("node-cron");

// Allow app to read params and send the frontend
app.use(bodyParser.json());
app.use(express.static("public"));

// Assistant
var AssistantV2 = require('ibm-watson/assistant/v2');
const { IamAuthenticator, BearerTokenAuthenticator } = require('ibm-watson/auth');

// Cloudant
var Cloudant = require('@cloudant/cloudant');

// Alerts is initialised as empty list
var alerts = [];

// Update the alerts list
const updateAlerts = () => {
    const url = "https://www.nsw.gov.au/covid-19/latest-news-and-updates";

    // Check for alerts
    axios.get(url).then(res => {
        var html = res.data;
        const $ = cheerio.load(html);

        var elems = [];

        $('h3:contains("2020")').each((i, elem) => {
            elems.push(elem);
        });

        $('h3:contains("2021")').each((i, elem) => {
            elems.push(elem);
        });

        // The top one is the most recent month
        var div = elems[0].parent;

        // Get first instance of <ul>
        var ul = null;

        for (var i = 0; i < div.children.length; i++) {
            if (div.children[i].type === "tag" && div.children[i].name === "ul") {
                ul = div.children[i];
                break;
            }
        }

        // Get all list elements
        var listElements = [];

        for (var i = 0; i < ul.children.length; i++) {
            if (ul.children[i].type === "tag" && ul.children[i].name === "li") {
                listElements.push(ul.children[i]);
            }
        }

        result = [];

        for (var i = 0; i < listElements.length; i++) {
            let components = listElements[i].children[0].data.split(" ");
            var day = components[0];
            var month = components[1].replace(/\W/g, '');

            var link = listElements[i].children[1].attribs.href;
            var title = listElements[i].children[1].attribs.title;

            // Add https
            if (!link.includes("https://")) {
                link = "https://www.nsw.gov.au" + link;
            }

            if (title == undefined) {
                title = listElements[i].children[1].children[0].data;
            }

            result.push({
                day: day,
                month: month,
                link: link,
                title: title,
            })
        }

        // Combine result with alerts
        for (var i = 0; i < result.length; i++) {
            if (alerts.indexOf(result[i]) < 0) {
                alerts.push(result[i]);
            }
        }

        // Remove alerts when they are too old
        while (alerts.length > 20) {
            alerts.shift();
        }

    }, err => {
        console.log(err)
    }).catch(err => {
        console.log(err);
    });
}

// Ensure that list of alerts is filled when server is created
updateAlerts();

// Schedule alerts to be updated every 10 minutes
cron.schedule("*/10 * * * *", function () {
    updateAlerts();
});

// Set up Assistant
let authenticator;
if (process.env.ASSISTANT_IAM_APIKEY) {
    authenticator = new IamAuthenticator({
        apikey: process.env.ASSISTANT_IAM_APIKEY
    });
}

// Connect assistant to Watson
const assistant = new AssistantV2({
    version: '2019-02-28',
    authenticator: authenticator,
    url: process.env.ASSISTANT_URL,
    disableSslVerification: process.env.DISABLE_SSL_VERIFICATION === 'true' ? true : false
});

// Create a Cloudant connection
var cloudant = new Cloudant({
    url: process.env.CLOUDANT_URL,
    plugins: {
        iamauth: {
            iamApiKey: process.env.CLOUDANT_API_KEY
        }
    }
});

// Connect to users database
const users = cloudant.use("users");

// User information endpoint
app.post("/api/users", (req, res) => {
    let token = req.body.token;

    axios.get("https://" + process.env.REACT_APP_AUTH0_DOMAIN + "/userinfo", {
        headers: {
            Authorization: 'Bearer ' + token
        }
    }).then(authRes => {
        var email = authRes.data.email;

        users.get(email).then((body) => {
            res.json(body);
        }).catch(err => {
            // Called if first-time user
            users.insert({ _id: email, email: email, services: [] }).then(body => {
                users.get(email).then((body) => {
                    res.json(body);
                })
            }).catch(err => {
                res.json({});
            });
        });
    }).catch(err => {
        res.json({});
    })
});

// Update user endpoint
app.post("/api/update_user", (req, res) => {

    let token = req.body.token;

    axios.get("https://" + process.env.REACT_APP_AUTH0_DOMAIN + "/userinfo", {
        headers: {
            Authorization: 'Bearer ' + token
        }
    }).then(authRes => {
        let newBusiness = req.body.newBusiness;
        newBusiness.email = authRes.data.email;

        users.insert(newBusiness).then((body) => {
            users.get(newBusiness.email).then((body) => {
                res.json(body);
            }).catch(err => {
                res.json(newBusiness);
            })
        }).catch(err => console.log(err));
    }).catch(err => {
        res.json({});
    })
});

// Delete user endpoint
app.post("/api/delete_user", (req, res) => {
    let token = req.body.token;

    axios.get("https://" + process.env.REACT_APP_AUTH0_DOMAIN + "/userinfo", {
        headers: {
            Authorization: 'Bearer ' + token
        }
    }).then(authRes => {
        var email = authRes.data.email;

        users.get(email).then((body) => {
            users.destroy(email, body._rev);
        }).catch(err => {
            console.log(err);
        });
    }).catch(err => {
        res.json({});
    })
});

// Send alerts to user
app.get("/api/alerts", (req, res) => {
    res.json({ alerts: alerts });
});

// Create assistant session
app.get("/api/session", (req, res) => {
    assistant.createSession({
        assistantId: process.env.ASSISTANT_ID,
    })
        .then(assistantRes => {
            res.json(assistantRes);
        })
        .catch(err => {
            res.json(err);
        });
});

// Send message to assistant
app.post("/api/message", (req, res) => {

    let session = req.body.sessionId;
    let text = req.body.text;

    assistant.message({
        assistantId: process.env.ASSISTANT_ID,
        sessionId: session,
        input: {
            'message_type': 'text',
            'text': text
        }
    })
        .then(assistantRes => {
            res.json(assistantRes.result);
        })
        .catch(err => {
            res.json(err);
        });
});

// Main pages
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/index.html"));
});

const port = process.env.PORT || 8000;

app.listen(port);

console.log("Listening on port " + port);