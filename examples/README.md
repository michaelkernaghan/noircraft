# 🧪 Noircraft Examples

Educational examples and demonstrations for learning privacy-preserving smart contract development.

## 📁 Structure

```
examples/
├── privacy/                   # Privacy-preserving demonstrations
│   ├── aztec_privacy_demo/       # Aztec network privacy features
│   └── privacy_preserving_examples/ # Various privacy patterns
├── snark/                     # SNARK fundamentals and demos
│   ├── simple_snark_demo/        # Basic SNARK concepts
│   ├── snark_fundamentals_demo/  # Core SNARK principles
│   └── snark_systems_comparison/ # Comparison of proof systems
├── aztec/                     # Aztec-specific examples
│   ├── prover_verifier_workflow/ # Proof generation workflow
│   └── transaction_signing_circuit/ # Transaction signing
└── bls/                       # BLS signature demonstrations
    ├── bls_attestation_demo/     # Basic BLS signatures
    └── enhanced_bls_attestation/ # Advanced BLS features
```

## 🎯 Learning Path

### 1. Start with SNARK Fundamentals
```bash
cd examples/snark/simple_snark_demo
# Learn basic zero-knowledge concepts
```

### 2. Explore Privacy Patterns
```bash
cd examples/privacy/privacy_preserving_examples
# Understand common privacy techniques
```

### 3. Dive into Aztec
```bash
cd examples/aztec/prover_verifier_workflow
# Learn Aztec-specific development
```

### 4. Advanced Cryptography
```bash
cd examples/bls/enhanced_bls_attestation
# Explore signature schemes
```

## 📚 Example Categories

### 🔐 Privacy Examples

#### Aztec Privacy Demo
- **Location**: `privacy/aztec_privacy_demo/`
- **Focus**: Aztec network privacy features
- **Level**: Intermediate
- **Concepts**: Private transactions, confidential assets

#### Privacy Preserving Examples  
- **Location**: `privacy/privacy_preserving_examples/`
- **Focus**: Common privacy patterns
- **Level**: Beginner to Advanced
- **Concepts**: Commitments, nullifiers, range proofs

### ⚡ SNARK Examples

#### Simple SNARK Demo
- **Location**: `snark/simple_snark_demo/`
- **Focus**: Basic zero-knowledge concepts
- **Level**: Beginner
- **Concepts**: Witness generation, constraint systems

#### SNARK Fundamentals
- **Location**: `snark/snark_fundamentals_demo/`
- **Focus**: Core SNARK principles
- **Level**: Intermediate
- **Concepts**: Circuit design, optimization

#### SNARK Systems Comparison
- **Location**: `snark/snark_systems_comparison/`
- **Focus**: Different proof systems
- **Level**: Advanced
- **Concepts**: PLONK, Groth16, STARKs

### 🌐 Aztec Examples

#### Prover-Verifier Workflow
- **Location**: `aztec/prover_verifier_workflow/`
- **Focus**: Proof generation and verification
- **Level**: Intermediate
- **Concepts**: Aztec SDK, proof pipelines

#### Transaction Signing Circuit
- **Location**: `aztec/transaction_signing_circuit/`
- **Focus**: Secure transaction signing
- **Level**: Advanced
- **Concepts**: Digital signatures, circuit design

### 🔑 BLS Examples

#### BLS Attestation Demo
- **Location**: `bls/bls_attestation_demo/`
- **Focus**: Basic BLS signatures
- **Level**: Beginner
- **Concepts**: Signature generation, verification

#### Enhanced BLS Attestation
- **Location**: `bls/enhanced_bls_attestation/`
- **Focus**: Advanced BLS features
- **Level**: Advanced
- **Concepts**: Aggregation, threshold signatures

## 🚀 Running Examples

### Prerequisites
```bash
# Install Noir
curl -L https://raw.githubusercontent.com/noir-lang/noir/master/install.sh | bash

# Install Node.js (for some examples)
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs
```

### General Pattern
```bash
cd examples/category/example_name
nargo test          # Run tests
nargo prove         # Generate proofs
nargo verify        # Verify proofs
```

### Example-Specific Instructions
Each example directory contains its own README with:
- Specific setup instructions
- Learning objectives
- Step-by-step walkthrough
- Expected outputs
- Next steps

## 🎓 Educational Objectives

### After Privacy Examples
You'll understand:
- How to implement private state
- Commitment and nullifier schemes
- Zero-knowledge range proofs
- Privacy-preserving voting

### After SNARK Examples
You'll understand:
- Circuit design principles
- Constraint system optimization
- Different proof systems
- Performance trade-offs

### After Aztec Examples
You'll understand:
- Aztec network architecture
- Private transaction flow
- SDK usage patterns
- Deployment strategies

### After BLS Examples
You'll understand:
- Digital signature schemes
- Signature aggregation
- Threshold cryptography
- Authentication patterns

## 🛠️ Development Tips

### Best Practices
- Start with simple examples
- Read the README in each directory
- Experiment with parameters
- Compare different approaches

### Common Issues
- **Compilation errors**: Check Noir version compatibility
- **Proof failures**: Verify constraint logic
- **Performance issues**: Profile circuit size
- **Setup problems**: Ensure dependencies are installed

### Debugging
```bash
# Add debug prints
std::println(variable);

# Check constraint count
nargo info

# Verify circuit logic
nargo test --verbose
```

## 🔗 Related Resources

- **[Contract Templates](../contracts/)** - Production-ready contracts
- **[Documentation](../docs/)** - Detailed guides
- **[Website](../website/)** - Interactive examples
- **[Noir Docs](https://noir-lang.org/docs)** - Official documentation

## 🤝 Contributing Examples

To add a new example:

1. Create directory in appropriate category
2. Include complete Noir project structure
3. Add comprehensive README
4. Include tests and expected outputs
5. Document learning objectives
6. Update this main README

### Example Template
```
example_name/
├── Nargo.toml          # Project configuration
├── src/
│   └── main.nr         # Main contract
├── tests/
│   └── test.nr         # Test cases
├── README.md           # Example documentation
└── expected_output/    # Expected results
```

## 📄 License

All examples are licensed under MIT License. See [LICENSE](../LICENSE) for details.
