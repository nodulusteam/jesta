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
        const usedDefinitions: any[] = [];
        Object.keys(tests).forEach((testItem) => {
            if (!tests[testItem] || !tests[testItem].forEach) {
                return;
            }
            const testInstance = new Object();

            tests[testItem].forEach((item) => {
                if (item.given) {
                    if (usedDefinitions.indexOf(item.given) === -1) {
                        usedDefinitions.push(item.given);
                        Given(item.given, {}, item.call.bind(testInstance));
                    }

                }

                if (item.when) {
                    if (usedDefinitions.indexOf(item.when) === -1) {
                        usedDefinitions.push(item.when);
                        Then(item.when, {}, item.call.bind(testInstance));
                    }
                }

                if (item.then) {
                    if (usedDefinitions.indexOf(item.then) === -1) {
                        usedDefinitions.push(item.then);
                        When(item.then, {}, item.call.bind(testInstance));
                    }
                }

            });

        });

    }
}