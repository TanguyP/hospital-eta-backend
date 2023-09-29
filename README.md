# Server prerequisites
- `sudo apt install nodejs`
- `sudo apt install npm`
- `sudo apt install redis-server`

# How to deploy
1. First time only:
	1. If not already done, copy the `secret_examples/` folder to `secret/` (the latter is ignored by Git)
	1. Modify the `secret/remote_for_deploy.txt` file to adapt it to the user/server/path where the app must be deployed
	1. Recommended for easier deployment: generate an SSH key locally (or reuse it if you have one already) and add it to the server's authorized keys
1. Run `./deploy.sh`
