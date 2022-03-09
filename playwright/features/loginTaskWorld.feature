Feature: Login to Task World

  Scenario: Login to Task World
    Given I logged into the task world page
    When I should see that user can log in successfully

  Scenario: Create new project
    Given I click create new project button
    And I set name and descript on new project popup
      | Project Name | Description                   |
      | Project Test | This is created by automation |
    And I click on Choose a template button
    And I click on Create Project button
    Then I should see new project is created

  Scenario: Create new task
    Given I create new tasklist
      | Task List Name |
      | Task 1         |
      | Task 2         |
    And I add new task in the tasklist
      | Task Name | Task List Name |
      | Task 1    | Task 1         |
      | Task 2    | Task 1         |
      | Task 3    | Task 1         |
      | Task 1    | Task 2         |
      | Task 2    | Task 2         |
    And I add comment on the task
      | Task Name | Task List Name | Comment                               |
      | Task 1    | Task 1         | This comment is entered by automation |
      | Task 2    | Task 1         | This comment is entered by automation |
      | Task 3    | Task 1         | This comment is entered by automation |
      | Task 1    | Task 2         | This comment is entered by automation |
      | Task 2    | Task 2         | This comment is entered by automation |
    And I upload file on the task
      | Task Name | Task List Name |
      | Task 1    | Task 1         |
      | Task 2    | Task 1         |
      | Task 3    | Task 1         |
      | Task 1    | Task 2         |
      | Task 2    | Task 2         |
    And I add due date on the task
      | Task Name | Task List Name | Due Date          |
      | Task 1    | Task 1         | 21-Mar-2034 16:59 |
      | Task 2    | Task 1         | 12-Dec-2034 17:20 |
      | Task 3    | Task 1         | 16-Feb-2034 16:59 |
      | Task 1    | Task 2         | 12-Aug-2043 18:22 |
      | Task 2    | Task 2         | 21-Mar-2034 16:59 |
    And I should see the due date displayed on the task
      | Task Name | Task List Name | Due Date |
      | Task 1    | Task 1         | Mar 21   |
      | Task 2    | Task 1         | Dec 12   |
      | Task 3    | Task 1         | Feb 16   |
      | Task 1    | Task 2         | Aug 12   |
      | Task 2    | Task 2         | Mar 21   |

  Scenario: Copy the project
    Given I click on gear icon
    And I copy the project
    Then I should see the comment on the task
      | Task Name | Task List Name | Comment                               |
      | Task 1    | Task 1         | This comment is entered by automation |
      | Task 2    | Task 1         | This comment is entered by automation |
      | Task 3    | Task 1         | This comment is entered by automation |
      | Task 1    | Task 2         | This comment is entered by automation |
      | Task 2    | Task 2         | This comment is entered by automation |
    Then I should see the due date displayed on the task
      | Task Name | Task List Name | Due Date |
      | Task 1    | Task 1         | Mar 21   |
      | Task 2    | Task 1         | Dec 12   |
      | Task 3    | Task 1         | Feb 16   |
      | Task 1    | Task 2         | Aug 12   |
      | Task 2    | Task 2         | Mar 21   |
    Then I should see the file displayed on the task
      | Task Name | Task List Name |
      | Task 1    | Task 1         |
      | Task 2    | Task 1         |
      | Task 3    | Task 1         |
      | Task 1    | Task 2         |
      | Task 2    | Task 2         |
    Then I should see due date on the detail task
      | Task Name | Task List Name | Due Date          |
      | Task 1    | Task 1         | 21-Mar-2034 16:59 |
      | Task 2    | Task 1         | 12-Dec-2034 17:20 |
      | Task 3    | Task 1         | 16-Feb-2034 16:59 |
      | Task 1    | Task 2         | 12-Aug-2043 18:22 |
      | Task 2    | Task 2         | 21-Mar-2034 16:59 |
