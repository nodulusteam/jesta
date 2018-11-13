import { Jesta, When, Given, Then, Types } from '../';
const regex1 = /\$(\d+)$/;

const theTests = ['company enable true', 'company enable false']
@Jesta(Types.Jest, 'tests/jest-alone.2.feature')
class SimpleTest {
    state: any;
    // /^enable \$(\d+)$/

    @Given(['company enable true'], /enable (.+)$/)
    public start(state: boolean) {

        this.state = { status: state };
    }

    @Given(['company enable false'], /enable (.+)$/)
    public start_off(state: boolean) {
        this.state = { status: state };
    }


    @When(['company enable true'], /click on company and enable property is (.*)$/)
    public action(value: string) {
        this.state.action = (value === 'true');
    }
    @When(['company enable false'], 'click on company and enable property is false')
    public action_off() {

    }


    @Then(['company enable true'], 'click function called')
    public assertion() {
        console.log(this.state);
        expect(this.state.action).toBe(true);
    }

    @Then(['company enable false'], 'click function not been called')
    public assertion_off() {
        expect(true).toBe(true);
    }
}