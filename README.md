# BePAY IDO Frontend

A React-based frontend application for the BePAY Initial DEX Offering (IDO) on Ethereum Sepolia testnet.

## Features

- **Landing Page**: Marketing page with company information and IDO details
- **IDO Dashboard**: Token purchase interface with wallet integration
- **Web3 Integration**: Wagmi + Viem for Ethereum interactions
- **Responsive Design**: Mobile-first design with Tailwind CSS
- **Routing**: React Router for navigation between pages

## Tech Stack

- React 19.1.1
- Vite 7.1.2
- Tailwind CSS
- Wagmi 2.16.9
- Viem 2.37.5
- React Router DOM 6.27.0

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- MetaMask wallet (for testing)

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Testing

### Unit & Integration Tests

```bash
# Run all tests
npm test

# Run tests with UI
npm run test:ui

# Run tests with coverage
npm run test:coverage

# Run specific test file
npm test landing.test.jsx
```

### End-to-End Tests

```bash
# Install Playwright browsers
npx playwright install

# Run E2E tests
npm run test:e2e

# Run E2E tests in headed mode
npx playwright test --headed
```

## Test Coverage

The project includes comprehensive test coverage:

### Unit Tests
- **Landing Page**: Component rendering, content display, navigation
- **IDO App**: Dashboard functionality, wallet integration, form handling
- **Routing**: Navigation between pages, route handling

### Integration Tests
- **User Flows**: Complete landing to IDO purchase journey
- **Responsive Design**: Cross-device compatibility
- **Accessibility**: ARIA labels, heading hierarchy, form accessibility

### E2E Tests
- **Landing Page**: Full page functionality and navigation
- **IDO App**: Complete purchase flow simulation
- **User Journey**: End-to-end user experience testing
- **Cross-browser**: Chrome, Firefox, Safari, Mobile

## Project Structure

```
src/
├── components/
│   ├── landing.jsx          # Landing page component
│   ├── App.jsx              # IDO dashboard component
│   └── main.jsx             # Router configuration
├── test/
│   ├── setup.js             # Test configuration
│   ├── landing.test.jsx     # Landing page tests
│   ├── app.test.jsx         # IDO app tests
│   ├── routing.test.jsx     # Routing tests
│   ├── integration.test.jsx # Integration tests
│   └── e2e/                 # End-to-end tests
│       ├── landing.spec.js
│       ├── ido-app.spec.js
│       └── user-flow.spec.js
├── assets/                  # Static assets
└── index.css               # Global styles
```

## Smart Contracts

- **SHR Token**: `0x9De859E849a198D27DcA5F7Ba2f836d49BA4F676`
- **PUSD Token**: `0xDd7639e3920426de6c59A1009C7ce2A9802d0920`
- **IDO Contract**: `0xa1E0D64349c5b9e6Ed133F8288B2574Ec4FE3150`

## Environment Variables

```bash
VITE_RPC_URL=https://rpc.sepolia.org  # Optional: Custom RPC endpoint
```

## Deployment

### Vercel (Recommended)

```bash
# Deploy to Vercel
vercel --prod
```

### Manual Deployment

```bash
# Build the project
npm run build

# Deploy dist/ folder to your hosting provider
```

## Live Demo

- **Production URL**: https://bepayido-jkhherbgw-chatwithmichael-2011s-projects.vercel.app
- **GitHub Repository**: https://github.com/michaeladesola/BePay-Smart-Contract

## Development Workflow

1. **Make changes** to your code
2. **Run tests** to ensure everything works: `npm test`
3. **Commit changes**: `git add . && git commit -m "Description"`
4. **Push to GitHub**: `git push origin main`
5. **Vercel auto-deploys** from GitHub

## Testing Commands Reference

```bash
# Unit & Integration Tests
npm test                    # Run all tests
npm run test:ui            # Run with UI
npm run test:coverage      # Run with coverage report

# E2E Tests  
npm run test:e2e           # Run all E2E tests
npx playwright test --headed  # Run with browser UI
npx playwright test --project=chromium  # Run specific browser

# Linting
npm run lint               # Run ESLint
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new functionality
5. Run the test suite
6. Submit a pull request

## License

All rights reserved. © 2024 BePAY