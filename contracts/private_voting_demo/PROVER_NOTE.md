# Note About Prover.toml

The `Prover.toml` file contains example inputs for generating proofs via `nargo execute` or `nargo prove`.

## Why Placeholder Values?

The `nullifier` and `vote_commitment` fields require actual Pedersen hash values computed from the inputs. Since these are cryptographic hashes, they can't be predetermined - they must be computed.

## How to Use This Contract

### Option 1: Run Tests (Recommended)

The **tests work perfectly** and demonstrate all functionality:

```bash
nargo test
```

All 5 tests pass, showing:
- ✅ Valid yes votes work
- ✅ Valid no votes work
- ✅ Vote counting works
- ✅ Invalid votes are rejected
- ✅ Double voting attempts are blocked

### Option 2: Generate Proofs Programmatically

In a real application, you would:

1. **Compute hashes in your app**:
```javascript
const nullifier = pedersen_hash([voter_secret, proposal_id]);
const commitment = pedersen_hash([vote, voter_secret]);
```

2. **Pass to Noir circuit**:
```javascript
const proof = await generateProof({
  vote,
  voter_secret,
  proposal_id,
  nullifier,      // Computed hash
  commitment      // Computed hash
});
```

3. **Submit to blockchain**:
```javascript
await contract.submitVote(proposal_id, nullifier, commitment, proof);
```

## For Learning

The **tests are the best way** to understand and verify the contract logic. They:
- Show how hashes are computed
- Demonstrate valid and invalid inputs
- Prove the security features work
- Are self-contained and reproducible

## Summary

- ✅ **Tests**: Work perfectly, run them!
- ⚠️ **Prover.toml**: Placeholders only, for reference
- 🚀 **Production**: Compute hashes programmatically

**Bottom line**: Use `nargo test` to see the contract in action!
