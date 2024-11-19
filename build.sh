#!/usr/bin/env bash
rm -rf dist
echo Building new release...
npm i
npm run build
npm run types

echo Build completed, run \"npm publish --access public\" to publish the new release.
