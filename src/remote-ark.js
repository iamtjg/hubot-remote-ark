/**
*  Remotely control your ARK server over SSH using Hubot
*/

var SSH = require('simple-ssh');
var sshOptions = {
  host: process.env.SSHHOST,
  user: process.env.SSHUSER,
  pass: process.env.SSHPASS,
  port: process.env.SSHPORT || 22
}



module.exports = function(robot) {
  var appToCheck = process.env.ARKPROCESSNAME || 'ShooterGameServ';

  /**
  * List available commands
  */
  robot.respond(/ark($|\shelp)/i, function(res) {
    res.reply('\nARK Commands: \n ark start - start the ARK server \n ark stop - stop the ARK server \n ark status - check the status of the ARK server \n ark help - list available commands');
  });

  /**
  * Start the server if it is not already running
  */
  robot.respond(/ark\sstart/i, function(res) {

    var ssh = new SSH(sshOptions);

    ssh.exec('pgrep ' + appToCheck, {
      exit: function(code, stdout) {
        if (code === 0) {
          res.reply('Server is already running.');
          return false;
        }
        if (code === 1) {
          res.reply('Starting server!');
        }
      }
    })
    .exec('./'+process.env.ARKSTARTSCRIPT, {
      exit: function(code, stdout) {
        res.reply('Running ' + process.env.ARKSTARTSCRIPT);
        res.reply(stdout);
        res.reply('Server started. It takes approximately 4-6 minutes for the server to finish booting.');
      }
    })
    .start();

  });

  /**
  * Stop the server
  */
  robot.respond(/ark\sstop/i, function(res) {

    var ssh = new SSH(sshOptions);

    ssh.exec('pgrep ' + appToCheck, {
      exit: function(code, stdout) {
        if (code === 0) {
          res.reply('Server is shutting down');
        }
        if (code === 1) {
          res.reply('Server is not running');
          return false;
        }
      }
    })
    .exec('kill $(pgrep '+ appToCheck + ')', {
      exit: function(code, stdout, stderr) {
        if (code === 0) {
          res.reply('Server is shutdown');
        }
      },
      err: function(stderr) {
        res.reply('There was a problem shutting down the server. Error code: ' + stderr);
      }
    })
    .start();

  });

  /**
  * Check the status of the server
  */
  robot.respond(/ark\sstatus/i, function(res) {

    var ssh = new SSH(sshOptions);

    ssh.exec('pgrep ' + appToCheck, {
      exit: function(code, stdout) {
        if (code === 0) {
          res.reply('The server is running. Game on!');
        }
        if (code === 1) {
          res.reply('Sever is not running.');
        }
      },
      err: function(stderr) {
        res.repy(stderr);
      }
    }).start();

  });

};
