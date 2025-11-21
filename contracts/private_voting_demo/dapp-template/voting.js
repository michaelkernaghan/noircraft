/**
 * Private Voting DApp - Client-side Logic
 * Powered by Noir & Aztec
 */

// Configuration
const CONFIG = {
    apiUrl: 'http://localhost:3000/api',
    explorerUrl: 'https://explorer.aztec.network/tx/',
    proposalId: 1
};

// State
let voterSecret = null;
let walletConnected = false;

/**
 * Initialize the application
 */
function init() {
    // Load or generate voter secret
    voterSecret = localStorage.getItem('voterSecret');
    if (!voterSecret) {
        voterSecret = generateRandomSecret();
        localStorage.setItem('voterSecret', voterSecret);
    }

    // Check voting status
    checkVotingStatus();

    // Load vote counts
    loadVoteResults();

    // Set up wallet connection
    setupWalletConnection();
}

/**
 * Generate a random secret for the voter
 */
function generateRandomSecret() {
    return Math.floor(Math.random() * 1000000000).toString();
}

/**
 * Set up wallet connection
 */
function setupWalletConnection() {
    const connectButton = document.getElementById('connect-wallet');
    if (!connectButton) return;

    connectButton.addEventListener('click', async () => {
        try {
            // Check if MetaMask is installed
            if (typeof window.ethereum === 'undefined') {
                alert('Please install MetaMask to use this DApp');
                return;
            }

            // Request account access
            const accounts = await window.ethereum.request({
                method: 'eth_requestAccounts'
            });

            const address = accounts[0];
            walletConnected = true;

            // Update UI
            connectButton.style.display = 'none';
            const walletInfo = document.getElementById('wallet-info');
            const walletAddress = document.getElementById('wallet-address');

            walletAddress.textContent = `Connected: ${address.substring(0, 6)}...${address.substring(38)}`;
            walletInfo.style.display = 'block';

        } catch (error) {
            console.error('Error connecting wallet:', error);
            alert('Failed to connect wallet');
        }
    });
}

/**
 * Cast a vote
 * @param {number} vote - 0 for No, 1 for Yes
 */
async function castVote(vote) {
    try {
        // Hide voting buttons
        const votingButtons = document.getElementById('voting-buttons');
        const loading = document.getElementById('loading');
        votingButtons.style.display = 'none';
        loading.style.display = 'block';

        // Step 1: Compute cryptographic values
        updateLoadingMessage('Computing cryptographic values...');
        const nullifier = await computePedersenHash([voterSecret, CONFIG.proposalId]);
        const commitment = await computePedersenHash([vote, voterSecret]);

        // Step 2: Generate zero-knowledge proof
        updateLoadingMessage('Generating zero-knowledge proof...');
        await sleep(1500); // Simulate proof generation

        const proof = await generateProof({
            vote,
            voter_secret: voterSecret,
            proposal_id: CONFIG.proposalId,
            nullifier,
            vote_commitment: commitment
        });

        // Step 3: Submit to blockchain
        updateLoadingMessage('Submitting to blockchain...');
        await sleep(1000);

        const result = await submitVote({
            proposal_id: CONFIG.proposalId,
            nullifier,
            commitment,
            proof
        });

        // Success!
        showStatus('success', `Vote submitted successfully!`, result.txHash);

        // Reload vote counts
        setTimeout(() => loadVoteResults(), 2000);

    } catch (error) {
        console.error('Error casting vote:', error);
        showStatus('error', `Error: ${error.message}`);

        // Re-enable voting
        document.getElementById('voting-buttons').style.display = 'flex';
    } finally {
        document.getElementById('loading').style.display = 'none';
    }
}

/**
 * Compute Pedersen hash (mock implementation)
 * In production, use @noir-lang/noir_js
 */
async function computePedersenHash(inputs) {
    // Mock implementation - in production, use actual Noir.js library
    await sleep(100);

    const combined = inputs.join('-');
    let hash = 0;
    for (let i = 0; i < combined.length; i++) {
        hash = ((hash << 5) - hash) + combined.charCodeAt(i);
        hash = hash & hash;
    }

    return '0x' + Math.abs(hash).toString(16).padStart(64, '0');
}

/**
 * Generate zero-knowledge proof (mock implementation)
 * In production, use @noir-lang/noir_js
 */
async function generateProof(inputs) {
    // Mock implementation
    await sleep(2000);

    return {
        proof: '0x' + 'a'.repeat(128),
        publicInputs: [
            inputs.proposal_id.toString(),
            inputs.nullifier,
            inputs.vote_commitment
        ]
    };
}

/**
 * Submit vote to backend/blockchain
 */
async function submitVote(voteData) {
    // Mock implementation - in production, call actual API
    await sleep(1500);

    // Simulate success
    return {
        success: true,
        txHash: '0x' + generateRandomHex(64),
        message: 'Vote submitted successfully'
    };

    /* Production implementation:
    const response = await fetch(`${CONFIG.apiUrl}/vote`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(voteData)
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to submit vote');
    }

    return await response.json();
    */
}

/**
 * Check if user has already voted
 */
async function checkVotingStatus() {
    try {
        const nullifier = await computePedersenHash([voterSecret, CONFIG.proposalId]);

        // Mock check - in production, query actual blockchain
        const hasVoted = localStorage.getItem(`voted_${CONFIG.proposalId}`) === 'true';

        if (hasVoted) {
            document.getElementById('voting-buttons').style.display = 'none';
            showStatus('info', 'You have already voted on this proposal.');
        }

        /* Production implementation:
        const response = await fetch(`${CONFIG.apiUrl}/has-voted/${nullifier}`);
        const data = await response.json();

        if (data.hasVoted) {
            document.getElementById('voting-buttons').style.display = 'none';
            showStatus('info', 'You have already voted on this proposal.');
        }
        */
    } catch (error) {
        console.error('Error checking voting status:', error);
    }
}

/**
 * Load and display vote results
 */
async function loadVoteResults() {
    try {
        // Mock data - in production, query actual blockchain
        const totalVotes = Math.floor(Math.random() * 100) + 50;
        document.getElementById('total-votes').textContent = totalVotes;

        /* Production implementation:
        const response = await fetch(`${CONFIG.apiUrl}/results/${CONFIG.proposalId}`);
        const data = await response.json();
        document.getElementById('total-votes').textContent = data.total;
        */
    } catch (error) {
        console.error('Error loading results:', error);
    }
}

/**
 * Update loading message
 */
function updateLoadingMessage(message) {
    const loadingMessage = document.getElementById('loading-message');
    if (loadingMessage) {
        loadingMessage.textContent = message;
    }
}

/**
 * Show status message
 */
function showStatus(type, message, txHash = null) {
    const statusDiv = document.getElementById('status');
    const statusEmoji = document.getElementById('status-emoji');
    const statusMessage = document.getElementById('status-message');
    const txLink = document.getElementById('tx-link');

    statusDiv.style.display = 'block';
    statusMessage.textContent = message;

    // Set emoji and styling based on type
    switch (type) {
        case 'success':
            statusEmoji.textContent = '✓';
            statusDiv.style.background = '#e8f5e9';
            statusDiv.style.border = '2px solid #4CAF50';

            // Mark as voted
            localStorage.setItem(`voted_${CONFIG.proposalId}`, 'true');

            if (txHash) {
                txLink.href = CONFIG.explorerUrl + txHash;
                txLink.style.display = 'block';
            }
            break;

        case 'error':
            statusEmoji.textContent = '✗';
            statusDiv.style.background = '#ffebee';
            statusDiv.style.border = '2px solid #f44336';
            break;

        case 'info':
            statusEmoji.textContent = 'ℹ';
            statusDiv.style.background = '#e3f2fd';
            statusDiv.style.border = '2px solid #2196F3';
            break;
    }
}

/**
 * Utility: Sleep for ms milliseconds
 */
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Utility: Generate random hex string
 */
function generateRandomHex(length) {
    const chars = '0123456789abcdef';
    let result = '';
    for (let i = 0; i < length; i++) {
        result += chars[Math.floor(Math.random() * chars.length)];
    }
    return result;
}

// Initialize on page load
window.addEventListener('load', init);
