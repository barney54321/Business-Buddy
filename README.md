Submission for the 2020 IBM Call for Code competition.

A live demo can be found at [Business Buddy](https://businessbuddy.mybluemix.net/)

# Requirements

- [Node](https://nodejs.org/en/download/)
- IBM Cloud Foundry CLI

# How to run locally

## Setup

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

## Run

1. Run the following commands

```
git clone https://github.com/barney54321/Business-Buddy.git
cd Business-Buddy
npm install
node .
``` 

2. In a new terminal, navigate to the root of the project and run the following commands:

```
cd frontend
npm install
npm start
```

3. This will open BusinessBuddy on localhost://3000

# How to deploy to IBM Cloud Foundry

1. Create an IBM Cloud Foundry service

2. Download the IBM Cloud Foundry CLI

3. Run the following commands from the terminal:

```
cd frontend
npm run build
```

4. Replace the contents of /public with the contents of /frontend/build

5. Run the following command from the terminal:

```
cd ..
ibmcloud cf push BusinessBuddy -b https://github.com/cloudfoundry/nodejs-buildpack.git -c "node ."
```