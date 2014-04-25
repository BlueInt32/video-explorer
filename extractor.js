var exec = require('child_process').exec,
    child,
    config = require('./config'),
    pathHelper = require('./PathHelper');

/// path : complete path to the video file
/// destPath : complete path to the image file
/// time : 'hh:mm:ss' formatted time
/// size : '100x200' formatted size
/// callback : function(error, stdout, stderr)
var imageExtract = function(path, destPath, time, size, callback)
{
    var basePath = config.BASEPATH;
    var pathToFfmpeg = pathHelper.combine(basePath, 'ffmpeg/bin/ffmpeg.exe');

    if (time == null)
    {
      time = '00:00:01';
    }
    if (size == null)
    {
      size = '200x125';
    }
    var command = pathToFfmpeg +' -ss '+ time+ ' -i "'+ path+ '" -vframes 1   -y -s '+ size.replace('x', '*')+ ' -f image2 "'+ destPath + '"';

    console.log("Running : ", command);

    return exec(command,
        function(error, stdout, stderr)
        {
            if (callback)
            {
                return callback(error, stdout, stderr);
            }
        });
};

module.exports.create = imageExtract;
// imageExtract('vids/vid_test.mp4', 'img/result.png', '00:00:10', '200x125', function(error, stdout, stderr){...});