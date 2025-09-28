// Examples page functionality for Noircraft
document.addEventListener('DOMContentLoaded', function() {
    
    // Example code database - maps to actual files in the examples/ directory
    const examples = {
        simple_snark: {
            title: "Simple SNARK Demo",
            fileName: "main.nr",
            description: "This example demonstrates the fundamental concepts of zero-knowledge proofs using Noir. It shows how to create a basic circuit that proves knowledge of a secret without revealing it.",
            code: `// Simple SNARK Demo - Basic Zero-Knowledge Proof
use dep::std;

fn main(secret: Field, public_hash: pub Field) {
    // Prove we know the secret that hashes to public_hash
    // without revealing the secret itself
    
    let computed_hash = std::hash::pedersen_hash([secret]);
    assert(computed_hash[0] == public_hash);
    
    // Additional constraint: secret must be within a certain range
    assert(secret < 1000000);
    
    std::println("✅ Proof verified: Secret knowledge confirmed!");
}

#[test]
fn test_simple_snark() {
    let secret = 12345;
    let hash = std::hash::pedersen_hash([secret]);
    main(secret, hash[0]);
}`
        },
        
        snark_fundamentals: {
            title: "SNARK Fundamentals Demo",
            fileName: "main.nr",
            description: "Advanced SNARK concepts including constraint systems, witness generation, and circuit optimization techniques.",
            code: `// SNARK Fundamentals - Advanced Concepts
use dep::std;

// Demonstrate multiple constraint types and optimizations
fn main(
    private_input: Field,
    public_output: pub Field,
    range_proof_value: Field,
    merkle_root: pub Field
) {
    // 1. Hash constraint
    let hash_result = std::hash::pedersen_hash([private_input]);
    
    // 2. Range proof - prove value is within bounds
    assert(range_proof_value > 0);
    assert(range_proof_value < 100);
    
    // 3. Arithmetic constraints
    let computation = private_input * range_proof_value + 42;
    assert(computation == public_output);
    
    // 4. Merkle tree membership proof (simplified)
    let leaf_hash = std::hash::pedersen_hash([private_input]);
    // In practice, you'd verify the full Merkle path
    
    // 5. Conditional logic
    if range_proof_value > 50 {
        assert(private_input > 1000);
    } else {
        assert(private_input > 100);
    }
    
    std::println("🔬 Advanced SNARK constraints verified!");
}

// Helper function for circuit optimization
fn optimized_multiply(a: Field, b: Field) -> Field {
    // Use efficient multiplication strategies
    a * b
}

#[test] 
fn test_snark_fundamentals() {
    snark_fundamentals_demo(1234, 53508, 75, 0);
}`
        },
        
        aztec_privacy: {
            title: "Aztec Privacy Demo",
            fileName: "main.nr",
            description: "Demonstrates private transactions and confidential asset management on the Aztec network.",
            code: `// Aztec Privacy Demo - Confidential Transactions
use dep::std;

// Private asset transfer with hidden amounts
fn main(
    // Private inputs (hidden from public)
    sender_balance: Field,
    transfer_amount: Field,
    recipient_address: Field,
    sender_secret: Field,
    
    // Public inputs (visible on-chain)
    sender_commitment: pub Field,
    recipient_commitment: pub Field,
    nullifier: pub Field
) {
    // 1. Verify sender has sufficient balance
    assert(sender_balance >= transfer_amount);
    
    // 2. Verify sender ownership through commitment
    let sender_hash = std::hash::pedersen_hash([sender_balance, sender_secret]);
    assert(sender_hash[0] == sender_commitment);
    
    // 3. Generate new commitment for recipient
    let recipient_hash = std::hash::pedersen_hash([transfer_amount, recipient_address]);
    assert(recipient_hash[0] == recipient_commitment);
    
    // 4. Prevent double spending with nullifier
    let computed_nullifier = std::hash::pedersen_hash([sender_commitment, sender_secret]);
    assert(computed_nullifier[0] == nullifier);
    
    // 5. Ensure transfer amount is positive
    assert(transfer_amount > 0);
    
    std::println("🔐 Private transfer verified on Aztec!");
}

#[test]
fn test_aztec_privacy() {
    let balance = 1000;
    let amount = 250;
    let recipient = 0x123456789;
    let secret = 0xabcdef;
    
    let sender_commit = std::hash::pedersen_hash([balance, secret]);
    let recipient_commit = std::hash::pedersen_hash([amount, recipient]);
    let nullifier = std::hash::pedersen_hash([sender_commit[0], secret]);
    
    main(balance, amount, recipient, secret, 
         sender_commit[0], recipient_commit[0], nullifier[0]);
}`
        },
        
        bls_attestation: {
            title: "BLS Attestation Demo",
            fileName: "main.nr",
            description: "Basic BLS signature verification for attestations and consensus mechanisms.",
            code: `// BLS Attestation Demo - Signature Verification
use dep::std;

// Verify BLS signature for attestation
fn main(
    message: Field,
    signature: [Field; 2], // BLS signature components
    public_key: [Field; 2], // BLS public key
    is_valid: pub Field     // Public verification result
) {
    // 1. Hash the message for signing
    let message_hash = std::hash::pedersen_hash([message]);
    
    // 2. Verify BLS signature (simplified for demo)
    // In practice, this would use proper BLS curve operations
    let verification_result = verify_bls_signature(
        message_hash[0], 
        signature, 
        public_key
    );
    
    // 3. Assert signature is valid
    assert(verification_result == is_valid);
    assert(is_valid == 1); // Must be valid
    
    std::println("🔑 BLS signature verified successfully!");
}

// Simplified BLS verification (placeholder for actual BLS ops)
fn verify_bls_signature(
    message_hash: Field,
    signature: [Field; 2],
    public_key: [Field; 2]
) -> Field {
    // This would implement actual BLS verification
    // For demo purposes, we'll do a simplified check
    let combined = message_hash + signature[0] + public_key[0];
    if combined > 0 { 1 } else { 0 }
}

#[test]
fn test_bls_attestation() {
    let msg = 0x1234567890abcdef;
    let sig = [0xabcdef123456, 0x987654321fed];
    let pubkey = [0x1111222233334444, 0x5555666677778888];
    
    main(msg, sig, pubkey, 1);
}`
        }
    };

    // Modal functionality
    window.showExample = function(exampleKey) {
        const example = examples[exampleKey];
        if (!example) return;
        
        document.getElementById('modalTitle').textContent = example.title;
        document.getElementById('codeFileName').textContent = example.fileName;
        document.getElementById('codeContent').textContent = example.code;
        document.getElementById('exampleDescription').textContent = example.description;
        
        document.getElementById('codeModal').style.display = 'block';
        
        // Syntax highlighting
        highlightCode();
    };
    
    window.closeModal = function() {
        document.getElementById('codeModal').style.display = 'none';
    };
    
    window.copyCode = function() {
        const code = document.getElementById('codeContent').textContent;
        navigator.clipboard.writeText(code).then(() => {
            // Show success message
            const btn = event.target;
            const originalText = btn.textContent;
            btn.textContent = 'Copied!';
            btn.style.background = 'var(--primary-blue)';
            
            setTimeout(() => {
                btn.textContent = originalText;
                btn.style.background = '';
            }, 2000);
        });
    };
    
    window.downloadExample = function() {
        const code = document.getElementById('codeContent').textContent;
        const fileName = document.getElementById('codeFileName').textContent;
        
        const blob = new Blob([code], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = fileName;
        a.click();
        URL.revokeObjectURL(url);
    };
    
    // Simple syntax highlighting
    function highlightCode() {
        const codeElement = document.getElementById('codeContent');
        let code = codeElement.textContent;
        
        // Highlight keywords
        code = code.replace(/\b(fn|let|assert|use|dep|pub|Field|if|else|test)\b/g, 
            '<span style="color: #ff6b9d;">$1</span>');
        
        // Highlight types and functions
        code = code.replace(/\b(main|std|hash|pedersen_hash|println)\b/g, 
            '<span style="color: #4ecdc4;">$1</span>');
        
        // Highlight comments
        code = code.replace(/\/\/.*$/gm, '<span style="color: #95a5a6;">$&</span>');
        
        // Highlight numbers
        code = code.replace(/\b\d+\b/g, '<span style="color: #f39c12;">$&</span>');
        
        // Highlight strings
        code = code.replace(/"[^"]*"/g, '<span style="color: #2ecc71;">$&</span>');
        
        codeElement.innerHTML = code;
    }
    
    // Close modal when clicking outside
    window.onclick = function(event) {
        const modal = document.getElementById('codeModal');
        if (event.target === modal) {
            closeModal();
        }
    };
    
    // Smooth scrolling for navigation
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});
