#!/usr/bin/env bash

if [ ! -f secret/remote_for_deploy.txt ]; then
	echo "File secret/remote_for_deploy.txt not found; are you in the right folder (root of your hospital-eta-backend clone)?"
	exit 1
fi

remote=`cat secret/remote_for_deploy.txt`
scp *.js package*.json ${remote}
echo "Deployment successful."
