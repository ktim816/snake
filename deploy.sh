#!/usr/bin/env sh

# abort on errors
set -e

# clean
yarn clean

# build
yarn build

# navigate into the build output directory
cd dist

# if you are deploying to a custom domain
# echo 'www.example.com' > CNAME

git init
git checkout -b master
git add -A
git commit -m 'deploy: gh-pages'

# if you are deploying to https://<USERNAME>.github.io/<REPO>
git push -f git@github.com:ktim816/snake.git main:gh-pages

cd -
