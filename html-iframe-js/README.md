# Implmentation for HTML + IFrame + JS


This sample embeds an Incode Iframe app inside an HTML page.  It can be used as a reference for building a production applications.

See setup instructions, [Setup and Run App](#setup-and-run-app).

## Project Setup

Using the command line, clone the GitHub Sample repo named html-samples to your computer.  Next change directory to the root of HTML-IFRAME-JS folder which contains the package.json file. 

```
cd ./html-samples/HTML-IFRAME-JS
```


## Security Considerations

This app factors in a few security stratagies.  When deploying to production, please follow your company's best pratices for hosting both web apps and services.

1. HTTPS Communication 

This sample uses a self signed certificate for localhost development.  You will need to create this using the following command.

```
openssl req -newkey rsa:2048 -nodes -keyout key.pem -x509 -days 365 -out cert.pem
```

2. Session Invocation

It's a best pratice to create an Incode sessions on a server (not on the client).  This sample includes links to sample servers which start a session on the server.

Check out sample servers here:

_.NET_ - [.NET Sample Server][dotnet_url_sample]
_NodeJs_ - [NodeJS Sample Server][nodejs_url_sample]
_Java_ - TBD
_PHP_ - TBD
_Python_ - TBD

This sample fetches a session from the sample server in the onload function inside ```main.js``` and places the onboarding ```url```, ```interviewId``` and ```token``` inside the config object. 

## HTML Structure 

This HTML IFrame sample uses a Vite development environment.  Vite is a NPM tool that enables packaging and app building for modern web projects.  The project structure is as follows:

The root includes core dependencies:

```
./package.json
./vite.config.js
./index.html (required by Vite)
```

The src folder includes source files:

```
./src/main.js
./src/incode.js
```

The public folder includes web assets

```
./public/robots.txt
```


## JavaScript for Frontend

This app includes a single Javascript file inside ```src``` name ```main.js```.  The script does the following :

* Places bussiness logic inside window.onload()
* Fetches Incode session from Sample Server and puts response into a config object
* Dynically creates IFrame and starts Polling (every 2 seconds) if config object contains ```url```, ```interviewId``` and ```token``` 
* Clears the IFrame and displays a finish message


## Backend Endpoint

The app requires a prerequisite backend server.  Specifically, this app calls this endpoint ``` `${serverUrl}/onboarding-url` ``` which returns the following JSON to this app.

```
{
    "token": "<token>",
    "interviewId": "<interviewId>",
    "url": "<onboarding-url>"
}

```

## Styling

The styling of the app is set inside ```src/styles/style.css```.  If you would like to change the look and feel of the Web Flow application, login to your Incode Dashboard and change the app styling from the configuration menu via the ```Customization``` tab.


# Setup and Run App

1) Select and start a sample server:

_.NET_ - [.NET Sample Server][dotnet_url_sample]
_NodeJs_ - [NodeJS Sample Server][nodejs_url_sample]
_Java_ - TBD
_PHP_ - TBD
_Python_ - TBD

2) Set the ```.env.example ``` variables to the following

```
VITE_INCODE_API_URL=https://demo-api.incodesmile.com/0
VITE_YOUR_COMPANY_SERVER=<your-sample-root-url>
```

and rename it to ```.env```

3) Run ```npm install```

3) Run ```npm run dev```



[dontnet_url_sample]: https://github.com/Incode-Technologies-Example-Repos/dotnet-samples/tree/main/token-server

[nodejs_url_sample]: https://github.com/Incode-Technologies-Example-Repos/nodejs-samples/tree/main/token-and-url-server