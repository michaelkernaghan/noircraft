# ⚡ Quick Start Guide

Get your private voting contract running in **5 minutes**!

## 🎯 Step 1: Install Noir (2 minutes)

### Windows (PowerShell)
```powershell
# Download and install noirup
irm https://raw.githubusercontent.com/noir-lang/noir/master/install.ps1 | iex

# Install Noir
noirup
```

### Mac/Linux
```bash
curl -L https://raw.githubusercontent.com/noir-lang/noir/master/install.sh | bash
noirup
```

### Verify Installation
```bash
nargo --version
# Should output: nargo version = 0.30.0 (or higher)
```

## 🎯 Step 2: Navigate to Contract (10 seconds)

```bash
cd contracts/private_voting_demo
```

## 🎯 Step 3: Run Tests (1 minute)

```bash
nargo test
```

**Expected Output:**
```
Running tests...

[private_voting_demo] Running test: test_valid_vote_yes
  ✓ test_valid_vote_yes

[private_voting_demo] Running test: test_valid_vote_no
  ✓ test_valid_vote_no

[private_voting_demo] Running test: test_vote_counting
  ✓ test_vote_counting

[private_voting_demo] Running test: test_invalid_vote_value
  ✓ test_invalid_vote_value (should fail)

[private_voting_demo] Running test: test_wrong_nullifier
  ✓ test_wrong_nullifier (should fail)

Tests: 5 passed, 0 failed
```

## 🎯 Step 4: Generate a Proof (1 minute)

```bash
# Compile the circuit
nargo compile

# Generate proof with example vote
nargo prove

# Verify the proof
nargo verify
```

**Success!** You just created a zero-knowledge proof of a private vote! 🎉

## 🎮 Try It Yourself

### Change the Vote

Edit `Prover.toml`:
```toml
vote = "0"  # Change to 0 for "No" vote
```

Then run:
```bash
nargo prove
nargo verify
```

### Try an Invalid Vote

Edit `Prover.toml`:
```toml
vote = "2"  # Invalid! Only 0 or 1 allowed
```

Run and watch it fail:
```bash
nargo prove
# Error: assertion failed: Vote must be 0 or 1
```

## 🚀 What Just Happened?

You created a **zero-knowledge proof** that proves:
- ✅ Your vote is valid
- ✅ You're authorized to vote
- ✅ You haven't voted before
- ✅ Your vote is correctly committed

**WITHOUT revealing:**
- ❌ Who you are
- ❌ How you voted
- ❌ Your secret key

## 📊 Understanding the Output

### After `nargo compile`:
- Creates `target/` folder
- Compiles Noir → circuit constraints
- **File**: Circuit bytecode

### After `nargo prove`:
- Uses inputs from `Prover.toml`
- Generates zero-knowledge proof
- **File**: `proofs/private_voting_demo.proof`

### After `nargo verify`:
- Checks proof is mathematically valid
- Verifies all constraints are satisfied
- **Output**: Proof verified! ✓

## 🎓 Next Steps

1. **Read the full [README.md](README.md)** to understand the cryptography
2. **Modify the contract** in `src/main.nr`
3. **Add new features** like multiple proposals
4. **Deploy to Aztec** (see deployment guide)

## ⚠️ Troubleshooting

### "nargo: command not found"
- Restart your terminal after installation
- Or run: `source ~/.bashrc` (Linux/Mac)

### "Failed to compile"
- Check `Nargo.toml` is present
- Verify you're in the correct directory
- Try: `nargo clean` then `nargo compile`

### Tests fail unexpectedly
- Ensure Noir version >= 0.30.0
- Some tests are **supposed to fail** (they test error cases)

## 🆘 Need Help?

- 📚 [Full Documentation](README.md)
- 💬 [Noir Discord](https://discord.gg/noir)
- 🌐 [Noircraft Website](https://noircraft.io)

---

**Congratulations!** 🎊 You've just run your first private smart contract on Aztec!
