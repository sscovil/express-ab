'use strict';

const path = require('path');
const Promise = require('bluebird');
const request = require('request-promise');
const Results = require('./Results');

const config = {
  calls: process.env.CALLS || 1000,
  limit: process.env.LIMIT || 100,
  port: process.env.PORT || 8020,
  route: process.env.ROUTE || '/a',
  tests: process.env.TESTS || 10
};

const requestAsync = request.defaults({ baseUrl: `http://localhost:${config.port}` });
const start = Date.now();

function httpRequest() {
  const start = Date.now();
  return requestAsync.get(config.route)
    .then((res) => {
      const result = JSON.parse(res);
      result.time = millisSince(start);
      return result;
    });
}

function logResults(data) {
  const results = new Results(data);
  console.log(results.toString('rss'));
  console.log(results.toString('heapTotal'));
  console.log(results.toString('heapUsed'));
  console.log(`[avgTime]: ${results.avg('time')}ms`);
  console.log(`[maxTime]: ${results.max('time')}ms`);
  console.log('\n');
}

function run(value, index) {
  console.log(`Running Test #${index + 1}...`);
  return Promise.map(new Array(config.calls), httpRequest, { concurrency: config.limit })
    .then((data) => logResults(data));
}

function millisSince(timestamp) {
  return (Date.now() - timestamp);
}

function secondsSince(timestamp) {
  return millisSince(timestamp) / 1000;
}

console.log(`Benchmarking route ${config.route} using ${config.tests} tests, making ${config.calls} calls each, limit ${config.limit} concurrent calls.\n`);
Promise.mapSeries(new Array(config.tests), run)
  .then(() => {
    console.log(`Done in ${secondsSince(start)}s.`);
    process.exit();
  })
  .catch((err) => {
    console.log(`Stopped after ${secondsSince(start)}s.`, err);
    process.exit(1);
  });
