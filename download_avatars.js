var request = require("request");
var fs = require("fs");

var GITHUB_USER = "eddycheong";
var GITHUB_TOKEN = "c869d3e73d0befab413cdf22ff0676d78f9e52ba";

function printUsage(programName, args) {
  console.log('Usage: node ' + programName + " " + args.join(" "));
}

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

function downloadImageByURL(url, filePath) {

  var ext;
  request.get(url)
    .on('error', function(err) {
      throw err;
    })
    .on('response', function(response) {
      ext = response.headers['content-type'].split('/')[1];
    })
    .pipe(fs.createWriteStream(filePath))
    .on('finish', function() {
      fs.rename(filePath, filePath + "." + ext);
    });
}


// Start of program
var args = process.argv.slice(2);

var programFullName = process.argv[1];
var programFullNamePath = programFullName.split('/');
var programName = programFullNamePath[programFullNamePath.length - 1];

if(args.length < 2) {
  printUsage(programName, ['<owner>', '<name>']);
  process.exit(1);
}

var args = process.argv.slice(2);
var repoOwner = args[0];
var repoName = args[1];

getRepoContributors(repoOwner, repoName, function(err, contributors) {
  console.log("Errors:", err);

  contributors.forEach(function(contributor) {
    var url = contributor['avatar_url'];
    var filePath = './avatars/' + contributor['login'];

    downloadImageByURL(url, filePath);
  });
});
