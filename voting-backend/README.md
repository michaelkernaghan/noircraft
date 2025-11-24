# Private Voting Backend API

Backend API for the Private Voting DApp - connects the frontend to the Aztec blockchain.

## Features

- RESTful API for vote submission and retrieval
- CORS-enabled for frontend integration
- Demo mode for testing without blockchain
- Production mode with Aztec SDK integration (coming soon)
- In-memory storage for demo mode
- Health check endpoint for monitoring

## API Endpoints

### Health Check
```
GET /api/health
```
Returns server status and configuration.

### Submit Vote
```
POST /api/vote
Content-Type: application/json

{
  "proposal_id": 1,
  "nullifier": "0x...",
  "commitment": "0x...",
  "proof": {
    "proof": "0x...",
    "publicInputs": [...]
  }
}
```
Submits a vote to the blockchain. Returns transaction hash.

### Check Voting Status
```
GET /api/has-voted/:nullifier
```
Checks if a nullifier has been used (i.e., if the user has already voted).

### Get Results
```
GET /api/results/:proposalId
```
Returns voting results for a specific proposal.

### Get Proposals
```
GET /api/proposals
```
Returns all available proposals.

### Reset Demo (Dev Only)
```
POST /api/reset
```
Clears all demo data. Only available in development mode.

## Quick Start

### Local Development

```bash
# Install dependencies
npm install

# Copy environment variables
cp .env.example .env

# Start server
npm start

# Or use nodemon for development
npm run dev
```

Server runs on `http://localhost:3000` by default.

### Test the API

```bash
# Health check
curl http://localhost:3000/api/health

# Submit a vote
curl -X POST http://localhost:3000/api/vote \
  -H "Content-Type: application/json" \
  -d '{
    "proposal_id": 1,
    "nullifier": "0x123...",
    "commitment": "0x456...",
    "proof": {"proof": "0x789...", "publicInputs": []}
  }'

# Check if voted
curl http://localhost:3000/api/has-voted/0x123...

# Get results
curl http://localhost:3000/api/results/1
```

## Deploy to Railway

### Method 1: Railway CLI

```bash
# Install Railway CLI
npm install -g @railway/cli

# Login
railway login

# Initialize project
railway init

# Deploy
railway up

# Set environment variables
railway variables set FRONTEND_URL=https://your-site.netlify.app
railway variables set MODE=production
railway variables set AZTEC_NETWORK=testnet
```

### Method 2: GitHub Integration

1. Push this code to GitHub
2. Go to [Railway.app](https://railway.app)
3. Click "New Project" → "Deploy from GitHub repo"
4. Select your repository
5. Railway will auto-detect Node.js and deploy
6. Set environment variables in Railway dashboard:
   - `FRONTEND_URL`: Your Netlify URL
   - `MODE`: `production` or `development`
   - `AZTEC_NETWORK`: `testnet` or `mainnet`
   - `CONTRACT_ADDRESS`: Your deployed contract address

### Method 3: Deploy Button

[![Deploy on Railway](https://railway.app/button.svg)](https://railway.app/new/template)

## Deploy to Render

1. Push code to GitHub
2. Go to [Render.com](https://render.com)
3. New Web Service → Connect GitHub
4. Configure:
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
5. Add environment variables (same as Railway)

## Deploy to Vercel

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel

# Set environment variables
vercel env add FRONTEND_URL
vercel env add MODE
vercel env add AZTEC_NETWORK
```

## Environment Variables

Required variables:

- `PORT`: Server port (default: 3000)
- `FRONTEND_URL`: Your frontend URL for CORS
- `MODE`: `development` or `production`
- `AZTEC_NETWORK`: `testnet` or `mainnet`

Optional for production:

- `CONTRACT_ADDRESS`: Deployed smart contract address
- `AZTEC_RPC_URL`: Aztec RPC endpoint
- `PRIVATE_KEY`: Wallet private key for transactions

See [.env.example](.env.example) for full configuration.

## Connecting Frontend

Update your frontend's `voting.js`:

```javascript
const CONFIG = {
    apiUrl: 'https://your-backend.railway.app/api',
    explorerUrl: 'https://explorer.aztec.network/tx/'
};

// Use production code instead of demo mode
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

## Architecture

```
Frontend (Netlify)
        ↓
    API Server (Railway)
        ↓
    Aztec Network
```

Demo mode: API stores votes in memory
Production mode: API submits to Aztec blockchain

## Production Checklist

- [ ] Backend deployed to Railway/Render
- [ ] Environment variables configured
- [ ] Frontend URL added to CORS
- [ ] Smart contract deployed to Aztec
- [ ] Contract address set in env vars
- [ ] Test vote submission works
- [ ] Monitor API logs for errors

## Monitoring

### Railway
- View logs in Railway dashboard
- Monitor CPU/memory usage
- Set up alerts for downtime

### Health Check
```bash
# Check if server is responding
curl https://your-backend.railway.app/api/health
```

## Troubleshooting

### CORS Errors
Ensure `FRONTEND_URL` is set correctly in environment variables.

### 500 Errors
Check Railway logs:
```bash
railway logs
```

### Connection Refused
- Verify server is running
- Check PORT is set correctly
- Ensure Railway deployment succeeded

## Cost Estimates

| Platform | Free Tier | Paid |
|----------|-----------|------|
| Railway  | 500 hrs/mo | $5/mo |
| Render   | 750 hrs/mo | $7/mo |
| Vercel   | 100GB bandwidth | $20/mo |

Free tiers are sufficient for testing and small deployments.

## Next Steps

1. Deploy backend to Railway
2. Update frontend CONFIG with backend URL
3. Test end-to-end voting flow
4. Deploy smart contract to Aztec testnet
5. Integrate Aztec SDK for production mode
6. Add database for persistent storage

## Resources

- [Railway Docs](https://docs.railway.app/)
- [Aztec SDK](https://docs.aztec.network/)
- [Express.js Guide](https://expressjs.com/)
- [CORS Configuration](https://expressjs.com/en/resources/middleware/cors.html)

## License

MIT
