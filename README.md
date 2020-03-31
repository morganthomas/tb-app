# TB-App

Browse the top of any Tumblr blog.

## Requirements

node, npm, mongoDB, jasmine

## Installation

```
$ npm install
```

Make sure that mongod is running (configured for access without credentials as by default) and that `jasmine` is on your system path if you want to run the unit tests.

## Usage

To run a local server on port 3000 (configure in app.js):

```
$ npm run serve
```

To run in a deployed environment using `forever`:

```
$ forever start app.js
```

To refresh the deployment with new code:

```
$ npm run prod
```

To run the unit tests:

```
$ npm run test
```
