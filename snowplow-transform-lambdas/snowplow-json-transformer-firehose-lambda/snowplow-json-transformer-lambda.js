'use strict';
const { transform } = require('snowplow-analytics-sdk');

exports.handler = (event, context, callback) => {

  const output = event.records.map((record) => {
    const entry = (new Buffer(record.data, 'base64')).toString('utf8');
    console.log(`Record: ${entry}`);
    let transformedJSONRecord = transform(entry);
    let jsonObjectString = JSON.stringify(transformedJSONRecord)+"\n";
    console.log(`transformedJSONRecord: ${jsonObjectString}`);
    transformedJSONRecord = Buffer.from(jsonObjectString).toString('base64');
    return {
      recordId: record.recordId,
      result: 'Ok',
      data: transformedJSONRecord,
    }
  });

  console.log(`Processing completed.  Successful records ${output.length}.`);
  callback(null, { records: output });

};
