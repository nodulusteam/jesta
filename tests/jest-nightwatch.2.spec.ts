import { Jesta, When, Given, Then, Types, BeforeAll, AfterAll } from '../';
import { client } from 'nightwatch-api';
import { createSession, closeSession } from 'nightwatch-api';

const theTests = ['test homepage validity', 'test homepage validity again']
@Jesta(Types.JestNightWatch, 'tests/jest-nightwatch.2.feature')
class NightwatchJestTest {
    state: any;

    @BeforeAll()
    async createSession() {
        await createSession('default');
    }

    @AfterAll()
    async closeSession() {
        await closeSession();
    }



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
        return true;
    }

    @Then(['test homepage validity again'], 'shutdown')
    public async  shutdown() {
        return await client.end();
    }


}