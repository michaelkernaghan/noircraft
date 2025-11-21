# 🏗️ Architecture & Flow

## System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                        VOTING SYSTEM                         │
└─────────────────────────────────────────────────────────────┘

┌──────────────┐
│   VOTER      │
│   (Alice)    │
└──────┬───────┘
       │
       │ Has:
       │ • Secret Key: 12345
       │ • Vote Choice: Yes (1)
       │
       ▼
┌──────────────────────────────────────────────────┐
│          CLIENT-SIDE (Private)                   │
├──────────────────────────────────────────────────┤
│                                                  │
│  1. Compute Nullifier:                          │
│     nullifier = hash(secret, proposal_id)       │
│     = hash(12345, 1)                            │
│     = 0x8a3f2e... (unique per voter/proposal)   │
│                                                  │
│  2. Compute Commitment:                         │
│     commitment = hash(vote, secret)             │
│     = hash(1, 12345)                            │
│     = 0x7b9c1d... (proves vote validity)        │
│                                                  │
│  3. Generate ZK Proof:                          │
│     Proves: "I know secret & vote that match    │
│             these public values"                 │
│                                                  │
└──────────────┬───────────────────────────────────┘
               │
               │ Submits to blockchain:
               │ • proposal_id (public)
               │ • nullifier (public)
               │ • commitment (public)
               │ • ZK proof (public)
               │
               │ NEVER submits:
               │ ✗ vote (private!)
               │ ✗ secret (private!)
               │
               ▼
┌──────────────────────────────────────────────────┐
│         AZTEC NETWORK (Public)                   │
├──────────────────────────────────────────────────┤
│                                                  │
│  Smart Contract Verifies:                       │
│                                                  │
│  ✓ Proof is mathematically valid                │
│  ✓ Vote is 0 or 1 (without seeing it!)         │
│  ✓ Nullifier matches secret                     │
│  ✓ Commitment matches vote                      │
│  ✓ Nullifier not used before (no double vote)  │
│                                                  │
│  Stores on blockchain:                          │
│  • Nullifier (to prevent double voting)         │
│  • Commitment (to verify later)                 │
│                                                  │
└──────────────┬───────────────────────────────────┘
               │
               ▼
┌──────────────────────────────────────────────────┐
│           PUBLIC RECORD                          │
├──────────────────────────────────────────────────┤
│                                                  │
│  Proposal #1 Votes:                             │
│  ├─ 0x8a3f2e... ✓ (Alice - identity hidden)    │
│  ├─ 0x5c7d1a... ✓ (Bob - identity hidden)      │
│  ├─ 0x3f9e4b... ✓ (Carol - identity hidden)    │
│  └─ ...                                         │
│                                                  │
│  Anyone can verify votes are valid              │
│  Nobody can see who voted or how                │
│                                                  │
└──────────────────────────────────────────────────┘
```

## Data Flow

### 1. Private Inputs (Voter's Device Only)

```
┌─────────────────┐
│  vote = 1       │ ← Only voter knows this
│  secret = 12345 │ ← Only voter knows this
└─────────────────┘
        │
        │ Hash Functions (One-Way!)
        ▼
```

### 2. Public Outputs (On Blockchain)

```
┌──────────────────────────────────┐
│  nullifier = 0x8a3f2e...         │ ← Everyone sees this
│  commitment = 0x7b9c1d...        │ ← Everyone sees this
│  proposal_id = 1                 │ ← Everyone sees this
└──────────────────────────────────┘
```

### 3. Zero-Knowledge Magic ✨

```
           ┌──────────────────┐
           │  ZK SNARK Proof  │
           └────────┬─────────┘
                    │
      ┌─────────────┼─────────────┐
      │                           │
      ▼                           ▼
┌──────────┐              ┌──────────┐
│  Prover  │              │ Verifier │
│ (Voter)  │              │(Contract)│
└──────────┘              └──────────┘
      │                           │
      │ "Trust me,               │ "Proof checks out!
      │  vote is valid"          │  Accept it!"
      │                           │
      └──────────►────────────────┘
         (Without revealing vote!)
```

## Circuit Constraints

The Noir contract enforces these mathematical constraints:

### Constraint 1: Valid Vote
```
vote * (vote - 1) = 0

If vote = 0: 0 * (0-1) = 0 ✓
If vote = 1: 1 * (1-1) = 0 ✓
If vote = 2: 2 * (2-1) = 2 ✗ (FAILS!)
```

### Constraint 2: Valid Nullifier
```
computed_nullifier = hash(secret, proposal_id)
assert(nullifier == computed_nullifier)

Proves: "I know the secret that created this nullifier"
```

### Constraint 3: Valid Commitment
```
computed_commitment = hash(vote, secret)
assert(commitment == computed_commitment)

Proves: "My vote matches this commitment"
```

## Security Properties

### 🔒 Privacy
```
Blockchain sees:
├─ Nullifier: 0x8a3f2e1b9c... ✓
├─ Commitment: 0x7b9c1d4e6a... ✓
└─ Proof: 0x3f2a8b7c5d... ✓

Blockchain CANNOT determine:
├─ Who voted ✗
├─ How they voted ✗
└─ Their secret ✗
```

### 🚫 Double Voting Prevention
```
Vote #1: nullifier = hash(secret, proposal_1)
Vote #2: nullifier = hash(secret, proposal_1) ← SAME!

Contract: "Nullifier already used! REJECT ❌"
```

### ✅ Verifiability
```
Anyone can verify:
├─ ✓ Proof is valid
├─ ✓ Vote follows rules
├─ ✓ No double voting
└─ ✓ All math checks out

WITHOUT knowing:
├─ ✗ The actual vote
└─ ✗ The voter identity
```

## Comparison: Traditional vs Zero-Knowledge Voting

### Traditional Public Voting
```
┌────────────────────┐
│ Alice voted YES    │ ← Everyone sees this!
│ Bob voted NO       │ ← Everyone sees this!
│ Carol voted YES    │ ← Everyone sees this!
└────────────────────┘

Problems:
❌ No privacy
❌ Coercion possible
❌ Vote buying possible
```

### Traditional Private Voting (Centralized)
```
┌─────────────────────┐
│ Trusted Authority   │ ← Must trust them!
│ • Counts votes      │
│ • Keeps database    │
│ • Can see all votes │
└─────────────────────┘

Problems:
❌ Single point of failure
❌ Must trust authority
❌ Can be corrupted
```

### Zero-Knowledge Voting (This Contract!)
```
┌───────────────────────┐
│ Blockchain Record     │
│ • 0x8a3f2e... ✓      │ ← Can't determine who/what!
│ • 0x5c7d1a... ✓      │
│ • 0x3f9e4b... ✓      │
└───────────────────────┘

Benefits:
✅ Complete privacy
✅ Fully verifiable
✅ No trusted party
✅ Mathematically secure
```

## Real-World Example

### Scenario: DAO Proposal Vote

**Proposal**: "Should we increase the community fund?"

**Alice's Vote:**
```javascript
// Private (on Alice's device)
const aliceSecret = generateRandomSecret(); // 12345
const aliceVote = 1; // YES

// Public (on blockchain)
const nullifier = hash(aliceSecret, proposalId);
const commitment = hash(aliceVote, aliceSecret);
const proof = generateProof(aliceVote, aliceSecret);

// Submit transaction
blockchain.submitVote(nullifier, commitment, proof);
// Alice's identity: HIDDEN ✓
// Alice's vote: HIDDEN ✓
```

**Bob's Vote:**
```javascript
// Private
const bobSecret = generateRandomSecret(); // 67890
const bobVote = 0; // NO

// Public
const nullifier = hash(bobSecret, proposalId);
const commitment = hash(bobVote, bobSecret);
const proof = generateProof(bobVote, bobSecret);

blockchain.submitVote(nullifier, commitment, proof);
// Bob's identity: HIDDEN ✓
// Bob's vote: HIDDEN ✓
```

**Result:**
```
Blockchain shows:
├─ 2 valid votes recorded ✓
├─ Both proofs verified ✓
└─ No double voting ✓

NOBODY knows:
├─ Who voted ✗
└─ How they voted ✗

Yet EVERYONE can verify:
├─ Votes are valid ✓
├─ Count is correct ✓
└─ No cheating occurred ✓
```

---

## Key Takeaways

1. **Privacy**: Votes are hidden using cryptographic commitments
2. **Security**: Math guarantees votes are valid and unique
3. **Verifiability**: Anyone can check proofs without seeing votes
4. **Trustless**: No central authority needed
5. **Practical**: Real-world ready for production use

This is the power of **zero-knowledge proofs** on Aztec! 🚀
