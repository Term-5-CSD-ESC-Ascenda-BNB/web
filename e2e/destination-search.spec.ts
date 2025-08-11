import { test, expect } from '@playwright/test';

// E2E test for the destination search feature

test.describe('Destination Search feature', () => {
  test('should search for a destination and select a result', async ({ page }) => {
    // 1. Go to the landing page
    await page.goto('/');

    /**
     * Searches for a destination and selects the first result from the dropdown.
     */

    // 2. Find the destination search input
    const searchInput = page.getByPlaceholder('Search for a destination...');
    await expect(searchInput).toBeVisible();

    // 3. Type a destination (intentionally misspelled for fuzzy search)
    await searchInput.fill('Singpaore');

    // 4. Wait for the dropdown with search results to appear
    const resultOption = page.getByRole('option', { name: /Singapore/i }).first();

    // 5. Pick the first result from the dropdown
    await expect(resultOption).toBeVisible({ timeout: 10000 });
    const selectedText = await resultOption.textContent();
    await resultOption.click();

    // 6. verify that the input value is updated with the selected result
    await expect(searchInput).toHaveValue(selectedText?.trim() || '');

    /**
     * Selects a date range
     */
    // 1. Open the date picker
    const datePickerButton = page.getByRole('button', { name: /choose dates/i });
    await datePickerButton.click();

    // 2. Select check-in and check-out dates
    // Calculate dates: check-in = today + 3 days, check-out = check-in + 6 days
    const today = new Date();
    const checkIn = new Date(today);
    const checkOut = new Date(checkIn);
    checkIn.setDate(today.getDate() + 3);
    checkOut.setDate(checkIn.getDate() + 6);

    // Format (e.g., '6 August 2025')
    const formatAria = (date: Date): string =>
      `${date.getDate()} ${date.toLocaleString('default', { month: 'long' })} ${date.getFullYear()}`;
    const checkInLabel = formatAria(checkIn);
    const checkOutLabel = formatAria(checkOut);

    // 3. Click check-in and check-out dates in the calendar
    await page.getByRole('button', { name: checkInLabel, exact: true }).click();
    await page.getByRole('button', { name: checkOutLabel, exact: true }).click();

    // 4. Assert the input field shows the correct range (e.g., '4 Aug - 10 Aug')
    const startStr = `${checkIn.getDate()} ${checkIn.toLocaleString('default', { month: 'short' })}`;
    const endStr = `${checkOut.getDate()} ${checkOut.toLocaleString('default', { month: 'short' })}`;
    const rangeRegex = new RegExp(`${startStr}.*${endStr}`, 'i');
    const newDatePickerButton = page.getByRole('button', { name: rangeRegex });
    await expect(newDatePickerButton).toBeVisible();

    /**
     * Selects guests and rooms
     */
    // 1. Open the guests/rooms selector
    const guestsRoomsButton = page.getByRole('button', { name: /guest.*room/i });
    await guestsRoomsButton.click();

    // 2. Click the plus button for guests three times
    const guestsPlusButton = page.getByTestId(/guests-increment/i);
    for (let i = 0; i < 3; i++) {
      await guestsPlusButton.click();
    }

    // 3. Click the plus button for rooms once
    const roomsPlusButton = page.getByTestId(/rooms-increment/i);
    await roomsPlusButton.click();

    // 4. assert the button text now shows '4 guests • 2 rooms'
    await expect(guestsRoomsButton).toHaveText(/4 guests.*2 rooms/i);

    /**
     * Submits the search form
     */
    // 1. Click the search button using data-testid
    const searchButton = page.getByTestId('search-button');
    await searchButton.click();

    // 2. Wait for navigation to the search page
    await expect(page).toHaveURL(/\/search/);

    // 3. Verify search params in the URL
    const url = new URL(page.url());
    const params = url.searchParams;
    expect(params.get('guests')).toBe('4');
    expect(params.get('rooms')).toBe('2');
    expect(params.get('term')).toMatch(/singapore/i);

    // Check that the date param matches the selected dates
    const dateParam = params.get('date');
    expect(dateParam).toBeDefined();
    const parsedDates = JSON.parse(dateParam!) as [string, string];
    const pad = (n: number) => n.toString().padStart(2, '0');
    const expectedCheckIn = `${checkIn.getFullYear()}-${pad(checkIn.getMonth() + 1)}-${pad(checkIn.getDate())}`;
    const expectedCheckOut = `${checkOut.getFullYear()}-${pad(checkOut.getMonth() + 1)}-${pad(checkOut.getDate())}`;
    expect(parsedDates[0]).toBe(expectedCheckIn);
    expect(parsedDates[1]).toBe(expectedCheckOut);
  });
});
