'use strict';

const app = require('./src/app');

const port = process.env.PORT || 8020;

module.exports = app.listen(port, (err) => {
  if (err) {
    console.log(err);
    process.exit(1);
  } else {
    console.log(`Server listening on port ${port}`);
  }
});
