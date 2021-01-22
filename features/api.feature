Feature: post, get, delete api test

  Scenario: sending get request to root endpoint returns success status code
    Given I send get request to root endpoint
    Then the expected 200 status code is returned

  Scenario: post request a blog story and save to database
    Given I post a blog story
    And the expected post data is returned
    When I get the blog story with the testId id
    Then the expected get data is returned

  Scenario: get request blog stories return data
    Given I post a blog story
    And the expected post data is returned
    When I get blog stories
    Then the returned data length is not 0

  Scenario: delete request a blog story and remove from database
    Given I delete a blog story with the testId id
    And the returned deleted count is 1
    When I get the blog story with the testId id
    Then the result is empty

