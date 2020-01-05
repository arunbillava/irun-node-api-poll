const mongoose = require('mongoose');
const util = require('util');
const config = require('./config');
// connect to mongo db
const mongoUri = config.mongoUri;
mongoose.set('useFindAndModify', false);
mongoose.connect(mongoUri, { useNewUrlParser: true }).then(()=>{
    console.log("connected....");
});
mongoose.connection.on('error', () => {
  throw new Error(`unable to connect to database: ${mongoUri}`);
});


