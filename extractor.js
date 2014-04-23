var exec = require('child_process').exec,
    child;

var imageExtract = function(path, destPath, time, size, callback)
{

    if (time == null)
    {
      time = '00:00:01';
    }
    if (size == null)
    {
      size = '200x125';
    }
    return exec('ffmpeg -ss '+ time+ ' -i '+ path+ ' -vframes 1   -y -s '+ size.replace('x', '*')+ ' -f image2 '+ destPath,
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