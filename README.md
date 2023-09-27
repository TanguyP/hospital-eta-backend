# How to deploy
1. First time only:
	1. Copy the `remote_for_deploy_example.txt` file to `remote_for_deploy.txt` and adapt it to the user/server/path where the app must be deployed.
	1. Recommended: generate an SSH key locally (or reuse it if you have one already) and add it to the server's authorized keys.
1. Run `./deploy.sh`
