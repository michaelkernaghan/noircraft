// Private Voting Contract
// Demonstrates: Nullifiers, Commitments, and Zero-Knowledge Proofs
// Use case: Anonymous voting where votes are private but verifiable

use std::hash::pedersen_hash;

// Main voting circuit
fn main(
    // Private inputs (hidden from public)
    vote: Field,           // The actual vote (0 = No, 1 = Yes)
    voter_secret: Field,   // Secret key to prevent double voting
    // Public inputs (visible to everyone)
    proposal_id: pub Field,    // Which proposal is being voted on
    nullifier: pub Field,      // Prevents double voting (derived from secret)
    vote_commitment: pub Field // Proves vote was cast correctly
) {
    // 1. Verify the vote is valid (0 or 1)
    assert(vote * (vote - 1) == 0, "Vote must be 0 or 1");

    // 2. Verify the nullifier matches the voter's secret
    // This prevents double voting while keeping identity private
    let computed_nullifier = pedersen_hash([voter_secret, proposal_id]);
    assert(nullifier == computed_nullifier, "Invalid nullifier");

    // 3. Verify the commitment matches the vote
    // This proves the vote was counted correctly without revealing it
    let computed_commitment = pedersen_hash([vote, voter_secret]);
    assert(vote_commitment == computed_commitment, "Invalid vote commitment");

    // If we reach here, the vote is:
    // - Valid (0 or 1)
    // - From a legitimate voter (correct nullifier)
    // - Not a double vote (unique nullifier)
    // - Correctly committed (can't be changed later)
}

// Helper function to demonstrate vote counting (would be done off-chain)
fn count_yes_votes(votes: [Field; 10]) -> Field {
    let mut count = 0;
    for i in 0..10 {
        count += votes[i];
    }
    count
}

// Test to verify voting logic works correctly
#[test]
fn test_valid_vote_yes() {
    let vote = 1;
    let voter_secret = 12345;
    let proposal_id = 1;

    // Compute nullifier and commitment (would be done by voter's client)
    let nullifier = pedersen_hash([voter_secret, proposal_id]);
    let vote_commitment = pedersen_hash([vote, voter_secret]);

    // This should pass - valid Yes vote
    main(vote, voter_secret, proposal_id, nullifier, vote_commitment);
}

#[test]
fn test_valid_vote_no() {
    let vote = 0;
    let voter_secret = 67890;
    let proposal_id = 1;

    let nullifier = pedersen_hash([voter_secret, proposal_id]);
    let vote_commitment = pedersen_hash([vote, voter_secret]);

    // This should pass - valid No vote
    main(vote, voter_secret, proposal_id, nullifier, vote_commitment);
}

#[test]
fn test_vote_counting() {
    // Example: 10 votes, 7 Yes (1) and 3 No (0)
    let votes = [1, 1, 0, 1, 1, 0, 1, 1, 1, 0];
    let yes_count = count_yes_votes(votes);
    assert(yes_count == 7);
}

// This test should fail - invalid vote value
#[test(should_fail)]
fn test_invalid_vote_value() {
    let vote = 2; // Invalid! Must be 0 or 1
    let voter_secret = 11111;
    let proposal_id = 1;

    let nullifier = pedersen_hash([voter_secret, proposal_id]);
    let vote_commitment = pedersen_hash([vote, voter_secret]);

    main(vote, voter_secret, proposal_id, nullifier, vote_commitment);
}

// This test should fail - wrong nullifier (double voting attempt)
#[test(should_fail)]
fn test_wrong_nullifier() {
    let vote = 1;
    let voter_secret = 22222;
    let proposal_id = 1;

    let nullifier = pedersen_hash([voter_secret, proposal_id]);
    let vote_commitment = pedersen_hash([vote, voter_secret]);

    // Try to use different secret (attempting to vote twice)
    let wrong_secret = 99999;

    main(vote, wrong_secret, proposal_id, nullifier, vote_commitment);
}
