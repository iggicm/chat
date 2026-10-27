import {expect, test} from '@playwright/test';

test('home renders and navigation opens the login form', async ({page}) => {
  const errors: string[] = [];
  page.on('pageerror', error => errors.push(error.message));
  await page.goto('/');
  await expect(page).toHaveURL(/\/home$/);
  await expect(page.locator('app-header')).toContainText('IGGI');
  await expect(page.locator('slideshow img')).toBeVisible();
  await page.locator('app-header').getByRole('link', {name: 'Connexion', exact: true}).click();
  await expect(page.getByPlaceholder('E-Mail')).toBeVisible();
  await expect(page.getByPlaceholder('Mot de Passe', {exact: true})).toBeVisible();
  await page.getByPlaceholder('E-Mail').fill('invalid');
  await page.getByRole('button', {name: 'Connexion', exact: true}).click();
  await expect(page).toHaveURL(/\/login$/);
  expect(errors).toEqual([]);
});

test('password reset navigation and mobile layout work', async ({page}) => {
  const errors: string[] = [];
  page.on('pageerror', error => errors.push(error.message));
  await page.setViewportSize({width: 390, height: 844});
  await page.goto('/login');
  await expect(page.locator('app-header button').first()).toBeVisible();
  await expect(page.locator('app-header ul')).toBeHidden();
  await page.getByRole('link', {name: 'Mot de passe oublie'}).click();
  await expect(page).toHaveURL(/\/password-reset-request$/);
  await expect(page.getByPlaceholder('E-Mail')).toBeVisible();
  expect(errors).toEqual([]);
});
