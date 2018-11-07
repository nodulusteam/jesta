Feature: nightwatch test
    Scenario: test homepage validity

        Given the user opens the homepage "title"
        When the page loads "title"
        Then title should be "title" 

