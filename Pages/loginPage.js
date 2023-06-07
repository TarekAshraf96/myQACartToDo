const Environment = require('../Data/Enviroment.json');

class LoginPage {
    constructor(page) {
      this.page = page;
  
      this.eMail = '#email-label';
      this.password = '#password-label';
      this.loginButton = '#submit';
      this.noAccountinDatabase = "//div[@data-testid = 'error-alert']";
      this.createAccountButton = "//h2[@data-testid = 'signup']";
      this.firstNameField = "//input[@data-testid = 'first-name']";
      this.lastNameField = "//input[@data-testid = 'last-name']";
      this.emailField = "//input[@data-testid = 'email']";
      this.passwordField = "//input[@data-testid = 'password']";
      this.confirmPassField = "//input[@data-testid = 'confirm-password']";
      this.signUpButton = "//button[@data-testid = 'submit']";

      this.welcomeUser = "//h2[@data-testid = 'welcome']";
      this.welcomeContainer = '.sc-bjUoiL.sKzpc';
    }
  
    async Login(eMail, password) {
      await this.page.locator(this.eMail).fill(eMail);
      await this.page.locator(this.password).fill(password);
      await this.page.click(this.loginButton);

      if (await this.page.locator(this.noAccountinDatabase).isVisible) {
      await this.createAccount(Environment.firstName,Environment.lastName,Environment.mail,Environment.password,Environment.password);
      }
    }

    async checkNoAccountFoundMsg() {
       await this.page.locator(this.noAccountinDatabase).toHaveCount(0);
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
}
  
  module.exports = LoginPage;