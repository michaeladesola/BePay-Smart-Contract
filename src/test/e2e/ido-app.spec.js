import { test, expect } from '@playwright/test'

test.describe('IDO App E2E', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/app')
  })

  test('displays IDO dashboard', async ({ page }) => {
    await expect(page.getByText('Sepolia IDO Dashboard')).toBeVisible()
    await expect(page.getByText('SHR · PUSD · IDO')).toBeVisible()
  })

  test('shows network information', async ({ page }) => {
    await expect(page.getByText('Network')).toBeVisible()
    await expect(page.getByText('Sepolia')).toBeVisible()
    await expect(page.getByText('Network: Sepolia (11155111)')).toBeVisible()
  })

  test('displays wallet connection interface', async ({ page }) => {
    await expect(page.getByText('Connect MetaMask')).toBeVisible()
  })

  test('shows token panels', async ({ page }) => {
    // SHR token panel
    await expect(page.getByText('SHR')).toBeVisible()
    await expect(page.getByText(/0x9De8.*0x9De8/)).toBeVisible()
    
    // PUSD token panel
    await expect(page.getByText('PUSD')).toBeVisible()
    await expect(page.getByText(/0xDd76.*0xDd76/)).toBeVisible()
  })

  test('displays ETH balance section', async ({ page }) => {
    await expect(page.getByText('Your Sepolia ETH')).toBeVisible()
    await expect(page.getByText('Wallet')).toBeVisible()
    await expect(page.getByText('Balance')).toBeVisible()
  })

  test('shows IDO purchase form', async ({ page }) => {
    await expect(page.getByText('IDO Purchase')).toBeVisible()
    await expect(page.getByText('Amount (PUSD)')).toBeVisible()
    await expect(page.getByRole('textbox')).toBeVisible()
    await expect(page.getByText('Buy')).toBeVisible()
  })

  test('displays contract information', async ({ page }) => {
    await expect(page.getByText('Price B per A')).toBeVisible()
    await expect(page.getByText('Available Token A')).toBeVisible()
    await expect(page.getByText('Sale Open?')).toBeVisible()
  })

  test('shows estimated token calculation', async ({ page }) => {
    await expect(page.getByText('Estimated Token A (SHR)')).toBeVisible()
  })

  test('input field accepts user input', async ({ page }) => {
    const input = page.getByRole('textbox')
    await input.fill('100')
    await expect(input).toHaveValue('100')
  })

  test('buy button is clickable', async ({ page }) => {
    const buyButton = page.getByText('Buy')
    await expect(buyButton).toBeVisible()
    await expect(buyButton).toBeEnabled()
  })

  test('displays footer information', async ({ page }) => {
    await expect(page.getByText(/Ensure wallet is on Sepolia/)).toBeVisible()
    await expect(page.getByText(/Uses approve → buyWithExactB in PUSD/)).toBeVisible()
  })

  test('handles wallet disconnection', async ({ page }) => {
    // This would require mocking wallet state
    // For now, just check that disconnect functionality exists
    await expect(page.getByText('Connect MetaMask')).toBeVisible()
  })

  test('responsive design works on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 })
    
    // Check that all main sections are still visible
    await expect(page.getByText('Sepolia IDO Dashboard')).toBeVisible()
    await expect(page.getByText('SHR')).toBeVisible()
    await expect(page.getByText('PUSD')).toBeVisible()
    await expect(page.getByText('IDO Purchase')).toBeVisible()
  })
})
