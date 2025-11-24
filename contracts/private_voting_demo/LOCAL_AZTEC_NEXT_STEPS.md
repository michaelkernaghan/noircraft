# Next Steps: Deploy to Local Aztec Sandbox

## Current Status ✅

- ✅ Aztec CLI installed on Beelink
- ✅ Aztec sandbox running on Beelink (port 8081)
- ✅ 3 test accounts created and funded
- ✅ Noir contract compiled

## Aztec Sandbox Info

**Sandbox URL:** `http://192.168.10.64:8081`

**Test Account #1:**
- Address: `0x2735b31fb4c6dc2f407bc468669a7edb40a580626f06c4c4e1bfacbae4e9d24a`
- Secret Key: `0x2153536ff6628eee01cf4024889ff977a18d9fa61d0e414422f7681cf085c281`

## Next: Deploy Contract

SSH to Beelink and run:

```bash
cd ~/noircraft/contracts/private_voting_demo

# Set PXE URL to local sandbox
export PXE_URL=http://localhost:8081

# Deploy the contract
export PATH=$HOME/.aztec/bin:$PATH
aztec-cli deploy target/private_voting_demo.json \
  --rpc-url http://localhost:8081

# Save the contract address that gets returned!
```

## Then: Update Frontend

In `dapp-template/voting.js`, change CONFIG to:

```javascript
const CONFIG = {
    mode: 'local-aztec',
    aztecRpcUrl: 'http://192.168.10.64:8081',
    contractAddress: '<YOUR_DEPLOYED_CONTRACT_ADDRESS>',
    explorerUrl: 'http://192.168.10.64:8081/explorer/'
};
```

## Test Locally

```bash
cd dapp-template
# Stop the current server (Ctrl+C on the background process)
npx serve -l 8000 .
```

Open `http://localhost:8000` and vote!

## Important Notes

- Sandbox is running in background on Beelink
- Frontend must run on your PC (localhost:8000)
- PC can reach Beelink at 192.168.10.64:8081
- This is LOCAL ONLY - not accessible from Netlify

## If Sandbox Stops

```bash
ssh 192.168.10.64
export PATH=$HOME/.aztec/bin:$PATH
aztec start --sandbox --port 8081
```

## Resources

- Sandbox logs: Check background process fa8b2d
- Contract artifact: `~/noircraft/contracts/private_voting_demo/target/private_voting_demo.json`
