var request = require("request");

var GITHUB_USER = "eddycheong";
var GITHUB_TOKEN = "c869d3e73d0befab413cdf22ff0676d78f9e52ba";

function getRepoContributors(repoOwner, repoName, cb) {
  var requestURL = `https://${GITHUB_USER}:${GITHUB_TOKEN}@api.github.com/repos/${repoOwner}/${repoName}/contributors`;

  var options = {
    url: requestURL,
    headers:  {
      'User-Agent': 'Github Avatar Downloader - Student Project'
    }
  };

  request(options, function(err, response, body) {
    cb(err, body);
  });
}

getRepoContributors("jquery", "jquery", function(err, result) {
  console.log("Errors:", err);
  console.log("Result:", result);
});