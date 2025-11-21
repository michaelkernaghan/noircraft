# 🔧 Installing Noir on Windows

Your antivirus software is blocking the automated installation. Here are alternative methods:

## Method 1: Manual Download (Recommended)

### Step 1: Download Noir Binaries

Visit the official Noir releases page and download the latest Windows binary:
**https://github.com/noir-lang/noir/releases**

Look for files like:
- `nargo-x86_64-pc-windows-msvc.zip` (for 64-bit Windows)
- `noirc_abi_wasm-x86_64-pc-windows-msvc.zip`

### Step 2: Extract and Install

1. **Download** the latest `nargo-x86_64-pc-windows-msvc.zip`
2. **Extract** the ZIP file to a permanent location like:
   ```
   C:\Program Files\Noir\
   ```
   or
   ```
   C:\Users\<YourUsername>\AppData\Local\Noir\
   ```

3. **Add to PATH**:
   - Press `Win + X` and select "System"
   - Click "Advanced system settings"
   - Click "Environment Variables"
   - Under "User variables", find "Path" and click "Edit"
   - Click "New" and add the path to the folder containing `nargo.exe`
   - Click "OK" on all dialogs

### Step 3: Verify Installation

Open a **new** terminal and run:
```bash
nargo --version
```

Expected output: `nargo version = 0.30.0` (or higher)

---

## Method 2: Temporarily Disable Antivirus

**⚠️ Only if you trust the source (official Noir repository)**

1. Temporarily disable your antivirus
2. Open PowerShell as Administrator
3. Run:
   ```powershell
   irm https://raw.githubusercontent.com/noir-lang/noir/master/install.ps1 | iex
   ```
4. After installation, run:
   ```powershell
   noirup
   ```
5. Re-enable your antivirus
6. Restart your terminal

---

## Method 3: Use WSL (Windows Subsystem for Linux)

If you have WSL installed:

```bash
# In WSL terminal
curl -L https://raw.githubusercontent.com/noir-lang/noir/master/install.sh | bash
source ~/.bashrc
noirup

# Verify
nargo --version
```

---

## Method 4: Use Cargo (Rust Package Manager)

If you have Rust installed:

```bash
cargo install noirup
noirup
```

---

## After Installation

Once Noir is installed, verify with:

```bash
nargo --version
```

Then proceed to test the contract:

```bash
cd contracts/private_voting_demo
nargo test
nargo compile
nargo prove
nargo verify
```

---

## Troubleshooting

### "nargo: command not found"
- **Solution**: Restart your terminal after installation
- Make sure the Noir directory is in your PATH

### Antivirus still blocking
- **Solution**: Add an exception for the Noir installation directory
- Or use WSL (Method 3)

### Download link not working
- **Solution**: Visit https://github.com/noir-lang/noir/releases directly
- Download the latest release manually

---

## Alternative: Run Without Installation

You can also explore the contract without running it:

1. **Read the code**: Open `src/main.nr` in your editor
2. **Read the docs**: Check out `README.md` and `ARCHITECTURE.md`
3. **Understand the logic**: The contract is fully documented

The contract demonstrates:
- ✅ Zero-knowledge proofs
- ✅ Privacy-preserving voting
- ✅ Nullifier schemes
- ✅ Cryptographic commitments

Even without running it, you can learn the concepts!

---

## Need Help?

- 📚 [Noir Documentation](https://noir-lang.org/docs)
- 💬 [Noir Discord](https://discord.gg/noir)
- 🌐 [Noircraft Website](https://noircraft.io)

---

**Once Noir is installed, come back to [QUICKSTART.md](QUICKSTART.md) to run the contract!**
