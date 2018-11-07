import { Jesta, When, Given, Then, Types } from '../';

const regex1 = /\$(\d+)$/;
import { client } from 'nightwatch-api';


const theTests = ['test homepage validity']
@Jesta(Types.JestNightWatch, 'tests/jest-nightwatch.feature')
class NightwatchJestTest {
    state: any;
    @Given(theTests, 'the user opens the homepage')
    public async start(title: string) {
        this.state = { action: false };
        await client.url(`http://www.google.com`)
            .waitForElementVisible('body', 15000);
        return true;

    }

    @When(theTests, 'the page loads')
    public async  action_off(title: string) {
        this.state.action = (title === 'true');
        return true;
    }

    @Then(theTests, 'title should be')
    public async  action() {
        client.assert.title('Google');


        client.end();
        return true;
    }




}