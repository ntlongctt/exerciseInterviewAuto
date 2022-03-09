import { Then } from "@cucumber/cucumber"

import { ICustomWorld } from "../../support/customWorld"
import { getText, getElementsCount, selectDateTime } from "../../../src/utils"
import expect from 'expect'
import { projectPage } from "../../../src/locator"

Then("I click create new project button", async function (this: ICustomWorld) {
  const page = this.page!
  await page.click(projectPage.button.addNewProject)
  await page.waitForSelector(projectPage.panel.newProject)
})

Then("I set name and descript on new project popup", async function (this: ICustomWorld, dataTable) {
  const page = this.page!
  const timestamp = + new Date()

  await Promise.all(
    dataTable
      .hashes()
      .map(
        async (ele: {
          ['Project Name']: string
          ['Description']: string
        }) => {
          await (await page.waitForSelector(projectPage.textbox.projectName))
            .type(`${ele['Project Name']} ${timestamp}`)
          await (await page.waitForSelector(projectPage.textbox.projectDescription))
            .type(`${ele['Description']}`)
          this.projectData = {
            name: `${ele['Project Name']} ${timestamp}`,
            description: `${ele['Description']}`
          }
        }
      )
  )
})

Then("I click on Choose a template button", async function (this: ICustomWorld) {
  const page = this.page!
  await page.click(projectPage.button.chooseTemplate)
  await page.waitForSelector(projectPage.panel.template)
})

Then("I click on Create Project button", async function (this: ICustomWorld) {
  const page = this.page!
  await page.click(projectPage.button.createProject)
  await page.waitForSelector(projectPage.panel.template,
    { state: 'detached' })
})

Then("I should see new project is created", async function (this: ICustomWorld) {
  const page = this.page!
  const projectName = await getText(page, projectPage.textbox.projectTitle)
  expect(projectName).toEqual(this.projectData!.name)
})

Then("I create new tasklist", async function (this: ICustomWorld, dataTable) {
  const page = this.page!
  const checkCreateTaskButton =
    await getElementsCount(page, projectPage.button.createTaskList)
  if (checkCreateTaskButton != 0) {
    await page.click(projectPage.button.createTaskList)
  }
  for (let i = 0; i < dataTable.hashes().length; i++) {
    await (await page.waitForSelector(projectPage.textbox.preCreateTaskListName))
      .type(`${dataTable.hashes()[i]['Task List Name']}`)
    await page.keyboard.press('Enter')
  }
})

Then("I add new task in the tasklist", async function (this: ICustomWorld, dataTable) {
  const page = this.page!
  const data = dataTable.hashes()
  await page.keyboard.press('Escape')

  for (let i = 0; i < data.length; i++) {
    const taskListName = await page.waitForSelector(`${projectPage.textbox.taskListName} >> text="${data[i]['Task List Name']}"`)
    const parentTasklists = await taskListName!.$('xpath=../../../..')
    await (await parentTasklists?.waitForSelector(projectPage.button.addNewTask))!.click()
    await page.type(projectPage.textbox.addTaskName, `${data[i]['Task Name']}`)
    await page.click(projectPage.button.createNewTask)
  }
})

Then("I add comment on the task", async function (this: ICustomWorld, dataTable) {
  const page = this.page!
  const data = dataTable.hashes()
  await page.keyboard.press('Escape')

  for (let i = 0; i < data.length; i++) {
    const taskListPanel = await page.waitForSelector(`[data-tasklist-title="${data[i]['Task List Name']}"]`)
    await (await taskListPanel.waitForSelector(`${projectPage.label.taskTitle}:has-text("${data[i]['Task Name']}")`)).click()
    await page.waitForSelector(`${projectPage.panel.taskDetail} >> text="${data[i]['Task Name']}"`)
    await page.click(projectPage.label.commentHeader)
    await page.type('[role="textbox"]', `${data[i]['Comment']}`)
    await page.keyboard.press('Enter')
    await page.waitForSelector(`${projectPage.panel.commentSection} >> text="${data[i]['Comment']}"`)
    await page.click(projectPage.button.closePanel)
  }
})

Then("I add due date on the task", async function (this: ICustomWorld, dataTable) {
  const page = this.page!
  const data = dataTable.hashes()
  await page.keyboard.press('Escape')

  for (let i = 0; i < data.length; i++) {
    const taskListPanel = await page
      .waitForSelector(`[data-tasklist-title="${data[i]['Task List Name']}"]`)
    await (await taskListPanel
      .waitForSelector(`${projectPage.label.taskTitle}:has-text("${data[i]['Task Name']}")`)).click()
    await page.waitForSelector(`${projectPage.panel.taskDetail} >> text="${data[i]['Task Name']}"`)
    await page.click(projectPage.label.propertiesHeader)
    const dueDateRow = await page.waitForSelector(projectPage.label.dueDateRow)
    await (await dueDateRow.waitForSelector(projectPage.button.addProperties)).click()
    await page.waitForSelector(projectPage.panel.setDate)
    await selectDateTime(page, data[i]['Due Date'])
    const dateTime = data[i]['Due Date']
    const fullDate = dateTime.split(' ')[0]!.trim()
    const time = dateTime.split(' ')[1]!.trim()
    const year = fullDate.split('-')[2]!.trim()
    const month = fullDate.split('-')[1]!.trim()
    const date = fullDate.split('-')[0]!.trim()
    const dueDateText = `Due on ${month} ${date}, ${year} at ${time}`
    await page.click(projectPage.button.addDateTimePicker)
    await page
      .waitForSelector(`${projectPage.label.dueDateValue} >> text="${dueDateText}"`)
    await page.click(projectPage.button.closePanel)
  }
})

Then("I should see the due date displayed on the task",
  async function (this: ICustomWorld, dataTable) {
    const page = this.page!
    const data = dataTable.hashes()
    await page.keyboard.press('Escape')

    for (let i = 0; i < data.length; i++) {
      const dueDate =
        await getText(page,
          `[data-tasklist-title="${data[i]['Task List Name']}"] >>
           [data-task-title="${data[i]['Task Name']}"] >>
           ${projectPage.label.dueDateValue}`)
      expect(dueDate).toContain(data[i]['Due Date'])
    }
  })

Then("I click on gear icon",
  async function (this: ICustomWorld) {
    const page = this.page!
    await page.click('.tw-icon-setting')
    await page.waitForSelector('.tw-editable-panel-title__text')
  })

Then("I copy the project",
  async function (this: ICustomWorld) {
    const page = this.page!
    await page.click('.ax-project-copy-row')
    await page.waitForSelector('[data-l10n-key="projects.headers.copy_this_project"]')
    await page.click('[data-l10n-key="projects.buttons.yes_copy"]')
    await page.waitForSelector('[data-l10n-key="projects.headers.copy_this_project"]',
      { state: 'detached' })
    await page.waitForSelector('.ax-flash-message__content')
    expect(await getText(page, '.ax-flash-message__content'))
      .toEqual('Project copied successfully. You have been redirected to the new project.')
  })

Then("I should see the comment on the task", async function (this: ICustomWorld, dataTable) {
  const page = this.page!
  const data = dataTable.hashes()

  for (let i = 0; i < data.length; i++) {
    const taskListPanel = await page.waitForSelector(`[data-tasklist-title="${data[i]['Task List Name']}"]`)
    await (await taskListPanel.waitForSelector(`${projectPage.label.taskTitle}:has-text("${data[i]['Task Name']}")`)).click()
    await page.waitForSelector(`${projectPage.panel.taskDetail} >> text="${data[i]['Task Name']}"`)
    await page.click(projectPage.label.commentHeader)
    await page.waitForSelector(`${projectPage.panel.commentSection} >> text="${data[i]['Comment']}"`)
    await page.click(projectPage.button.closePanel)
  }
})

Then("I should see due date on the detail task", async function (this: ICustomWorld, dataTable) {
  const page = this.page!
  const data = dataTable.hashes()
  await page.keyboard.press('Escape')

  for (let i = 0; i < data.length; i++) {
    const taskListPanel = await page
      .waitForSelector(`[data-tasklist-title="${data[i]['Task List Name']}"]`)
    await (await taskListPanel
      .waitForSelector(`${projectPage.label.taskTitle}:has-text("${data[i]['Task Name']}")`)).click()
    await page.waitForSelector(`${projectPage.panel.taskDetail} >> text="${data[i]['Task Name']}"`)
    await page.click(projectPage.label.propertiesHeader)
    await page.waitForSelector(projectPage.label.dueDateRow)
    const dateTime = data[i]['Due Date']
    const fullDate = dateTime.split(' ')[0]!.trim()
    const time = dateTime.split(' ')[1]!.trim()
    const year = fullDate.split('-')[2]!.trim()
    const month = fullDate.split('-')[1]!.trim()
    const date = fullDate.split('-')[0]!.trim()
    const dueDateText = `Due on ${month} ${date}, ${year} at ${time}`
    expect(await getText(page, `${projectPage.label.dueDateRow} >> ${projectPage.label.dueDateValue}`)).toEqual(dueDateText)
    await page.click(projectPage.button.closePanel)
  }
})

Then("I upload file on the task", async function (this: ICustomWorld, dataTable) {
  const page = this.page!
  const data = dataTable.hashes()
  await page.keyboard.press('Escape')
  page.on('filechooser', async (fileChooser) => {
    await fileChooser.setFiles('playwright/src/data/testTaskWorld.json')
  })
  for (let i = 0; i < data.length; i++) {
    const taskListPanel = await page.waitForSelector(`[data-tasklist-title="${data[i]['Task List Name']}"]`)
    await (await taskListPanel.waitForSelector(`${projectPage.label.taskTitle}:has-text("${data[i]['Task Name']}")`)).click()
    await page.waitForSelector(`${projectPage.panel.taskDetail} >> text="${data[i]['Task Name']}"`)
    await page.click(projectPage.label.fileHeader)
    await page.click(projectPage.button.addAttachemnt)
    await page.waitForSelector(`${projectPage.label.fileName} >> text="testTaskWorld.json"`)
    await page.click(projectPage.button.closePanel)
  }
})

Then("I should see the file displayed on the task", async function (this: ICustomWorld, dataTable) {
  const page = this.page!
  const data = dataTable.hashes()
  await page.keyboard.press('Escape')

  for (let i = 0; i < data.length; i++) {
    const taskListPanel = await page.waitForSelector(`[data-tasklist-title="${data[i]['Task List Name']}"]`)
    await (await taskListPanel.waitForSelector(`${projectPage.label.taskTitle}:has-text("${data[i]['Task Name']}")`)).click()
    await page.waitForSelector(`${projectPage.panel.taskDetail} >> text="${data[i]['Task Name']}"`)
    await page.click(projectPage.label.fileHeader)
    await page.waitForSelector(`${projectPage.label.fileName}  >> text="testTaskWorld.json"`)
    await page.click(projectPage.button.closePanel)
  }
})
