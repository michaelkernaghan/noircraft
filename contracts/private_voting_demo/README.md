# 🗳️ Private Voting Demo

A simple but powerful Noir contract demonstrating **anonymous voting** with zero-knowledge proofs on the Aztec network.

## 🎯 What This Contract Does

This contract enables **completely private voting** where:
- ✅ Votes are anonymous (no one knows who voted what)
- ✅ Votes are verifiable (cryptographically proven valid)
- ✅ Double voting is prevented (each voter can only vote once)
- ✅ Vote integrity is guaranteed (can't change vote after casting)

## 🧠 Key Concepts Demonstrated

### 1. **Private Inputs** (Hidden)
- `vote`: Your actual vote (0 = No, 1 = Yes)
- `voter_secret`: Your secret key

### 2. **Public Inputs** (Visible)
- `proposal_id`: Which proposal you're voting on
- `nullifier`: Unique identifier that prevents double voting
- `vote_commitment`: Cryptographic proof your vote is valid

### 3. **Zero-Knowledge Magic** ✨
The contract proves:
1. Your vote is valid (0 or 1)
2. You're authorized to vote (correct secret)
3. You haven't voted before (unique nullifier)
4. Your vote was recorded correctly (valid commitment)

**Without revealing:**
- Who you are
- How you voted
- Your secret key

## 🚀 How It Works

### Voting Process

```
┌─────────────┐
│   Voter     │
│  (Private)  │
└──────┬──────┘
       │
       │ 1. Choose vote (0 or 1)
       │ 2. Generate nullifier from secret
       │ 3. Create commitment
       ▼
┌─────────────────┐
│  Smart Contract │ ← Verifies without seeing vote!
│  (Zero-Knowledge)│
└─────────────────┘
       │
       ▼
┌─────────────────┐
│  Public Record  │ ← Only sees: nullifier + commitment
│  (Blockchain)   │   (Vote remains private!)
└─────────────────┘
```

### The Math (Simplified)

```
nullifier = hash(voter_secret + proposal_id)
commitment = hash(vote + voter_secret)
```

The blockchain stores nullifiers to prevent double voting, but can't reverse the hash to see who voted or how!

## 🛠️ Setup & Installation

### 1. Install Noir

```bash
# Install Noir compiler
curl -L https://raw.githubusercontent.com/noir-lang/noir/master/install.sh | bash

# Verify installation
nargo --version
```

### 2. Navigate to Contract

```bash
cd contracts/private_voting_demo
```

### 3. Run Tests

```bash
# Run all tests
nargo test

# Expected output:
# ✓ test_valid_vote_yes
# ✓ test_valid_vote_no
# ✓ test_vote_counting
# ✓ test_invalid_vote_value (should fail - and it does!)
# ✓ test_wrong_nullifier (should fail - and it does!)
```

### 4. Generate Proof

```bash
# Compile the circuit
nargo compile

# Generate a proof with example inputs
nargo prove

# Verify the proof
nargo verify
```

## 📝 Example Usage

### Scenario: Vote on Proposal #1

**Alice wants to vote "Yes" (1) privately:**

```javascript
// Alice's private data (never revealed)
const vote = 1;
const aliceSecret = 12345;
const proposalId = 1;

// Generate public data
const nullifier = hash([aliceSecret, proposalId]);
const commitment = hash([vote, aliceSecret]);

// Submit to blockchain (only public data)
await submitVote({
  proposalId,      // Public: which proposal
  nullifier,       // Public: prevents double voting
  commitment       // Public: proves vote is valid
  // vote is NEVER revealed!
});
```

**Bob wants to vote "No" (0) privately:**

```javascript
const vote = 0;
const bobSecret = 67890;
const proposalId = 1;

const nullifier = hash([bobSecret, proposalId]);
const commitment = hash([vote, bobSecret]);

await submitVote({
  proposalId,
  nullifier,
  commitment
});
```

## 🔬 Testing the Contract

The contract includes 5 comprehensive tests:

| Test | Purpose | Expected Result |
|------|---------|-----------------|
| `test_valid_vote_yes` | Verify Yes vote works | ✅ Pass |
| `test_valid_vote_no` | Verify No vote works | ✅ Pass |
| `test_vote_counting` | Verify tallying logic | ✅ Pass |
| `test_invalid_vote_value` | Reject invalid votes | ❌ Fail (intentional) |
| `test_wrong_nullifier` | Prevent double voting | ❌ Fail (intentional) |

## 🎓 Educational Value

This contract teaches:

1. **Nullifiers**: Preventing double-spending/voting
2. **Commitments**: Hiding data while proving correctness
3. **Hash Functions**: One-way cryptographic proofs
4. **Circuit Constraints**: Enforcing rules in zero-knowledge
5. **Public vs Private Inputs**: Information hiding

## 🚦 Next Steps

### Beginner
- Run the tests and see them pass
- Modify `Prover.toml` to try different votes
- Change the vote value to 2 and see the test fail

### Intermediate
- Add support for multiple proposals
- Implement weighted voting (different vote strengths)
- Add time-based voting windows

### Advanced
- Deploy to Aztec testnet
- Build a frontend voting interface
- Add vote delegation features
- Implement quadratic voting

## 🔐 Security Features

1. **Privacy**: Votes are never revealed on-chain
2. **Integrity**: Votes can't be changed after submission
3. **Uniqueness**: Each voter can only vote once per proposal
4. **Verifiability**: Anyone can verify votes are valid

## 📚 Additional Resources

- [Noir Language Documentation](https://noir-lang.org/docs)
- [Aztec Network Documentation](https://docs.aztec.network)
- [Zero-Knowledge Proofs Explained](https://z.cash/technology/zksnarks/)
- [Pedersen Hash Function](https://iden3-docs.readthedocs.io/en/latest/iden3_repos/research/publications/zkproof-standards-workshop-2/pedersen-hash/pedersen.html)

## 🤝 Real-World Applications

This contract pattern can be used for:

- 🏛️ **DAO Governance**: Private voting for decentralized organizations
- 🎯 **Polls & Surveys**: Anonymous feedback collection
- 🏆 **Award Voting**: Private nomination and voting
- 🎮 **Gaming**: Hidden strategy voting
- 💼 **Board Decisions**: Confidential corporate voting

## 🎉 Why This Matters

Traditional voting systems either:
- Show votes publicly (no privacy)
- Rely on trusted third parties (no trustlessness)

**This contract provides both privacy AND trustlessness!**

---

Built with ❤️ for the privacy-preserving future

*Part of the Noircraft educational series*
