'use strict';

const express = require('express');
const Promise = require('bluebird');
const serviceModule = require('./serviceModule');
const ServiceClass = require('./ServiceClass');

const app = express();

app.use((req, res, next) => {
  console.log(req.method, req.path);
  req.ctx = { Promise };
  next();
});

app.get('/a', (req, res, next) => {
  serviceModule.doStuff(req.ctx)
    .then(() => next())
    .catch((err) => next(err));
});

app.get('/b', (req, res, next) => {
  let service = new ServiceClass(req.ctx);
  service.doStuff()
    .then(() => next())
    .catch((err) => next(err));
});

app.use((req, res, next) => {
  let data = process.memoryUsage();
  res.json(data);
});

app.use((err, req, res, next) => {
  console.log(err);
  res.sendStatus(500);
});

module.exports = app;
