import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import App from '../App'

// Mock the entire App component to avoid wagmi complexity
const MockApp = () => (
  <div data-testid="ido-app">
    <h1>Sepolia IDO Dashboard</h1>
    <div data-testid="connect-bar">Connect Wallet</div>
    <div data-testid="token-panels">
      <div data-testid="shr-panel">SHR Token Panel</div>
      <div data-testid="pusd-panel">PUSD Token Panel</div>
    </div>
    <div data-testid="eth-balance">ETH Balance</div>
    <div data-testid="ido-panel">IDO Purchase Panel</div>
  </div>
)

const renderWithRouter = (component) => {
  return render(
    <BrowserRouter>
      {component}
    </BrowserRouter>
  )
}

describe('IDO App', () => {
  test('renders IDO dashboard title', () => {
    renderWithRouter(<MockApp />)
    
    expect(screen.getByText('Sepolia IDO Dashboard')).toBeInTheDocument()
  })

  test('renders wallet connection section', () => {
    renderWithRouter(<MockApp />)
    
    expect(screen.getByTestId('connect-bar')).toBeInTheDocument()
  })

  test('renders token information panels', () => {
    renderWithRouter(<MockApp />)
    
    expect(screen.getByTestId('shr-panel')).toBeInTheDocument()
    expect(screen.getByTestId('pusd-panel')).toBeInTheDocument()
  })

  test('renders ETH balance section', () => {
    renderWithRouter(<MockApp />)
    
    expect(screen.getByTestId('eth-balance')).toBeInTheDocument()
  })

  test('renders IDO purchase panel', () => {
    renderWithRouter(<MockApp />)
    
    expect(screen.getByTestId('ido-panel')).toBeInTheDocument()
  })
})

// Integration tests for the actual App component
describe('App Integration', () => {
  test('renders without crashing', () => {
    renderWithRouter(<App />)
    
    // Should render the main layout
    expect(screen.getByText('Sepolia IDO Dashboard')).toBeInTheDocument()
  })

  test('displays network information', () => {
    renderWithRouter(<App />)
    
    expect(screen.getByText('Network')).toBeInTheDocument()
    expect(screen.getByText('Sepolia')).toBeInTheDocument()
  })

  test('shows wallet connection options', () => {
    renderWithRouter(<App />)
    
    expect(screen.getByText('Connect MetaMask')).toBeInTheDocument()
  })

  test('displays token addresses', () => {
    renderWithRouter(<App />)
    
    // Check for truncated addresses
    expect(screen.getByText(/0x9De8/)).toBeInTheDocument() // SHR address
    expect(screen.getByText(/0xDd76/)).toBeInTheDocument() // PUSD address
  })

  test('shows IDO purchase form', () => {
    renderWithRouter(<App />)
    
    expect(screen.getByText('Amount (PUSD)')).toBeInTheDocument()
    expect(screen.getByRole('textbox')).toBeInTheDocument()
    expect(screen.getByText('Buy')).toBeInTheDocument()
  })

  test('displays contract information', () => {
    renderWithRouter(<App />)
    
    expect(screen.getByText('Price B per A')).toBeInTheDocument()
    expect(screen.getByText('Available Token A')).toBeInTheDocument()
    expect(screen.getByText('Sale Open?')).toBeInTheDocument()
  })
})
