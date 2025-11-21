# 🎨 Private Voting DApp Template

A ready-to-use web interface for the private voting smart contract.

## 🚀 Quick Start

### Option 1: Run Locally

```bash
# Navigate to the template directory
cd dapp-template

# Serve the files (choose one method)
npx serve .
# or
python -m http.server 8000
# or
php -S localhost:8000

# Open in browser
# http://localhost:8000
```

### Option 2: Open Directly

Simply double-click `index.html` to open in your browser!

---

## 📁 Files Included

| File | Purpose |
|------|---------|
| `index.html` | Main web interface |
| `styles.css` | Beautiful UI styling |
| `voting.js` | Client-side logic |
| `README.md` | This file |

---

## ✨ Features

### User Interface
- ✅ Clean, modern design
- ✅ Responsive (works on mobile)
- ✅ WoW-inspired color scheme
- ✅ Smooth animations
- ✅ Clear status messages

### Functionality
- ✅ Connect wallet (MetaMask)
- ✅ Cast votes (Yes/No)
- ✅ Generate ZK proofs
- ✅ Submit to blockchain
- ✅ Prevent double voting
- ✅ View vote counts

### Privacy Features
- ✅ Vote never revealed
- ✅ Identity stays private
- ✅ Cryptographic security
- ✅ Zero-knowledge proofs

---

## 🔧 Configuration

Edit `voting.js` to configure:

```javascript
const CONFIG = {
    apiUrl: 'http://localhost:3000/api',  // Your backend API
    explorerUrl: 'https://explorer.aztec.network/tx/',  // Block explorer
    proposalId: 1  // Proposal ID
};
```

---

## 🌐 Current Mode: Demo

This template currently runs in **demo mode** with mock data:

- ✅ UI works perfectly
- ✅ Voting flow demonstrated
- ⚠️ No real blockchain interaction
- ⚠️ Proofs are mocked

### To Enable Production Mode:

1. **Deploy the backend** (see `../IMPLEMENTATION.md`)
2. **Deploy the contract** (see `../DEPLOY_AZTEC.md`)
3. **Update CONFIG** in `voting.js` with real API URL
4. **Uncomment production code** in `voting.js`
5. **Add Noir.js library** for real proof generation

---

## 📚 Integration Steps

### Step 1: Backend API

See `../IMPLEMENTATION.md` for complete backend setup:

```bash
# Install backend
cd ../backend
npm install
npm start
```

### Step 2: Update Configuration

```javascript
// voting.js
const CONFIG = {
    apiUrl: 'https://your-api.com/api',  // ← Your deployed API
    explorerUrl: 'https://explorer.aztec.network/tx/',
    proposalId: 1
};
```

### Step 3: Add Noir.js

```html
<!-- index.html -->
<script src="https://cdn.jsdelivr.net/npm/@noir-lang/noir_js@latest"></script>
```

### Step 4: Enable Real Proofs

In `voting.js`, replace mock functions with real implementations:

```javascript
// Use actual Noir.js for proof generation
import { Noir } from '@noir-lang/noir_js';

async function generateProof(inputs) {
    const noir = new Noir(contractPath);
    const proof = await noir.generateProof(inputs);
    return proof;
}
```

---

## 🎯 Customization

### Change Colors

Edit `styles.css`:

```css
body {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    /* Change to your colors */
}

.btn-yes {
    background: #4CAF50;  /* Change Yes button color */
}

.btn-no {
    background: #f44336;  /* Change No button color */
}
```

### Change Proposal

Edit `index.html`:

```html
<h3>Should we increase the community fund allocation by 20%?</h3>
<!-- Change to your proposal text -->
```

### Add More Proposals

Duplicate the `.proposal-card` section and update proposal IDs.

---

## 🚢 Deployment

### Deploy to Netlify

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Deploy
cd dapp-template
netlify deploy --prod
```

### Deploy to Vercel

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
cd dapp-template
vercel --prod
```

### Deploy to GitHub Pages

```bash
# Push to GitHub
git add dapp-template/
git commit -m "Add voting DApp"
git push

# Enable GitHub Pages in repository settings
# Select the /dapp-template folder
```

---

## 🔐 Security Notes

### Demo Mode (Current)
- ✅ Safe to use for testing
- ✅ No real transactions
- ✅ Data stored locally only

### Production Mode
- ⚠️ Never expose private keys in frontend
- ⚠️ Always use HTTPS
- ⚠️ Validate all inputs
- ⚠️ Implement rate limiting
- ⚠️ Audit smart contracts

---

## 🎓 Learning Resources

### Understand the Code
1. **Read** `voting.js` - See how voting works
2. **Modify** colors and text
3. **Test** the voting flow
4. **Deploy** your customized version

### Next Steps
1. **Backend**: Set up API (see `../IMPLEMENTATION.md`)
2. **Contract**: Deploy to Aztec (see `../DEPLOY_AZTEC.md`)
3. **Integration**: Connect frontend to backend
4. **Production**: Enable real proofs with Noir.js

---

## 📱 Screenshots

### Desktop View
Beautiful gradient background with centered voting interface

### Mobile View
Fully responsive design that works on any device

---

## 🤝 Support

- **Issues**: Check `../IMPLEMENTATION.md` for troubleshooting
- **Documentation**: See parent directory for full guides
- **Community**: Join [Noir Discord](https://discord.gg/noir)

---

## ✅ Checklist

- [x] UI Design
- [x] Voting Logic
- [x] Status Messages
- [x] Mobile Responsive
- [x] Demo Mode
- [ ] Backend Integration (see IMPLEMENTATION.md)
- [ ] Real Proof Generation (see IMPLEMENTATION.md)
- [ ] Production Deployment (see DEPLOY_AZTEC.md)

---

**This template gives you a beautiful, working UI in seconds!** 🎉

Just open `index.html` and start customizing!
