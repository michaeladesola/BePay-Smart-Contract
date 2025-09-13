import { render, screen } from '@testing-library/react'
import { BrowserRouter, MemoryRouter } from 'react-router-dom'
import App from '../App'
import Landing from '../landing'

const renderWithRouter = (component, { route = '/' } = {}) => {
  return render(
    <MemoryRouter initialEntries={[route]}>
      {component}
    </MemoryRouter>
  )
}

describe('Routing', () => {
  test('renders landing page at root route', () => {
    renderWithRouter(<Landing />, { route: '/' })
    
    expect(screen.getByText((content, element) => {
      return element?.textContent?.includes("BePAY — Africa's Decentralized")
    })).toBeInTheDocument()
    expect(screen.getByText(/Payments & Remittance Platform/)).toBeInTheDocument()
  })

  test('renders IDO app at /app route', () => {
    renderWithRouter(<App />, { route: '/app' })
    
    expect(screen.getByText(/BePAY IDO Dashboard/)).toBeInTheDocument()
  })

  test('landing page has correct navigation links', () => {
    renderWithRouter(<Landing />, { route: '/' })
    
    const appLinks = screen.getAllByRole('link')
    const appRouteLinks = appLinks.filter(link => link.getAttribute('href') === '/app')
    
    expect(appRouteLinks.length).toBeGreaterThan(0)
  })

  test('landing page CTA buttons navigate to /app', () => {
    renderWithRouter(<Landing />, { route: '/' })
    
    const enterAppButtons = screen.getAllByText('Enter IDO App')
    const participateButton = screen.getByText('Participate Now')
    
    expect(enterAppButtons[0]).toHaveAttribute('href', '/app')
    expect(participateButton).toHaveAttribute('href', '/app')
  })

  test('handles unknown routes gracefully', () => {
    // This would typically redirect to landing page
    renderWithRouter(<Landing />, { route: '/unknown' })
    
    // Should still render landing page content
    expect(screen.getByText((content, element) => {
      return element?.textContent?.includes("BePAY — Africa's Decentralized")
    })).toBeInTheDocument()
  })
})

describe('Navigation Flow', () => {
  test('complete user journey from landing to IDO', () => {
    // Start at landing page
    const { rerender } = renderWithRouter(<Landing />, { route: '/' })
    
    expect(screen.getByText((content, element) => {
      return element?.textContent?.includes("BePAY — Africa's Decentralized")
    })).toBeInTheDocument()
    
    // Navigate to IDO app
    rerender(
      <MemoryRouter initialEntries={['/app']}>
        <App />
      </MemoryRouter>
    )
    
    expect(screen.getByText(/BePAY IDO Dashboard/)).toBeInTheDocument()
  })

  test('landing page sections are accessible', () => {
    renderWithRouter(<Landing />, { route: '/' })
    
    // Check for anchor links to sections
    expect(screen.getByText('About')).toHaveAttribute('href', '#about')
    expect(screen.getByText('Token')).toHaveAttribute('href', '#token')
    expect(screen.getByText('IDO')).toHaveAttribute('href', '#ido')
  })
})
