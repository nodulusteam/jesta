import { Given, Then, When, setDefaultTimeout, AfterAll, BeforeAll } from 'cucumber';

export class CucumberNightWatchRunner {
    static run(featurFilePath, tests) {

        setDefaultTimeout(80000);

        if (tests['beforeAll']) {
            BeforeAll(async () => {
                await tests['beforeAll']();
            });
        }

        if (tests['afterAll']) {
            AfterAll(async () => {
                await tests['afterAll']();
            });
        }



        // AfterAll(async () => {
        //     await closeSession();
        // });


        //const feature = loadFeature(featurFilePath);
        // defineFeature(feature, (test) => {
        Object.keys(tests).forEach((testItem) => {
            if (!tests[testItem] || !tests[testItem].forEach) {
                return;
            }
            const testInstance = new Object();
            // test(testItem, ({ given, when, then }) => {
            tests[testItem].forEach((item) => {
                if (item.given) {
                    Given(item.given, {}, item.call.bind(testInstance));
                }

                if (item.when) {
                    Then(item.when, {}, item.call.bind(testInstance));
                }

                if (item.then) {
                    When(item.then, {}, item.call.bind(testInstance));
                }

            });
            // });
        });
        // });
    }
}