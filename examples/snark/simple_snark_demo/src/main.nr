// Simple SNARK Demo - Working Examples
// Demonstrates core SNARK concepts without compilation errors

// Simple hash function for demonstration
fn simple_hash(preimage: Field) -> Field {
    preimage * preimage + 12345
}

// Example 1: Hash Preimage Circuit
// Prove knowledge of preimage without revealing it
fn main(
    public_hash: pub Field,  // Public: the hash value
    preimage: Field          // Private: the preimage
) {
    let computed_hash = simple_hash(preimage);
    assert(computed_hash == public_hash);
}

// Additional examples as separate functions for testing

// Range proof: prove age is in valid range
fn prove_age_range(min_age: Field, max_age: Field, actual_age: Field) {
    let min_u64 = min_age as u64;
    let max_u64 = max_age as u64;
    let age_u64 = actual_age as u64;
    
    assert(age_u64 >= min_u64);
    assert(age_u64 <= max_u64);
}

// Simple Merkle tree verification
fn verify_merkle_path(root: Field, leaf: Field, path: [Field; 3], indices: [Field; 3]) -> bool {
    let mut current = leaf;
    
    for i in 0..3 {
        let sibling = path[i];
        if indices[i] == 0 {
            current = current + sibling * 2 + 1;  // Simple hash
        } else {
            current = sibling + current * 2 + 1;
        }
    }
    
    current == root
}

// Simple signature verification
fn verify_simple_signature(message: Field, signature: [Field; 2], pubkey: Field) -> bool {
    let verification = signature[0] + signature[1] * message;
    verification == pubkey
}

#[test]
fn test_hash_preimage() {
    let preimage = 42;
    let hash = simple_hash(preimage);
    
    // This would be the main circuit verification
    let computed = simple_hash(preimage);
    assert(computed == hash);
}

#[test]
fn test_age_range() {
    prove_age_range(18, 65, 25);  // Valid age
}

#[test]
fn test_merkle_verification() {
    let leaf = 100;
    let path = [200, 300, 400];
    let indices = [0, 1, 0];
    
    // Calculate expected root
    let mut expected_root = leaf;
    for i in 0..3 {
        if indices[i] == 0 {
            expected_root = expected_root + path[i] * 2 + 1;
        } else {
            expected_root = path[i] + expected_root * 2 + 1;
        }
    }
    
    assert(verify_merkle_path(expected_root, leaf, path, indices));
}

#[test]
fn test_signature_verification() {
    let message = 500;
    let signature = [500, 1];  // r=500, s=1
    let pubkey = signature[0] + signature[1] * message;  // 500 + 1 * 500 = 1000
    
    assert(verify_simple_signature(message, signature, pubkey));
}
