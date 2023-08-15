#!/bin/bash

# Specify your GitHub username and repository name
GITHUB_USERNAME="ike10"
REPO_NAME="search-filter-library"

# Create the main project directory
mkdir $REPO_NAME
cd $REPO_NAME

# Create the file structure
mkdir -p src filters middleware examples test

# Create necessary files
touch src/index.js src/queryBuilder.js src/indexing.js \
      middleware/express.js \
      examples/basic-usage.js examples/express-demo.js \
      test/queryBuilder.test.js test/indexing.test.js

# Create custom filter files
touch filters/numeric.js filters/date.js \
      test/filters/numeric.test.js test/filters/date.test.js

# Create package.json
echo '{
  "name": "'$REPO_NAME'",
  "version": "1.0.0",
  "description": "Node.js Search and Filtering Utility Library",
  "scripts": {},
  "author": "'$GITHUB_USERNAME'",
  "license": "MIT"
}' > package.json

# Create README.md
echo '# '$REPO_NAME'
Node.js Search and Filtering Utility Library

## Overview
...

## Installation
...

## Usage
...

## Examples
...

## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
' > README.md

# Initialize Git repository
git init
git add .
git commit -m "Initial commit"

# Create the repository on GitHub using GitHub API
curl -u $GITHUB_USERNAME https://api.github.com/user/repos -d '{"name":"'$REPO_NAME'"}'
git remote add origin "https://github.com/$GITHUB_USERNAME/$REPO_NAME.git"
git branch -M main
git push -u origin main

echo "Project setup completed and pushed to GitHub!"
