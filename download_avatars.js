var request = require("request");
var fs = require("fs");

var GITHUB_USER = "eddycheong";
var GITHUB_TOKEN = "c869d3e73d0befab413cdf22ff0676d78f9e52ba";

var args = process.argv.slice(2);
var repoOwner = args[0];
var repoName = args[1];

function getRepoContributors(repoOwner, repoName, cb) {
  var requestURL = `https://${GITHUB_USER}:${GITHUB_TOKEN}@api.github.com/repos/${repoOwner}/${repoName}/contributors`;

  var options = {
    url: requestURL,
    headers: {
      'User-Agent': 'Github Avatar Downloader - Student Project'
    }
  };

  request(options, function(err, response, body) {
    var contributors = JSON.parse(body);
    cb(err, contributors);
  });
}

getRepoContributors(repoOwner, repoName, function(err, contributors) {
  console.log("Errors:", err);

  contributors.forEach(function(contributor) {
    var url = contributor['avatar_url'];
    var filePath = './avatars/' + contributor['login'];

    downloadImageByURL(url, filePath);
  });
});

function downloadImageByURL(url, filePath) {

  var ext;
  request.get(url)
    .on('error', function(err) {
      throw err;
    })
    .on('response', function(response) {
      ext = response.headers['content-type'].split('/')[1];
    })
    .pipe(fs.createWriteStream(filePath))  // Assumes directory path exist
    .on('finish', function() {
      fs.rename(filePath, filePath + "." + ext);
    });
}