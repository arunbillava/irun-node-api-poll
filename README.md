## Welcome to the IRUN-NODE-API-POLL

I-Run (is just my favortite name derived from A-Run)

Simple application to poll an api 

- **M**ongoDB : Document database – used by your back-end application to store its data as JSON (JavaScript Object Notation) documents
- **N**ode.js : JavaScript runtime environment – lets you implement your application back-end in JavaScript
Use Node 10 or more

### Pre-requisites  
* node.js - [Download page](https://nodejs.org/en/download/) .  
* npm - comes with node or download yarn - [Download page](https://yarnpkg.com/lang/en/docs/install) .  
* mongodb - [Download page](https://www.mongodb.com/download-center/community) .  

### Installation 
``` 
git clone 
cd irun-node-api-poll
npm install
npm run start / npm start
or you can use docker to run the application
```
### Connecting to database
Update your mongo db host url (mongoUri) in /server/config file

### Config
Config is found in /server/config you can do the required changess
> update the time interval for polling.

> avoid updating while update keep failing.

> polling api (you may need to change the mongoose schema if you change the api).

