# Noircraft.io Deployment Guide

## 🚀 Netlify Deployment Instructions

Your Noircraft website is ready for deployment! Follow these steps:

### 1. Push to GitHub

```bash
# If you haven't added a remote yet:
git remote add origin https://github.com/yourusername/noircraft.git

# Push to GitHub:
git push -u origin main
```

### 2. Deploy to Netlify

#### Option A: Connect GitHub Repository
1. Go to [netlify.com](https://netlify.com) and sign in
2. Click "New site from Git"
3. Choose GitHub and authorize Netlify
4. Select your `noircraft` repository
5. Set these build settings:
   - **Base directory:** `website`
   - **Build command:** (leave empty - static site)
   - **Publish directory:** `website`
6. Click "Deploy site"

#### Option B: Drag & Drop Deployment
1. Go to [netlify.com](https://netlify.com)
2. Drag the entire `website/` folder to the deployment area
3. Your site will be live immediately!

### 3. Custom Domain (Optional)
1. In Netlify dashboard, go to "Domain settings"
2. Add custom domain: `noircraft.io`
3. Follow DNS configuration instructions

## 📁 Website Structure

```
website/
├── index.html              # Main page
├── styles.css              # WoW-inspired styling
├── script.js               # Interactive features
├── netlify.toml            # Netlify configuration
├── _redirects              # URL redirects
├── README.md               # Documentation
└── assets/
    ├── images/
    │   ├── noircraft-logo.png    # Your custom logo
    │   └── noircraft-title.png   # Your custom title
    ├── noir-midnight.jpg         # Hero section image
    └── example-contracts.js      # Noir contract templates
```

## ✅ Pre-deployment Checklist

- [x] Custom logo and title images integrated
- [x] All assets loading correctly (verified in localhost:9000)
- [x] Responsive design for mobile/desktop
- [x] Interactive animations working
- [x] Netlify configuration files added
- [x] Git repository initialized and committed
- [x] Production-ready file structure

## 🎮 Features Included

- **WoW-Inspired Design**: Dark fantasy aesthetic with gold accents
- **Custom Branding**: Your logo and title images with glow effects
- **5 Contract Templates**: 
  - Private Voting
  - Anonymous Auctions  
  - Private Assets
  - Identity Verification
  - Private DAO
- **Interactive Elements**: Particle effects, smooth animations
- **Responsive Design**: Works on all screen sizes
- **SEO Optimized**: Proper meta tags and structure

## 🔧 Technical Details

- **Framework**: Vanilla HTML/CSS/JavaScript (no build process)
- **Styling**: Custom CSS with CSS Grid and Flexbox
- **Animations**: CSS animations and JavaScript interactions
- **Fonts**: Google Fonts (Cinzel + Open Sans)
- **Performance**: Optimized images and minimal dependencies

## 🌐 Expected URLs

After deployment, your site will be available at:
- **Netlify URL**: `https://random-name-123.netlify.app`
- **Custom Domain**: `https://noircraft.io` (if configured)

## 📊 Performance

The website is optimized for fast loading:
- Minimal JavaScript dependencies
- Optimized images
- Cached assets
- Gzip compression (automatic on Netlify)

Your Noircraft website is production-ready! 🎉
