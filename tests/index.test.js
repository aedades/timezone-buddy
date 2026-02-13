/**
 * Basic tests for Timezone Buddy
 * Run with: npx playwright test
 */

const { test, expect } = require('@playwright/test');

test.describe('Timezone Buddy', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should load the page with correct title', async ({ page }) => {
    await expect(page).toHaveTitle('Timezone Buddy');
  });

  test('should display local time card', async ({ page }) => {
    const localTime = page.locator('#localTime');
    await expect(localTime).toBeVisible();
    // Time should match pattern like "9:30 AM" or "12:45 PM"
    await expect(localTime).toHaveText(/\d{1,2}:\d{2}\s[AP]M/);
  });

  test('should toggle UTC display', async ({ page }) => {
    const utcCard = page.locator('.utc-time');
    const toggle = page.locator('label:has(#showUtc)');
    
    // UTC hidden by default
    await expect(utcCard).not.toBeVisible();
    
    // Enable UTC
    await toggle.click();
    await expect(utcCard).toBeVisible();
    
    // Disable UTC
    await toggle.click();
    await expect(utcCard).not.toBeVisible();
  });

  test('should add a teammate via city search', async ({ page }) => {
    const nameInput = page.locator('#name');
    const cityInput = page.locator('#cityInput');
    const addBtn = page.locator('button:has-text("Add")');
    
    await nameInput.fill('Sarah');
    await cityInput.fill('London');
    
    // Wait for autocomplete
    const autocomplete = page.locator('.autocomplete-item:first-child');
    await expect(autocomplete).toBeVisible();
    await autocomplete.click();
    
    await addBtn.click();
    
    // Teammate should appear
    const teammate = page.locator('.teammate');
    await expect(teammate).toBeVisible();
    await expect(teammate.locator('.teammate-name')).toHaveText('Sarah');
    await expect(teammate.locator('.teammate-tz')).toContainText('London');
  });

  test('should remove a teammate', async ({ page }) => {
    // Add teammate first
    await page.locator('#name').fill('Test');
    await page.locator('#cityInput').fill('Tokyo');
    await page.locator('.autocomplete-item:first-child').click();
    await page.locator('button:has-text("Add")').click();
    
    // Verify added
    await expect(page.locator('.teammate')).toBeVisible();
    
    // Remove
    await page.locator('.remove-btn').click();
    
    // Should show empty state
    await expect(page.locator('.empty-state')).toBeVisible();
  });

  test('should persist teammates in localStorage', async ({ page }) => {
    // Add teammate
    await page.locator('#name').fill('Persist Test');
    await page.locator('#cityInput').fill('Berlin');
    await page.locator('.autocomplete-item:first-child').click();
    await page.locator('button:has-text("Add")').click();
    
    // Reload page
    await page.reload();
    
    // Teammate should still be there
    const teammate = page.locator('.teammate');
    await expect(teammate).toBeVisible();
    await expect(teammate.locator('.teammate-name')).toHaveText('Persist Test');
  });

  test('should switch to convert mode', async ({ page }) => {
    const convertTab = page.locator('.mode-tab[data-mode="convert"]');
    const convertControls = page.locator('#convertControls');
    
    // Convert controls hidden by default
    await expect(convertControls).not.toBeVisible();
    
    // Switch to convert mode
    await convertTab.click();
    await expect(convertControls).toBeVisible();
    
    // Should have time and date inputs
    await expect(page.locator('#convertTime')).toBeVisible();
    await expect(page.locator('#convertDate')).toBeVisible();
  });

  test('should update times in convert mode', async ({ page }) => {
    // Add a teammate first
    await page.locator('#name').fill('Convert Test');
    await page.locator('#cityInput').fill('New York');
    await page.locator('.autocomplete-item:first-child').click();
    await page.locator('button:has-text("Add")').click();
    
    // Switch to convert mode
    await page.locator('.mode-tab[data-mode="convert"]').click();
    
    // Set a specific time
    await page.locator('#convertTime').fill('14:00');
    
    // The teammate's time should reflect the conversion
    const teammateTime = page.locator('.teammate .time');
    await expect(teammateTime).toHaveText(/\d{1,2}:\d{2}\s[AP]M/);
  });
});
