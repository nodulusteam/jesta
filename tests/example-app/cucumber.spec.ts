import { Jesta, When, Given, Then, Types } from 'jesta';
var assert = require('assert');
const regex1 = /\$(\d+)$/;



const theTests = ['test homepage validity']
@Jesta(Types.Jest, './cucumber.feature')
class ExampleTest {
    state: any;
    @Given(theTests, /the user opens the homepage/)
    public async start(title: string) {
        this.state = { status: 'true' };
        return true;
    }
    @When(theTests, 'the page loads')
    public async  action_off(title: string) {
        this.state.action = (title === 'true');
        return true;
    }


    @Then(theTests, 'title should be')
    public async  action(title: string) {
        assert.equal(this.state.action, false);

        return true;
    }




}