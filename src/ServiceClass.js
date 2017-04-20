'use strict';

class Service {
  constructor(ctx) {
    this.ctx = ctx;
  }

  doStuff() {
    return new this.ctx.Promise((resolve) => {
      process.nextTick(resolve);
    });
  }
}

module.exports = Service;
