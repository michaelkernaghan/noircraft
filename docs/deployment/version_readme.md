# 🚀 Noircraft Version Management

This project includes an automated version management system that updates the version number and build count with each deployment.

## 📋 Version Display

The version number is displayed in the footer of all pages:
- **Version**: Semantic version number (e.g., 1.0.0)
- **Build**: Incremental build number
- **Date**: Last update date

## 🛠️ Usage

### Quick Deploy (Recommended)
```bash
# Deploy with build increment and custom message
./deploy.sh build "Fix overlapping panels"

# Deploy with patch increment
./deploy.sh patch "Add new feature"

# Deploy with minor version bump
./deploy.sh minor "Major UI update"

# Deploy with major version bump
./deploy.sh major "Breaking changes"
```

### Manual Version Update
```bash
# Update version only (without git operations)
./update-version.sh build    # Increment build number only
./update-version.sh patch    # Increment patch version (1.0.0 -> 1.0.1)
./update-version.sh minor    # Increment minor version (1.0.0 -> 1.1.0)
./update-version.sh major    # Increment major version (1.0.0 -> 2.0.0)
```

## 📁 Files

- `version.json` - Version data storage
- `update-version.sh` - Version increment script
- `deploy.sh` - Complete deployment script
- `website/script.js` - JavaScript version loader

## 🔄 How It Works

1. **Version Storage**: `version.json` contains current version, build number, and last update date
2. **JavaScript Loading**: Pages dynamically load version info from JSON file
3. **Fallback**: HTML contains hardcoded version as backup
4. **Auto-Update**: Scripts automatically increment versions and update all files
5. **Git Integration**: Changes are automatically committed and pushed

## 📊 Version Scheme

- **Major** (X.0.0): Breaking changes, major releases
- **Minor** (1.X.0): New features, significant updates
- **Patch** (1.0.X): Bug fixes, small improvements
- **Build** (#): Incremental build counter (always increments)

## 🎨 Visual Design

The version display features:
- Gold-colored version badge with monospace font
- Blue build number highlighting
- Responsive design for mobile devices
- Consistent styling across all pages

## 🚦 Examples

```bash
# Current: v1.0.0 Build #5
./deploy.sh patch "Fix navigation bug"
# Result: v1.0.1 Build #6

# Current: v1.0.1 Build #6  
./deploy.sh minor "Add privacy page"
# Result: v1.1.0 Build #7

# Current: v1.1.0 Build #7
./deploy.sh build "Update styles"
# Result: v1.1.0 Build #8
```

## 🔧 Customization

To modify the version display:
1. Edit CSS in `styles.css` (`.version-info` section)
2. Update HTML structure in page footers
3. Modify JavaScript loader in `script.js`
4. Adjust script behavior in `update-version.sh`
