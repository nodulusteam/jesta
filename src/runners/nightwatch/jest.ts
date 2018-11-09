import { loadFeature, defineFeature } from 'jest-cucumber';
import 'jest';
import { createSession, closeSession } from 'nightwatch-api';




export class JestNightWatchRunner {
    static run(featurFilePath, tests) {

        jest.setTimeout(20 * 1000);

        if (tests['beforeAll']) {
            beforeAll(async () => {
                await tests['beforeAll'].bind(this)();
            });
        }

        if (tests['afterAll']) {
            afterAll(async () => {
                await tests['afterAll'].bind(this)();
            });
        }

        const feature = loadFeature(featurFilePath);
        defineFeature(feature, (test) => {
            Object.keys(tests).forEach((testItem) => {
                if (!tests[testItem] || !tests[testItem].forEach) {
                    return;
                }

                const testInstance = new Object();
                test(testItem, ({ given, when, then }) => {

                    tests[testItem].forEach((item) => {
                        if (item.given) {
                            given(item.given, item.call.bind(testInstance));
                        }

                        if (item.when) {
                            when(item.when, item.call.bind(testInstance));
                        }

                        if (item.then) {
                            then(item.then, item.call.bind(testInstance));
                        }

                    });
                });
            });
        });
    }
}