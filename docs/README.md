# 📚 Noircraft Documentation

Comprehensive guides and resources for privacy-preserving smart contract development.

## 📁 Structure

```
docs/
├── guides/                    # Step-by-step tutorials
│   ├── aztec_system_guide.md     # Aztec network overview
│   ├── noir_barretenberg_guide.md # Noir development guide
│   ├── privacy_demo_guide.md     # Privacy implementation guide
│   ├── aztec_focused_summary.md  # Aztec ecosystem summary
│   ├── plonk_explained.md        # PLONK proof system
│   └── dalhousie_plonk_noir_aztec_research.md # Academic research
├── SNARK_EXPLORATION_GUIDE.md    # SNARK fundamentals
├── SNARK_QUICK_START.md          # Quick start guide
├── awesome_noir_resources.md     # Curated resources
└── bls_library_status.md         # BLS signature status
```

## 🎯 Getting Started

### New to Zero-Knowledge?
1. **[SNARK Quick Start](SNARK_QUICK_START.md)** - Basic concepts
2. **[SNARK Exploration Guide](SNARK_EXPLORATION_GUIDE.md)** - Deep dive
3. **[PLONK Explained](guides/plonk_explained.md)** - Proof system details

### New to Noir?
1. **[Noir Barretenberg Guide](guides/noir_barretenberg_guide.md)** - Development setup
2. **[Privacy Demo Guide](guides/privacy_demo_guide.md)** - First privacy contract
3. **[Awesome Noir Resources](awesome_noir_resources.md)** - Curated links

### New to Aztec?
1. **[Aztec System Guide](guides/aztec_system_guide.md)** - Network overview
2. **[Aztec Focused Summary](guides/aztec_focused_summary.md)** - Ecosystem guide
3. **[Academic Research](guides/dalhousie_plonk_noir_aztec_research.md)** - In-depth analysis

## 📖 Guide Categories

### 🔰 Beginner Guides
- **SNARK Quick Start** - Zero-knowledge basics
- **Privacy Demo Guide** - Your first private contract
- **Aztec System Guide** - Network fundamentals

### 🎓 Intermediate Guides  
- **Noir Barretenberg Guide** - Advanced development
- **PLONK Explained** - Proof system internals
- **BLS Library Status** - Signature schemes

### 🎖️ Advanced Guides
- **SNARK Exploration Guide** - Advanced cryptography
- **Academic Research** - University-level analysis
- **Aztec Focused Summary** - Ecosystem deep-dive

## 🛠️ Practical Resources

### Development Setup
```bash
# Install Noir
curl -L https://raw.githubusercontent.com/noir-lang/noir/master/install.sh | bash

# Create new project
nargo new my_project
cd my_project

# Test and prove
nargo test
nargo prove
```

### Common Patterns
- **Nullifier Schemes** - Prevent double-spending
- **Commitment Schemes** - Hide values with proofs
- **Merkle Tree Proofs** - Membership verification
- **Range Proofs** - Prove value constraints

### Debugging Tips
- Use `std::println` for debugging proofs
- Test with small constraint counts first
- Verify public inputs carefully
- Check constraint relationships

## 🔗 External Resources

### Official Documentation
- [Noir Language Docs](https://noir-lang.org/docs)
- [Aztec Developer Docs](https://docs.aztec.network)
- [Barretenberg Library](https://github.com/AztecProtocol/barretenberg)

### Community Resources
- [Noir Discord](https://discord.gg/noir)
- [Aztec Discord](https://discord.gg/aztec)
- [Zero-Knowledge Podcast](https://zeroknowledge.fm)

### Academic Papers
- [PLONK Paper](https://eprint.iacr.org/2019/953.pdf)
- [Aztec Protocol](https://aztec.network/aztec.pdf)
- [Zero-Knowledge Proofs](https://zkp.science)

## 🤝 Contributing

To contribute documentation:

1. Fork the repository
2. Create new guide in appropriate directory
3. Follow markdown formatting standards
4. Include practical examples
5. Add links to related resources
6. Submit pull request

### Style Guide
- Use clear, concise language
- Include code examples
- Add diagrams where helpful
- Link to related documentation
- Test all code snippets

## 📄 License

All documentation is licensed under Creative Commons Attribution 4.0 International (CC BY 4.0).

## 🙏 Contributors

Thanks to all contributors who have helped build this knowledge base:
- Academic researchers at Dalhousie University
- Aztec Protocol team
- Noir language developers
- Privacy engineering community
