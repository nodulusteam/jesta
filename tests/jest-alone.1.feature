Feature: test-with-jest


    Scenario: company enable false

        Given enable false
        When click on company and enable property is false
        Then click function not been called


    Scenario: company enable true

        Given enable true
        When click on company and enable property is true
        Then click function called


 

