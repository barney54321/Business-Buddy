# Business Buddy

[![License](https://img.shields.io/badge/License-Apache2-blue.svg)](https://www.apache.org/licenses/LICENSE-2.0)

A one-stop-shop that delivers personalised and responsive COVID-19 updates to Small Businesses.

## Contents

1. [Short description](#short-description)
1. [Demo video](#demo-video)
1. [The architecture](#the-architecture)
1. [Long description](#long-description)
1. [Business model](#business-model)
1. [Project roadmap](#project-roadmap)
1. [Getting started](#getting-started)
1. [Deployment](#deployment)
1. [Live demo](#live-demo)
1. [Built with](#built-with)
1. [Authors](#authors)
1. [License](#license)
1. [Acknowledgments](#acknowledgments)

## Short description

### What's the problem?

Small businesses have been particularly affected in this COVID-19 pandemic due to lockdown restrictions and reduced consumer demand. Operating restrictions are still necessary in the forseeable future due to the risk of second and third outbreaks.  During these difficult times, small businesses should be provided with robust support from the government to ensure their survival.

### How can technology help?

Many governments took swift and immediate action to introduce fiscal relief programs for small businesses. The difficulty, however, has been for governments to effectively communicate the availability of these programs and encourage uptake. Here, technology can help by connecting small businesses to these programs. 

### The idea

Backed by IBM Cloud and Watson services, Business Buddy is a one stop shop platform that delivers personalised information to small businesses on all their eligible grants, as well as notification on changes to governmental policy.

## Demo video

[![Business Buddy](http://img.youtube.com/vi/cLj7rsg2UEQ/0.jpg)](http://www.youtube.com/watch?v=cLj7rsg2UEQ "Business Buddy")

## The architecture

![Business Buddy Architecture](https://github.com/barney54321/Business-Buddy/blob/master/github_pages/architecture.jpg)

1. Users interact with the React.js front-end, with their actions authenticated by Auth0. 
1. The user requests are processed by a Node.js backend, by which it creates a session with IBM Watson Assistant to query the appropriate response
1. The backend retrieves business information from an IBM Cloudant database.
1. The backend sends API requests to IBM Watson Assistant to create new sessions for each user.
1. As the user types into My Buddy, messages are relayed by the backend to Watson Assistant, with business data stored and updated in Cloudant documents.
1. Every fifteen minutes, the backend pulls information from government agency websites, which is then relayed to users through alerts. 

## Long description

[More detail is available here](DESCRIPTION.md)

## Business Model

[More detail is available here](BUSINESS_MODEL.md)

## Project roadmap

![Roadmap](https://github.com/barney54321/Business-Buddy/blob/master/github_pages/roadmap.jpg)

## Getting started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

The following programs are required to run Business Buddy:

- [Node](https://nodejs.org/en/download/)
- [IBM Cloud Foundry CLI](https://cloud.ibm.com/docs/cli?topic=cli-install-ibmcloud-cli)

### Setup

1. Watson Assistant

    1. [Log in to IBM Cloud](https://www.ibm.com/au-en/cloud)

    2. Create a Watson Assistant Service and launch it

    3. On the left navigation, select "Skills" and click "Create Skill"

    4. Continue with "Next" and the preselected "Dialog Skill", then click "Import skill"

    5. Click "Choose JSON file", and select "gov_skill.json" from the root of the project.

    6. Click "Import" to import the file as a skill

    7. Click on "Assistants" on the left, and then click "Create Assistant"

    8. In the dialog, fill in the assistant name and click "Create Assistant"

    9. On the next screen, choose "Add dialog skill"

    10. Click "Add existing skill"

    11. Choose the dialog skill that was just imported and add it to the Assistant

    12. Open the Assistant settings and click "API Details"

    13. Note down Assistant ID, Assistant URL, and the API key

    14. In the project's root folder, create a copy of .env.example and rename it .env

    15. Copy and paste the Assistant ID, Assistant URL and the API Key into .env

2. Cloudant

    1. [Log in to IBM Cloud](https://www.ibm.com/au-en/cloud)

    2. Create a Cloudant service. Default settings can be chosen throughout the process

    3. Generate a new credential for the Service

    4. Note down the credential's API Key and URL

    5. Create a non-partitioned database in Cloudant and name it "users"

    6. In the root of the project scaffold, copy and paste the API key and URL into .env

3. Auth0

    1. [Create an Auth0 account](https://auth0.com/resources/whitepapers/build-vs-buy-evaluating-identity-management?utm_source=apac-google-dg&utm_medium=cpc&utm_content=Auth0-Branded&gclid=CjwKCAjw9vn4BRBaEiwAh0muDJnWgsFVgD-x1e01P9NfAiSodLPQCogkqEZP92_mCVeFHhi1_qqIcRoC9UoQAvD_BwE)

    2. Create a new Application (under the Applications tab on the left). Set the type to be a Single Page Web Application.

    3. Under settings, add "https://localhost:3000" to Application Login URI, Allowed Callback URLs, Allowed Logout URLs and Allowed Web Origins.

    4. Write down the Client ID and Domain of the Application.

    5. Copy and paste the Client ID and Domain values to .env in the root folder

    5. In the project's frontend folder, create a copy of .env.example and rename it .env

    6. Copy and paste the Client ID and Domain values to .env in frontend

### Installing

Navigate to the root of the project and run the following commands to install dependencies and run the backend:

```
npm install
node .
``` 

In a new terminal, run the following commands to install dependencies and run the frontend:

```
cd frontend
npm install
npm start
```

This will open BusinessBuddy on localhost://3000

Say what the step will be, for example

### Suggested Business Information

Try using the following data to have a business that is eligible for the Small Business Recovery Grant:

| Field                                | Data   |
|--------------------------------------|--------|
| Postcode                             | 2010   |
| Industry                             | Cafe   |
| Total employees                      | 40     |
| Full time staff                      | 30     |
| Fall in turnover                     | 50     |
| Total wages below $900,000           | Yes    |
| Annual turnover greater than $75,000 | Yes    |
| Costs for reopening                  | Yes    |

## Deployment

1. Create an IBM Cloud Foundry service using the same account and region associated with the IBM Cloud CLI

1. Run the following commands from the terminal to generate an optimised build for the frontend

```
cd frontend
npm run build
```

1. Replace the contents of /public with the contents of /frontend/build

1. To ensure the build is successful, run the following command from the root of the project and navigate to https://localhost:8000

```
node .
```

1. Run the following command from the root of the project to push the project to the cloud

```
ibmcloud cf push BusinessBuddy -b https://github.com/cloudfoundry/nodejs-buildpack.git -c "node ."
```

## Live demo

You can find a running system to test at [Business Buddy](https://businessbuddy.mybluemix.net/)

## Built with

* [IBM Cloudant](https://cloud.ibm.com/catalog?search=cloudant#search_results) - The NoSQL database used
* [IBM Watson Assistant](https://www.ibm.com/cloud/watson-assistant/) - The chatbot used
* [IBM Cloud Foundry](https://www.cloudfoundry.org/) - Used for deployment
* [React](https://reactjs.org/) - The web framework used
* [NPM](https://www.npmjs.com/) - Dependency management
* [Node](https://nodejs.org/en/) - The backend used

## Authors

Andrew Esteban
Jagen Yoon
Joshua Mok
Theresa Wang

## License

This project is licensed under the Apache 2 License - see the [LICENSE](LICENSE) file for details

## Acknowledgments

* Based on [Billie Thompson's README template](https://gist.github.com/PurpleBooth/109311bb0361f32d87a2).
* We would like to acknowledge Dr Sandra Alday in providing ongoing support to our team. We would also like to thank all the mentors we have met along our journey, you know who you are :)  