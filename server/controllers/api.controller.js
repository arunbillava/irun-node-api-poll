const config = require('../config/config');
const request = require('request');
const comment= require('../models/comment.model');

const start=async()=>{
    console.log("alive and listening..");
    try{
        let apiResult=await callApi();
        if(apiResult){
            await save(apiResult);
        }
        // wait for the interval for some seconds
        setTimeout(()=>start(),config.time_interval*1000);
    }
    catch(err){
        console.error(err);
    }
}

const callApi= ()=>{
    let url=config.api_endpoint;
    return new Promise((resolve, reject) =>{
        request.get({
            headers: {
              'Content-Type': 'application/json'
            },
            url: url,
          }, function (error, response, body) {
                if(error){
                    reject(error);
                }
                else{
                    resolve(body);
                }
          });
    });
}

const save = async(results)=>{
    if(results){
        let failLimit=0;
        let entries=JSON.parse(results);
        console.log("updating total number of records:"+entries.length);
        for(let i=0;i<entries.length;i++){
            let entry=entries[i];
            try{
                await comment.findOneAndUpdate({id:entry.id},entry,{upsert: true, new: true});
            }
            catch(err){
                failLimit++;
                // stop when keep failing
                if(failLimit>config.failLimit){
                    // we should get notification if it is keep failing
                    console.error("alert!!! something broken");
                    break;
                }
                console.error(err);
            }
            
        }
    }
    console.log("processed successfully..");
    return true;
}

exports.start=start;