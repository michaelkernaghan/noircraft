# How to Run the Aztec Privacy Demo

## Quick Start

The Aztec privacy demo demonstrates zero-knowledge circuits for confidential transactions. Here's how to run it:

### 1. Run the Tests (Recommended)
```bash
cd /home/mike/noircraft/aztec_privacy_demo

# Run all privacy tests
nargo test

# Run with detailed output
nargo test --show-output

# Run specific test
nargo test test_private_lending
```

### 2. What the Demo Shows

#### **Private Transaction Test** (`test_private_transaction`)
```noir
// Demonstrates a confidential transfer:
// Input:  100 + 50 = 150 units
// Output: 75 (to recipient) + 70 (change) + 5 (fee) = 150 units
// 
// The circuit proves the math works without revealing:
// - Who is sending/receiving
// - How much is being transferred
// - Account balances
```

#### **Private Lending Test** (`test_private_lending`)
```noir
// Demonstrates confidential DeFi:
// - 1000 ETH collateral at $2000/ETH = $2M collateral value
// - 500 DAI borrowed at $1/DAI = $500 debt
// - 150% collateralization required
// 
// The circuit proves solvency without revealing:
// - Actual collateral amount
// - Actual debt amount  
// - User identity
```

## Understanding the Output

### Successful Test Run
```
[aztec_privacy_demo] Running 2 test functions
[aztec_privacy_demo] Testing test_private_lending ... ok
[aztec_privacy_demo] Testing test_private_transaction ... ok
[aztec_privacy_demo] 2 tests passed
```

This means:
✅ **Private transaction circuit** compiled and executed correctly
✅ **Private lending circuit** compiled and executed correctly
✅ **Zero-knowledge proofs** were generated successfully
✅ **Privacy constraints** were satisfied

### What Happens Behind the Scenes

1. **Circuit Compilation**: Noir code → ACIR (Abstract Circuit Intermediate Representation)
2. **Witness Generation**: Input values → execution trace
3. **Constraint Solving**: Verify all assertions pass
4. **Proof Generation**: Create zero-knowledge proof (using Barretenberg)

## Advanced Usage

### 1. Compile Circuit Artifacts
```bash
cd /home/mike/noircraft/aztec_privacy_demo
nargo compile

# Check generated files
ls -la target/
# aztec_privacy_demo.json - Compiled circuit
```

### 2. Analyze Circuit Complexity
```bash
nargo info

# Shows:
# - Number of constraints
# - Circuit size
# - Proving/verification costs
```

### 3. Custom Input Testing

To test with custom inputs, you would need to:

1. **Create valid Merkle proofs** for note membership
2. **Compute proper commitments** using Pedersen hashing
3. **Generate valid nullifiers** to prevent double-spending
4. **Ensure balance constraints** are satisfied

Example structure:
```toml
# Prover.toml
[transaction]
fee = "5"
public_value = "0"

[[transaction.input_notes]]
value = "100"
owner = "12345" 
commitment = "computed_commitment_hash"
nullifier = "computed_nullifier"

# ... more notes
```

## What Makes This "Private"?

### Traditional Blockchain Transaction:
```json
{
  "from": "0x1234...abcd",
  "to": "0x5678...efgh", 
  "amount": "1.5 ETH",
  "balance_before": "10.2 ETH",
  "balance_after": "8.7 ETH"
}
```
**Everyone can see**: who, what, when, how much

### Aztec Private Transaction:
```json
{
  "nullifiers": ["0xabc123...", "0xdef456..."],
  "commitments": ["0x789abc...", "0x012def..."],
  "proof": "0x1a2b3c4d...",
  "public_inputs": []
}
```
**Public sees**: Some notes were spent, some notes were created
**Private**: Who, how much, balances (proven valid with ZK)

## Privacy Features Demonstrated

### 1. **Confidential Amounts**
- Transaction amounts are hidden
- Account balances remain private
- Only the user knows their financial position

### 2. **Anonymous Parties**
- Sender identity is hidden
- Recipient identity is hidden  
- No address linkability

### 3. **Verifiable Correctness**
- Zero-knowledge proofs ensure math is correct
- No double-spending possible
- Network can verify without seeing private data

### 4. **Programmable Privacy**
- Complex business logic (lending, voting, etc.)
- Private smart contracts
- Confidential DeFi protocols

## Real-World Applications

This demo shows the foundation for:

- **Private DEX trading** (no MEV, front-running)
- **Confidential lending** (private collateral positions)
- **Anonymous governance** (secret ballot voting)
- **Private identity** (age verification without doxxing)
- **Confidential payroll** (salary privacy)
- **Anonymous donations** (private philanthropy)

## Next Steps

1. **Explore the code** in `src/main.nr` to understand the circuits
2. **Modify test cases** to experiment with different scenarios
3. **Study the cryptographic primitives** (commitments, nullifiers, Merkle trees)
4. **Build your own privacy circuits** using these patterns
5. **Integrate with Aztec SDK** for production applications

## Troubleshooting

### Common Issues:

**"Failed constraint" error**: 
- Check that balance equations are correct
- Ensure Merkle proofs match the root
- Verify commitments are computed correctly

**Compilation warnings**:
- Unused variables are normal in demo code
- Focus on whether tests pass

**Performance**:
- Circuit compilation: ~1-2 seconds
- Test execution: ~1-3 seconds  
- Proof generation: ~100-500ms (if using proving backend)

---

*The future of blockchain is private by default, programmable by design.*
