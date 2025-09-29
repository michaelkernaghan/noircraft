#!/bin/bash

# Noircraft Version Update Script
# This script automatically increments the build number and optionally the version

VERSION_FILE="version.json"

# Check if version.json exists
if [ ! -f "$VERSION_FILE" ]; then
    echo "❌ Error: $VERSION_FILE not found!"
    exit 1
fi

# Read current version data
CURRENT_VERSION=$(node -p "JSON.parse(require('fs').readFileSync('$VERSION_FILE', 'utf8')).version")
CURRENT_BUILD=$(node -p "JSON.parse(require('fs').readFileSync('$VERSION_FILE', 'utf8')).build")

# Increment build number
NEW_BUILD=$((CURRENT_BUILD + 1))

# Get current date
CURRENT_DATE=$(date +"%Y-%m-%d")

# Determine version increment type (default: patch)
INCREMENT_TYPE=${1:-"build"}

case $INCREMENT_TYPE in
    "major")
        # Increment major version (e.g., 1.0.0 -> 2.0.0)
        MAJOR=$(echo $CURRENT_VERSION | cut -d. -f1)
        NEW_MAJOR=$((MAJOR + 1))
        NEW_VERSION="$NEW_MAJOR.0.0"
        ;;
    "minor")
        # Increment minor version (e.g., 1.0.0 -> 1.1.0)
        MAJOR=$(echo $CURRENT_VERSION | cut -d. -f1)
        MINOR=$(echo $CURRENT_VERSION | cut -d. -f2)
        NEW_MINOR=$((MINOR + 1))
        NEW_VERSION="$MAJOR.$NEW_MINOR.0"
        ;;
    "patch")
        # Increment patch version (e.g., 1.0.0 -> 1.0.1)
        MAJOR=$(echo $CURRENT_VERSION | cut -d. -f1)
        MINOR=$(echo $CURRENT_VERSION | cut -d. -f2)
        PATCH=$(echo $CURRENT_VERSION | cut -d. -f3)
        NEW_PATCH=$((PATCH + 1))
        NEW_VERSION="$MAJOR.$MINOR.$NEW_PATCH"
        ;;
    "build")
        # Only increment build number, keep same version
        NEW_VERSION="$CURRENT_VERSION"
        ;;
    *)
        echo "❌ Invalid increment type. Use: major, minor, patch, or build"
        exit 1
        ;;
esac

# Create new version JSON
cat > $VERSION_FILE << EOF
{
  "version": "$NEW_VERSION",
  "build": $NEW_BUILD,
  "lastUpdated": "$CURRENT_DATE"
}
EOF

echo "🚀 Version updated!"
echo "   Previous: v$CURRENT_VERSION (Build #$CURRENT_BUILD)"
echo "   New:      v$NEW_VERSION (Build #$NEW_BUILD)"
echo "   Updated:  $CURRENT_DATE"

# Update the hardcoded version in index.html as fallback
sed -i "s/id=\"version-display\">[^<]*/id=\"version-display\">$NEW_VERSION/g" website/index.html
sed -i "s/id=\"build-number\">[^<]*/id=\"build-number\">$NEW_BUILD/g" website/index.html

echo "✅ HTML fallback versions updated"

# Add the updated files to git
git add $VERSION_FILE website/index.html

echo "📝 Files staged for commit"
