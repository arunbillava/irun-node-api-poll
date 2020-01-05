const config={
    time_interval:17, // in sec
    mongoUri:"mongodb+srv://arun:Arun1Great@cluster0-klqxs.mongodb.net/Arun?retryWrites=true&w=majority",
    api_endpoint:"https://jsonplaceholder.typicode.com/comments",
    batchSize:100,
    failLimit:20
}

module.exports = config;