import { Jesta, When, Given, Then, Types,BeforeAll,AfterAll } from '../';
var assert = require('assert');
const regex1 = /\$(\d+)$/;
import { client } from 'nightwatch-api';
import { createSession, closeSession } from 'nightwatch-api';


const theTests = ['test homepage validity']
@Jesta(Types.CucumberNightWatch, 'tests/cucumber.feature')
class NightwatchTest {
    state: any;


    @BeforeAll()
    async createSession(){
        await createSession('default');
    }

    @AfterAll()
    async closeSession(){
        await closeSession();
    }



    @Given(theTests, /the user opens the homepage (.*)$/)
    public async start(title: string) {
        this.state = { action: false };
        return await client.url(`http://www.google.com`)
            .waitForElementVisible('body', 15000)
            .pause(4000);
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
        return await client.end();
    }


}