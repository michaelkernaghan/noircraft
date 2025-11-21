# 🚀 Deploy to Netlify - Simple Steps

## ✨ Easiest Method: Drag & Drop (2 Minutes!)

### Step 1: Go to Netlify Drop

Visit: **https://app.netlify.com/drop**

### Step 2: Drag This Folder

Drag the entire `dapp-template` folder onto the page

### Step 3: Done!

Your site is live! You'll get a URL like:
`https://random-name-12345.netlify.app`

### Step 4: Rename (Optional)

Click "Site settings" → "Change site name" → Choose a better name:
- `noircraft-voting`
- `private-voting-demo`
- `noir-vote`

---

## 🎯 Alternative: Deploy from GitHub

### Step 1: Go to Netlify

Visit: **https://app.netlify.com**

### Step 2: New Site from Git

1. Click "Add new site" → "Import an existing project"
2. Choose "GitHub"
3. Select: `michaelkernaghan/noircraft`
4. Configure settings:

```
Base directory: contracts/private_voting_demo/dapp-template
Build command: (leave empty)
Publish directory: .
```

5. Click "Deploy site"

### Step 3: Wait ~1 minute

Your site will be live!

---

## 📱 Your Live Demo URL

Once deployed, you'll have a shareable link like:

**https://noircraft-voting.netlify.app**

You can:
- ✅ Share with anyone
- ✅ Test with MetaMask (works on https://)
- ✅ Use on mobile devices
- ✅ Demo at presentations

---

## 🔧 Custom Domain (Optional)

Want your own domain like `vote.noircraft.io`?

1. In Netlify dashboard → Domain settings
2. Add custom domain
3. Update DNS (Netlify provides instructions)
4. Done!

---

## ✅ What's Deployed

Your live demo includes:
- ✅ Beautiful voting interface
- ✅ MetaMask wallet connection
- ✅ Vote Yes/No functionality
- ✅ Zero-knowledge proof simulation
- ✅ Mobile responsive design
- ✅ HTTPS automatically

---

## 🎉 Share Your Demo!

Once live, share it:

```
🗳️ Check out my private voting demo!

https://noircraft-voting.netlify.app

Vote privately with zero-knowledge proofs
Built with Noir & Aztec
Try voting - your vote stays completely private!

#ZeroKnowledge #Privacy #Web3 #Noir #Aztec
```

---

## 🐛 Troubleshooting

### Can't drag & drop?
- Make sure you're logged into Netlify
- Try the GitHub method instead
- Use modern browser (Chrome/Firefox)

### Deploy failed?
- Check `netlify.toml` exists in folder
- Ensure all files are in the folder
- Try manual deploy from Netlify dashboard

### MetaMask not working?
- Should work automatically on https://
- Check browser console for errors
- Make sure popup blockers are disabled

---

**Deployment literally takes 2 minutes!** 🚀

Just drag the folder to https://app.netlify.com/drop and you're done!
