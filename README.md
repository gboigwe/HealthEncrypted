# HealthEncrypted - Decentralized Healthcare Records Platform

A blockchain-based healthcare records management system built on the Stacks ecosystem using Clarity smart contracts and React.

## Table of Contents
- [Project Overview](#project-overview)
- [Architecture](#architecture)
- [Project Structure](#project-structure)
- [Smart Contracts](#smart-contracts)
- [Frontend Application](#frontend-application)
- [Getting Started](#getting-started)
- [Development](#development)
- [Testing](#testing)
- [Deployment](#deployment)
- [Security Features](#security-features)
- [Contributing](#contributing)

## Project Overview

HealthEncrypted is a decentralized application (dApp) that enables secure management of healthcare records on the Stacks blockchain. The platform revolutionizes healthcare data management by providing:

- Patient-controlled health records with granular access control
- Secure provider access management with role-based permissions
- Decentralized data storage ensuring data integrity and availability
- HIPAA-compliant data handling and privacy protection
- Immutable audit trails for all record access and modifications


![20241216_234041_0000](https://github.com/user-attachments/assets/5f9ebbfe-e072-4239-85cb-be371c79bcf5)

## Architecture

The project follows a modular architecture with clear separation of concerns:

```plaintext
HealthEncrypted/
├── contracts/              # Clarity smart contracts
├── secure-health-frontend/ # React frontend application
├── tests/                  # Contract test files
├── settings/              # Environment configurations
├── Clarinet.toml          # Clarity project configuration
└── package.json           # Project dependencies
```

## Project Structure

### Smart Contracts (`/contracts`)
- `PatientRecord.clar` - Main contract implementing:
  - Patient record management
  - Access control mechanisms
  - Healthcare provider verification
  - Data encryption standards

### Frontend Application (`/secure-health-frontend/src`)
```plaintext
src/
├── components/
│   ├── auth/              # Authentication components
│   │   ├── AuthGuard.tsx
│   │   ├── AuthStatus.tsx
│   │   ├── ConnectWallet.tsx
│   │   └── RoleGuard.tsx
│   ├── common/            # Reusable UI components
│   │   ├── Alert.tsx
│   │   ├── Button.tsx
│   │   ├── Input.tsx
│   │   └── Loading.tsx
│   ├── layout/           # Layout components
│   │   ├── Footer.tsx
│   │   ├── Header.tsx
│   │   ├── Layout.tsx
│   │   └── Sidebar.tsx
│   ├── patient/          # Patient-specific components
│   │   ├── AccessControl.tsx
│   │   ├── PatientRecords.tsx
│   │   ├── PatientRegistration.tsx
│   │   └── RecordUpdate.tsx
│   └── provider/         # Healthcare provider components
│       ├── PatientList.tsx
│       ├── ProviderRegistration.tsx
│       └── RecordView.tsx
├── contexts/             # React contexts
│   └── AuthContext.tsx
├── hooks/               # Custom React hooks
│   ├── useAuth.ts
│   ├── useContract.ts
│   └── useIPFS.ts
├── pages/               # Main application pages
│   ├── Dashboard.tsx
│   ├── Home.tsx
│   ├── PatientDashboard.tsx
│   └── ProviderDashboard.tsx
└── utils/               # Utility functions
    ├── constants.ts
    ├── helpers.ts
    └── types.ts
```

## Getting Started

### Prerequisites
- Node.js (v16.0.0 or later)
- npm (v8.0.0 or later)
- Clarinet (latest version)
- Stacks Wallet for authentication

### Installation

1. Clone the repository:
```bash
git clone https://github.com/gboigwe/HealthEncrypted.git
cd HealthEncrypted
```

2. Install project dependencies:
```bash
npm install
cd secure-health-frontend
npm install
```

3. Set up development environment:
```bash
# Configure Clarinet for smart contract development
clarinet integrate

# Start the frontend development server
cd secure-health-frontend
npm run dev
```

## Development

This project was developed with assistance from AI, which helped with:

- Smart contract architecture and optimization
- Frontend component structure and React hooks implementation
- TypeScript type definitions and interfaces
- Security pattern implementations
- Documentation and code comments
- Test case suggestions

All AI suggestions were carefully reviewed and validated to ensure code quality, security, and best practices. The final implementation decisions and critical security features were human-verified.

### Smart Contract Development
- Use Clarinet for contract testing and deployment
- Follow the Clarity best practices and patterns
- Test all functions thoroughly using the test suite

### Frontend Development
- Built with Vite + React + TypeScript
- Utilizes Tailwind CSS for styling
- Implements responsive design principles

## Testing

### Smart Contract Testing
```bash
# Run contract tests
clarinet test

# Check contract syntax
clarinet check
```

### Frontend Testing
```bash
# Run frontend tests
cd secure-health-frontend
npm test
```

## Deployment

### Smart Contract Deployment
1. Configure deployment settings in `settings/Devnet.toml`
2. Deploy contracts:
```bash
clarinet deploy --network testnet
```

### Frontend Deployment
1. Build the production bundle:
```bash
cd secure-health-frontend
npm run build
```
2. Deploy to your hosting service of choice

## Security Features

The platform implements multiple layers of security:

- Smart Contract Security
  - Role-based access control
  - Function-level authorization checks
  - Input validation and sanitization
  - Secure data storage patterns

- Frontend Security
  - Wallet connection security
  - Session management
  - Data encryption in transit
  - Protected routes and components

## Contributing

We welcome contributions to HealthEncrypted! Please follow these steps:

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to your branch
5. Create a Pull Request

### Development Guidelines
- Follow the established code style and patterns
- Write clear commit messages
- Include tests for new features
- Update documentation as needed

### Code Review Process
- All code changes require review
- Address review feedback promptly
- Ensure CI/CD checks pass
- Keep changes focused and atomic
