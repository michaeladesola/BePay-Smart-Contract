import { test, expect } from '@playwright/test'

test.describe('Landing Page E2E', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test('displays landing page correctly', async ({ page }) => {
    await expect(page.getByText('BePAY — Africa\'s Decentralized')).toBeVisible()
    await expect(page.getByText('Payments & Remittance Platform')).toBeVisible()
  })

  test('shows company statistics', async ({ page }) => {
    await expect(page.getByText('Company Valuation')).toBeVisible()
    await expect(page.getByText('₦2,000,000,000')).toBeVisible()
    await expect(page.getByText('IDO Target')).toBeVisible()
    await expect(page.getByText('₦1,000,000,000')).toBeVisible()
    await expect(page.getByText('Token Price')).toBeVisible()
    await expect(page.getByText('₦200 / SHR')).toBeVisible()
  })

  test('displays token information', async ({ page }) => {
    await expect(page.getByText('Total Supply')).toBeVisible()
    await expect(page.getByText('10,000,000 SHR')).toBeVisible()
    await expect(page.getByText('IDO Allocation')).toBeVisible()
    await expect(page.getByText('5,000,000 SHR')).toBeVisible()
    await expect(page.getByText('Network')).toBeVisible()
    await expect(page.getByText('Ethereum Sepolia')).toBeVisible()
  })

  test('navigation links work', async ({ page }) => {
    // Test anchor links
    await page.getByText('About').click()
    await expect(page.locator('#about')).toBeVisible()
    
    await page.getByText('Token').click()
    await expect(page.locator('#token')).toBeVisible()
    
    await page.getByText('IDO').click()
    await expect(page.locator('#ido')).toBeVisible()
  })

  test('CTA buttons navigate to IDO app', async ({ page }) => {
    // Test first CTA button
    await page.getByText('Enter IDO App').first().click()
    await expect(page).toHaveURL('/app')
    
    // Go back to landing
    await page.goto('/')
    
    // Test second CTA button
    await page.getByText('Participate Now').click()
    await expect(page).toHaveURL('/app')
  })

  test('sale overview card displays correctly', async ({ page }) => {
    const overviewCard = page.locator('text=BePAY · SHR Sale Overview').locator('..')
    
    await expect(overviewCard.getByText('Raise (₦)')).toBeVisible()
    await expect(overviewCard.getByText('For Sale')).toBeVisible()
    await expect(overviewCard.getByText('Price')).toBeVisible()
    await expect(overviewCard.getByText('Supply')).toBeVisible()
    await expect(overviewCard.getByText('Use of Funds')).toBeVisible()
  })

  test('disclaimer text is visible', async ({ page }) => {
    await expect(page.getByText(/Demo on Sepolia for evaluation purposes/)).toBeVisible()
    await expect(page.getByText(/Please switch your wallet network to Sepolia/)).toBeVisible()
  })

  test('footer displays correctly', async ({ page }) => {
    const currentYear = new Date().getFullYear()
    await expect(page.getByText(`© ${currentYear} BePAY — All rights reserved.`)).toBeVisible()
  })

  test('responsive design works on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 })
    
    // Check that content is still visible and properly laid out
    await expect(page.getByText('BePAY — Africa\'s Decentralized')).toBeVisible()
    await expect(page.getByText('Enter IDO App')).toBeVisible()
  })
})
