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


  Scenario: Copy the project
    Given I click on a project at home page
    When I click on the project settings icon
    Then I should see the 'Copy Project' button is enabled
    And I click on 'Copy Project' button
    Then I should see the 'Copy Project' popup displayed
    Then I should see the 'Project' field displayed
    And I enter the new project name in the 'Project' field
    And I select work space 'Thuan Duong' in the Target Workspace dropdown
    And I click 'Copy Project' button
    Then I should see the toast message 'Project copied successfully. You have been redirected to the new project.' displayed
    Then I should see all task and task items are copied successfully

  Scenario: User cannot copy the project without enter project name
    Given I click on a project at home page
    When I click on the project settings icon
    Then I should see the 'Copy Project' button is enabled
    And I click on 'Copy Project' button
    Then I should see the 'Copy Project' popup displayed
    Then I clear the field 'Project' text box
    And I click 'Copy Project' button
    Then I should see the toast message 'Oops! There was a problem duplicating the task. Please try again' displayed
    Then I should not see the project is copied

  Scenario: User can copy the project with the same name
    Given I click on a project at home page
    When I click on the project settings icon
    Then I should see the 'Copy Project' button is enabled
    And I click on 'Copy Project' button
    Then I should see the 'Copy Project' popup displayed
    And I enter the same name in the 'Project' field
    And I click 'Copy Project' button
    Then I should see the toast message 'Project copied successfully. You have been redirected to the new project.' displayed
    Then I should see all task and task items are copied successfully

  Scenario: The project is not copied when user does not click Copy Project button
    Given I click on a project at home page
    When I click on the project settings icon
    Then I should see the 'Copy Project' button is enabled
    And I click on 'Copy Project' button
    Then I should see the 'Copy Project' popup displayed
    Then I should see the 'Project' field displayed
    And I enter the new project name in the 'Project' field
    And I select work space 'Thuan Duong' in the Target Workspace dropdown
    And I click 'Close' icon
    Then I should see the project is not copied
