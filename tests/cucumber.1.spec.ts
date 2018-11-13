import { Jesta, When, Given, Then, Types } from '../';
var assert = require('assert');
const regex1 = /\$(\d+)$/;



const theTests = ['test homepage validity']
@Jesta(Types.Cucumber, 'tests/cucumber.feature')
class ComplexTest {
    state: any;
    @Given(theTests, /the user opens the homepage (.*)$/)
    public async start(title: string) {
        this.state = { status: 'true' };
        return true;
    }

    @Then(theTests, /title should be (.*)$/)
    public async  action(title: string) {
        assert.equal(this.state.action, false);

        return true;
    }

    @When(theTests, /the page loads (.*)$/)
    public async  action_off(title: string) {
        this.state.action = (title === 'true');
        return true;
    }


}