const config = require('../config/config');
const request = require('request');
const comment = require('../models/comment.model');

const start = async () => {
    console.log("alive and listening..");
    try {
        let apiResult = await callApi();
        if (apiResult) {
            let results = JSON.parse(apiResult);
            console.log("......processing " + results.length + " records.............");
            // intialize batch and failed count as 0
            await process(0, 0, results);
        }
        // wait for the interval for some seconds
        setTimeout(() => start(), config.time_interval * 1000);
    } catch (err) {
        console.error(err);
    }
}

const callApi = () => {
    let url = config.api_endpoint;
    return new Promise((resolve, reject) => {
        request.get({
            headers: {
                'Content-Type': 'application/json'
            },
            url: url,
        }, function (error, response, body) {
            if (error) {
                reject(error);
            } else {
                resolve(body);
            }
        });
    });
}

const process = async (batchCount, failedCount, result) => {
    return new Promise(async (resolve, reject) => {

        console.log("......processing batch " + batchCount + ".............");
        try {
            let batch = await getBatch(batchCount, result);
            // return if all records are processed and failure limit exceeded
            if (!batch.length || checkFailedCount(failedCount)) {
                resolve();
                return;
            }
            failedCount = await save(batch);
        } catch (err) {
            console.error("alert!!! something broken::" + err);
            reject();
        }
        // Introduce some delay between the consecutive batches while processing
        setTimeout(async() => {
            try {
                await process(++batchCount, failedCount, result);
                resolve();
            } catch (err) {
                reject(err);
            }
        }, 0);

    });
}

const save = async (results, failLimit) => {
    if (results) {
        for (let i = 0; i < results.length; i++) {
            let entry = results[i];
            try {
                await comment.findOneAndUpdate({
                    id: entry.id
                }, entry, {
                    upsert: true,
                    new: true
                });
            } catch (err) {
                failLimit++;
                // return if fail limit exceedes
                if (checkFailedCount(failLimit)) {
                    return failLimit;
                }
            }
        }
    }
    console.log("processed successfully..");
    return failLimit;
}

checkFailedCount = (failLimit) => {
    if (failLimit > config.failLimit) {
        // we should get notification if it is keep failing
        console.error("alert!!! something broken");
        return true;
    }
    return false;
}

// return the batch of required size
getBatch = function (batchCount, result) {
    return new Promise((resolve, reject) => {
        let start = batchCount * config.batchSize;
        if (result.length > start) {
            let batch = result.slice(start, start + config.batchSize);
            resolve(batch);
        } else {
            resolve([]);
        }
    });
};


exports.start = start;