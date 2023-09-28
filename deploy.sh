#!/usr/bin/env bash

if [ ! -f secret/remote_for_deploy.txt ]; then
	echo "File secret/remote_for_deploy.txt not found; are you in the right folder (root of your hospital-eta-backend clone)?"
	exit 1
fi

# TODO: 2023-10-25: improve deployment in case where files were deleted
echo "Deploying... Note: if some files were recently removed from the repo, please delete all contents of the target folder first, because this script only adds/replaces contents, it doesn't delete anything."

remote=`cat secret/remote_for_deploy.txt`
scp *.js *.json ${remote}
scp -r dist/ src/ ${remote}

# TODO: 2023-10-25: automatically run `npm install` on the server
echo "Deployment successful. Please run 'npm install' on the server if necessary."
