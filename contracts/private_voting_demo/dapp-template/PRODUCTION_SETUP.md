# 🚀 Production Setup: Netlify + Aztec Network

Guide to connect your voting DApp to the real Aztec blockchain.

---

## 🎯 Architecture Options

### Option 1: Frontend Only (Client-Side)

```
User Browser
    ↓
Netlify (Static Files)
    ↓
Aztec SDK in Browser
    ↓
Aztec Network
```

**Best for:** Simple demos, educational projects

### Option 2: Frontend + Backend (Recommended)

```
User Browser
    ↓
Netlify (Static Files)
    ↓
Backend API (Railway/Render)
    ↓
Aztec Network
```

**Best for:** Production apps, better UX

---

## 🔧 Option 1: Client-Side Setup

### Step 1: Install Aztec SDK

```bash
cd dapp-template
npm init -y
npm install @aztec/sdk @aztec/accounts
```

### Step 2: Update voting.js

```javascript
// Add at top of voting.js
import { createAztecClient } from '@aztec/sdk';
import { AccountWallet } from '@aztec/accounts';

// Update CONFIG
const CONFIG = {
    mode: 'testnet', // or 'mainnet'
    aztecRpcUrl: 'https://api.aztec.network',
    explorerUrl: 'https://explorer.aztec.network/tx/'
};

// Connect to Aztec
let aztecClient = null;

async function connectAztec() {
    if (!aztecClient) {
        aztecClient = await createAztecClient({
            rpcUrl: CONFIG.aztecRpcUrl
        });
    }
    return aztecClient;
}

// Update submitVote function
async function submitVote(voteData) {
    const client = await connectAztec();

    // Get user's wallet
    const wallet = await AccountWallet.fromMetaMask(client);

    // Submit transaction
    const tx = await wallet.sendTransaction({
        to: CONTRACT_ADDRESS,
        data: encodeVoteData(voteData)
    });

    await tx.wait();

    return {
        success: true,
        txHash: tx.hash
    };
}
```

### Step 3: Build for Netlify

```bash
# Install build tools
npm install --save-dev webpack webpack-cli

# Create webpack.config.js
# (configuration for bundling)

# Build
npm run build

# Deploy to Netlify
netlify deploy --prod --dir=dist
```

---

## 🔧 Option 2: Backend API Setup

### Step 1: Create Backend

```bash
# Create new folder
mkdir voting-backend
cd voting-backend

# Initialize
npm init -y

# Install dependencies
npm install express cors @aztec/sdk dotenv
```

### Step 2: Create server.js

```javascript
// server.js
const express = require('express');
const cors = require('cors');
const { createAztecClient } = require('@aztec/sdk');

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;
const AZTEC_RPC_URL = process.env.AZTEC_RPC_URL;
const PRIVATE_KEY = process.env.PRIVATE_KEY;

// Initialize Aztec client
let aztecClient;

async function initAztec() {
    aztecClient = await createAztecClient({
        rpcUrl: AZTEC_RPC_URL
    });
}

// Submit vote endpoint
app.post('/api/vote', async (req, res) => {
    try {
        const { proposal_id, nullifier, commitment, proof } = req.body;

        // Verify proof
        const isValid = await verifyProof(proof);
        if (!isValid) {
            return res.status(400).json({ error: 'Invalid proof' });
        }

        // Submit to Aztec
        const tx = await submitToAztec({
            proposal_id,
            nullifier,
            commitment,
            proof
        });

        res.json({
            success: true,
            txHash: tx.hash
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Has voted endpoint
app.get('/api/has-voted/:nullifier', async (req, res) => {
    try {
        const { nullifier } = req.params;
        const hasVoted = await checkNullifier(nullifier);
        res.json({ hasVoted });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Start server
initAztec().then(() => {
    app.listen(PORT, () => {
        console.log(`API running on port ${PORT}`);
    });
});
```

### Step 3: Deploy Backend

**Railway:**
```bash
# Install Railway CLI
npm install -g @railway/cli

# Login and deploy
railway login
railway init
railway up
```

**Render:**
```bash
# Push to GitHub
git push

# In Render dashboard:
# 1. New Web Service
# 2. Connect GitHub repo
# 3. Set environment variables
# 4. Deploy
```

**Vercel:**
```bash
npm install -g vercel
vercel
```

### Step 4: Update Frontend

```javascript
// Update CONFIG in voting.js
const CONFIG = {
    apiUrl: 'https://your-backend.railway.app/api',
    explorerUrl: 'https://explorer.aztec.network/tx/'
};

// Uncomment production code in submitVote function
async function submitVote(voteData) {
    const response = await fetch(`${CONFIG.apiUrl}/vote`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(voteData)
    });

    if (!response.ok) {
        throw new Error('Failed to submit vote');
    }

    return await response.json();
}
```

---

## 🔑 Environment Variables

### Backend (.env)

```bash
# Aztec Network
AZTEC_RPC_URL=https://api.aztec.network
AZTEC_NETWORK=testnet

# Deployment wallet
PRIVATE_KEY=your_private_key_here

# Contract
CONTRACT_ADDRESS=your_contract_address_here

# Server
PORT=3000
NODE_ENV=production
```

### Frontend (Netlify)

```bash
# Build settings
VITE_API_URL=https://your-backend.railway.app/api
VITE_MODE=production
```

---

## ⚡ Quick Deploy Checklist

### Frontend (Netlify)
- [ ] Push code to GitHub
- [ ] Connect Netlify to repo
- [ ] Set base directory: `contracts/private_voting_demo/dapp-template`
- [ ] Deploy!

### Backend (Railway)
- [ ] Create Railway account
- [ ] Deploy from GitHub
- [ ] Set environment variables
- [ ] Get API URL

### Connect Them
- [ ] Update `CONFIG.apiUrl` in voting.js
- [ ] Redeploy frontend
- [ ] Test with testnet

---

## 🧪 Testing

### Testnet Testing

```bash
# Get testnet funds
# Visit: https://faucet.aztec.network

# Test vote submission
curl -X POST https://your-api.com/api/vote \
  -H "Content-Type: application/json" \
  -d '{
    "proposal_id": 1,
    "nullifier": "0x...",
    "commitment": "0x...",
    "proof": "0x..."
  }'
```

### Local Testing

```bash
# Run backend locally
cd voting-backend
npm start

# Update frontend CONFIG
apiUrl: 'http://localhost:3000/api'

# Run frontend
cd dapp-template
npx serve .
```

---

## 💰 Cost Estimates

| Service | Free Tier | Paid |
|---------|-----------|------|
| **Netlify** | 100GB bandwidth | $19/mo unlimited |
| **Railway** | 500 hrs/mo | $5/mo |
| **Render** | 750 hrs/mo | $7/mo |
| **Vercel** | 100GB bandwidth | $20/mo |
| **Aztec Testnet** | Free! | N/A |
| **Aztec Mainnet** | Gas fees | ~$0.10/tx |

---

## 🐛 Common Issues

### CORS Errors

Add to backend:
```javascript
app.use(cors({
    origin: 'https://your-site.netlify.app',
    credentials: true
}));
```

### RPC Connection Failed

Check:
- Aztec RPC URL is correct
- Network (testnet/mainnet) matches
- Firewall not blocking requests

### Proof Verification Failed

Ensure:
- Noir version matches deployment
- Proof format is correct
- Public inputs are properly encoded

---

## 📚 Additional Resources

- [Aztec SDK Docs](https://docs.aztec.network/developers/getting_started)
- [Noir.js Guide](https://noir-lang.org/docs/noir_js/getting_started/01_tiny_noir_app)
- [Railway Docs](https://docs.railway.app/)
- [Netlify Functions](https://docs.netlify.com/functions/overview/)

---

## ✅ Production Checklist

- [ ] Smart contract deployed to Aztec
- [ ] Backend API deployed and working
- [ ] Frontend deployed to Netlify
- [ ] Environment variables set
- [ ] CORS configured properly
- [ ] Testnet testing complete
- [ ] Gas estimation done
- [ ] Error handling in place
- [ ] Monitoring set up
- [ ] Security audit completed

---

**Choose your approach and follow the guide above!** 🚀

For most use cases, **Option 2 (Frontend + Backend)** is recommended for better UX and security.
