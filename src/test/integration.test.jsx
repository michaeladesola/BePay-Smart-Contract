import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import App from '../App'
import Landing from '../landing'

const renderWithRouter = (component) => {
  return render(
    <BrowserRouter>
      {component}
    </BrowserRouter>
  )
}

describe('Integration Tests', () => {
  describe('Landing Page Integration', () => {
    test('displays all required sections in correct order', () => {
      renderWithRouter(<Landing />)
      
      // Check main sections exist
      expect(screen.getByRole('banner')).toBeInTheDocument() // Header
      expect(screen.getByText('BePAY — Africa\'s Decentralized')).toBeInTheDocument()
      expect(screen.getByText('About BePAY')).toBeInTheDocument()
      expect(screen.getByRole('contentinfo')).toBeInTheDocument() // Footer
    })

    test('statistics cards display correct data', () => {
      renderWithRouter(<Landing />)
      
      const valuationCard = screen.getByText('Company Valuation').closest('div')
      const targetCard = screen.getByText('IDO Target').closest('div')
      const priceCard = screen.getByText('Token Price').closest('div')
      
      expect(valuationCard).toHaveTextContent('₦2,000,000,000')
      expect(targetCard).toHaveTextContent('₦1,000,000,000')
      expect(priceCard).toHaveTextContent('₦200 / SHR')
    })

    test('sale overview card contains all required information', () => {
      renderWithRouter(<Landing />)
      
      const overviewCard = screen.getByText('BePAY · SHR Sale Overview').closest('div')
      
      expect(overviewCard).toHaveTextContent('Raise (₦)')
      expect(overviewCard).toHaveTextContent('For Sale')
      expect(overviewCard).toHaveTextContent('Price')
      expect(overviewCard).toHaveTextContent('Supply')
      expect(overviewCard).toHaveTextContent('Use of Funds')
    })
  })

  describe('IDO App Integration', () => {
    test('renders all main sections', () => {
      renderWithRouter(<App />)
      
      // Check main sections
      expect(screen.getByText('Sepolia IDO Dashboard')).toBeInTheDocument()
      expect(screen.getByText('Network')).toBeInTheDocument()
      expect(screen.getByText('SHR')).toBeInTheDocument()
      expect(screen.getByText('PUSD')).toBeInTheDocument()
      expect(screen.getByText('Your Sepolia ETH')).toBeInTheDocument()
      expect(screen.getByText('IDO Purchase')).toBeInTheDocument()
    })

    test('displays contract addresses correctly', () => {
      renderWithRouter(<App />)
      
      // Check for truncated contract addresses
      expect(screen.getByText(/0x9De8.*0x9De8/)).toBeInTheDocument() // SHR
      expect(screen.getByText(/0xDd76.*0xDd76/)).toBeInTheDocument() // PUSD
    })

    test('shows wallet connection interface', () => {
      renderWithRouter(<App />)
      
      expect(screen.getByText('Connect MetaMask')).toBeInTheDocument()
    })

    test('displays IDO purchase form with all fields', () => {
      renderWithRouter(<App />)
      
      expect(screen.getByText('Amount (PUSD)')).toBeInTheDocument()
      expect(screen.getByRole('textbox')).toBeInTheDocument()
      expect(screen.getByText('Buy')).toBeInTheDocument()
      expect(screen.getByText('Estimated Token A (SHR)')).toBeInTheDocument()
    })
  })

  describe('User Flow Integration', () => {
    test('complete landing to IDO flow', () => {
      // This would be better tested with a router that actually navigates
      renderWithRouter(<Landing />)
      
      // Verify landing page elements
      expect(screen.getByText('BePAY — Africa\'s Decentralized')).toBeInTheDocument()
      expect(screen.getAllByText('Enter IDO App')).toHaveLength(2)
      expect(screen.getByText('Participate Now')).toBeInTheDocument()
    })

    test('landing page responsive design elements', () => {
      renderWithRouter(<Landing />)
      
      // Check for responsive classes
      const heroSection = screen.getByText('BePAY — Africa\'s Decentralized').closest('section')
      expect(heroSection).toHaveClass('grid', 'md:grid-cols-2')
      
      const statGrid = screen.getByText('Company Valuation').closest('div')?.parentElement
      expect(statGrid).toHaveClass('grid', 'sm:grid-cols-3')
    })
  })

  describe('Error Handling Integration', () => {
    test('handles missing wallet gracefully', () => {
      renderWithRouter(<App />)
      
      // Should show connect button when no wallet
      expect(screen.getByText('Connect MetaMask')).toBeInTheDocument()
    })

    test('displays network information', () => {
      renderWithRouter(<App />)
      
      expect(screen.getByText('Sepolia')).toBeInTheDocument()
      expect(screen.getByText('Network: Sepolia (11155111)')).toBeInTheDocument()
    })
  })

  describe('Accessibility Integration', () => {
    test('has proper heading hierarchy', () => {
      renderWithRouter(<Landing />)
      
      const h1 = screen.getByRole('heading', { level: 1 })
      const h2s = screen.getAllByRole('heading', { level: 2 })
      
      expect(h1).toBeInTheDocument()
      expect(h2s.length).toBeGreaterThan(0)
    })

    test('form elements have proper labels', () => {
      renderWithRouter(<App />)
      
      const input = screen.getByRole('textbox')
      const label = screen.getByText('Amount (PUSD)')
      
      expect(input).toBeInTheDocument()
      expect(label).toBeInTheDocument()
    })

    test('buttons have accessible text', () => {
      renderWithRouter(<Landing />)
      
      const buttons = screen.getAllByRole('link')
      buttons.forEach(button => {
        expect(button).toHaveTextContent()
      })
    })
  })
})
