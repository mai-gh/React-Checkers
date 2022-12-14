#!/bin/sh

# make sure you are on main! if not, bail!
git checkout main || { echo 'failed to switch to main'; exit 1; }

# delete the local gh-pages branch (if it exists)
git branch -D gh-pages

# delete the remote gh-pages branch,
# its a pain to try to update it,
# so start clean every time!
git push origin --delete gh-pages

# install and run webpack to generate the bundle.js files
npm install
npx webpack

# create new local branch gh-pages & switch to it
git checkout -b gh-pages

# stop ignoring bundle files generated by webpack
sed -i 's@^\(dist/bundle.js\)@#\1@' .gitignore

# add the bundle files that are nolonger ignored
git add dist

# make a commit on this branch
git commit -m "automated commit"

# push the dist folder as the root of the gh-pages branch
git subtree push --prefix dist origin gh-pages

# switch back to main
git checkout main

# delete the local gh-pages branch
git branch -D gh-pages

# reset all files back to main
git reset --hard

