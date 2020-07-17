Submission for the 2020 IBM Call for Code competition.

# Requirements

- [Node](https://nodejs.org/en/download/)
- IBM Cloud Foundry CLI

# How to run locally

1. Watson Assistant (to be filled)

2. CloudAnt (to be filled)

3. Run the following commands

```
git clone https://github.com/barney54321/Business-Buddy.git
cd Business-Buddy
npm install
node .
``` 

6. In a new terminal, navigate to the root of the project and run the following commands:

```
cd frontend
npm install
```

7. Create an account for Auth0.

8. Note down the domain and client id.

9. Make a copy of .env.example and rename the file to .env

10. Replace the placeholders in .env with the details collected from Auth0

11. Run the frontend with `npm start`. This will open a page on localhost://3000

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
ibmcloud cf push BusinessBuddy -b https://github.com/cloudfoundry/nodejs-buildpack.git -c "node ."
```