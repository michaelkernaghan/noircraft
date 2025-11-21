// Helper to compute hash values for Prover.toml
use std::hash::pedersen_hash;

fn main(vote: Field, voter_secret: Field, proposal_id: pub Field) -> pub (Field, Field) {
    let nullifier = pedersen_hash([voter_secret, proposal_id]);
    let vote_commitment = pedersen_hash([vote, voter_secret]);
    (nullifier, vote_commitment)
}

#[test]
fn test_compute() {
    let vote = 1;
    let voter_secret = 12345;
    let proposal_id = 1;
    let (nullifier, commitment) = main(vote, voter_secret, proposal_id);
    std::println(nullifier);
    std::println(commitment);
}
