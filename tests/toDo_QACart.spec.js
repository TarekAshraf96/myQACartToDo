const { test, chromium, expect } = require('@playwright/test');
const Environment = require('../Data/Enviroment.json');
const LoginPage = require('../Pages/loginPage');
const RegisterPage = require('../Pages/RegisterAccPage');
const ToDoPage = require('../Pages/toDoPage');

//let page;
let browser;
let loginPage;
let registerPage;
let toDoPage;

test.beforeEach(async ({page}) => {

    test.setTimeout(90000);
    browser = await chromium.launch({ headless:false , slowMo:100 });
    loginPage = new LoginPage(page);
    registerPage = new RegisterPage(page);
    toDoPage = new ToDoPage(page);
    await page.goto(`${Environment.URL}`, { waitUntil: 'networkidle' });
    await loginPage.Login(Environment.mail,Environment.password);
});

test.describe('toDo QACart Tests', () => {

    test('Register to ToDo QACart Website', async ({page}) => {
    const firstName = `FirstName ${Math.floor(Math.random() * 100)}`;
    const lastName = `LastName ${Math.floor(Math.random() * 100)}`;
    const Mail = `Test${Math.floor(Math.random() * 100)}@gmail.com`;
    const Password = `Abcd ${Math.floor(Math.random() * 100)}!@`;
    const confirmPassword = Password;

    await registerPage.logOut();
    await registerPage.createAccount(firstName,lastName,Mail,Password,confirmPassword);

    const toDoContainer = await registerPage.CheckToDoisDisplayed();
    await expect(toDoContainer).toBeVisible();

    const nameOnWelcome = (await registerPage.checkFirstNameonWelcomeMSG());
    expect.soft(nameOnWelcome).toContain(firstName.toUpperCase());

    console.log('Register Passed');
    
    });


test('Add ToDo Task', async ({page}) => {

        const taskTitle = 'Add ToDo Task';

        await toDoPage.addToDoTask(taskTitle);

        const expectedHeader = 'Create a new Todo';
        const expectedSubHeader = 'Ready to mark some Todos as completed?';
        
    
        const Header = (await toDoPage.checkNewToDoHeaderText());
        expect.soft(Header).toContain(expectedHeader.toUpperCase());
    
        const subHeader = (await toDoPage.checkNewToDoSubHeaderText());
        expect.soft(subHeader).toContain(expectedSubHeader);

        const returnedTaskTitle = (await toDoPage.checkToDoText());
        expect.soft(returnedTaskTitle).toContain(taskTitle);

        await toDoPage.RemoveToDoTask(taskTitle);
        
    });

    test('Remove ToDo Task', async ({page}) => {
        const taskTitle = 'Add ToDo Task';

        await toDoPage.addToDoTask(taskTitle);
        const returnedTaskTitle = (await toDoPage.checkToDoText());
        expect.soft(returnedTaskTitle).toContain(taskTitle);

        await toDoPage.RemoveToDoTask(taskTitle);

        const noTasksMsgDisplay = await toDoPage.checkNoTasksDisplayed();
        await expect(noTasksMsgDisplay).toBeVisible();
    
        const noTasksExpectedMsg = 'No Available Todos';
    
        const noTasksMsg = (await toDoPage.checkNoTasksAvailableText());
        expect.soft(noTasksMsg).toContain(noTasksExpectedMsg);

    });

    test.afterEach(async () => {
        await browser.close();
      });
});