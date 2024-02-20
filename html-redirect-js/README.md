# Sample Redirect App
This app showcase how to create a low code app that will fetch the
url of the onboarding and redirect the user to that page.

# Backend Server
A backend server that will generate the url is needed for this sample, luckily for you we already have sample server for PHP, NodeJS, Python, PHP and Java and .NET, please reffer to our documentation on subject: [Quick Start Sample Server](https://developer.incode.com/docs/quick-start-servers)

# Install
First install all the required packages
```
npm install
```

# Configure
Copy `.env.example` as `.env` and configure it.

```
VITE_TOKEN_SERVER_URL=<URL FROM THE QUICK START SAMPLE SERVER>
```

# Development
Run it in development by executing
```
npm run dev
```

You will get a hotreloading environment that exposes the page in localhost and in the ip of the machine in case you want to try it in your cellphone.