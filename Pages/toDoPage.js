class toDoPage {
    constructor(page) {
      this.page = page;


      this.noToDosAvailable = "//h4[@data-testid = 'no-todos']";
      this.addToDoButton = ".MuiButtonBase-root.MuiIconButton-root";
      this.addNewToDoMsg = ".sc-hHLeRK.dHiQon";
      this.createNewToDoContainer = ".sc-kgflAQ.eoofHA";
      this.createNewToDoHeader = ".sc-fLlhyt.jKxaYt";
      this.createNewToDoSubHeader = ".sc-bBrHrO.bkdzgQ";
      this.toDoField = "//input[@data-testid = 'new-todo']";
      this.createTaskButton = "//button[@data-testid = 'submit-newTask']";
      this.addedTask = "//h2[@data-testid = 'todo-text']";
      this.deleteTaskButton = "//button[@data-testid = 'delete']";
    }

    async addToDoTask(taskTitle) {
        await this.page.click(this.addToDoButton);
        await this.checkToDoContainerDisplayed();
        await this.checkNewToDoHeaderDisplayed();
        await this.checkNewToDoSubHeaderDisplayed();
        await this.page.locator(this.toDoField).fill(taskTitle);
        await this.page.click(this.createTaskButton);
      }

      async checkToDoContainerDisplayed() {
      await this.page.waitForSelector(this.createNewToDoContainer, { state: 'visible' });
      return await this.page.locator(this.createNewToDoContainer);
      }

      async checkNewToDoHeaderDisplayed() {
        await this.page.waitForSelector(this.createNewToDoHeader, { state: 'visible' });
        return await this.page.locator(this.createNewToDoHeader);
        }

     async checkNewToDoSubHeaderDisplayed() {
        await this.page.waitForSelector(this.createNewToDoSubHeader, { state: 'visible' });
        return await this.page.locator(this.createNewToDoSubHeader);
        }

     async checkNewToDoHeaderText() {
        return await this.page.locator(this.createNewToDoHeader).innerText();
        }
    
     async checkNewToDoSubHeaderText() {
        return await this.page.locator(this.createNewToDoSubHeader).innerText();
        }  

      async checkToDoText() {
      return await this.page.locator(this.addedTask).innerText();
      }  
        
    async RemoveToDoTask(targetTask) {
        await this.page.locator(`//h2[contains(text(),"${targetTask}")]/../div/button`).click();
        }

    async checkNoTasksDisplayed() {
     await this.page.waitForSelector(this.noToDosAvailable, { state: 'visible' });
     return await this.page.locator(this.noToDosAvailable);
    }
    
    async checkNoTasksAvailableText() {
        return await this.page.locator(this.noToDosAvailable).innerText();
        }
        
   async checkToDoTaskRemoved() {
      await this.page.locator(this.addedTask).toHaveCount(0);
      }    
}
  
    module.exports = toDoPage;