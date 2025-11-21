# 🚀 Deploy to Netlify

Quick guide to deploy this voting DApp to Netlify.

## 🎯 Method 1: Deploy via Netlify CLI (Easiest)

### Step 1: Install Netlify CLI

```bash
npm install -g netlify-cli
```

### Step 2: Deploy

```bash
# Navigate to dapp folder
cd contracts/private_voting_demo/dapp-template

# Deploy to Netlify
netlify deploy --prod

# Follow the prompts:
# - Authorize Netlify (opens browser)
# - Create new site or link existing
# - Publish directory: . (current directory)
```

### Step 3: Done!

You'll get a URL like: `https://noircraft-voting.netlify.app`

---

## 🌐 Method 2: Deploy via Netlify Web UI

### Step 1: Push to GitHub

```bash
# Already done! Your code is on GitHub
```

### Step 2: Connect to Netlify

1. Go to [netlify.com](https://netlify.com)
2. Click "Add new site" → "Import an existing project"
3. Choose "GitHub"
4. Select repository: `michaelkernaghan/noircraft`
5. Configure:
   - **Base directory**: `contracts/private_voting_demo/dapp-template`
   - **Build command**: (leave empty)
   - **Publish directory**: `.` (or leave as default)
6. Click "Deploy site"

### Step 3: Done!

Your site will be live at: `https://your-site-name.netlify.app`

---

## 🎨 Method 3: Drag & Drop (Super Easy!)

### Step 1: Prepare Folder

```bash
# Copy these files to a folder:
- index.html
- styles.css
- voting.js
- netlify.toml
- _redirects
```

### Step 2: Deploy

1. Go to [app.netlify.com/drop](https://app.netlify.com/drop)
2. Drag the folder onto the page
3. Done! Instant deployment

---

## 🔧 Custom Domain (Optional)

### Add Your Own Domain

1. In Netlify dashboard, go to "Domain settings"
2. Click "Add custom domain"
3. Enter your domain (e.g., `vote.noircraft.io`)
4. Follow DNS configuration instructions

---

## ✅ What You Get

- ✅ **Free hosting** on Netlify
- ✅ **HTTPS** automatically
- ✅ **Global CDN** for fast loading
- ✅ **Automatic deployments** from GitHub
- ✅ **Custom domain** support

---

## 📱 Share Your Demo

Once deployed, share your voting DApp:

```
🗳️ Try my private voting demo:
https://noircraft-voting.netlify.app

Built with Noir & Aztec
Vote privately with zero-knowledge proofs!
```

---

## 🐛 Troubleshooting

### Build fails?
- Make sure `netlify.toml` is in the folder
- Check base directory is correct
- Ensure all files are committed to Git

### MetaMask not working?
- Should work automatically on https://
- Check browser console for errors
- Make sure MetaMask extension is enabled

### Site not updating?
- Clear deploy cache in Netlify
- Push changes to GitHub
- Redeploy from Netlify dashboard

---

## 🎯 Next Steps

1. **Deploy to Netlify** (use any method above)
2. **Test with MetaMask** on the live URL
3. **Share with friends** to test voting
4. **Customize** the design/proposal
5. **Connect to real backend** (see IMPLEMENTATION.md)

---

**Deployment takes about 2 minutes!** 🚀
