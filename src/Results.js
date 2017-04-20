'use strict';

class Results {
  constructor(data) {
    if (!Array.isArray(data)) {
      throw new TypeError(`Expected array as first argument, but got ${typeof data}`);
    }
    this.cache = { avg: {}, change: {}, max: {}, sigma: {}, sum: {} };
    this.data = data;
  }

  avg(field) {
    if (!this.cache.avg[field]) {
      this.cache.avg[field] = Math.round(this.sum(field) / this.data.length);
    }
    return this.cache.avg[field];
  }

  change(field) {
    if (!this.cache.change[field]) {
      let first = Number(this.data[0][field]);
      let lastIndex = this.data.length - 1;
      let last = Number(this.data[lastIndex][field]);
      let increase = last - first;
      this.cache.change[field] = Math.round((increase / first) * 100);
    }
    return this.cache.change[field];
  }

  max(field) {
    if (!this.cache.max[field]) {
      this.cache.max[field] = this.data.reduce((prev, data) => Math.max(prev, Number(data[field])), 0);
    }
    return this.cache.max[field];
  }

  sigma(field) {
    if (!this.cache.sigma[field]) {
      const sqrDiffs = this.data.map((data) => {
        let diff = Number(data[field]) - this.avg(field);
        return diff * diff;
      });
      const avgSqrDiff = sqrDiffs.reduce((sum, value) => sum + value, 0);
      this.cache.sigma[field] = Math.round(Math.sqrt(avgSqrDiff));
    }
    return this.cache.sigma[field];
  }

  sum(field) {
    if (!this.cache.sum[field]) {
      this.cache.sum[field] = this.data.reduce((sum, data) => sum + Number(data[field]), 0);
    }
    return this.cache.sum[field];
  }

  toString(field) {
    let avg = this.avg(field);
    let change = this.change(field);
    let sigma = this.sigma(field);
    return `[${field}] change: ${change}% | avg: ${avg} | σ: ${sigma}`;
  }
}

module.exports = Results;
