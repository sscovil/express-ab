'use strict';

const service = {
  doStuff: function(ctx) {
    return new ctx.Promise((resolve) => {
      process.nextTick(resolve);
    });
  }
};

module.exports = service;
