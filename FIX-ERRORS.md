# 🔧 Fix Noircraft Compilation Errors

## 🎯 Two Main Issues

### **Issue 1: Unnecessary `pub` Keywords**

**Problem**: `pub` only works on main/entry function parameters, not helper functions

**Wrong:**
```noir
fn prove_voting_eligibility(
    voter_registry_root: pub Field,  // ❌ Remove pub
    min_voting_power: pub Field,     // ❌ Remove pub
    voter_id: Field,
    ...
)
```

**Fixed:**
```noir
fn prove_voting_eligibility(
    voter_registry_root: Field,  // ✅ No pub
    min_voting_power: Field,     // ✅ No pub
    voter_id: Field,
    ...
)
```

**Rule**: Only use `pub` on the MAIN entry function, not helper functions.

---

### **Issue 2: Field Comparisons**

**Problem**: Fields can't be compared with `<`, `>`, `<=`, `>=`

**Wrong:**
```noir
assert(voting_power >= min_voting_power);  // ❌ Can't compare Fields
assert(vote.candidate < 10);                // ❌ Can't compare Fields
```

**Fixed Option A** - Cast to u64:
```noir
assert(voting_power as u64 >= min_voting_power as u64);
```

**Fixed Option B** - Use Field arithmetic:
```noir
// Instead of vote.candidate < 10
// Use: assert vote.candidate is in range [0, 9]
assert((vote.candidate - 0) * (vote.candidate - 1) * (vote.candidate - 2) 
     * (vote.candidate - 3) * (vote.candidate - 4) * (vote.candidate - 5)
     * (vote.candidate - 6) * (vote.candidate - 7) * (vote.candidate - 8)
     * (vote.candidate - 9) == 0);
```

**Fixed Option C** - Use `lt` constraint:
```noir
// For comparison operations, use constraint functions
std::field::lt(vote.candidate, 10);  // Less than
```

---

## 🚀 Quick Fix Script

Run this to automatically fix the `pub` keywords:

```bash
cd /home/mike/aztec/learn-noir/noircraft/examples/privacy/privacy_preserving_examples

# Remove unnecessary pub keywords from helper functions
sed -i 's/voter_registry_root: pub Field/voter_registry_root: Field/g' src/main.nr
sed -i 's/min_voting_power: pub Field/min_voting_power: Field/g' src/main.nr
sed -i 's/nullifier_hash: pub Field/nullifier_hash: Field/g' src/main.nr
sed -i 's/vote_commitment: pub Field/vote_commitment: Field/g' src/main.nr
sed -i 's/merkle_root: pub Field/merkle_root: Field/g' src/main.nr
# ... etc for all helper functions
```

---

## 🎯 Recommended Approach

### **Option 1: Use u64 Instead of Field**

For numeric comparisons, use `u64`:

```noir
struct Vote {
    voter_id: Field,
    candidate: u64,        // ✅ Can compare
    voting_power: u64,     // ✅ Can compare
    timestamp: u64,        // ✅ Can compare
}

// Then you can:
assert(vote.candidate < 10);
assert(voting_power >= min_voting_power);
```

### **Option 2: Rewrite Comparisons**

Keep Fields but use alternative logic:
```noir
// Instead of: assert(x < 10)
// Use range proof pattern
```

---

## ✅ Which Examples Work?

Tests that PASSED:
- ✅ `aztec_privacy_demo` - 2 tests passed!

These work because they don't have comparison issues.

---

## 🔧 Let's Fix One Example Together

Want me to:
1. Fix `privacy_preserving_examples` for you?
2. Show you how to fix it yourself?
3. Focus on the working `aztec_privacy_demo` instead?

**What would you prefer?** 🚀

