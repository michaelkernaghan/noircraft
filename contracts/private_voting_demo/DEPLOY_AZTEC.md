# 🚀 Deploy to Aztec Testnet

This guide will help you deploy the private voting contract to the Aztec testnet.

## 📋 Prerequisites

Before deploying, ensure you have:

- ✅ Noir installed (`nargo --version`)
- ✅ Node.js 18+ installed (`node --version`)
- ✅ The contract compiled (`nargo compile`)
- ✅ Tests passing (`nargo test`)

---

## 🔧 Step 1: Install Aztec CLI

### Option A: Using NPM (Recommended)

```bash
npm install -g @aztec/cli
```

### Option B: Using npx (No installation)

```bash
# You can use npx to run aztec commands without installing globally
npx @aztec/cli --version
```

### Verify Installation

```bash
aztec-cli --version
# or
npx @aztec/cli --version
```

---

## 🌐 Step 2: Connect to Aztec Testnet

### Get Testnet Configuration

The Aztec testnet connection requires:
- **RPC URL**: Testnet node endpoint
- **Chain ID**: Aztec testnet chain ID
- **Wallet**: Your deployment wallet

### Set Up Environment Variables

Create a `.env` file in the contract directory:

```bash
# .env file
AZTEC_RPC_URL=https://api.aztec.network
PRIVATE_KEY=your_private_key_here
```

**⚠️ Security Warning**:
- Never commit your `.env` file
- Never share your private key
- Use a testnet wallet only

---

## 💰 Step 3: Get Testnet Funds

You'll need testnet ETH to deploy:

1. **Create a wallet** or use an existing one
2. **Get your address**: `aztec-cli get-wallet-address`
3. **Visit Aztec Faucet**: https://faucet.aztec.network
4. **Request testnet tokens**

### Verify Balance

```bash
aztec-cli get-balance --address YOUR_ADDRESS
```

---

## 🏗️ Step 4: Compile for Aztec

Our Noir contract needs to be compiled for Aztec:

```bash
cd contracts/private_voting_demo

# Compile the contract
nargo compile

# This creates: target/private_voting_demo.json
```

---

## 📤 Step 5: Deploy the Contract

### Basic Deployment

```bash
# Deploy to testnet
aztec-cli deploy \
  --contract-abi target/private_voting_demo.json \
  --private-key $PRIVATE_KEY \
  --rpc-url $AZTEC_RPC_URL
```

### With Constructor Arguments (if needed)

```bash
# If your contract had constructor parameters
aztec-cli deploy \
  --contract-abi target/private_voting_demo.json \
  --args '["arg1", "arg2"]' \
  --private-key $PRIVATE_KEY \
  --rpc-url $AZTEC_RPC_URL
```

### Expected Output

```
Deploying contract...
✓ Contract compiled
✓ Proof generated
✓ Transaction sent: 0x1234...5678
✓ Contract deployed at: 0xabcd...ef01

Contract Address: 0xabcdef0123456789abcdef0123456789abcdef01
Transaction Hash: 0x1234567890abcdef1234567890abcdef12345678
Block Number: 12345

Deployment successful! 🎉
```

---

## 🧪 Step 6: Interact with Deployed Contract

### Cast a Vote

```bash
# Submit a private vote
aztec-cli send \
  --contract-address YOUR_CONTRACT_ADDRESS \
  --function "main" \
  --args '["1", "12345", "1", "0x...", "0x..."]' \
  --private-key $PRIVATE_KEY
```

### Verify Vote was Recorded

```bash
# Query public state
aztec-cli call \
  --contract-address YOUR_CONTRACT_ADDRESS \
  --function "get_vote_count" \
  --args '["1"]'
```

---

## 📊 Step 7: Verify Deployment

### Check Contract Status

Visit Aztec testnet explorer:
**https://explorer.aztec.network**

Search for your contract address to see:
- ✅ Deployment transaction
- ✅ Contract bytecode
- ✅ Transaction history
- ✅ Public state

---

## 🔍 Advanced: Deploy Script

Create an automated deployment script:

```javascript
// deploy.js
const { createAztecClient, deployContract } = require('@aztec/sdk');

async function deploy() {
  // Connect to Aztec
  const client = await createAztecClient({
    rpcUrl: process.env.AZTEC_RPC_URL,
    privateKey: process.env.PRIVATE_KEY
  });

  // Read compiled contract
  const contractAbi = require('./target/private_voting_demo.json');

  // Deploy
  console.log('Deploying contract...');
  const contract = await deployContract(client, contractAbi);

  console.log(`✅ Contract deployed at: ${contract.address}`);
  console.log(`📋 Transaction: ${contract.deployTxHash}`);

  return contract;
}

deploy()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
```

Run with:
```bash
node deploy.js
```

---

## 🎯 Complete Deployment Workflow

### Full End-to-End Example

```bash
# 1. Install dependencies
npm install -g @aztec/cli

# 2. Compile contract
cd contracts/private_voting_demo
nargo compile

# 3. Test contract
nargo test

# 4. Get testnet funds
# Visit: https://faucet.aztec.network

# 5. Deploy
aztec-cli deploy \
  --contract-abi target/private_voting_demo.json \
  --private-key $PRIVATE_KEY \
  --rpc-url https://api.aztec.network

# 6. Verify on explorer
# Visit: https://explorer.aztec.network

# 7. Interact with contract
aztec-cli send \
  --contract-address YOUR_ADDRESS \
  --function "main" \
  --args '["1", "12345", "1", "0x...", "0x..."]' \
  --private-key $PRIVATE_KEY
```

---

## 🛡️ Security Best Practices

### Before Deployment

1. **Audit the contract**: Review all code carefully
2. **Test thoroughly**: Run all tests multiple times
3. **Use testnet first**: Never deploy unaudited contracts to mainnet
4. **Document everything**: Keep deployment logs

### During Deployment

1. **Use dedicated wallet**: Separate deployment wallet from main funds
2. **Verify addresses**: Double-check all addresses before confirming
3. **Save credentials**: Store contract address and tx hash safely
4. **Monitor transactions**: Watch deployment complete on explorer

### After Deployment

1. **Verify contract**: Check contract on explorer
2. **Test interactions**: Send test transactions
3. **Monitor gas costs**: Track deployment and interaction costs
4. **Document deployment**: Save all addresses and hashes

---

## 💡 Cost Estimation

Typical costs for deploying this contract on Aztec testnet:

| Operation | Estimated Cost | Time |
|-----------|---------------|------|
| Deployment | ~0.001 ETH | ~30s |
| Vote Submission | ~0.0002 ETH | ~15s |
| Vote Verification | Free (read-only) | <1s |

**Note**: Testnet costs are estimates and may vary. Mainnet costs will differ.

---

## 🐛 Troubleshooting

### "Connection refused"
- **Check**: Aztec RPC URL is correct
- **Try**: Different RPC endpoint
- **Verify**: Network is accessible

### "Insufficient funds"
- **Check**: Wallet has testnet ETH
- **Visit**: Faucet to get more funds
- **Verify**: Balance with `aztec-cli get-balance`

### "Contract deployment failed"
- **Check**: Contract compiles without errors
- **Verify**: All tests pass
- **Review**: Deployment logs for specific error

### "Invalid private key"
- **Check**: Private key format (no 0x prefix)
- **Verify**: Key corresponds to funded wallet
- **Ensure**: Key has correct permissions

---

## 📚 Additional Resources

### Official Documentation
- [Aztec Network Docs](https://docs.aztec.network)
- [Aztec CLI Reference](https://docs.aztec.network/cli)
- [Noir on Aztec](https://docs.aztec.network/noir)

### Testnet Resources
- [Aztec Testnet Explorer](https://explorer.aztec.network)
- [Aztec Testnet Faucet](https://faucet.aztec.network)
- [Aztec Status Page](https://status.aztec.network)

### Community
- [Aztec Discord](https://discord.gg/aztec)
- [Aztec Forum](https://discourse.aztec.network)
- [Aztec GitHub](https://github.com/AztecProtocol)

---

## 🎉 Next Steps After Deployment

1. **Build a Frontend**: Create a web interface for voting
2. **Add Features**: Multiple proposals, vote delegation, etc.
3. **Monitor Usage**: Track votes and gas costs
4. **Share**: Show your deployed contract to the community!
5. **Mainnet**: After thorough testing, consider mainnet deployment

---

## ⚠️ Important Notes

1. **Testnet Only**: This guide is for testnet deployment only
2. **No Real Value**: Testnet tokens have no real-world value
3. **Audits Required**: Always audit before mainnet deployment
4. **Gas Costs**: Real mainnet deployment will cost real ETH
5. **Security**: Never share private keys or deploy unaudited code to mainnet

---

**Ready to deploy? Start with Step 1 above!** 🚀

Need help? Check [README.md](README.md) or ask on [Discord](https://discord.gg/aztec)!
