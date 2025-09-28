// SNARK Fundamentals Demo
// Exploring the core concepts: arithmetic circuits, statements, witnesses
// Based on the lecture content about SNARKs and zero-knowledge proofs

// Example 1: Hash Preimage Circuit
// Statement: "I know a message m such that SHA-256(m) = h"
// Public input (statement): h (the hash)
// Private input (witness): m (the preimage)

// Simple hash function for demonstration (not cryptographically secure)
fn simple_hash(preimage: Field) -> Field {
    // Simplified hash: just square and add a constant
    preimage * preimage + 12345
}

// Circuit 1: Hash Preimage Knowledge
// This proves "I know a preimage m such that hash(m) = public_hash"
fn prove_hash_preimage(
    public_hash: Field,  // Public statement
    preimage: Field      // Private witness
) {
    let computed_hash = simple_hash(preimage);
    assert(computed_hash == public_hash);
}

// Example 2: Range Proof Circuit
// Statement: "I know a value x such that 18 <= x <= 65"
// Public inputs: min_age, max_age
// Private input: actual_age
fn prove_age_in_range(
    min_age: Field,
    max_age: Field,
    actual_age: Field  // Private witness
) {
    // Prove age is at least min_age
    assert(actual_age as u64 >= min_age as u64);
    // Prove age is at most max_age  
    assert(actual_age as u64 <= max_age as u64);
}

// Example 3: Merkle Tree Membership
// Statement: "I know a leaf and path that proves membership in a Merkle tree"
// Public input: merkle_root
// Private inputs: leaf, path
struct MerkleProof {
    leaf: Field,
    path: [Field; 3],      // Sibling hashes for 3-level tree
    indices: [bool; 3],    // Direction indicators (left=false, right=true)
}

fn hash_pair(left: Field, right: Field) -> Field {
    // Simple hash function for Merkle tree
    left + right + 1
}

fn prove_merkle_membership(
    merkle_root: Field,
    proof: MerkleProof
) {
    let mut current_hash = proof.leaf;
    
    // Traverse up the tree
    for i in 0..3 {
        let sibling = proof.path[i];
        if proof.indices[i] {
            // Current node is on the right
            current_hash = hash_pair(sibling, current_hash);
        } else {
            // Current node is on the left
            current_hash = hash_pair(current_hash, sibling);
        }
    }
    
    assert(current_hash == merkle_root);
}

// Example 4: Digital Signature Verification
// Statement: "I know a signature that verifies against a public key and message"
// Public inputs: public_key, message_hash
// Private input: signature
struct SimpleSignature {
    r: Field,
    s: Field,
}

fn verify_signature(
    public_key: Field,
    message_hash: Field,
    signature: SimpleSignature  // Private witness
) {
    // Simplified signature verification (not real ECDSA)
    // In practice, this would involve elliptic curve operations
    let verification_value = signature.r + signature.s * message_hash;
    assert(verification_value == public_key);
}

// Example 5: Private Sum Circuit
// Statement: "I know values that sum to a public total"
// Public input: expected_sum
// Private inputs: individual values
fn prove_private_sum(
    expected_sum: Field,
    values: [Field; 5]  // Private witnesses
) {
    let mut sum = 0;
    for i in 0..5 {
        sum = sum + values[i];
    }
    assert(sum == expected_sum);
}

// Main circuit demonstrating multiple SNARK concepts
fn main(
    // Public statements (what the verifier knows)
    hash_challenge: pub Field,
    min_age: pub Field,
    max_age: pub Field,
    merkle_root: pub Field,
    public_key: pub Field,
    message_hash: pub Field,
    expected_sum: pub Field,
    
    // Private witnesses (what only the prover knows)
    hash_preimage: Field,
    age: Field,
    merkle_proof: MerkleProof,
    signature: SimpleSignature,
    private_values: [Field; 5]
) {
    // Prove knowledge of hash preimage
    prove_hash_preimage(hash_challenge, hash_preimage);
    
    // Prove age is in valid range (privacy-preserving age verification)
    prove_age_in_range(min_age, max_age, age);
    
    // Prove membership in Merkle tree
    prove_merkle_membership(merkle_root, merkle_proof);
    
    // Prove knowledge of valid signature
    verify_signature(public_key, message_hash, signature);
    
    // Prove knowledge of values that sum correctly
    prove_private_sum(expected_sum, private_values);
}

// Test cases demonstrating the concepts
#[test]
fn test_hash_preimage() {
    let preimage = 42;
    let hash = simple_hash(preimage);
    prove_hash_preimage(hash, preimage);
}

#[test]
fn test_age_range() {
    prove_age_in_range(18, 65, 25);  // Valid age
}

#[test]
fn test_merkle_proof() {
    // Build a simple 3-level Merkle tree
    let leaf = 100;
    let sibling1 = 200;
    let sibling2 = 300;
    let sibling3 = 400;
    
    // Calculate intermediate hashes
    let level1 = hash_pair(leaf, sibling1);
    let level2 = hash_pair(level1, sibling2);
    let root = hash_pair(level2, sibling3);
    
    let proof = MerkleProof {
        leaf,
        path: [sibling1, sibling2, sibling3],
        indices: [false, false, false]  // All left positions
    };
    
    prove_merkle_membership(root, proof);
}

#[test]
fn test_signature_verification() {
    let pub_key = 1000;
    let msg_hash = 500;
    // This would fail with invalid signature
    // let sig = SimpleSignature { r: 200, s: 1 };  // 200 + 1*500 = 700 != 1000
    // verify_signature(pub_key, msg_hash, sig);
    
    // Create valid signature
    let valid_sig = SimpleSignature { r: 500, s: 1 };  // 500 + 1*500 = 1000
    verify_signature(pub_key, msg_hash, valid_sig);
}

#[test]
fn test_private_sum() {
    let values = [10, 20, 30, 40, 50];  // Sum = 150
    prove_private_sum(150, values);
}
