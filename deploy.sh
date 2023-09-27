#!/usr/bin/env bash

if [ ! -f remote_for_deploy.txt ]; then
	echo "File remote_for_deploy.txt not found; are you in the right folder (root of your hospital-eta-backend clone)?"
	exit 1
fi

remote=`cat remote_for_deploy.txt`
scp *.js package*.json ${remote}
echo "Deployment successful."
