# Deploy Voting Contract to Aztec Testnet

Step-by-step guide to deploy your private voting contract to the live Aztec testnet.

## Prerequisites

- SSH access to Beelink (192.168.10.64)
- Noir contract already compiled on Beelink
- Node.js 18+ installed

---

## Step 1: Install Aztec CLI

SSH to the Beelink and run:

```bash
# Install Aztec toolchain
bash -i <(curl -s https://install.aztec.network)

# Install latest testnet version (currently 2.1.4)
aztec-up -v latest

# Verify installation
aztec --version
```

This will install:
- Aztec CLI
- Aztec sandbox (local development)
- Required dependencies

---

## Step 2: Set Up Environment

```bash
# Set testnet RPC endpoint
export NODE_URL=https://aztec-testnet-fullnode.zkv.xyz

# Set sponsored FPC address (for testnet)
export SPONSORED_FPC_ADDRESS=0x299f255076aa461e4e94a843f0275303470a6b8ebe7cb44a471c66711151e529

# Optional: Add to ~/.bashrc to persist
echo 'export NODE_URL=https://aztec-testnet-fullnode.zkv.xyz' >> ~/.bashrc
echo 'export SPONSORED_FPC_ADDRESS=0x299f255076aa461e4e94a843f0275303470a6b8ebe7cb44a471c66711151e529' >> ~/.bashrc
```

---

## Step 3: Create Aztec Account

```bash
# Create a new Aztec account for testnet
aztec-wallet create-account

# This will output:
# - Account address
# - Private key (SAVE THIS SECURELY!)
# - Public key

# Set account as default
aztec-wallet set-default <YOUR_ACCOUNT_ADDRESS>

# Check balance (should be 0 initially)
aztec-wallet balance
```

**Important:** Save your private key securely! You'll need it to deploy contracts.

---

## Step 4: Compile Contract for Aztec

Navigate to your voting contract:

```bash
cd ~/noircraft/contracts/private_voting_demo

# Compile the contract
nargo compile

# This should create target/private_voting_demo.json
```

---

## Step 5: Deploy Contract to Testnet

```bash
# Deploy the contract
aztec-cli deploy \
  --contract-artifact target/private_voting_demo.json \
  --rpc-url $NODE_URL

# This will:
# 1. Upload contract to testnet
# 2. Generate contract address
# 3. Wait for deployment confirmation

# Save the contract address - you'll need it!
```

Expected output:
```
Contract deployed at: 0x...
Transaction hash: 0x...
```

---

## Step 6: Verify Deployment

```bash
# Check contract exists on testnet
aztec-cli get-contract-info \
  --contract-address <YOUR_CONTRACT_ADDRESS> \
  --rpc-url $NODE_URL

# Test calling the contract
aztec-cli call \
  --contract-address <YOUR_CONTRACT_ADDRESS> \
  --function-name "cast_vote" \
  --args "[1, 12345, 1]" \
  --rpc-url $NODE_URL
```

---

## Step 7: Update Frontend Configuration

Once deployed, update your frontend to use the real contract:

```javascript
// In voting.js
const CONFIG = {
    mode: 'production',
    aztecRpcUrl: 'https://aztec-testnet-fullnode.zkv.xyz',
    contractAddress: '0x...', // YOUR DEPLOYED CONTRACT ADDRESS
    explorerUrl: 'https://explorer.aztec.network/tx/'
};
```

---

## Step 8: Install Aztec SDK in Frontend

```bash
cd ~/noircraft/contracts/private_voting_demo/dapp-template

# Install Aztec.js for browser integration
npm init -y
npm install @aztec/aztec.js @aztec/accounts
```

Update `voting.js` to use Aztec SDK instead of demo mode:

```javascript
import { createAztecClient, AccountWallet } from '@aztec/aztec.js';

// Connect to testnet
const client = await createAztecClient({
    rpcUrl: 'https://aztec-testnet-fullnode.zkv.xyz'
});

// Connect user's wallet
const wallet = await AccountWallet.fromMetaMask(client);

// Submit vote
const tx = await wallet.sendTransaction({
    to: contractAddress,
    data: voteData
});

await tx.wait();
```

---

## Troubleshooting

### "Account has no funds"
The testnet uses a sponsored FPC (Fee Payment Contract). You shouldn't need funds for basic operations.

### "Contract not found"
Wait a few minutes after deployment - transactions can take time on testnet.

### "RPC connection failed"
Check that NODE_URL is set correctly:
```bash
echo $NODE_URL
```

### "Invalid proof"
Ensure your Noir version matches the Aztec testnet version:
```bash
nargo --version
aztec --version
```

---

## Useful Commands

```bash
# Check account info
aztec-wallet info

# List all accounts
aztec-wallet list-accounts

# Get transaction status
aztec-cli get-tx-receipt --tx-hash <TX_HASH> --rpc-url $NODE_URL

# View testnet explorer
# Visit: https://explorer.aztec.network
```

---

## Cost Estimates

**Aztec Testnet:**
- ✅ Free to use
- ✅ Transactions sponsored
- ✅ No gas fees required

**Aztec Mainnet (future):**
- Estimated ~$0.10 per transaction
- Subject to network congestion

---

## Next Steps After Deployment

1. ✅ Test voting from frontend
2. ✅ Verify transactions on explorer
3. ✅ Update Netlify deployment with new config
4. ✅ Share your live DApp!

---

## Resources

- **Aztec Testnet Docs:** https://docs.aztec.network/developers/getting_started_on_testnet
- **Aztec Explorer:** https://explorer.aztec.network
- **Aztec Discord:** https://discord.gg/aztec
- **RPC Endpoint:** https://aztec-testnet-fullnode.zkv.xyz

---

## Production Checklist

- [ ] Contract deployed to testnet
- [ ] Contract address saved
- [ ] Frontend updated with Aztec SDK
- [ ] Frontend CONFIG points to testnet
- [ ] End-to-end voting tested
- [ ] Transactions visible on explorer
- [ ] Netlify redeployed with updates

---

**Ready to deploy!** SSH to Beelink and follow the steps above.
