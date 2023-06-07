class RegisterPage {
    constructor(page) {
      this.page = page;
  
      this.createAccountButton = "//h2[@data-testid = 'signup']";
      this.firstNameField = "//input[@data-testid = 'first-name']";
      this.lastNameField = "//input[@data-testid = 'last-name']";
      this.emailField = "//input[@data-testid = 'email']";
      this.passwordField = "//input[@data-testid = 'password']";
      this.confirmPassField = "//input[@data-testid = 'confirm-password']";
      this.signUpButton = "//button[@data-testid = 'submit']";
      this.logOutButton = "//span[(text() = 'Logout')]";

      this.welcomeUser = "//h2[@data-testid = 'welcome']";
      this.welcomeContainer = '.sc-bjUoiL.sKzpc';
    }
  
    async createAccount(fName,lName, eMail, password, confPassword) {
      await this.page.click(this.createAccountButton);
      await this.page.locator(this.firstNameField).fill(fName);
      await this.page.locator(this.lastNameField).fill(lName);
      await this.page.locator(this.emailField).fill(eMail);
      await this.page.locator(this.passwordField).fill(password);
      await this.page.locator(this.confirmPassField).fill(confPassword);
      await this.page.click(this.signUpButton);
    }

    async CheckToDoisDisplayed() {
      await this.page.waitForSelector(this.welcomeContainer, { state: 'visible' });
      return await this.page.locator(this.welcomeContainer);
    }

    async checkFirstNameonWelcomeMSG() {
        return await this.page.locator(this.welcomeUser).innerText();
      }

    async logOut() {
        await this.page.click(this.logOutButton);
    }  
  }
  
  module.exports = RegisterPage;