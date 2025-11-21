#!/bin/bash

# Noircraft Deployment Script
# This script updates the version and pushes to git

echo "🚀 Noircraft Deployment Script"
echo "================================"

# Parse arguments
INCREMENT_TYPE=${1:-"build"}
COMMIT_MESSAGE=${2:-"Update version and deploy changes"}

echo "📦 Updating version ($INCREMENT_TYPE)..."

# Run version update script
./update-version.sh $INCREMENT_TYPE

if [ $? -ne 0 ]; then
    echo "❌ Version update failed!"
    exit 1
fi

echo ""
echo "📝 Committing changes..."

# Commit with updated version
git commit -m "$COMMIT_MESSAGE

Version: $(node -p "JSON.parse(require('fs').readFileSync('version.json', 'utf8')).version")
Build: #$(node -p "JSON.parse(require('fs').readFileSync('version.json', 'utf8')).build")
Date: $(date +"%Y-%m-%d %H:%M:%S")"

if [ $? -ne 0 ]; then
    echo "❌ Commit failed!"
    exit 1
fi

echo ""
echo "🌐 Pushing to remote..."

# Push to remote
git push

if [ $? -eq 0 ]; then
    NEW_VERSION=$(node -p "JSON.parse(require('fs').readFileSync('version.json', 'utf8')).version")
    NEW_BUILD=$(node -p "JSON.parse(require('fs').readFileSync('version.json', 'utf8')).build")
    
    echo ""
    echo "✅ Deployment successful!"
    echo "🎉 Noircraft v$NEW_VERSION (Build #$NEW_BUILD) is now live!"
    echo ""
    echo "Usage examples:"
    echo "  ./deploy.sh build \"Fix overlapping panels\""
    echo "  ./deploy.sh patch \"Add new feature\""
    echo "  ./deploy.sh minor \"Major UI update\""
    echo "  ./deploy.sh major \"Breaking changes\""
else
    echo "❌ Push failed!"
    exit 1
fi
