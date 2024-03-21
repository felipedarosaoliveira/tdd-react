import { test, expect } from '@playwright/test';
import { delay, http, HttpResponse } from 'msw';
import { setupServer } from 'msw/node';



test('Login Page initial state', async ({ page }) => {
    await page.goto('http://localhost:3000/login');
  
    // Expect a title "to contain" a substring.
    const title = await page.getByText('SEGS APP') 
    await expect(title).toBeDefined()
    await expect(page).toHaveScreenshot('login_initial_state.png');
  });

  test('Login Page When user click in enter button without fill username and password then app show an error', async ({ page }) => {
    await page.goto('http://localhost:3000/login');
  
    // Expect a title "to contain" a substring.
    const title = await page.getByText('SEGS APP') 
    await expect(title).toBeDefined()
    const enterButton = await page.getByText(/Sign in$/);
    await enterButton.click();
    await expect(page.getByText('Nome de usuário ou senha não informado.')).toBeDefined();
    await expect(page).toHaveScreenshot('login_without-username-and-password_error.png');
  });

  test('Login Page When user fill username  then  the value of username must be showed ', async ({ page }) => {
    await page.goto('http://localhost:3000/login');
  
    // Expect a title "to contain" a substring.
    const title = await page.getByText('SEGS APP') 
    await expect(title).toBeDefined()
    const inputUser = await page.getByPlaceholder('Digite seu email aqui');
    await inputUser.fill('my_username');
    await expect(page).toHaveScreenshot('login_set_username.png');
  });

  test('Login Page When user fill password then the value of password must be showed encoded', async ({ page }) => {
    await page.goto('http://localhost:3000/login');
  
    // Expect a title "to contain" a substring.
    const title = await page.getByText('SEGS APP') 
    await expect(title).toBeDefined()
    const inputUser = await page.getByPlaceholder('Digite sua senha aqui');
    await inputUser.fill('123456');
    await expect(page).toHaveScreenshot('login_set_password.png');
  });

  test('Login Page When user click to show password then the value of password must be showed ', async ({ page }) => {
    await page.goto('http://localhost:3000/login');
  
    // Expect a title "to contain" a substring.
    const title = await page.getByText('SEGS APP') 
    await expect(title).toBeDefined()
    const inputPassword = await page.getByPlaceholder('Digite sua senha aqui');
    await inputPassword.fill('123456');
    await page.getByRole('img',{role:'input-password-icon'}).click();
    await expect(page).toHaveScreenshot('login_show_password.png');
  });


  test('Login Page When user fill invalid credentials then the screen show an error message ', async ({ page }) => {
    await page.route('**/*/api/authenticate', async route => {
        await route.fulfill({
          status: 401,
          contentType: 'text/plain',
          body: 'NOT AUTHORIZED'
        });
      });

    await page.goto('http://localhost:3000/login');
    
    // Expect a title "to contain" a substring.
    const title = await page.getByText('SEGS APP') 
    await expect(title).toBeDefined()
    const inputUser = await page.getByPlaceholder('Digite seu email aqui');
    await inputUser.fill('invalid_username');
    const inputPassword = await page.getByPlaceholder('Digite sua senha aqui');
    await inputPassword.fill('invalid_password');
    const enterButton = await page.getByText(/Sign in$/);
    await enterButton.click();
    const errorMessage = await page.getByText('teste ou senha inválidos');
    await expect(page).toHaveScreenshot('login_invalid_user_or_password_error.png');
  });

  test('Login Page When user fill valid credentials then the app need navigate to Home page', async ({ page }) => {
    await page.route('**/*/api/authenticate', async route => {
        await route.fulfill({
          status: 200,
          contentType: 'application/json',
          json: {token:"blablabla"}
        });
      });

    await page.goto('http://localhost:3000/login');
    
    // Expect a title "to contain" a substring.
    const title = await page.getByText('SEGS APP') 
    await expect(title).toBeDefined()
    const inputUser = await page.getByPlaceholder('Digite seu email aqui');
    await inputUser.fill('valid_username');
    const inputPassword = await page.getByPlaceholder('Digite sua senha aqui');
    await inputPassword.fill('valid_password');
    const enterButton = await page.getByText(/Sign in$/);
    await enterButton.click();
    await page.waitForURL('**/home');
    await expect(await page.getByText('HOME')).toBeDefined();
    await expect(page).toHaveScreenshot('login_valid.png');
  });
  