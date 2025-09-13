import '@testing-library/jest-dom'
import { beforeAll, afterEach, vi } from 'vitest'
import { cleanup } from '@testing-library/react'

// Mock environment variables
Object.defineProperty(import.meta, 'env', {
  value: {
    VITE_RPC_URL: 'https://rpc.sepolia.org'
  }
})

// Mock wagmi hooks
vi.mock('wagmi', () => ({
  useAccount: () => ({
    address: '0x1234567890123456789012345678901234567890',
    isConnected: true
  }),
  useConnect: () => ({
    connect: vi.fn(),
    connectors: [{ name: 'MetaMask', uid: 'meta' }],
    isPending: false
  }),
  useDisconnect: () => ({
    disconnect: vi.fn()
  }),
  useChainId: () => 11155111, // Sepolia
  useBalance: () => ({
    data: {
      formatted: '1.0',
      symbol: 'ETH'
    }
  }),
  useReadContract: vi.fn(() => ({
    data: '1000000000000000000', // 1 token in wei
    isLoading: false,
    error: null
  })),
  useWriteContract: () => ({
    writeContractAsync: vi.fn()
  }),
  WagmiConfig: ({ children }) => children,
  createConfig: vi.fn(),
  http: vi.fn()
}))

// Mock react-router-dom
vi.mock('react-router-dom', () => ({
  Link: ({ children, to, ...props }) => {
    const React = require('react')
    return React.createElement('a', { href: to, ...props }, children)
  },
  BrowserRouter: ({ children }) => children,
  MemoryRouter: ({ children }) => children,
  Routes: ({ children }) => children,
  Route: ({ element }) => element,
  Navigate: () => {
    const React = require('react')
    return React.createElement('div', null, 'Navigate')
  }
}))

// Mock @tanstack/react-query
vi.mock('@tanstack/react-query', () => ({
  QueryClient: vi.fn(),
  QueryClientProvider: ({ children }) => children
}))

// Cleanup after each test
afterEach(() => {
  cleanup()
})

// Global test setup
beforeAll(() => {
  // Mock window.ethereum
  Object.defineProperty(window, 'ethereum', {
    value: {
      request: vi.fn(),
      on: vi.fn(),
      removeListener: vi.fn()
    }
  })
})
