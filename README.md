# hubot-remote-ark
## Basic chat bot for controlling your Linux based ARK server

Currently **very** basic and assumed you already have a start script for the server.

Driven out of wanting to give more players ability to control the ARK server without being given access to the host.

## Commands
- ark start - starts the ark server
- ark stop - stops the ark server
- ark status - responds with if the server is already up or not

## Environment Variables
Assumes use with Heroku
- SSHHOST - domain or IP of host
- SSHUSER - user to connect with (likely `steam` if following ARK setup)
- SSHPASS - password for user
- SSHPORT - port to connect on (default: 22)
- ARKSTARTSCRIPT - name of ARK script. currently assumes located in user home directory
- ARKPROCESSNAME - name of ARK process, left as variable for easy updating in case server process name is changed by devs (default: ShooterGame)
