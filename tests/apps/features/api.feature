Feature: API Endpoints
  As a user
  I want to interact with the API
  So that I can manage meetups

  Scenario: Get all meetups
    Given I have created two meetups
    When I make a GET request to "/meetups"
    Then the response status code should be 200
    And the response should be a valid JSON array
    And the response should contain two meetups with required properties

  Scenario: Get meetup by id
    Given I have created a meetup
    When I make a GET request to "/meetups/{meetupId}"
    Then the response status code should be 200
    And the response should contain the meetup data

  Scenario: Get non-existent meetup
    When I make a GET request to "/meetups/{nonExistentId}"
    Then the response status code should be 404

  Scenario: Create new meetup
    When I make a PUT request to "/meetups/{meetupId}" with valid meetup data
    Then the response status code should be 201
    And the meetup should be created with the provided data

  Scenario: Create meetup with missing title
    When I make a PUT request to "/meetups/{meetupId}" with missing required fields
    Then the response status code should be 422

  Scenario: Create meetup with missing description
    When I make a PUT request to "/meetups/{meetupId}" with missing description
    Then the response status code should be 422

  Scenario: Create meetup with missing date
    When I make a PUT request to "/meetups/{meetupId}" with missing date
    Then the response status code should be 422

  Scenario: Create meetup with missing location
    When I make a PUT request to "/meetups/{meetupId}" with missing location
    Then the response status code should be 422

  Scenario: Create meetup with missing imageUrl
    When I make a PUT request to "/meetups/{meetupId}" with missing imageUrl
    Then the response status code should be 422

  Scenario: Create meetup with missing organizerId
    When I make a PUT request to "/meetups/{meetupId}" with missing organizerId
    Then the response status code should be 422

  Scenario: Update meetup
    Given I have created a meetup
    When I make a PATCH request to "/meetups/{meetupId}" with update data
    Then the response status code should be 204
    And the meetup should be updated with the new data

  Scenario: Delete meetup
    Given I have created a meetup
    When I make a DELETE request to "/meetups/{meetupId}"
    Then the response status code should be 204
    And the meetup should be deleted
