# myQACartToDo
This is a Simple automation project showing how to create an account, add a ToDo task, and remove a task on the QACart ToDo website.
The project is really simple but with a few tricky obstacles on the way. Nonetheless, you will learn from it. Let's get started.


### Table of Contents  
**[Prerequisites & Installation](#prerequisites--installation)**<br>
**[Code and Test Scripts](#code-and-test-scripts)**<br>
**[Report](#report)**<br>

## Prerequisites & Installation
Before starting with the project, you need to install NodeJS on your system.
1) To install NodeJS, open the following link: https://nodejs.org/en.
2) Download the package version suitable for your PC system.
3) After downloading is done, install NodeJS on your system.

When the installation is over, you can check if it is installed correctly on your PC or not by opening the command prompt and running the two lines below:
1) npm -v
2) node -v
Each one should give the correct installed Node version.

After installing Node, install Git from the following link: https://git-scm.com/.

After installing Git, install Visual Studio Code from the following link: https://code.visualstudio.com/download.
After installing the Visual Studio Code IDE, it is time to create a folder for the QACartToDo project.

1) Create a folder on your PC and give it a name (e.g., "QACartToDo_Automation").
2) Open Visual Studio Code and click on "Clone Git Repository".
3) Copy the HTTPS code from the project on the GitHub repository and paste it in Visual Studio.
4) After pasting the URL, specify where you want the project to be located, which in our case will be "QACartToDo_Automation".
Wait until the process is done, and the project will be downloaded to your machine.

Now, to ensure you can run the project, you need to install Playwright.
1) From Visual Studio Code, press (Ctrl + Shift + `) to open a new terminal, or from the top menu, choose "Terminal" and select "New Terminal".
2) After the terminal is opened, write the command below:
```visual Studio Code
npm init playwright@latest
```
This command will install the latest version of Playwright. When the installation process starts, it will ask which language you wish to choose. Select JavaScript.
Then it will ask if you want to add a GitHub Action workflow. Choose "true".
Agree to all remaining questions, then wait for the installation to be done.


## Code and Test Scripts

The QACartToDo allows users to create their own ToDo lists. The user will only need to register an account on the system before using the system's features.
Here is the project's structure:

 ![QACartStructure](https://github.com/TarekAshraf96/myQACartToDo/assets/44756402/fc30880d-6c16-42d6-b29e-6217212724f1)

The project mainly consists of the packages, configs, and dependencies needed to run the project. The main focus will be on the **Environment.Json**, **Pages** folder, and **Tests** folder.

The Environment.Json contains the credentials you need to access the website URL, like email and password. You can change them to your preference.

The Pages folder will contain the functions that we will use in our tests. Each feature will have its JS files, as shown in the picture below:

![PagesFolder](https://github.com/TarekAshraf96/myQACartToDo/assets/44756402/f8dd6b48-62bc-4987-8c26-ad6e1e58e15d)

The **loginPage** contains the login function needed to be able to access the system. The tricky part is that the database resets every 3 hours, which means you will need to create an account regularly.
To handle this, we have the following function in the login file:

```js
async Login(eMail, password) {
      await this.page.locator(this.eMail).fill(eMail);
      await this.page.locator(this.password).fill(password);
      await this.page.click(this.loginButton);

      if (await this.page.locator(this.noAccountinDatabase).isVisible) {
      await this.createAccount(Environment.firstName, Environment.lastName, Environment.mail, Environment.password, Environment.password);
      }
    }
```

The function above attempts to login first. If the 'No Account Found Message' is displayed, then it calls the Create Account function, which is as follows:

```js
 async createAccount(fName, lName, eMail, password, confPassword) {
      await this.page.click(this.createAccountButton);
      await this.page.locator(this.firstNameField).fill(fName);
      await this.page.locator(this.lastNameField).fill(lName);
      await this.page.locator(this.emailField).fill(eMail);
      await this.page.locator(this.passwordField).fill(password);
      await this.page.locator(this.confirmPassField).fill(confPassword);
      await this.page.click(this.signUpButton);
  }
```

Note that the parameters passed in the Create Account function are the ones defined in the Environment JSON file. If you want to change the value, just edit them in that file.

The **Register Page** is mainly used to test the registration process. On the website, once you create an account, you are automatically logged in to the system. However, to ensure we are able to run the test cases/scripts in sequence, we have to have an account in the system to login with before each test function. This is handled from the Login Page file, and the registration test is handled from the Register file.

The **toDoPage** is responsible for both ToDo creation and removal. It mainly consists of the two functions below:

```js
async addToDoTask(taskTitle) {
        await this.page.click(this.addToDoButton);
        await this.checkToDoContainerDisplayed();
        await this.checkNewToDoHeaderDisplayed();
        await this.checkNewToDoSubHeaderDisplayed();
        await this.page.locator(this.toDoField).fill(taskTitle);
        await this.page.click(this.createTaskButton);
      }
```

The function starts by clicking on "Add a new ToDo." Then, it checks the presence of the ToDo container, the header, and the subheader before proceeding to the next steps, which are inserting the task/ToDo title and clicking on the creation button.

After executing the `addToDoTask`, we use the **removeToDoTask** function to remove a task/ToDo:

```js
async removeToDoTask(targetTask) {
        await this.page.locator(`//h2[contains(text(),"${targetTask}")]/../div/button`).click();
        }
```
The function locates a ToDo with a title given through a parameter and clicks the remove button. The `*${targetTask}*` searches the page for the given string value from the user, which is basically the title of the ToDo task. After locating the title of the task, the `*/../div/button*` clicks on the remove button.


Now for the Test Files:

![testFolder](https://github.com/TarekAshraf96/myQACartToDo/assets/44756402/b5a581f0-0955-4fbc-abb8-e6739cbbc3f6)
![TestStructure](https://github.com/TarekAshraf96/myQACartToDo/assets/44756402/09d80bd8-d8f6-4a85-956d-341b85dd246b)

The test contains only one file as shown in the first screenshot and contains 3 test functions as shown in the second screenshot.

The test starts with the following **BeforeEach** function:
![BeforeEach](https://github.com/TarekAshraf96/myQACartToDo/assets/44756402/ef0aec31-414c-4beb-9c84-efa26b1dabdd)

After each time the user logs in to the system, our main 3 test scripts start executing. First, we test the **Register Account**.
The test starts by defining the values that we will use to register an account. We use `${Math.floor(Math.random() * 100)}` to ensure that each time the script runs, it generates new different values.

![RegisterFunction](https://github.com/TarekAshraf96/myQACartToDo/assets/44756402/d6f2b433-0430-41fa-8ab3-357566377cf8)

After declaring the inputs, we log out (since we already logged in from the Before Each script) and go to the create account page. We pass the values to the `createAccount` function and then assert that the ToDo List and the account's first name in the welcome message are both displayed.

After testing the registration, we test the **Add ToDo Task** list function. Here is how it goes: 

![AddTODO](https://github.com/TarekAshraf96/myQACartToDo/assets/44756402/20ce8cd8-211d-477f-a819-8a51831238da)

After adding a task is done, it is time for removing a task using the **Remove ToDo Task**:

![RemoveToDO](https://github.com/TarekAshraf96/myQACartToDo/assets/44756402/9197bbbe-a230-4163-a398-fa3067ef07d6)


## Report

The reporting used in this project is currently the Allure Report. 
To use the Allure Report, open the terminal in Visual Studio Code and apply the following commands:

1) Install the Allure Playwright package from npm by running:
```visual Studio Code
npm i -D @playwright/test allure-playwright
```

2) Then, install the Allure command line:
```visual Studio Code
npm i allure-commandline
```

3) After the command installations are done, go to the `Playwright.config.js` file and add the following Allure report settings in the reporters section:
```visual Studio Code
reporter: [['html', ['allure-playwright']]],
```

Now, to get the reports after testing, you have to run all the tests together. So open a new terminal in Visual Studio Code and run the following command to execute all the tests:
```visual Studio Code
npx playwright test
```

After all the tests are executed, the browser will automatically open the report. However, if you want to open the last report, use the following command:
```visual Studio Code
npx playwright show-report
```
The report will look something like this:


![AllureReport](https://github.com/TarekAshraf96/myQACartToDo/assets/44756402/be8ac5b7-ac02-45e4-8b6e-fc96a0e18672)

And that is a Wrap, Hope you Like the project :D 

