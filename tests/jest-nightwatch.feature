Feature: jest nightwatch test
    Scenario: test homepage validity
        Given the user opens the homepage
        When the page loads
        Then title should be

    Scenario: test homepage validity again
        Given the user opens the homepage
        When the page loads
        Then title should be
        Then shutdown

