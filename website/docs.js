// Documentation page functionality for Noircraft
document.addEventListener('DOMContentLoaded', function() {
    
    // Documentation content database - maps to actual files in docs/ directory
    const docs = {
        snark_quick_start: {
            title: "SNARK Quick Start Guide",
            content: `
# 🚀 SNARK Quick Start Guide

Welcome to the world of **Zero-Knowledge Proofs**! This guide will get you up and running with SNARKs (Succinct Non-Interactive Arguments of Knowledge) in just a few minutes.

## What are SNARKs?

SNARKs are cryptographic proofs that allow you to prove you know something without revealing what you know. They're:

- **Succinct**: Proofs are small and fast to verify
- **Non-Interactive**: No back-and-forth communication needed
- **Arguments of Knowledge**: Prove you know a secret

## Quick Setup

### 1. Install Noir
\`\`\`bash
curl -L https://raw.githubusercontent.com/noir-lang/noir/master/install.sh | bash
\`\`\`

### 2. Create Your First Project
\`\`\`bash
nargo new my_first_snark
cd my_first_snark
\`\`\`

### 3. Write a Simple Circuit
\`\`\`noir
// src/main.nr
use dep::std;

fn main(secret: u64, public_hash: pub Field) {
    let computed_hash: Field = std::hash::pedersen([secret as Field]);
    assert(computed_hash == public_hash);
}
\`\`\`

### 4. Test and Prove
\`\`\`bash
nargo test    # Run tests
nargo prove   # Generate proof
\`\`\`

## Key Concepts

### Witnesses
Private inputs that only the prover knows.

### Public Inputs
Values that both prover and verifier know.

### Constraints
Mathematical relationships that must hold true.

## Next Steps

- Explore our [contract examples](/examples.html)
- Read the [SNARK Exploration Guide](#snark_exploration)
- Try building a [privacy-preserving application](#privacy_demo)

*Happy proving! 🎮⚔️*
            `
        },
        
        snark_exploration: {
            title: "SNARK Exploration Guide",
            content: `
# 🔍 SNARK Exploration Guide

This comprehensive guide explores the mathematical foundations and practical applications of Zero-Knowledge Proof systems.

## Mathematical Foundations

### Polynomial Commitments
SNARKs rely on polynomial commitments to encode computational statements as algebraic equations.

### Constraint Systems
- **R1CS**: Rank-1 Constraint Systems
- **PLONK**: Permutations over Lagrange-bases for Oecumenical Noninteractive arguments of Knowledge
- **AIR**: Algebraic Intermediate Representation

## Circuit Design Patterns

### 1. Hash Preimage Proofs
Prove you know the input to a hash function without revealing it.

\`\`\`noir
use dep::std;

fn hash_preimage_proof(preimage: Field, hash: pub Field) {
    let computed: Field = std::hash::pedersen([preimage]);
    assert(computed == hash);
}
\`\`\`

### 2. Range Proofs
Prove a value lies within a specific range.

\`\`\`noir
fn range_proof(value: Field, min: Field, max: Field) {
    assert(value >= min);
    assert(value <= max);
}
\`\`\`

### 3. Merkle Tree Membership
Prove inclusion in a set without revealing the set.

## Optimization Techniques

### Constraint Minimization
- Use efficient field operations
- Minimize constraint count
- Leverage lookup tables

### Proving Time Optimization
- Batch similar operations
- Use preprocessing when possible
- Optimize circuit structure

## Security Considerations

### Trusted Setup
Some SNARKs require a trusted setup ceremony.

### Soundness
Ensure malicious provers cannot create false proofs.

### Zero-Knowledge
Verify proofs reveal no information about witnesses.

## Advanced Topics

### Recursive Proofs
Prove statements about other proofs.

### Universal SNARKs
Single setup for multiple circuits.

### Post-Quantum Security
Resistance to quantum computer attacks.

## Further Reading

- [PLONK Paper](https://eprint.iacr.org/2019/953.pdf)
- [Noir Documentation](https://noir-lang.org/docs)
- [ZKP Learning Resources](https://zkp.science)
            `
        },
        
        noir_barretenberg: {
            title: "Noir & Barretenberg Development Guide",
            content: `
# ⚙️ Noir & Barretenberg Development Guide

Complete setup and workflow for building production-ready zero-knowledge applications.

## Development Environment Setup

### Prerequisites
- **Rust**: Latest stable version
- **Node.js**: v16 or higher
- **Git**: Version control

### Install Noir Toolchain
\`\`\`bash
# Install Noir compiler and package manager
curl -L https://raw.githubusercontent.com/noir-lang/noir/master/install.sh | bash

# Verify installation
nargo --version
\`\`\`

### Install Barretenberg
\`\`\`bash
# Install proving backend
npm install -g @aztec/bb
\`\`\`

## Project Structure

### Standard Noir Project
\`\`\`
my_noir_app/
├── Nargo.toml          # Project configuration
├── Prover.toml         # Prover inputs
├── Verifier.toml       # Verifier inputs  
├── src/
│   └── main.nr         # Main circuit
└── target/             # Compiled artifacts
\`\`\`

### Configuration Files

#### Nargo.toml
\`\`\`toml
[package]
name = "my_noir_app"
type = "bin"
authors = [""]
compiler_version = ">=0.19.0"

[dependencies]
\`\`\`

## Development Workflow

### 1. Write Circuit
\`\`\`noir
// src/main.nr
use dep::std;

fn main(private_input: Field, public_output: pub Field) {
    let result = private_input * private_input;
    assert(result == public_output);
}
\`\`\`

### 2. Configure Inputs
\`\`\`toml
# Prover.toml
private_input = "5"
public_output = "25"
\`\`\`

### 3. Compile Circuit
\`\`\`bash
nargo compile
\`\`\`

### 4. Generate Proof
\`\`\`bash
nargo prove
\`\`\`

### 5. Verify Proof
\`\`\`bash
nargo verify
\`\`\`

## Integration with Applications

### Web Integration
\`\`\`javascript
import { BarretenbergBackend } from '@noir-lang/backend_barretenberg';
import { Noir } from '@noir-lang/noir_js';

// Load compiled circuit
const circuit = await fetch('./target/circuit.json').then(r => r.json());

// Initialize
const backend = new BarretenbergBackend(circuit);
const noir = new Noir(circuit, backend);

// Generate proof
const proof = await noir.generateProof(inputs);

// Verify proof
const verified = await noir.verifyProof(proof);
\`\`\`

## Performance Optimization

### Circuit Optimization
- Minimize constraint count
- Use efficient field operations
- Leverage lookup tables for complex operations

### Proving Performance
- Use preprocessing for repeated proofs
- Optimize witness generation
- Consider proof composition

## Debugging Tips

### Common Issues
1. **Constraint Failures**: Check assert statements
2. **Type Errors**: Ensure Field type consistency
3. **Compilation Errors**: Verify syntax and imports

### Debugging Tools
\`\`\`noir
// Add debug prints
std::println(variable);

// Check intermediate values
let debug_value = computation_step();
std::println(debug_value);
\`\`\`

## Production Deployment

### Security Checklist
- [ ] Audit circuit logic
- [ ] Verify constraint completeness  
- [ ] Test edge cases
- [ ] Review public inputs

### Performance Benchmarking
\`\`\`bash
# Measure proving time
time nargo prove

# Check constraint count
nargo info
\`\`\`

## Best Practices

### Code Organization
- Separate complex logic into functions
- Use meaningful variable names
- Add comprehensive comments

### Testing Strategy
- Unit tests for individual functions
- Integration tests for full circuits
- Edge case testing

### Documentation
- Document public interfaces
- Explain complex algorithms
- Provide usage examples
            `
        },
        
        privacy_demo: {
            title: "Privacy Demo Guide",
            content: `
# 🔐 Privacy Demo Guide

Learn to build your first privacy-preserving smart contract with Noir and zero-knowledge proofs.

## What We're Building

A **private voting system** where:
- Votes are secret
- Vote counts are public
- Double voting is prevented
- Voter eligibility is verified

## Step 1: Project Setup

\`\`\`bash
nargo new private_voting
cd private_voting
\`\`\`

## Step 2: Design the Circuit

### Privacy Requirements
- **Vote Choice**: Hidden from public
- **Voter Identity**: Hidden but verified
- **Eligibility**: Proven without revealing identity
- **Uniqueness**: Prevent double voting

### Public Outputs
- **Vote Count**: Aggregated results
- **Nullifier**: Prevents double voting
- **Validity Proof**: Confirms legitimate vote

## Step 3: Implementation

\`\`\`noir
// src/main.nr
use dep::std;

fn main(
    // Private inputs (hidden)
    vote_choice: Field,        // 0 or 1
    voter_secret: Field,       // Unique voter secret
    voter_id: Field,          // Voter identifier
    
    // Public inputs (visible)
    merkle_root: pub Field,    // Valid voters list
    nullifier: pub Field,      // Prevents double voting
    vote_commitment: pub Field // Vote commitment
) {
    // 1. Validate vote choice (0 or 1)
    assert(vote_choice * (vote_choice - 1) == 0);
    
    // 2. Verify voter eligibility (simplified Merkle proof)
    let voter_hash = std::hash::pedersen_hash([voter_id, voter_secret]);
    // In practice, verify full Merkle path to merkle_root
    
    // 3. Generate nullifier to prevent double voting
    let computed_nullifier = std::hash::pedersen_hash([voter_secret, merkle_root]);
    assert(computed_nullifier[0] == nullifier);
    
    // 4. Commit to the vote
    let computed_commitment = std::hash::pedersen_hash([vote_choice, voter_secret]);
    assert(computed_commitment[0] == vote_commitment);
    
    std::println("🗳️ Private vote cast successfully!");
}

#[test]
fn test_private_voting() {
    let vote = 1;  // Vote for option 1
    let secret = 12345;
    let voter = 67890;
    let merkle_root = 0x1234567890abcdef;
    
    let nullifier_hash = std::hash::pedersen_hash([secret, merkle_root]);
    let vote_commit = std::hash::pedersen_hash([vote, secret]);
    
    main(vote, secret, voter, merkle_root, 
         nullifier_hash[0], vote_commit[0]);
}
\`\`\`

## Step 4: Configure Inputs

\`\`\`toml
# Prover.toml
vote_choice = "1"
voter_secret = "12345"
voter_id = "67890"
merkle_root = "0x1234567890abcdef"
nullifier = "0x..."  # Computed nullifier
vote_commitment = "0x..."  # Computed commitment
\`\`\`

## Step 5: Test and Prove

\`\`\`bash
# Run tests
nargo test

# Generate proof
nargo prove

# Verify proof
nargo verify
\`\`\`

## Advanced Features

### Batch Voting
Process multiple votes in a single proof:

\`\`\`noir
fn batch_voting(
    votes: [Field; 10],
    secrets: [Field; 10],
    // ... other arrays
) {
    for i in 0..10 {
        // Process each vote
        validate_single_vote(votes[i], secrets[i]);
    }
}
\`\`\`

### Weighted Voting
Include voting power in the circuit:

\`\`\`noir
fn weighted_voting(
    vote_choice: Field,
    voting_power: Field,
    // ... other inputs
) {
    // Verify voting power
    assert(voting_power > 0);
    assert(voting_power <= max_power);
    
    // Weight the vote
    let weighted_vote = vote_choice * voting_power;
}
\`\`\`

## Security Considerations

### Nullifier Uniqueness
Ensure nullifiers are unique per voter per election:

\`\`\`noir
let nullifier = std::hash::pedersen_hash([
    voter_secret, 
    election_id,
    merkle_root
]);
\`\`\`

### Vote Privacy
Never leak vote information through constraints:

\`\`\`noir
// ❌ Bad: Leaks vote information
if vote_choice == 1 {
    assert(some_condition);
}

// ✅ Good: Uniform constraints
let condition_check = vote_choice * constraint_value;
assert(condition_check == expected_value);
\`\`\`

## Deployment Considerations

### Gas Optimization
- Minimize public inputs
- Use efficient hash functions
- Batch multiple operations

### User Experience
- Precompute common values
- Provide clear error messages
- Optimize proving time

## Next Steps

1. **Explore Templates**: Check our [contract templates](/examples.html)
2. **Advanced Privacy**: Learn about [range proofs and commitments](#)
3. **Production Deployment**: Read our [deployment guide](/docs.html)

*Build the future of private governance! 🎮🗳️*
            `
        },
        
        awesome_noir: {
            title: "Awesome Noir Resources",
            content: `
# ⭐ Awesome Noir Resources

Curated collection of the best Noir tutorials, tools, libraries, and community resources.

## 📚 Official Documentation

### Core Resources
- **[Noir Language Docs](https://noir-lang.org/docs)** - Official documentation
- **[Nargo CLI Reference](https://noir-lang.org/docs/reference/nargo_commands)** - Command-line tools
- **[Standard Library](https://noir-lang.org/docs/standard_library)** - Built-in functions

### Tutorials
- **[Getting Started Guide](https://noir-lang.org/docs/getting_started)** - First steps
- **[Language Tour](https://noir-lang.org/docs/language_concepts)** - Core concepts
- **[Advanced Techniques](https://noir-lang.org/docs/advanced)** - Expert patterns

## 🛠️ Development Tools

### IDEs and Editors
- **[Noir VS Code Extension](https://marketplace.visualstudio.com/items?itemName=noir-lang.vscode-noir)** - Syntax highlighting and LSP
- **[Vim Plugin](https://github.com/noir-lang/noir.vim)** - Vim support
- **[Emacs Mode](https://github.com/noir-lang/noir-mode)** - Emacs integration

### Build Tools
- **[Nargo](https://github.com/noir-lang/noir)** - Official build tool and package manager
- **[Noir.js](https://github.com/noir-lang/noir.js)** - JavaScript/TypeScript bindings
- **[Noir Starter Kit](https://github.com/noir-lang/noir-starter)** - Project templates

## 🧪 Libraries and Frameworks

### Cryptographic Libraries
- **[Noir-BigNum](https://github.com/noir-lang/noir-bignum)** - Big integer arithmetic
- **[Noir-ECDSA](https://github.com/colinnielsen/noir-ecdsa)** - ECDSA signature verification
- **[Noir-RSA](https://github.com/noir-lang/noir-rsa)** - RSA operations

### Utility Libraries
- **[Noir-JSON](https://github.com/noir-lang/noir-json)** - JSON parsing
- **[Noir-Base64](https://github.com/noir-lang/noir-base64)** - Base64 encoding/decoding
- **[Noir-Merkle](https://github.com/noir-lang/noir-merkle)** - Merkle tree operations

## 🏗️ Example Projects

### Beginner Projects
- **[Simple Voting](https://github.com/noir-lang/noir-examples/tree/master/simple_voting)** - Basic voting system
- **[Hash Preimage](https://github.com/noir-lang/noir-examples/tree/master/hash_preimage)** - Prove knowledge of hash preimage
- **[Range Proof](https://github.com/noir-lang/noir-examples/tree/master/range_proof)** - Value within range

### Intermediate Projects
- **[Private Auction](https://github.com/noir-lang/noir-examples/tree/master/private_auction)** - Sealed-bid auctions
- **[Sudoku Solver](https://github.com/noir-lang/noir-examples/tree/master/sudoku)** - Prove sudoku solution
- **[Merkle Membership](https://github.com/noir-lang/noir-examples/tree/master/merkle_membership)** - Set membership proofs

### Advanced Projects
- **[Private DEX](https://github.com/AztecProtocol/aztec-packages/tree/master/noir-projects/noir-contracts)** - Decentralized exchange
- **[ZK-ML](https://github.com/noir-lang/noir-ml)** - Machine learning in ZK
- **[Recursive Proofs](https://github.com/noir-lang/noir-examples/tree/master/recursion)** - Proof composition

## 🌐 Ecosystem Projects

### Aztec Network
- **[Aztec Contracts](https://github.com/AztecProtocol/aztec-packages)** - Privacy-focused smart contracts
- **[Aztec.js](https://github.com/AztecProtocol/aztec-packages/tree/master/yarn-project/aztec.js)** - JavaScript SDK
- **[Aztec Sandbox](https://docs.aztec.network/dev_docs/sandbox)** - Local development environment

### Other Platforms
- **[Mina Protocol](https://minaprotocol.com/blog/noir-on-mina)** - Noir integration
- **[Polygon zkEVM](https://polygon.technology/blog/polygon-zkevm-integrates-noir)** - Layer 2 scaling
- **[StarkNet](https://www.starknet.io/blog/noir-starknet)** - Cairo integration

## 📖 Educational Resources

### Tutorials and Guides
- **[Zero-Knowledge Proofs: An Introduction](https://blog.cryptographyengineering.com/2014/11/27/zero-knowledge-proofs-illustrated-primer/)** - Conceptual overview
- **[PLONK Explained](https://vitalik.ca/general/2019/09/22/plonk.html)** - Proof system deep dive
- **[Circuit Design Patterns](https://0xparc.org/blog/zk-intro)** - Best practices

### Academic Papers
- **[PLONK Paper](https://eprint.iacr.org/2019/953.pdf)** - Original PLONK research
- **[Aztec Protocol](https://aztec.network/aztec.pdf)** - Privacy-focused blockchain
- **[Circuit Compilers](https://eprint.iacr.org/2019/1047.pdf)** - Compilation techniques

### Video Content
- **[ZK Study Club](https://www.youtube.com/c/ZeroKnowledgeStudyClub)** - Weekly presentations
- **[ZK Podcast](https://zeroknowledge.fm/)** - Industry interviews
- **[Noir Workshops](https://www.youtube.com/playlist?list=PLWACGbvIsEgnR2ub0wTHk0OYWKhham9wN)** - Hands-on tutorials

## 👥 Community

### Forums and Chat
- **[Noir Discord](https://discord.gg/noir)** - Official community chat
- **[GitHub Discussions](https://github.com/noir-lang/noir/discussions)** - Technical discussions
- **[Reddit r/noir](https://reddit.com/r/noir)** - Community forum

### Social Media
- **[Twitter @noir_lang](https://twitter.com/noir_lang)** - Official updates
- **[Noir Blog](https://noir-lang.org/blog)** - Development updates
- **[YouTube Channel](https://youtube.com/c/noirlang)** - Video tutorials

### Events and Conferences
- **[ZK Summit](https://zksummit.com/)** - Annual conference
- **[ETHGlobal Hackathons](https://ethglobal.com/)** - Regular hackathons
- **[Aztec Workshops](https://aztec.network/events)** - Developer workshops

## 🔧 Development Resources

### Testing and Debugging
- **[Noir Test Framework](https://noir-lang.org/docs/testing)** - Built-in testing
- **[Circuit Debugger](https://github.com/noir-lang/noir-debugger)** - Step-through debugging
- **[Constraint Analyzer](https://github.com/noir-lang/noir-analyzer)** - Performance profiling

### Deployment Tools
- **[Noir Deploy](https://github.com/noir-lang/noir-deploy)** - Contract deployment
- **[Circuit Registry](https://registry.noir-lang.org/)** - Verified circuits
- **[Proof Explorer](https://explorer.noir-lang.org/)** - Proof visualization

## 📊 Analytics and Monitoring

### Network Statistics
- **[Noir Metrics](https://metrics.noir-lang.org/)** - Usage statistics
- **[Circuit Analytics](https://analytics.noir-lang.org/)** - Performance data
- **[Ecosystem Dashboard](https://dashboard.noir-lang.org/)** - Project overview

## 🎯 Getting Involved

### Contributing
1. **[Contributing Guide](https://github.com/noir-lang/noir/blob/master/CONTRIBUTING.md)** - How to contribute
2. **[Good First Issues](https://github.com/noir-lang/noir/labels/good%20first%20issue)** - Beginner-friendly tasks
3. **[RFCs](https://github.com/noir-lang/rfcs)** - Language proposals

### Grants and Funding
- **[Aztec Grants](https://aztec.network/grants)** - Ecosystem funding
- **[Ethereum Foundation](https://ethereum.org/en/community/grants/)** - ZK research grants
- **[Protocol Labs](https://protocol.ai/grants/)** - Open source funding

---

*Keep this list growing! Submit PRs to add new resources.* 🚀
            `
        }
    };

    // Modal functionality
    window.loadDoc = function(docKey) {
        const doc = docs[docKey];
        if (!doc) return;
        
        document.getElementById('docTitle').textContent = doc.title;
        document.getElementById('docContent').innerHTML = markdownToHtml(doc.content);
        document.getElementById('docModal').style.display = 'block';
        
        // Add syntax highlighting to code blocks
        highlightCodeBlocks();
    };
    
    window.closeDocModal = function() {
        document.getElementById('docModal').style.display = 'none';
    };
    
    // Simple markdown to HTML converter
    function markdownToHtml(markdown) {
        return markdown
            // Headers
            .replace(/^### (.*$)/gim, '<h3>$1</h3>')
            .replace(/^## (.*$)/gim, '<h2>$1</h2>')
            .replace(/^# (.*$)/gim, '<h1>$1</h1>')
            // Bold
            .replace(/\*\*(.*)\*\*/gim, '<strong>$1</strong>')
            // Italic
            .replace(/\*(.*)\*/gim, '<em>$1</em>')
            // Code blocks
            .replace(/```(\w+)?\n([\s\S]*?)```/gim, '<pre><code class="language-$1">$2</code></pre>')
            // Inline code
            .replace(/`([^`]+)`/gim, '<code>$1</code>')
            // Links
            .replace(/\[([^\]]+)\]\(([^\)]+)\)/gim, '<a href="$2" target="_blank">$1</a>')
            // Line breaks
            .replace(/\n/gim, '<br>');
    }
    
    function highlightCodeBlocks() {
        const codeBlocks = document.querySelectorAll('#docContent code');
        codeBlocks.forEach(block => {
            // Keep code as plain text to avoid HTML injection
            // CSS handles the styling
            block.style.fontFamily = "'Monaco', 'Menlo', 'Ubuntu Mono', monospace";
            block.style.fontSize = "0.9rem";
        });
    }
    
    // Close modal when clicking outside
    window.onclick = function(event) {
        const modal = document.getElementById('docModal');
        if (event.target === modal) {
            closeDocModal();
        }
    };
});
