// Allows use of environment variables
require('dotenv').config()

const express = require("express");
const bodyParser = require('body-parser');
const path = require("path");
const app = express();

const axios = require("axios");
const cheerio = require("cheerio");
const cron = require("node-cron");

app.use(bodyParser.json());
app.use(express.static("public"));

//Assistant
var AssistantV2 = require('ibm-watson/assistant/v2');
const { IamAuthenticator, BearerTokenAuthenticator } = require('ibm-watson/auth');

// Set up scheduler (runs every hour)
var alerts = [
    {
        day: '-1',
        month: 'Septembruary',
        link: 'https://www.google.com.au',
        title: 'Lorem ipsum dolor sit'
    }
];

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

        alerts = result;

    }, err => {
        console.log(err)
    }).catch(err => {
        console.log(err);
    });
}

updateAlerts();

cron.schedule("* * * * *", function () {
    updateAlerts();
});

// Send alerts to user
app.get("/api/alerts", (req, res) => {
    res.json({ alerts: alerts });
});

// Cloudant
var Cloudant = require('@cloudant/cloudant');

var cloudant = new Cloudant({
    url: process.env.CLOUDANT_URL,
    plugins: {
        iamauth: {
            iamApiKey: process.env.CLOUDANT_API_KEY
        }
    }
});

const users = cloudant.use("users");

app.post("/api/users", (req, res) => {
    let email = req.body.email;
    let token = req.body.token;

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
});

app.post("/api/update_user", (req, res) => {
    let newBusiness = req.body.newBusiness;

    users.insert(newBusiness).then((body) => {
        users.get(newBusiness.email).then((body) => {
            res.json(body);
        }).catch(err => {
            res.json(newBusiness);
        })
    }).catch(err => console.log(err));
});

app.post("/api/delete_user", (req, res) => {
    let email = req.body.email;
    let token = req.body.token;

    users.get(email).then((body) => {
        users.destroy(email, body._rev);
    }).catch(err => {
        console.log(err);
    });
});

// Set up Assistant
let authenticator;
if (process.env.ASSISTANT_IAM_APIKEY) {
    authenticator = new IamAuthenticator({
        apikey: process.env.ASSISTANT_IAM_APIKEY
    });
}

const assistant = new AssistantV2({
    version: '2019-02-28',
    authenticator: authenticator,
    url: process.env.ASSISTANT_URL,
    disableSslVerification: process.env.DISABLE_SSL_VERIFICATION === 'true' ? true : false
});

// Create assistant session
app.get("/api/session", (req, res) => {
    assistant.createSession({
        assistantId: process.env.ASSISTANT_ID,
    })
        .then(assistantRes => {
            res.json(assistantRes);
            // res.json(console.log(JSON.stringify(res.result, null, 2));
        })
        .catch(err => {
            // console.log(err);
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