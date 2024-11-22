Feature: Product API

  Scenario: Accessing the products endpoint as an admin
    Given I am an authorized admin
    When I request the "GET /products" endpoint
    Then the response status code should be 200
    And the response should contain a list of products

  Scenario: Accessing the products endpoint without a token
    Given I do not provide a token
    When I request the "GET /products" endpoint
    Then the response status code should be 401
    And the response should contain "Authorization header not found"
