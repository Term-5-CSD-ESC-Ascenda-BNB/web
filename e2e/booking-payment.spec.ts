import { test, expect } from '@playwright/test';

// Replace with the actual URL of your booking page
const BOOKING_URL =
  'http://localhost:5173/booking?destination_id=RsBU&hotelId=RcLc&hotelName=PARKROYAL+COLLECTION+Pickering%2C+Singapore&hotelAddress=3+Upper+Pickering+Street&hotelImage=https%3A%2F%2Fi.travelapi.com%2Flodging%2F6000000%2F5410000%2F5400400%2F5400381%2F6e18c1f7_b.jpg&roomDescription=Urban+Deluxe+King%2FTwin+2+Twin+Beds&starRating=5&trustYouScore=93&country_code=SG&lang=en_US&currency=SGD&guests=1&startDate=2025-08-26&endDate=2025-08-30&numberOfNights=4&price=2312.67&rooms=1';

test('Full booking and Stripe payment flow', async ({ page }) => {
  // Precondition: Log in
  await page.goto('http://localhost:5173/login');
  await page.fill('[data-testid="login-email"]', 'john.doe@example.com');
  await page.fill('[data-testid="password"]', 'QK7g51D8=[:$');
  await page.click('[data-testid="login-button"]');

  // Wait for redirect to homepage
  await page.waitForURL('http://localhost:5173/');

  // 1. Navigate to booking page
  await page.goto(BOOKING_URL);

  // 2. Fill out Guest Info Form
  await page.locator('[data-testid="salutation"]').click();
  await page.locator('[role="option"]', { hasText: 'Ms' }).click();
  await page.fill('[data-testid="first-name"]', 'John');
  await page.fill('[data-testid="last-name"]', 'Doe');
  await page.fill('[data-testid="email"]', 'john.doe@example.com');
  await page.fill('[data-testid="phone-number"]', '91234567');
  await page.fill('[data-testid="special-requests"]', 'Late check-in please');

  // 3. Adjust Adults / Children counters if necessary
  // For single guest, no change needed, but example:
  // await page.click('[data-testid="adults"] button[aria-label="increment"]');

  // 4. Fill out Payment Method Form
  await page.fill('input[placeholder="Cardholder\'s name"]', 'John Doe');

  // Stripe CardElement is inside an iframe, handle it
  // Get the iframe for the card input
  const cardFrame = page.frameLocator(
    '[data-testid="card-element-wrapper"] iframe[name^="__privateStripeFrame"]'
  );

  // Fill in card number
  await cardFrame.locator('input[name="cardnumber"]').fill('4242424242424242');

  // Fill in expiry
  await cardFrame.locator('input[name="exp-date"]').fill('12/34');

  // Fill in CVC
  await cardFrame.locator('input[name="cvc"]').fill('123');

  // Fill in ZIP (if your Stripe form has it)
  await cardFrame.locator('input[name="postal"]').fill('12345');

  // 5. Submit the form
  await page.click('button:has-text("Submit Payment")');

  // 6. Confirm modal dialog
  const confirmButton = page.locator('button:has-text("Confirm")');
  await expect(confirmButton).toBeVisible();
  await confirmButton.click();

  // 7. Wait for navigation to success page
  await page.waitForURL(/\/bookingsuccess/);

  // 8. Assert success message
  const successMessage = page.locator('[data-testid="success-message"]');
  await page.waitForTimeout(3000);
  await expect(successMessage).toHaveText('Thank You! Payment Successful');

  // Optionally: assert hotel name or price
  // await expect(page.locator('text=PARKROYAL COLLECTION Pickering')).toBeVisible();
});
