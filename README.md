# hubot-remote-ark
## hubot-remote-ark is a script/extension for [GitHub's Hubot](https://hubot.github.com/) for controlling your Linux based ARK server.

Currently **very** basic and assumed you already have a start script for the server.

Driven out of wanting to give more players ability to control the ARK server without being given access to the host.

## Commands
- ark start - starts the ark server
- ark stop - stops the ark server
- ark status - responds with if the server is already up or not

# Setup

Add `hubot-remote-ark` to the `external-scripts.json` for your Hubot.

## Environment Variables

- SSHHOST - domain or IP of host
- SSHUSER - user to connect with (likely `steam` if following ARK setup)
- SSHPASS - password for user
- SSHPORT - port to connect on (default: 22)
- ARKSTARTSCRIPT - name of ARK script. currently assumes located in user home directory
- ARKPROCESSNAME - name of ARK process, left as variable for easy updating in case server process name is changed by devs (default: ShooterGameServ)

## Example Start Scripts
This hubot script currently requires you have to have startup and update shell scripts on your server. Example startup scripts are provided in the example_scripts directory.

- ark_server.sh - ARK script to run located in user home directory and/or parent directory of `steamcmd`
- ark_update.sh - login to steam and check updates for ARK (place in `steamcmd`)
- server_start.sh - example command to start server (place in `steamcmd/ark/ShooterGame/Binaries/Linux/`)
