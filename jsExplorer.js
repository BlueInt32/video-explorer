var fs = require('fs');

var basePath = "E:/Simon/Git/NodeJs/videoExplorer/vids/";

var list = [];
var subFoldersNames = []; // if in subfolders like sub1/sub3/vids/, array will be ["sub1","sub3","vids"], this could be useless actually


var resolveCurrentLocation = function(callback)
{
    list = [];
    // Build new path :
    var newPath = basePath  + subFoldersNames.join("/");

    if(subFoldersNames.length) // in subdir
    {
        list.push({display: "..", isDir:true});
    }

    var files = fs.readdirSync(newPath);
    if (!files.length)
          list = [];
    for (var i = 0, l = files.length ; i < l; i++)
    {
        var fileName = files[i];
        var resultStat = fs.statSync(newPath + '/' + fileName);
        list.push({display: fileName + (resultStat.isDirectory() ? '/': ''), isDir:resultStat.isDirectory()});
    }
    callback.call(null, list);
}

var goIntoFolder = function(folderName, callback)
{
    if(typeof folderName !== 'undefined')
        subFoldersNames.push(folderName);
    resolveCurrentLocation(callback);
}

var upFolder = function(callback)
{
    subFoldersNames.splice(subFoldersNames.length - 1, 1);
    resolveCurrentLocation(callback);
}

module.exports.goIntoFolder = goIntoFolder;
module.exports.upFolder = upFolder;
module.exports.basePath = basePath;