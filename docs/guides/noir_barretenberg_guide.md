# Zero-Knowledge Proofs with Noir & Barretenberg

*A comprehensive guide for the Department of Attestation & Ledger Studies*

## Overview

This guide demonstrates the integration of **Noir** (a domain-specific language for writing zero-knowledge circuits) with **Barretenberg** (Aztec Protocol's high-performance cryptographic proving backend). Together, they provide a powerful toolkit for creating verifiable digital attestations without revealing sensitive information.

## What is Noir?

**Noir** is a Rust-like domain-specific language designed for writing zero-knowledge circuits. It allows developers to express complex logical constraints in a readable format that can be compiled into mathematical proofs.

### Key Features:
- **High-level syntax** similar to Rust
- **Type safety** with Field elements and structured data
- **Built-in testing framework** for circuit validation
- **Modular design** supporting libraries and imports

## What is Barretenberg?

**Barretenberg** is a high-performance C++ cryptographic library developed by Aztec Protocol that serves as the proving backend for Noir circuits.

### Key Capabilities:
- **PLONK-based proving system** with optimizations
- **WebAssembly support** for browser compatibility
- **Multiple proof system implementations** (UltraPlonk, etc.)
- **High-performance C++ implementation** of ZK primitives

## Installation Guide

### Step 1: Install Noir

```bash
# Install noirup (the Noir installer)
curl -L https://raw.githubusercontent.com/noir-lang/noirup/main/install | bash

# Source your shell configuration
source ~/.zshrc  # or ~/.bashrc

# Install the latest Noir version
noirup
```

### Step 2: Verify Installation

```bash
# Check Noir/Nargo version
nargo --version
# Output: nargo version = 1.0.0-beta.12
```

**Note**: Barretenberg is automatically included with Noir installation - no separate setup required.

## Working Example: Digital Attestation Circuit

### Project Structure

```
attestation_circuit/
├── Nargo.toml          # Project configuration
├── Prover.toml         # Input values for proof generation
└── src/
    └── main.nr         # Main circuit logic
```

### Example 1: Basic Inequality Proof

**File: `src/main.nr`**
```noir
// Proves that two values are different without revealing them
fn main(secret_value: Field, public_threshold: pub Field) {
    assert(secret_value != public_threshold);
    
    // Additional constraint: secret must be positive
    assert(secret_value > 0);
}

#[test]
fn test_attestation() {
    // Test with valid inputs
    main(42, 100);
    
    // This would fail: main(100, 100);
}
```

**File: `Prover.toml`**
```toml
secret_value = "42"
public_threshold = "100"
```

**File: `Nargo.toml`**
```toml
[package]
name = "attestation_circuit"
type = "bin"
authors = ["DALHousie Research Team"]

[dependencies]
```

### Example 2: Signature Verification Circuit

**File: `src/signature_verify.nr`**
```noir
use std::hash::sha256;

// Verify a signature without revealing the private key
fn main(
    message: [u8; 32],
    signature: [u8; 64],
    public_key: pub [u8; 32]
) {
    // Hash the message
    let message_hash = sha256(message);
    
    // Verify signature (simplified - real implementation would use proper ECDSA)
    let expected_signature = sha256([message_hash, public_key].concat());
    
    // Assert signature validity
    assert(signature[0..32] == expected_signature[0..32]);
}

#[test]
fn test_signature_verification() {
    let message = [1; 32];
    let public_key = [2; 32];
    let signature = [0; 64]; // Would be actual signature in practice
    
    // This test would need proper signature generation
    // main(message, signature, public_key);
}
```

### Example 3: Range Proof Circuit

**File: `src/range_proof.nr`**
```noir
// Prove a value is within a range without revealing the exact value
fn main(
    secret_age: Field,
    min_age: pub Field,
    max_age: pub Field
) {
    // Prove age is within valid range
    assert(secret_age >= min_age);
    assert(secret_age <= max_age);
    
    // Additional business logic
    assert(secret_age < 200); // Sanity check
}

// Helper function for age verification
fn verify_adult(age: Field) -> bool {
    age >= 18
}

#[test]
fn test_age_verification() {
    // Test valid adult age
    main(25, 18, 65);
    
    // Test boundary conditions
    main(18, 18, 65); // Minimum valid
    main(65, 18, 65); // Maximum valid
}
```

## Development Workflow

### 1. Create New Project
```bash
nargo new my_circuit
cd my_circuit
```

### 2. Write Circuit Logic
Edit `src/main.nr` with your zero-knowledge circuit:

```noir
fn main(private_input: Field, public_input: pub Field) {
    // Your circuit logic here
    assert(private_input * 2 == public_input);
}
```

### 3. Configure Inputs
Edit `Prover.toml`:

```toml
private_input = "21"
public_input = "42"
```

### 4. Development Commands

```bash
# Check circuit for errors
nargo check

# Run tests
nargo test

# Compile circuit to ACIR format
nargo compile

# Execute circuit with inputs (generate witness)
nargo execute

# Format code
nargo fmt
```

### 5. Generated Files

After compilation and execution:

```
target/
├── my_circuit.json    # Compiled circuit (ACIR format)
└── my_circuit.gz      # Witness file (execution trace)
```

## Advanced Features

### Custom Types and Structures

```noir
struct Identity {
    id: Field,
    timestamp: Field,
    is_verified: bool,
}

struct Attestation {
    identity: Identity,
    claim_hash: Field,
    signature: [Field; 2],
}

fn verify_attestation(attestation: Attestation, public_key: pub Field) {
    // Verify the attestation structure
    assert(attestation.identity.is_verified == true);
    assert(attestation.identity.timestamp > 0);
    
    // Verify signature (simplified)
    let message_hash = hash_identity(attestation.identity);
    assert(verify_signature(message_hash, attestation.signature, public_key));
}

fn hash_identity(identity: Identity) -> Field {
    // Simple hash function for demonstration
    identity.id + identity.timestamp
}

fn verify_signature(message: Field, signature: [Field; 2], public_key: Field) -> bool {
    // Simplified signature verification
    signature[0] + signature[1] == message + public_key
}
```

### Merkle Tree Membership Proof

```noir
// Prove membership in a Merkle tree without revealing the path
fn prove_membership(
    leaf: Field,
    root: pub Field,
    path: [Field; 8],      // Merkle path (private)
    indices: [bool; 8]     // Left/right indicators (private)
) {
    let mut current = leaf;
    
    for i in 0..8 {
        let (left, right) = if indices[i] {
            (path[i], current)
        } else {
            (current, path[i])
        };
        
        current = hash_pair(left, right);
    }
    
    assert(current == root);
}

fn hash_pair(left: Field, right: Field) -> Field {
    // Simplified hash function
    (left + right) * 7 + 13
}
```

## Integration with Tezos DAL

For DALHousie's Tezos integration, circuits can be used for:

### BLS Signature Aggregation Verification
```noir
// Verify BLS signature aggregation for DAL attestations
fn verify_dal_attestation(
    shard_id: pub Field,
    attestation_data: [Field; 4],
    aggregated_signature: [Field; 2],
    baker_public_keys: pub [Field; 10]
) {
    // Verify shard assignment
    assert(shard_id == 251); // DALHousie's assigned shard
    
    // Verify signature aggregation
    let message_hash = hash_attestation_data(attestation_data);
    assert(verify_bls_aggregate(message_hash, aggregated_signature, baker_public_keys));
}

fn hash_attestation_data(data: [Field; 4]) -> Field {
    data[0] + data[1] * 256 + data[2] * 65536 + data[3] * 16777216
}

fn verify_bls_aggregate(message: Field, signature: [Field; 2], public_keys: [Field; 10]) -> bool {
    // Simplified BLS aggregation verification
    let aggregate_key = aggregate_public_keys(public_keys);
    signature[0] + signature[1] == message + aggregate_key
}

fn aggregate_public_keys(keys: [Field; 10]) -> Field {
    let mut result = 0;
    for i in 0..10 {
        result = result + keys[i];
    }
    result
}
```

## Barretenberg Backend Integration

### How It Works Behind the Scenes

1. **Circuit Compilation**: Noir code → ACIR (Abstract Circuit Intermediate Representation)
2. **Witness Generation**: Input values → execution trace
3. **Proof Generation**: Barretenberg transforms ACIR + witness → ZK-SNARK proof
4. **Verification**: Barretenberg verifies proof + public inputs

### Performance Characteristics

- **Proving Time**: Milliseconds to seconds depending on circuit complexity
- **Proof Size**: ~200-400 bytes for typical circuits
- **Verification Time**: <1ms for most circuits
- **Memory Usage**: Optimized for both desktop and embedded systems

### WebAssembly Support

Barretenberg compiles to WebAssembly, enabling browser-based proving:

```javascript
// Example browser integration (conceptual)
import { prove, verify } from '@aztec/barretenberg/wasm';

async function generateProof(circuit, inputs) {
    const proof = await prove(circuit, inputs);
    return proof;
}

async function verifyProof(proof, publicInputs, verificationKey) {
    const isValid = await verify(proof, publicInputs, verificationKey);
    return isValid;
}
```

## Best Practices

### 1. Circuit Design
- **Minimize constraints** for better performance
- **Use appropriate field sizes** for your data
- **Structure complex logic** into helper functions
- **Add comprehensive tests** for edge cases

### 2. Security Considerations
- **Validate all inputs** within circuits
- **Avoid information leakage** through constraint patterns
- **Use established cryptographic primitives** when available
- **Audit circuits** for completeness of constraints

### 3. Development Workflow
- **Start with simple circuits** and iterate
- **Use the testing framework** extensively
- **Profile circuit complexity** with `nargo info`
- **Version control** your circuits and tests

## Alternative Proving Backends (From Awesome Noir)

While Barretenberg is the default backend, several alternatives are available:

### Production Ready Backends:
- **coSNARKs** (Taceo Labs) - Multi-Party Computation support for distributed proving
- **Edge (Supernova)** (Pluto) - Optimized for recursive proofs
- **ProveKit (Recursive Groth16)** (World) - Groth16 compatibility with small proofs
- **Sonobe (Nova, HyperNova)** (0xPARC & PSE) - Recursive proof systems

### Experimental Backends:
- **Plonky2** (Blocksense) - Fast proving with good recursion
- **Gnark** (Lambdaclass) - Go-based proving system
- **Halo2** (Ethan) - Microsoft Research's proving system

## Enhanced Library Ecosystem

### BLS & Advanced Cryptography
```toml
# Add to Nargo.toml for production use:
bls12_381 = { git = "https://github.com/noir-lang/bls12_381" }
eddsa = { git = "https://github.com/noir-lang/eddsa" }
ecdsa = { git = "https://github.com/noir-lang/ecdsa" }
schnorr = { git = "https://github.com/noir-lang/schnorr" }
plume = { git = "https://github.com/noir-lang/plume" }  # ECDSA-based nullifiers
```

### Blockchain Integration Libraries
```toml
ethereum_storage_proof = { git = "https://github.com/aragonzkresearch/noir-trie-proofs" }
ecrecover = { git = "https://github.com/colinnielsen/ecrecover-noir" }
zk_kit_merkle_tree = { git = "https://github.com/privacy-scaling-explorations/zk-kit.noir" }
```

### Advanced Data Structures
```toml
indexed_merkle_tree = { git = "https://github.com/vocdoni/indexed-merkle-tree-noir" }
sparse_array = { git = "https://github.com/noir-lang/sparse-array" }
sort = { git = "https://github.com/noir-lang/sort" }
```

## Cross-Platform Development Tools

### Browser & Mobile Integration
- **NoirJS** - Compile and execute Noir in browsers/Node.js
- **MoPro** - Mobile proving for iOS and Android
- **Noir.rs** - Rust bindings for native applications
- **Swoir** - Swift bindings for iOS/MacOS

### Development Environment
- **Noir Playground** - Browser-based development environment
- **VS Code Extension** - Full IDE support with syntax highlighting
- **CodeTracer** - Visual time-travelling debugger

## Real-World Integration Examples

### Ethereum Integration with Hardhat
```javascript
// Using hardhat-noir plugin
const { prove, verify } = require('@noir-lang/noir_js');

task("prove-attestation", "Generate proof for DAL attestation")
  .setAction(async (taskArgs, hre) => {
    const circuit = await compile('./circuits/dal_attestation.nr');
    const inputs = {
      shard_id: "251",
      baker_signatures: attestationData.signatures,
      minimum_signatures: "3"
    };
    
    const proof = await prove(circuit, inputs);
    console.log("Proof generated:", proof);
  });
```

### Mobile Integration Example
```swift
// Using MoPro for iOS
import MoPro

class DALAttestationProver {
    func generateProof(attestation: AttestationData) async throws -> ProofData {
        let circuit = try NoirCircuit(path: "dal_attestation.json")
        let inputs = [
            "shard_id": "251",
            "signatures": attestation.signatures,
            "minimum_signatures": "3"
        ]
        return try await circuit.prove(inputs: inputs)
    }
}
```

## Performance Comparison: Backends

| Backend | Proving Time | Proof Size | Verification | Best For |
|---------|-------------|------------|--------------|----------|
| Barretenberg | ~100ms | 200-400 bytes | <1ms | General purpose |
| coSNARKs | ~200ms | 300-500 bytes | <1ms | MPC scenarios |
| Sonobe | ~500ms | 150-300 bytes | <1ms | Recursive proofs |
| ProveKit | ~150ms | 128-256 bytes | <1ms | Groth16 compatibility |

## Security & Formal Verification Tools

From the awesome-noir ecosystem:

### Formal Verification
- **rocq-of-noir** - Formal verification with Rocq
- **lampe** - Formal verification with Lean

### Security Testing
- **hunter** - Mutation testing for circuits
- **Circuzz fuzzer** - Soundness and completeness testing
- **Noir Static Analyzer** - Code quality analysis

## Conclusion

The combination of Noir and Barretenberg, enhanced by the extensive [awesome-noir ecosystem](https://github.com/noir-lang/awesome-noir), provides DALHousie with a comprehensive foundation for zero-knowledge proof research and implementation. 

From basic attestations to complex cryptographic protocols involving BLS signatures, Merkle trees, and cross-chain proofs, this toolkit enables verifiable computations while preserving privacy - essential for modern digital attestation systems.

The availability of multiple proving backends, extensive library ecosystem, cross-platform development tools, and formal verification capabilities makes this one of the most mature ZK development environments available.

---

*"In Signatura, Veritas" - Through cryptographic proofs, we achieve both privacy and verifiability.*

**Department of Attestation & Ledger Studies**  
**DALHousie Research Institution**

---

## References

- [Noir Language Documentation](https://noir-lang.org/)
- [Aztec Protocol Barretenberg](https://github.com/AztecProtocol/barretenberg)
- [Zero-Knowledge Proofs: An Illustrated Primer](https://blog.cryptographyengineering.com/)
- [Tezos DAL Documentation](https://tezos.gitlab.io/)
