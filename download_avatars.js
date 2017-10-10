var request = require("request");
var fs = require("fs");

var GITHUB_USER = "eddycheong";
var GITHUB_TOKEN = "c869d3e73d0befab413cdf22ff0676d78f9e52ba";

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

getRepoContributors("jquery", "jquery", function(err, contributors) {
  console.log("Errors:", err);

  contributors.forEach(function(contributor) {
    var url = contributor['avatar_url'];
    var filePath = './avatars/' + contributor['login'];

    downloadImageByURL(url, filePath);
  });
});

function downloadImageByURL(url, filePath) {

  request.get(url)
    .on('error', function(err) {
      throw err;
    })
    .on('end', function() {
    })
    .pipe(fs.createWriteStream(filePath)); // Assumes directory path exist
}