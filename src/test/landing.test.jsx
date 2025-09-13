import { render, screen, fireEvent } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import Landing from '../landing'

const renderWithRouter = (component) => {
  return render(
    <BrowserRouter>
      {component}
    </BrowserRouter>
  )
}

describe('Landing Page', () => {
  test('renders landing page with correct title', () => {
    renderWithRouter(<Landing />)
    
    expect(screen.getByText('BePAY — Africa\'s Decentralized')).toBeInTheDocument()
    expect(screen.getByText('Payments & Remittance Platform')).toBeInTheDocument()
  })

  test('displays company statistics', () => {
    renderWithRouter(<Landing />)
    
    expect(screen.getByText('Company Valuation')).toBeInTheDocument()
    expect(screen.getByText('₦2,000,000,000')).toBeInTheDocument()
    expect(screen.getByText('IDO Target')).toBeInTheDocument()
    expect(screen.getByText('₦1,000,000,000')).toBeInTheDocument()
    expect(screen.getByText('Token Price')).toBeInTheDocument()
    expect(screen.getByText('₦200 / SHR')).toBeInTheDocument()
  })

  test('displays token information', () => {
    renderWithRouter(<Landing />)
    
    expect(screen.getByText('Total Supply')).toBeInTheDocument()
    expect(screen.getAllByText('10,000,000 SHR')).toHaveLength(2) // Appears in both main stats and overview card
    expect(screen.getByText('IDO Allocation')).toBeInTheDocument()
    expect(screen.getAllByText('5,000,000 SHR')).toHaveLength(2) // Appears in both main stats and overview card
    expect(screen.getByText('Network')).toBeInTheDocument()
    expect(screen.getByText('Ethereum Sepolia')).toBeInTheDocument()
  })

  test('renders navigation links', () => {
    renderWithRouter(<Landing />)
    
    expect(screen.getByText('About')).toBeInTheDocument()
    expect(screen.getByText('Token')).toBeInTheDocument()
    expect(screen.getByText('IDO')).toBeInTheDocument()
  })

  test('renders call-to-action buttons', () => {
    renderWithRouter(<Landing />)
    
    const enterAppButtons = screen.getAllByText('Enter IDO App')
    const participateButton = screen.getByText('Participate Now')
    
    expect(enterAppButtons).toHaveLength(2)
    expect(participateButton).toBeInTheDocument()
  })

  test('CTA buttons link to /app route', () => {
    renderWithRouter(<Landing />)
    
    const links = screen.getAllByRole('link')
    const appLinks = links.filter(link => link.getAttribute('href') === '/app')
    
    expect(appLinks).toHaveLength(3) // Header button + 2 main CTA buttons
  })

  test('displays project description', () => {
    renderWithRouter(<Landing />)
    
    expect(screen.getByText(/Fast, low-cost cross-border payments/)).toBeInTheDocument()
    expect(screen.getAllByText(/SHR/)).toHaveLength(8) // Multiple SHR references throughout the page
  })

  test('renders sale overview card', () => {
    renderWithRouter(<Landing />)
    
    expect(screen.getByText('BePAY · SHR Sale Overview')).toBeInTheDocument()
    expect(screen.getByText('Raise (₦)')).toBeInTheDocument()
    expect(screen.getByText('For Sale')).toBeInTheDocument()
    expect(screen.getByText('Use of Funds')).toBeInTheDocument()
  })

  test('displays disclaimer text', () => {
    renderWithRouter(<Landing />)
    
    expect(screen.getByText(/Demo on Sepolia for evaluation purposes/)).toBeInTheDocument()
    expect(screen.getByText(/Please switch your wallet network to Sepolia/)).toBeInTheDocument()
  })

  test('renders footer with copyright', () => {
    renderWithRouter(<Landing />)
    
    const currentYear = new Date().getFullYear()
    expect(screen.getByText(`© ${currentYear} BePAY — All rights reserved.`)).toBeInTheDocument()
  })

  test('has proper accessibility attributes', () => {
    renderWithRouter(<Landing />)
    
    const mainHeading = screen.getByRole('heading', { level: 1 })
    expect(mainHeading).toBeInTheDocument()
    
    const sectionHeadings = screen.getAllByRole('heading', { level: 2 })
    expect(sectionHeadings.length).toBeGreaterThan(0)
  })
})
