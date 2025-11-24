// Private Voting Contract for Aztec
// Simplified version that works with Aztec sandbox

contract VotingContract {
    use dep::aztec::{
        prelude::{AztecAddress, PrivateContext, Map, PublicMutable},
        protocol_types::traits::Serialize,
    };

    // Storage
    struct Storage {
        // Track nullifiers to prevent double voting
        nullifiers: Map<Field, PublicMutable<bool>>,
        // Vote counts
        yes_votes: PublicMutable<u64>,
        no_votes: PublicMutable<u64>,
    }

    // Constructor
    #[aztec(private)]
    fn constructor() {}

    // Cast a private vote
    #[aztec(private)]
    fn cast_vote(
        vote: Field,  // 0 = No, 1 = Yes
        nullifier: Field,  // Prevents double voting
    ) {
        // Verify vote is valid (0 or 1)
        assert((vote == 0) | (vote == 1), "Vote must be 0 or 1");

        // Check nullifier hasn't been used (in public)
        VotingContract::at(context.this_address())._check_nullifier(nullifier).enqueue(&mut context);

        // Record the nullifier (in public)
        VotingContract::at(context.this_address())._record_nullifier(nullifier).enqueue(&mut context);

        // Increment vote count (in public)
        VotingContract::at(context.this_address())._increment_vote(vote).enqueue(&mut context);
    }

    // Internal function to check if nullifier was used
    #[aztec(public)]
    internal fn _check_nullifier(nullifier: Field) {
        let used = storage.nullifiers.at(nullifier).read();
        assert(used == false, "Already voted");
    }

    // Internal function to record nullifier
    #[aztec(public)]
    internal fn _record_nullifier(nullifier: Field) {
        storage.nullifiers.at(nullifier).write(true);
    }

    // Internal function to increment vote count
    #[aztec(public)]
    internal fn _increment_vote(vote: Field) {
        if (vote == 1) {
            let current = storage.yes_votes.read();
            storage.yes_votes.write(current + 1);
        } else {
            let current = storage.no_votes.read();
            storage.no_votes.write(current + 1);
        }
    }

    // Public function to get vote counts
    #[aztec(public)]
    fn get_results() -> (u64, u64) {
        let yes = storage.yes_votes.read();
        let no = storage.no_votes.read();
        (yes, no)
    }

    // Unconstrained view function to get results
    unconstrained fn view_results() -> pub (u64, u64) {
        let yes = storage.yes_votes.read();
        let no = storage.no_votes.read();
        (yes, no)
    }
}
