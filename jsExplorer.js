var fs = require('fs');

var basePath = "E:/Simon/Git/NodeJs/videoExplorer/vids/";

var list = []; // list of current files/folders to display in the current directory.
var subFoldersNames = []; // if in subfolders like sub1/sub3/vids/, array will be ["sub1","sub3","vids"], this could be useless actually
var currentRelativePath = "";

// path is basePath + parentDirs + visibleDir

var resolveLocation = function(folderPath, callback)
{
    if(folderPath !== "" && typeof folderPath !== 'undefined')
        subFoldersNames = folderPath.replace(/^\/|\/$/g, '').split("/"); // we trim "/" from the input folderPath and create a clean array
    else
        subFoldersNames = [];

    if(subFoldersNames[subFoldersNames.length - 1] === "..") // we handle the "go up" token
    {
        if(subFoldersNames.length < 2) // cannot go up if already in root dir
        {
            subFoldersNames = [];
        }
        subFoldersNames.splice(subFoldersNames.length - 2, 2);
    }

    list = [];
    // Build new path :
    var relativePath = subFoldersNames.join("/");

    var fullPath = basePath + relativePath;
    if(subFoldersNames.length) // in subdir
    {
        list.push({display: "..",relativePath : relativePath + "/..", isDir:true});
    }
    var files = fs.readdirSync(fullPath);
    files.sort(function(a, b)
    {
        return !fs.statSync(fullPath +"/"+ a).isDirectory() && fs.statSync(fullPath +"/"+ b).isDirectory();
    });
    for (var i = 0, l = files.length ; i < l; i++)
    {
        var fileName = files[i];
        var resultStat = fs.statSync(fullPath + "/" + fileName);
        list.push
        (
            {
                display: fileName + (resultStat.isDirectory() ? '/': ''),
                relativePath : (relativePath + "/" + files[i]).replace(/^\/|\/$/g, ''),
                isDir:resultStat.isDirectory(),
                fullPath : (basePath + relativePath + files[i]).replace(/^\/|\/$/g, '')
            }
        );
    }
    callback.call(null, list);
}

module.exports.resolveLocation = resolveLocation;
module.exports.basePath = basePath;