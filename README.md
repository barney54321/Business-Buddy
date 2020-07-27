Submission for the 2020 IBM Call for Code competition.

A live demo can be found at [Business Buddy](https://businessbuddy.mybluemix.net/)

# Requirements

- [Node](https://nodejs.org/en/download/)
- IBM Cloud Foundry CLI

# How to run locally

## Setup

1. Watson Assistant (to be filled)

2. Cloudant (to be filled)

7. Auth0 (to be filled).

8. Note down the domain and client id.

9. Make a copy of .env.example and rename the file to .env

## Running

3. Run the following commands

```
git clone https://github.com/barney54321/Business-Buddy.git
cd Business-Buddy
npm install
node .
``` 

10. Replace the placeholders in .env with the details collected from Auth0

6. In a new terminal, navigate to the root of the project and run the following commands:

```
cd frontend
npm install
npm start
```

11. This will open BusinessBuddy on localhost://3000

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