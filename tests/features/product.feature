Feature: Managing Products

  Scenario: Admin accesses products endpoint
    Given I am an authorized admin
    When I request the "GET /products" endpoint
    Then the response status code should be 200
    And the response should contain a list of products

  Scenario: Accessing products endpoint without token
    Given I do not provide a token
    When I request the "GET /products" endpoint
    Then the response status code should be 401
    And the response should contain "Authorization header not found"

  Scenario: Accessing products endpoint with token but no admin permission
    Given I am a user without admin permission
    When I request the "GET /products" endpoint
    Then the response status code should be 401
    And the response should contain "Unauthorized"

  Scenario: Accessing products endpoint with invalid token
    Given I am an unauthorized user
    When I request the "GET /products" endpoint with an invalid token
    Then the response status code should be 401
    And the response should contain "Unauthorized"
