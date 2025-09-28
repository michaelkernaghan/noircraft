// Aztec Wallet Integration for Noircraft
// This would be a more advanced implementation

class NoircraftWallet {
    constructor() {
        this.connected = false;
        this.address = null;
        this.aztecWallet = null;
    }

    async connectWallet() {
        try {
            // Check if Aztec wallet is available
            if (typeof window.aztec === 'undefined') {
                throw new Error('Aztec wallet not detected. Please install an Aztec-compatible wallet.');
            }

            // Request wallet connection
            const accounts = await window.aztec.request({
                method: 'aztec_requestAccounts'
            });

            if (accounts.length === 0) {
                throw new Error('No accounts found. Please create an account in your Aztec wallet.');
            }

            this.address = accounts[0];
            this.connected = true;
            this.aztecWallet = window.aztec;

            // Update UI
            this.updateConnectionStatus();
            
            console.log('✅ Wallet connected:', this.address);
            return this.address;

        } catch (error) {
            console.error('❌ Wallet connection failed:', error.message);
            this.showConnectionError(error.message);
            throw error;
        }
    }

    async deployContract(contractCode, inputs = {}) {
        if (!this.connected) {
            throw new Error('Please connect your wallet first');
        }

        try {
            // Compile Noir contract (this would need actual Noir compiler integration)
            const compiledContract = await this.compileNoirContract(contractCode);
            
            // Deploy to Aztec network
            const deployTx = await this.aztecWallet.request({
                method: 'aztec_deployContract',
                params: {
                    bytecode: compiledContract.bytecode,
                    abi: compiledContract.abi,
                    constructorArgs: inputs,
                    gasLimit: '0x5f5e100'
                }
            });

            console.log('🚀 Contract deployment initiated:', deployTx);
            return deployTx;

        } catch (error) {
            console.error('❌ Contract deployment failed:', error.message);
            throw error;
        }
    }

    async compileNoirContract(contractCode) {
        // This would integrate with Noir compiler
        // For now, return mock compiled contract
        return {
            bytecode: '0x608060405234801561001057600080fd5b50...', // Mock bytecode
            abi: [
                {
                    "inputs": [],
                    "name": "main",
                    "outputs": [],
                    "stateMutability": "nonpayable",
                    "type": "function"
                }
            ]
        };
    }

    updateConnectionStatus() {
        const connectBtn = document.querySelector('.btn-secondary');
        if (connectBtn && this.connected) {
            connectBtn.textContent = `${this.address.slice(0, 6)}...${this.address.slice(-4)}`;
            connectBtn.classList.add('connected');
        }
    }

    showConnectionError(message) {
        // Show user-friendly error message
        const errorDiv = document.createElement('div');
        errorDiv.className = 'wallet-error';
        errorDiv.innerHTML = `
            <div class="error-content">
                <h3>Wallet Connection Failed</h3>
                <p>${message}</p>
                <button onclick="this.parentElement.parentElement.remove()">Close</button>
            </div>
        `;
        document.body.appendChild(errorDiv);
    }

    disconnect() {
        this.connected = false;
        this.address = null;
        this.aztecWallet = null;
        
        const connectBtn = document.querySelector('.btn-secondary');
        if (connectBtn) {
            connectBtn.textContent = 'Connect Wallet';
            connectBtn.classList.remove('connected');
        }
    }
}

// Initialize wallet manager
const noircraftWallet = new NoircraftWallet();

// Export for global use
window.noircraftWallet = noircraftWallet;
