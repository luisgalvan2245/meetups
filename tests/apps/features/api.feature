Feature: API Endpoints
  As a user
  I want to interact with the API
  So that I can manage tickets

  Scenario: Get all tickets
    Given I have created two tickets
    When I make a GET request to "/tickets"
    Then the response status code should be 200
    And the response should be a valid JSON array
    And the response should contain two tickets with required properties

  Scenario: Get ticket by id
    Given I have created a ticket
    When I make a GET request to "/tickets/{ticketId}"
    Then the response status code should be 200
    And the response should contain the ticket data

  Scenario: Get non-existent ticket
    When I make a GET request to "/tickets/{nonExistentId}"
    Then the response status code should be 404

  Scenario: Create new ticket
    When I make a PUT request to "/tickets/{ticketId}" with valid ticket data
    Then the response status code should be 201
    And the ticket should be created with the provided data

  Scenario: Create ticket with missing title
    When I make a PUT request to "/tickets/{ticketId}" with missing required fields
    Then the response status code should be 422

  Scenario: Create ticket with missing description
    When I make a PUT request to "/tickets/{ticketId}" with missing description
    Then the response status code should be 422

  Scenario: Create ticket with missing date
    When I make a PUT request to "/tickets/{ticketId}" with missing date
    Then the response status code should be 422

  Scenario: Create ticket with missing location
    When I make a PUT request to "/tickets/{ticketId}" with missing location
    Then the response status code should be 422

  Scenario: Create ticket with missing imageUrl
    When I make a PUT request to "/tickets/{ticketId}" with missing imageUrl
    Then the response status code should be 422

  Scenario: Create ticket with missing organizerId
    When I make a PUT request to "/tickets/{ticketId}" with missing organizerId
    Then the response status code should be 422

  Scenario: Update ticket
    Given I have created a ticket
    When I make a PATCH request to "/tickets/{ticketId}" with update data
    Then the response status code should be 204
    And the ticket should be updated with the new data

  Scenario: Delete ticket
    Given I have created a ticket
    When I make a DELETE request to "/tickets/{ticketId}"
    Then the response status code should be 204
    And the ticket should be deleted
