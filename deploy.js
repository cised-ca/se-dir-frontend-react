'use strict';

var ghpages = require('gh-pages'),
  path = require('path'),
  basePath = path.join(__dirname, 'dist'),
  fs = require('fs-extra'),
  options;

// Bail if this is a pull request since we only want to deploy on pushes
// Bail if this is a push on a branch other than master
if (process.env.TRAVIS_PULL_REQUEST !== 'false' || process.env.TRAVIS_BRANCH !== 'master') {
  return 0;
}

// Overwrite config.json with travis-specific one
fs.copySync(
  path.join(__dirname, 'src/config.travis.json'),
  path.join(__dirname, 'dist/config.json')
);

options = {
  'repo': 'https://' + process.env.GH_TOKEN + '@github.com/cised-ca/cised-ca.github.io.git',
  'branch': 'master',
  'message': 'Travis build ' + process.env.TRAVIS_BUILD_NUMBER,
  'silent': true
};

ghpages.publish(basePath, options);

