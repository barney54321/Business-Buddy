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
1. [Contributing](#contributing)
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

[More detail is available here](GETTING_STARTED.md)

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

* Andrew Esteban
* Jagen Yoon
* Joshua Mok
* Theresa Wang

## License

This project is licensed under the Apache 2 License - see the [LICENSE](LICENSE) file for details

## License

[More detail is available here](CONTRIBUTING.md)

## Acknowledgments

* Based on [Billie Thompson's README template](https://gist.github.com/PurpleBooth/109311bb0361f32d87a2).
* We would like to acknowledge Dr Sandra Alday in providing ongoing support to our team. We would also like to thank all the mentors we have met along our journey, you know who you are :)  
