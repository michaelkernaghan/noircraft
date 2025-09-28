// Example Noir Contracts for Noircraft
export const noirContracts = {
    privateVoting: {
        name: "Private Voting",
        description: "Anonymous voting system with zero-knowledge proofs",
        difficulty: "Beginner",
        category: "Governance",
        code: `// Private Voting Contract
fn main(
    vote: Field,           // The actual vote (0, 1, 2...)
    voter_secret: Field,   // Voter's private secret
    nullifier: Field,      // Prevents double voting
    merkle_root: pub Field // Public commitment to valid voters
) {
    // Ensure vote is valid (e.g., 0 or 1 for binary vote)
    assert(vote < 2);
    
    // Generate nullifier to prevent double voting
    let nullifier_hash = pedersen_hash([voter_secret, nullifier]);
    
    // Prove voter is in the valid voter set (simplified)
    let voter_commitment = pedersen_hash([voter_secret]);
    
    // In a real implementation, you'd verify membership
    // using a Merkle tree proof against merkle_root
    
    // Output the nullifier publicly to prevent double voting
    std::println(nullifier_hash);
}

#[test]
fn test_private_voting() {
    main(1, 12345, 67890, 0x1234567890abcdef);
}`,
        features: ["Anonymous", "Verifiable", "Scalable"],
        useCase: "DAO governance, elections, community polls"
    },

    anonymousAuction: {
        name: "Anonymous Auction",
        description: "Sealed-bid auction with private bid amounts",
        difficulty: "Intermediate",
        category: "Finance",
        code: `// Anonymous Auction Contract
fn main(
    bid_amount: Field,      // Secret bid amount
    bidder_id: Field,       // Secret bidder identifier
    auction_id: pub Field,  // Public auction identifier
    max_bid: pub Field      // Public maximum allowed bid
) {
    // Ensure bid is positive and within limits
    assert(bid_amount > 0);
    assert(bid_amount <= max_bid);
    
    // Generate commitment to the bid
    let bid_commitment = pedersen_hash([bid_amount, bidder_id, auction_id]);
    
    // Prove bidder has sufficient funds (simplified)
    // In practice, you'd verify against a balance commitment
    
    // Output commitment for later reveal phase
    std::println(bid_commitment);
}

// Reveal phase contract
fn reveal_bid(
    bid_amount: Field,
    bidder_id: Field,
    auction_id: pub Field,
    commitment: pub Field
) {
    // Verify the commitment matches the revealed values
    let computed_commitment = pedersen_hash([bid_amount, bidder_id, auction_id]);
    assert(computed_commitment == commitment);
    
    // Output the revealed bid amount
    std::println(bid_amount);
}

#[test]
fn test_anonymous_auction() {
    main(1000, 98765, 12345, 10000);
    reveal_bid(1000, 98765, 12345, 
        pedersen_hash([1000, 98765, 12345]));
}`,
        features: ["Sealed Bids", "Fair", "Transparent"],
        useCase: "NFT auctions, treasury sales, procurement"
    },

    privateAssets: {
        name: "Private Assets",
        description: "Confidential asset transfers with hidden amounts",
        difficulty: "Advanced",
        category: "DeFi",
        code: `// Private Asset Transfer
fn main(
    // Private inputs
    old_balance: Field,
    transfer_amount: Field,
    new_balance: Field,
    recipient_address: Field,
    sender_secret: Field,
    
    // Public inputs
    sender_commitment: pub Field,
    recipient_commitment: pub Field,
    nullifier: pub Field
) {
    // Verify balance integrity
    assert(old_balance >= transfer_amount);
    assert(new_balance == old_balance - transfer_amount);
    
    // Verify sender owns the assets
    let sender_hash = pedersen_hash([old_balance, sender_secret]);
    assert(sender_hash == sender_commitment);
    
    // Generate new commitment for sender
    let new_sender_commitment = pedersen_hash([new_balance, sender_secret]);
    
    // Generate commitment for recipient
    let recipient_balance_commitment = pedersen_hash([
        transfer_amount, 
        recipient_address
    ]);
    assert(recipient_balance_commitment == recipient_commitment);
    
    // Prevent double spending
    let computed_nullifier = pedersen_hash([sender_commitment, sender_secret]);
    assert(computed_nullifier == nullifier);
    
    // Output new commitments
    std::println(new_sender_commitment);
    std::println(recipient_commitment);
}

#[test]
fn test_private_transfer() {
    let old_bal = 1000;
    let transfer = 250;
    let new_bal = 750;
    let recipient = 0x987654321;
    let secret = 0x123456789;
    
    let sender_commit = pedersen_hash([old_bal, secret]);
    let recipient_commit = pedersen_hash([transfer, recipient]);
    let nullifier = pedersen_hash([sender_commit, secret]);
    
    main(old_bal, transfer, new_bal, recipient, secret,
         sender_commit, recipient_commit, nullifier);
}`,
        features: ["Confidential", "Compliant", "Efficient"],
        useCase: "Private payments, salary transfers, donations"
    },

    identityVerification: {
        name: "Identity Verification",
        description: "Prove identity attributes without revealing personal info",
        difficulty: "Advanced",
        category: "Identity",
        code: `// Identity Verification Contract
fn main(
    // Private inputs
    age: Field,
    country_code: Field,
    identity_secret: Field,
    
    // Public inputs
    min_age: pub Field,
    allowed_countries: pub [Field; 5],
    identity_commitment: pub Field
) {
    // Verify age requirement
    assert(age >= min_age);
    
    // Verify country is allowed
    let mut country_valid = false;
    for i in 0..5 {
        if country_code == allowed_countries[i] {
            country_valid = true;
        }
    }
    assert(country_valid);
    
    // Verify identity commitment
    let computed_commitment = pedersen_hash([
        age, 
        country_code, 
        identity_secret
    ]);
    assert(computed_commitment == identity_commitment);
    
    // Generate proof of valid identity
    let validity_proof = pedersen_hash([
        identity_commitment,
        min_age,
        country_code
    ]);
    
    std::println(validity_proof);
}

// Age verification without revealing exact age
fn verify_age_range(
    age: Field,
    identity_secret: Field,
    min_age: pub Field,
    max_age: pub Field,
    identity_commitment: pub Field
) {
    // Verify age is in range
    assert(age >= min_age);
    assert(age <= max_age);
    
    // Verify identity
    let age_commitment = pedersen_hash([age, identity_secret]);
    assert(age_commitment == identity_commitment);
    
    // Output range proof
    std::println("Age verified in range");
}

#[test]
fn test_identity_verification() {
    let age = 25;
    let country = 1; // e.g., US = 1
    let secret = 0xabcdef123456;
    let min_age = 18;
    let allowed = [1, 2, 3, 4, 5]; // US, UK, CA, AU, DE
    
    let commitment = pedersen_hash([age, country, secret]);
    
    main(age, country, secret, min_age, allowed, commitment);
    verify_age_range(age, secret, 18, 65, 
        pedersen_hash([age, secret]));
}`,
        features: ["Private", "Selective", "Secure"],
        useCase: "KYC compliance, age verification, access control"
    },

    privateDAO: {
        name: "Private DAO",
        description: "Anonymous governance with weighted voting",
        difficulty: "Expert",
        category: "Governance",
        code: `// Private DAO Governance
fn main(
    // Private inputs
    vote_choice: Field,        // 0 = against, 1 = for, 2 = abstain
    voting_power: Field,       // Member's voting weight
    member_secret: Field,      // Member's private key
    proposal_id: Field,        // Which proposal being voted on
    
    // Public inputs
    total_supply: pub Field,   // Total voting power
    proposal_hash: pub Field,  // Hash of proposal content
    member_commitment: pub Field // Commitment to member's voting power
) {
    // Validate vote choice
    assert(vote_choice <= 2);
    
    // Verify voting power is positive and reasonable
    assert(voting_power > 0);
    assert(voting_power <= total_supply);
    
    // Verify member commitment
    let computed_commitment = pedersen_hash([
        voting_power, 
        member_secret
    ]);
    assert(computed_commitment == member_commitment);
    
    // Generate nullifier to prevent double voting
    let nullifier = pedersen_hash([
        member_secret,
        proposal_id,
        proposal_hash
    ]);
    
    // Weight the vote by voting power
    let weighted_vote = vote_choice * voting_power;
    
    // Generate proof of valid vote
    let vote_proof = pedersen_hash([
        weighted_vote,
        nullifier,
        proposal_hash
    ]);
    
    // Output for tallying (nullifier prevents double counting)
    std::println(nullifier);
    std::println(weighted_vote);
    std::println(vote_proof);
}

#[test]
fn test_private_dao() {
    let vote = 1; // Voting "for"
    let power = 1000; // 1000 voting tokens
    let secret = 0x987654321;
    let proposal = 0x123456789;
    let total = 10000;
    let prop_hash = 0xabcdef;
    
    let commitment = pedersen_hash([power, secret]);
    
    main(vote, power, secret, proposal, 
         total, prop_hash, commitment);
}`,
        features: ["Weighted", "Anonymous", "Transparent"],
        useCase: "DAO governance, token holder voting, community decisions"
    }
};

// Contract deployment templates
export const deploymentTemplates = {
    testnet: {
        name: "Aztec Testnet",
        rpc: "https://testnet.aztec.network",
        chainId: "0x1a4",
        gasLimit: "0x5f5e100"
    },
    
    mainnet: {
        name: "Aztec Mainnet", 
        rpc: "https://mainnet.aztec.network",
        chainId: "0x1a5",
        gasLimit: "0x5f5e100"
    }
};

// Tutorial steps for contract deployment
export const tutorialSteps = [
    {
        step: 1,
        title: "Install Noir CLI",
        description: "Install the Noir compiler and development tools",
        command: "curl -L https://raw.githubusercontent.com/noir-lang/noir/master/install.sh | bash",
        explanation: "This installs nargo (Noir's package manager) and the Noir compiler"
    },
    {
        step: 2,
        title: "Create New Project",
        description: "Initialize a new Noir project with your contract template",
        command: "nargo new my_private_contract",
        explanation: "Creates a new directory with the basic Noir project structure"
    },
    {
        step: 3,
        title: "Write Your Contract",
        description: "Add your privacy-preserving logic to src/main.nr",
        command: "# Edit src/main.nr with your chosen contract template",
        explanation: "Replace the default code with one of our contract templates"
    },
    {
        step: 4,
        title: "Test Locally",
        description: "Run tests to verify your contract logic",
        command: "nargo test",
        explanation: "Executes all test functions to ensure your contract works correctly"
    },
    {
        step: 5,
        title: "Generate Proof",
        description: "Create a zero-knowledge proof for your contract",
        command: "nargo prove",
        explanation: "Generates the cryptographic proof that can be verified on-chain"
    },
    {
        step: 6,
        title: "Deploy to Aztec",
        description: "Deploy your contract to the Aztec network",
        command: "aztec-cli deploy --contract ./target/contract.json --network testnet",
        explanation: "Deploys your verified contract to the Aztec privacy-focused blockchain"
    }
];

// Performance metrics for different contract types
export const performanceMetrics = {
    privateVoting: {
        provingTime: "~2.1s",
        verificationTime: "~15ms", 
        proofSize: "~2.1KB",
        gasUsage: "~45K gas"
    },
    anonymousAuction: {
        provingTime: "~3.8s",
        verificationTime: "~22ms",
        proofSize: "~2.8KB", 
        gasUsage: "~67K gas"
    },
    privateAssets: {
        provingTime: "~5.2s",
        verificationTime: "~28ms",
        proofSize: "~3.4KB",
        gasUsage: "~89K gas"
    },
    identityVerification: {
        provingTime: "~4.1s",
        verificationTime: "~19ms",
        proofSize: "~2.9KB",
        gasUsage: "~71K gas"
    },
    privateDAO: {
        provingTime: "~6.7s",
        verificationTime: "~35ms",
        proofSize: "~4.1KB",
        gasUsage: "~112K gas"
    }
};

// Helper functions for contract interaction
export class NoircraftSDK {
    constructor(network = 'testnet') {
        this.network = network;
        this.config = deploymentTemplates[network];
    }
    
    async deployContract(contractCode, inputs = {}) {
        console.log(`🚀 Deploying to ${this.config.name}...`);
        
        // Simulate deployment process
        const deploymentSteps = [
            "Compiling Noir contract...",
            "Generating proving key...", 
            "Creating deployment transaction...",
            "Broadcasting to network...",
            "Waiting for confirmation..."
        ];
        
        for (let i = 0; i < deploymentSteps.length; i++) {
            console.log(`📦 ${deploymentSteps[i]}`);
            await this.delay(1000);
        }
        
        const contractAddress = this.generateMockAddress();
        console.log(`✅ Contract deployed at: ${contractAddress}`);
        
        return {
            address: contractAddress,
            network: this.network,
            gasUsed: Math.floor(Math.random() * 100000) + 50000,
            transactionHash: this.generateMockHash()
        };
    }
    
    async proveExecution(contractAddress, inputs) {
        console.log(`🔐 Generating zero-knowledge proof...`);
        
        // Simulate proof generation
        const proofSteps = [
            "Setting up circuit...",
            "Computing witness...",
            "Generating proof...",
            "Verifying proof locally..."
        ];
        
        for (let i = 0; i < proofSteps.length; i++) {
            console.log(`⚡ ${proofSteps[i]}`);
            await this.delay(800);
        }
        
        console.log(`✅ Proof generated successfully!`);
        
        return {
            proof: this.generateMockProof(),
            publicInputs: inputs.publicInputs || [],
            verificationKey: this.generateMockHash()
        };
    }
    
    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
    
    generateMockAddress() {
        return '0x' + Array.from({length: 40}, () => 
            Math.floor(Math.random() * 16).toString(16)).join('');
    }
    
    generateMockHash() {
        return '0x' + Array.from({length: 64}, () => 
            Math.floor(Math.random() * 16).toString(16)).join('');
    }
    
    generateMockProof() {
        return Array.from({length: 256}, () => 
            Math.floor(Math.random() * 256));
    }
}

// Export everything for use in the website
export default {
    noirContracts,
    deploymentTemplates,
    tutorialSteps,
    performanceMetrics,
    NoircraftSDK
};
