# 🎮 Noircraft.io

> **Privacy Contracts on the Aztec Blockchain**  
> *A World of Warcraft-inspired platform for deploying zero-knowledge smart contracts*

[![Website](https://img.shields.io/badge/Website-Live-brightgreen)](https://noircraft.io)
[![License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Noir](https://img.shields.io/badge/Noir-Latest-purple)](https://noir-lang.org)
[![Aztec](https://img.shields.io/badge/Aztec-Network-gold)](https://aztec.network)

## 🌟 Overview

Noircraft combines the epic fantasy aesthetic of World of Warcraft with cutting-edge zero-knowledge technology. Deploy privacy-preserving smart contracts on the Aztec network with an intuitive, game-inspired interface.

## 🎯 Features

- **🎮 WoW-Inspired Design**: Epic dark fantasy UI with custom branding
- **🔐 Privacy-First**: Zero-knowledge contracts powered by Noir
- **⚡ Ready-to-Deploy**: 5 production-ready contract templates
- **📱 Responsive**: Works perfectly on all devices
- **🚀 Production-Ready**: Optimized for Netlify deployment

## 🏗️ Project Structure

```
noircraft/
├── website/                    # Main Noircraft.io website
│   ├── index.html             # Landing page
│   ├── styles.css             # WoW-inspired styling
│   ├── script.js              # Interactive features
│   └── assets/                # Images and resources
├── contracts/                  # Noir contract templates
│   ├── templates/             # Ready-to-use contracts
│   └── demos/                 # Example implementations
├── examples/                   # Educational examples
│   ├── privacy/               # Privacy-preserving demos
│   ├── snark/                 # SNARK fundamentals
│   ├── aztec/                 # Aztec-specific examples
│   └── bls/                   # BLS signature demos
├── docs/                      # Documentation
│   ├── guides/                # Step-by-step tutorials
│   └── research/              # Technical research
└── assets/                    # Project assets (logos, images)
```

## 🚀 Quick Start

### 1. Clone Repository
```bash
git clone https://github.com/yourusername/noircraft.git
cd noircraft
```

### 2. Run Website Locally
```bash
cd website
npx serve -l 9000 .
# Open http://localhost:9000
```

### 3. Deploy to Netlify
- Push to GitHub
- Connect to Netlify
- Set publish directory: `website`
- Deploy!

## 🔐 Contract Templates

| Template | Description | Difficulty | Use Cases |
|----------|-------------|------------|-----------|
| **🗳️ Private Voting** | Anonymous voting with nullifiers | Beginner | DAOs, Elections |
| **🏛️ Anonymous Auctions** | Sealed-bid auctions | Intermediate | NFTs, Procurement |
| **💰 Private Assets** | Confidential transfers | Advanced | Payments, DeFi |
| **🔐 Identity Verification** | Zero-knowledge credentials | Advanced | KYC, Access Control |
| **🏛️ Private DAO** | Anonymous governance | Expert | Organizations |

## 🛠️ Development

### Prerequisites
- [Noir CLI](https://noir-lang.org/getting_started/nargo_installation)
- Node.js 18+ (for website)
- Git

### Install Noir
```bash
curl -L https://raw.githubusercontent.com/noir-lang/noir/master/install.sh | bash
```

### Create New Contract
```bash
cd contracts/templates
nargo new my_private_contract
cd my_private_contract
# Edit src/main.nr
nargo test
nargo prove
```

## 📚 Documentation

- **[Deployment Guide](DEPLOYMENT.md)** - How to deploy to Netlify
- **[Contract Templates](contracts/templates/)** - Ready-to-use Noir contracts
- **[Examples](examples/)** - Educational demos and tutorials
- **[Guides](docs/guides/)** - Step-by-step tutorials

## 🎮 Website Features

### 🎨 Design Elements
- **Dark Fantasy Theme**: Inspired by WoW's aesthetic
- **Custom Branding**: Unique Noircraft logo and imagery
- **Magical Animations**: Particle effects and smooth transitions
- **Interactive Elements**: Hover effects and dynamic content

### 🔧 Technical Features
- **Vanilla JS**: No framework dependencies
- **Responsive Design**: Mobile-first approach
- **Performance Optimized**: Fast loading times
- **SEO Ready**: Proper meta tags and structure

## 🌐 Live Website

Visit **[noircraft.io](https://noircraft.io)** to explore:
- Interactive contract templates
- Real-time deployment simulation
- Educational resources
- Community showcase

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **[Aztec Network](https://aztec.network)** - Privacy-focused blockchain
- **[Noir Language](https://noir-lang.org)** - Zero-knowledge programming
- **[World of Warcraft](https://worldofwarcraft.com)** - Design inspiration
- **Privacy Community** - Advancing ZK technology

---

<div align="center">

**🛡️ Forge Your Privacy. Craft Your Future. ⚔️**

*Built with ❤️ for the privacy-preserving future*

</div>
