# Express A/B
NodeJS Express endpoint A/B testing

## Setup

1. Clone repository and run `npm install` from the command line.

2. Start REST API by running `npm start`.

3. Run benchmark against endpoint `/a` by running `npm run benchmark`.

4. Run benchmark against endpoint `/b` by running `ROUTE=/b npm run benchmark`.

5. TODO: Add data visualization for benchmark results.

## Environment Variables

* `CALLS` number of times to hit the endpoint; default 1000.
* `LIMIT` max number of concurrent HTTP calls; default 100.
* `PORT` port that REST API is listening on; default 8020.
* `ROUTE` which REST API endpoint to bombard; default `/a`.
* `TESTS` number of tests to run; default 10.
