var fs = require('fs'),
pathHelper = require('./PathHelper'),
config = require('./config');

var list = []; // list of current files/folders to display in the current directory.
var subFoldersNames = []; // if in subfolders like sub1/sub3/vids/, array will be ["sub1","sub3","vids"], this could be useless actually
var currentRelativePath = "";

// path is basePath + parentDirs + visibleDir

var resolveLocation = function(folderPath, callback)
{
    pathHelper.setBasePath(config.BASEVIDEOSPATH);

    if(folderPath !== "" && typeof folderPath !== 'undefined')
    {
        subFoldersNames = pathHelper.processUpFolder(folderPath).split("/"); // we trim "/" from the input folderPath and create a clean array
    }
    else
        subFoldersNames = [];

    list = [];
    // Build new path :
    var relativePath = subFoldersNames.join("/");

    var fullPath = pathHelper.toAbsolute(relativePath);
    console.log('fullPath : ', fullPath);
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
                fullPath : pathHelper.urlEncode(pathHelper.combine(fullPath,files[i]))
            }
        );
    }
    callback.call(null, list);
}

module.exports.resolveLocation = resolveLocation;