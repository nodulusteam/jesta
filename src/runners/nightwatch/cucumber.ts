import { Given, Then, When, setDefaultTimeout, AfterAll, BeforeAll } from 'cucumber';
import { createSession, closeSession } from 'nightwatch-api';




export class CucumberNightWatchRunner {
    static run(featurFilePath, tests) {

        setDefaultTimeout(80000);

        BeforeAll(async () => {
            await createSession('default');
        });

        AfterAll(async () => {
            await closeSession();
        });


        //const feature = loadFeature(featurFilePath);
        // defineFeature(feature, (test) => {
        Object.keys(tests).forEach((testItem) => {
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