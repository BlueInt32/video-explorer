var fs = require('fs');

var basePath = "";
var setBasePath = function(absolutePath)
{
    basePath = trimSlashes(absolutePath);
}

var getBasePath = function()
{
    return basePath;
}

var trimSlashes = function(input)
{
    return input.replace(/^\/+|\/+$/g, '');
}
var urlEncode = function(input)
{
    return encodeURIComponent(input);
}

var urlDecode = function(input)
{
    return decodeURIComponent(input);
}
var toAbsolute = function(relativePath)
{
    if(basePath === '')
        throw new Error('Not initialized !');
    return trimSlashes(trimSlashes(basePath) + "/" + processUpFolder(relativePath));
}

var toRelative = function(absolutePath)
{
    if(basePath === '')
        throw new Error('Not initialized !');
    if(trimSlashes(absolutePath).indexOf(basePath) !== 0)
        throw new Error('Start of the provided absolute path not matching the basePath !');

    var absolutePathTokens = processUpFolder(absolutePath).split('/');
    var basePathTokens = trimSlashes(basePath).split('/');
    absolutePathTokens.splice(0, basePathTokens.length);

    return absolutePathTokens.join('/');
}

var processUpFolder = function(inputPath)
{
    var trimed = trimSlashes(inputPath);
    if(trimed.indexOf('..') === -1)
        return trimed;
    var arrayDirs = trimed.split('/');

    if(arrayDirs.length < 2) // cannot go up if already in root dir
        return "";
    arrayDirs.splice(arrayDirs.length - 2, 2);
    return arrayDirs.join("/");
}

var combine = function(pathStart, pathEnd)
{
    return trimSlashes(pathStart) + "/" + trimSlashes(pathEnd);
}

var extractFileName = function(inputPath)
{
    var tokens = processUpFolder(inputPath).split("/");
    var fileName = tokens[tokens.length - 1];
    return fileName;

}

module.exports.getBasePath = getBasePath;
module.exports.setBasePath = setBasePath;
module.exports.urlEncode = urlEncode;
module.exports.urlDecode = urlDecode;
module.exports.trimSlashes = trimSlashes;
module.exports.toAbsolute = toAbsolute;
module.exports.toRelative = toRelative;
module.exports.processUpFolder = processUpFolder;
module.exports.combine = combine;
module.exports.extractFileName = extractFileName;