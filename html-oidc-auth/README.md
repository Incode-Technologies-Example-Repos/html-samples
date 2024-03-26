# Sample Redirect App
This app showcase how to create a low code app that will fetch the
url of the onboarding and redirect the user to that page, then come
back using the redirectionURL property of the workflow to fetch
the score.

The full steps between the customer site, incode's hosted flows,  and backend can be seen in this diagram.

```mermaid
sequenceDiagram
    participant i as Incode<br>Hosted<br>Workflow
    participant m as Customer<br>Site
    participant b as Backend

    activate m
    m-->>b: Get Onboarding URL
    note over b: runs /omni/start,<br>/omni/onboarding-url
    b-->>m: {url, interviewId}
    note over m: Save interviewId in localStore
    m->>i: Redirect user to Incode's URL
    deactivate m
    
    activate i
    note over i: Do Onboarding
    note over i: Show thank you screen
    i->>m: Redirect user to customer page
    deactivate i
    
    activate m
    note over m: Show finishing page
    note over m: read interviewId from localStore
    m-->>b: Fetch Score<br>{interviewId}
    note over b: Fetch Score
    
    b-->>m: {scores}
    note over m: Done
    deactivate m
```


# Backend Server
A backend server that will generate the url is needed for this sample,
luckily for you we already have sample server for PHP, NodeJS, Python,
PHP and Java and .NET, please reffer to our documentation on subject:
[Quick Start Sample Server](https://developer.incode.com/docs/quick-start-servers)

In order to simplfy development, this repo is configured to reverse
proxy a local backend server (`http://localhost:3000`) in the `/api`
url like `https://<your-ip>:5173/api`, if you want to point your
frontend development to a backend server deployed elsewhere, change
the VITE_TOKEN_SERVER_URL to the full url of such server.

# Install
First install all the required packages
```
npm install
```

# Configure
Copy `.env.example` as `.env` and configure it to point to a remote
server, or leave it as /api to point to the reverse proxied server
running in your local machine

```
VITE_TOKEN_SERVER_URL=/api
```

# Development
This repo is configured so run it in development by executing
```
npm run dev
```

You will get a hot reloading environment that exposes the page in
localhost and in the ip of the machine in case you want to try it
in your cellphone.