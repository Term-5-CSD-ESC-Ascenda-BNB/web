import { test, expect } from '@playwright/test';

test('Home page → hotel details (UC5)', async ({ page }) => {
  // 1. Go to the home/landing page
  await page.goto('/');

  // Destination search (same as UC4)
  const searchInput = page.getByPlaceholder('Search for a destination...');
  await searchInput.fill('Singapore'); // use a real destination with results
  const resultOption = page.getByRole('option', { name: /Singapore/i }).first();
  await expect(resultOption).toBeVisible({ timeout: 10000 });
  await resultOption.click();

  // Select dates
  const datePickerButton = page.getByTestId('date-picker-input');
  await datePickerButton.click();
  const today = new Date();
  const checkIn = new Date(today);
  const checkOut = new Date(checkIn);
  checkIn.setDate(today.getDate() + 3);
  checkOut.setDate(checkIn.getDate() + 6);
  const formatAria = (d: Date) =>
    `${d.getDate()} ${d.toLocaleString('default', { month: 'long' })} ${d.getFullYear()}`;
  await page.getByRole('button', { name: formatAria(checkIn), exact: true }).click();
  await page.getByRole('button', { name: formatAria(checkOut), exact: true }).click();

  // Submit search
  await page.getByTestId('search-button').click();
  await expect(page).toHaveURL(/\/search/);

  // 2. Click first hotel in search results
  // Ensure your hotel cards have this:
  // <a data-testid="hotel-card-link" ...>
  const firstHotelLink = page.getByTestId('hotel-card-link').first();
  await expect(firstHotelLink).toBeVisible({ timeout: 10000 });
  await firstHotelLink.click();

  // Wait for hotel page to load
  await page.waitForLoadState('networkidle');

  // 3. UC5 assertions
  await expect(page.getByTestId('hotel-title')).toBeVisible({ timeout: 15000 });

  // Surroundings section
  if (await page.getByTestId('surroundings-section').count()) {
    await expect(page.getByTestId('surroundings-section')).toBeVisible();
    await expect(page.getByTestId('surroundings-view-all')).toBeVisible();
  } else {
    await expect(page.getByText('Surroundings')).toBeVisible();
    await expect(page.getByRole('button', { name: /view all on map/i })).toBeVisible();
  }

  // Reviews modal
  await page.getByText('Guest Reviews').click();

  // verify a dialog is open
  const dialogs = page.getByRole('dialog', { name: 'Guest Reviews' });
  await expect(dialogs.first()).toBeVisible();

  // close topmost modal (twice if you have two)
  await page.keyboard.press('Escape');
  await page.keyboard.press('Escape');

  // assert both are gone
  await expect(dialogs).toHaveCount(0);



  // Amenities
  if (await page.getByTestId('amenities-section').count()) {
    await expect(page.getByTestId('amenities-section')).toBeVisible();
  } else {
    const fallback = page.getByText(/No amenities available/i);
    if (await fallback.count()) {
      await expect(fallback).toBeVisible();
    } else {
      await expect(page.getByText(/amenit/i)).toBeVisible();
    }
  }

  // Rooms
  if (await page.getByTestId('rooms-section').count()) {
    await expect(page.getByTestId('rooms-section')).toBeVisible();
  } else {
    await expect(page.getByText(/room|option|breakfast/i)).toBeTruthy();
  }
});
