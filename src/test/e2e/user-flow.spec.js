import { test, expect } from '@playwright/test'

test.describe('Complete User Flow E2E', () => {
  test('complete landing to IDO purchase flow', async ({ page }) => {
    // Start at landing page
    await page.goto('/')
    
    // Verify landing page loads
    await expect(page.getByText('BePAY — Africa\'s Decentralized')).toBeVisible()
    await expect(page.getByText('Payments & Remittance Platform')).toBeVisible()
    
    // Check company stats are displayed
    await expect(page.getByText('Company Valuation')).toBeVisible()
    await expect(page.getByText('₦2,000,000,000')).toBeVisible()
    await expect(page.getByText('IDO Target')).toBeVisible()
    await expect(page.getByText('₦1,000,000,000')).toBeVisible()
    
    // Check token information
    await expect(page.getByText('Total Supply')).toBeVisible()
    await expect(page.getByText('10,000,000 SHR')).toBeVisible()
    await expect(page.getByText('IDO Allocation')).toBeVisible()
    await expect(page.getByText('5,000,000 SHR')).toBeVisible()
    
    // Navigate to IDO app
    await page.getByText('Enter IDO App').first().click()
    await expect(page).toHaveURL('/app')
    
    // Verify IDO app loads
    await expect(page.getByText('Sepolia IDO Dashboard')).toBeVisible()
    await expect(page.getByText('SHR · PUSD · IDO')).toBeVisible()
    
    // Check network information
    await expect(page.getByText('Network')).toBeVisible()
    await expect(page.getByText('Sepolia')).toBeVisible()
    
    // Check wallet connection
    await expect(page.getByText('Connect MetaMask')).toBeVisible()
    
    // Check token panels
    await expect(page.getByText('SHR')).toBeVisible()
    await expect(page.getByText('PUSD')).toBeVisible()
    
    // Check IDO purchase form
    await expect(page.getByText('IDO Purchase')).toBeVisible()
    await expect(page.getByText('Amount (PUSD)')).toBeVisible()
    await expect(page.getByRole('textbox')).toBeVisible()
    await expect(page.getByText('Buy')).toBeVisible()
    
    // Test input functionality
    const input = page.getByRole('textbox')
    await input.fill('100')
    await expect(input).toHaveValue('100')
    
    // Check estimated calculation display
    await expect(page.getByText('Estimated Token A (SHR)')).toBeVisible()
  })

  test('navigation between pages works correctly', async ({ page }) => {
    // Test landing page navigation
    await page.goto('/')
    
    // Test anchor navigation
    await page.getByText('About').click()
    await expect(page.locator('#about')).toBeVisible()
    
    await page.getByText('Token').click()
    await expect(page.locator('#token')).toBeVisible()
    
    await page.getByText('IDO').click()
    await expect(page.locator('#ido')).toBeVisible()
    
    // Navigate to IDO app
    await page.getByText('Participate Now').click()
    await expect(page).toHaveURL('/app')
    
    // Navigate back to landing (if back button exists)
    await page.goBack()
    await expect(page).toHaveURL('/')
  })

  test('responsive design across different screen sizes', async ({ page }) => {
    // Test desktop
    await page.setViewportSize({ width: 1920, height: 1080 })
    await page.goto('/')
    await expect(page.getByText('BePAY — Africa\'s Decentralized')).toBeVisible()
    
    // Test tablet
    await page.setViewportSize({ width: 768, height: 1024 })
    await page.reload()
    await expect(page.getByText('BePAY — Africa\'s Decentralized')).toBeVisible()
    
    // Test mobile
    await page.setViewportSize({ width: 375, height: 667 })
    await page.reload()
    await expect(page.getByText('BePAY — Africa\'s Decentralized')).toBeVisible()
    
    // Navigate to IDO app on mobile
    await page.getByText('Enter IDO App').first().click()
    await expect(page).toHaveURL('/app')
    await expect(page.getByText('Sepolia IDO Dashboard')).toBeVisible()
  })

  test('accessibility features work correctly', async ({ page }) => {
    await page.goto('/')
    
    // Check heading hierarchy
    const h1 = page.locator('h1')
    await expect(h1).toBeVisible()
    
    const h2s = page.locator('h2')
    await expect(h2s).toHaveCount(3) // About, Token, IDO sections
    
    // Check form accessibility
    await page.goto('/app')
    const input = page.getByRole('textbox')
    const label = page.getByText('Amount (PUSD)')
    await expect(input).toBeVisible()
    await expect(label).toBeVisible()
    
    // Check button accessibility
    const buttons = page.locator('button, [role="button"]')
    const buttonCount = await buttons.count()
    expect(buttonCount).toBeGreaterThan(0)
  })

  test('error handling and edge cases', async ({ page }) => {
    // Test invalid route
    await page.goto('/invalid-route')
    // Should redirect to landing page or show 404
    
    // Test IDO app with no wallet connection
    await page.goto('/app')
    await expect(page.getByText('Connect MetaMask')).toBeVisible()
    
    // Test form validation
    const input = page.getByRole('textbox')
    await input.fill('invalid-input')
    await expect(input).toHaveValue('invalid-input')
    
    // Test buy button without proper input
    const buyButton = page.getByText('Buy')
    await expect(buyButton).toBeVisible()
  })
})
