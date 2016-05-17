/**
*  Remotely control your ARK server over SSH using Hubot
*
*
*
*/

var SSH = require('simple-ssh');
var sshOptions = {
  host: process.env.SSHHOST,
  user: process.env.SSHUSER,
  pass: process.env.SSHPASS,
  port: process.env.SSHPORT || 22
}



module.exports = function(robot) {
  var appToCheck = process.env.ARKPROCESSNAME || 'ShooterGame';

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
          res.reply('Server is already running as process ' + stdout);
          return false;
        }
        if (code === 1) {
          res.reply('Starting server! (It takes approximately 4-6 minutes for the server to finish booting.)');
        }
      }
    })
    .exec('./'+process.env.ARKSTARTSCRIPT, {
      exit: function(code, stdout) {
        res.reply(process.env.ARKSTARTSCRIPT);
        res.reply(stdout);
        res.reply('start code: ' + code);
      }
    })
    .start();

  });

  /**
  * Stop the server
  */
  robot.respond(/ark\sstop/i, function(res) {

    var ssh = new SSH(sshOptions);
    var pid;

    ssh.exec('pgrep ' + appToCheck, {
      out: function(stdout) {
        if(stdout) {
          res.reply('BRING ' + stdout + ' DOWN LEGOLAS!!!');
          pid = stdout;
        }
      },
      exit: function(code, stdout) {
        if (code === 0) {
          res.reply('Server shutdown');
        }
        if (code === 1) {
          res.reply('Server is not running');
          return false;
        }
      }
    })
    .exec('kill -s TERM ' + pid, {
      exit: function(code, stdout) {
        res.reply('server shutdown status' + code);
        res.reply(stdout);
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
          res.reply('Server running as process: ' + stdout);
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
