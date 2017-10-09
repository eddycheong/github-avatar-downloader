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
    console.log("Result:", contributor['avatar_url']);
  });
});

function downloadImageByURL(url, filePath) {
  request.get(url)
    .on('error', function(err) {
      console.log(err)
    })
    .pipe(fs.createWriteStream(filePath)); // Assumes directory path exist
}

downloadImageByURL("https://avatars2.githubusercontent.com/u/2741?v=3&s=466",
  "avatars/kvirani.jpg");