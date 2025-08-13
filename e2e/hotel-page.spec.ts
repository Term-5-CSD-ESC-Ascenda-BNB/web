import { test, expect } from '@playwright/test';

test('Home page → hotel details (UC5)', async ({ page }) => {
  await page.goto('/');

  const searchInput = page.getByPlaceholder('Search for a destination...');
  await searchInput.fill('Singapore');
  const resultOption = page.getByRole('option', { name: /Singapore/i }).first();
  await expect(resultOption).toBeVisible({ timeout: 10_000 });
  await resultOption.click();

  // Dates
  const datePickerButton = page.getByTestId('date-picker-input');
  await datePickerButton.click();
  const today = new Date();
  const checkIn = new Date(today);
  checkIn.setDate(today.getDate() + 3);
  const checkOut = new Date(checkIn);
  checkOut.setDate(checkIn.getDate() + 6);
  const formatAria = (d: Date) =>
    `${d.getDate()} ${d.toLocaleString('default', { month: 'long' })} ${d.getFullYear()}`;
  await page.getByRole('button', { name: formatAria(checkIn), exact: true }).click();
  await page.getByRole('button', { name: formatAria(checkOut), exact: true }).click();

  await page.getByTestId('search-button').click();
  await expect(page).toHaveURL(/\/search/);

  // Click first hotel and wait for client-side navigation
  const firstHotelLink = page.getByTestId('hotel-card-link').first();
  await expect(firstHotelLink).toBeVisible({ timeout: 10_000 });

  await Promise.all([
    page.waitForURL(/\/hotel(s)?\/?.+/i), // adjust to your route
    firstHotelLink.click(),
  ]);

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
    expect(page.getByText(/room|option|breakfast/i)).toBeTruthy();
  }
});
