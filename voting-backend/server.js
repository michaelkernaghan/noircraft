/**
 * Private Voting DApp - Backend API
 * Connects frontend to Aztec blockchain
 */

require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors({
    origin: process.env.FRONTEND_URL || '*',
    credentials: true
}));
app.use(express.json());

// Configuration
const CONFIG = {
    aztecRpcUrl: process.env.AZTEC_RPC_URL || 'https://api.aztec.network',
    network: process.env.AZTEC_NETWORK || 'testnet',
    contractAddress: process.env.CONTRACT_ADDRESS,
    mode: process.env.MODE || 'development'
};

// Validate required environment variables
if (!CONFIG.contractAddress && CONFIG.mode === 'production') {
    console.warn('WARNING: CONTRACT_ADDRESS not set. Running in development mode.');
}

// In-memory storage for demo mode
const voteStorage = {
    nullifiers: new Set(),
    votes: new Map(),
    totals: new Map()
};

/**
 * Health check endpoint
 */
app.get('/api/health', (req, res) => {
    res.json({
        status: 'ok',
        mode: CONFIG.mode,
        network: CONFIG.network,
        timestamp: new Date().toISOString()
    });
});

/**
 * Submit a vote
 * POST /api/vote
 */
app.post('/api/vote', async (req, res) => {
    try {
        const { proposal_id, nullifier, commitment, proof } = req.body;

        // Validate input
        if (!proposal_id || !nullifier || !commitment || !proof) {
            return res.status(400).json({
                error: 'Missing required fields',
                required: ['proposal_id', 'nullifier', 'commitment', 'proof']
            });
        }

        // Check if already voted (demo mode)
        if (voteStorage.nullifiers.has(nullifier)) {
            return res.status(409).json({
                error: 'Vote already cast',
                message: 'This nullifier has already been used'
            });
        }

        // In production mode, submit to Aztec
        if (CONFIG.mode === 'production' && CONFIG.contractAddress) {
            // TODO: Integrate with Aztec SDK
            // const aztecClient = await createAztecClient({ rpcUrl: CONFIG.aztecRpcUrl });
            // const tx = await submitToAztec({ proposal_id, nullifier, commitment, proof });

            return res.status(501).json({
                error: 'Production mode not yet implemented',
                message: 'Aztec SDK integration coming soon'
            });
        }

        // Demo mode: Store locally
        voteStorage.nullifiers.add(nullifier);
        voteStorage.votes.set(nullifier, {
            proposal_id,
            commitment,
            timestamp: Date.now()
        });

        // Update totals
        const currentTotal = voteStorage.totals.get(proposal_id) || 0;
        voteStorage.totals.set(proposal_id, currentTotal + 1);

        // Generate mock transaction hash
        const txHash = '0x' + generateRandomHex(64);

        res.json({
            success: true,
            txHash,
            mode: 'demo',
            message: 'Vote recorded in demo mode'
        });

    } catch (error) {
        console.error('Error submitting vote:', error);
        res.status(500).json({
            error: 'Internal server error',
            message: error.message
        });
    }
});

/**
 * Check if a nullifier has been used
 * GET /api/has-voted/:nullifier
 */
app.get('/api/has-voted/:nullifier', async (req, res) => {
    try {
        const { nullifier } = req.params;

        if (!nullifier) {
            return res.status(400).json({
                error: 'Nullifier required'
            });
        }

        // Check in demo storage
        const hasVoted = voteStorage.nullifiers.has(nullifier);

        res.json({
            hasVoted,
            mode: CONFIG.mode
        });

    } catch (error) {
        console.error('Error checking voting status:', error);
        res.status(500).json({
            error: 'Internal server error',
            message: error.message
        });
    }
});

/**
 * Get voting results for a proposal
 * GET /api/results/:proposalId
 */
app.get('/api/results/:proposalId', async (req, res) => {
    try {
        const proposalId = parseInt(req.params.proposalId);

        if (isNaN(proposalId)) {
            return res.status(400).json({
                error: 'Invalid proposal ID'
            });
        }

        // Get from demo storage
        const total = voteStorage.totals.get(proposalId) || 0;

        res.json({
            proposal_id: proposalId,
            total,
            mode: CONFIG.mode,
            timestamp: new Date().toISOString()
        });

    } catch (error) {
        console.error('Error fetching results:', error);
        res.status(500).json({
            error: 'Internal server error',
            message: error.message
        });
    }
});

/**
 * Get all proposals
 * GET /api/proposals
 */
app.get('/api/proposals', async (req, res) => {
    try {
        // Mock proposals for demo
        const proposals = [
            {
                id: 1,
                title: 'Should we increase the community fund allocation by 20%?',
                description: 'This proposal suggests increasing the community fund from 100,000 tokens to 120,000 tokens to support more community initiatives and grants.',
                status: 'active',
                endDate: '2025-12-31',
                totalVotes: voteStorage.totals.get(1) || 0
            }
        ];

        res.json({
            proposals,
            mode: CONFIG.mode
        });

    } catch (error) {
        console.error('Error fetching proposals:', error);
        res.status(500).json({
            error: 'Internal server error',
            message: error.message
        });
    }
});

/**
 * Reset demo data (development only)
 * POST /api/reset
 */
app.post('/api/reset', (req, res) => {
    if (CONFIG.mode === 'production') {
        return res.status(403).json({
            error: 'Reset not available in production mode'
        });
    }

    voteStorage.nullifiers.clear();
    voteStorage.votes.clear();
    voteStorage.totals.clear();

    res.json({
        success: true,
        message: 'Demo data reset successfully'
    });
});

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

// Error handling middleware
app.use((err, req, res, next) => {
    console.error('Unhandled error:', err);
    res.status(500).json({
        error: 'Internal server error',
        message: err.message
    });
});

// 404 handler
app.use((req, res) => {
    res.status(404).json({
        error: 'Not found',
        message: `Route ${req.method} ${req.path} not found`
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`
╔═══════════════════════════════════════════════════╗
║   Private Voting API Server                      ║
╠═══════════════════════════════════════════════════╣
║   Port:     ${PORT}                                    ║
║   Mode:     ${CONFIG.mode}                            ║
║   Network:  ${CONFIG.network}                         ║
║   Status:   Running                               ║
╚═══════════════════════════════════════════════════╝

API Endpoints:
  GET  /api/health
  POST /api/vote
  GET  /api/has-voted/:nullifier
  GET  /api/results/:proposalId
  GET  /api/proposals
  POST /api/reset (dev only)

Ready to accept requests!
    `);
});

module.exports = app;
