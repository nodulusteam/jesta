import { loadFeature, defineFeature } from 'jest-cucumber';
import 'jest';
import { createSession, closeSession } from 'nightwatch-api';




export class JestNightWatchRunner {
    static run(featurFilePath, tests) {

        jest.setTimeout(20 * 1000);
        let flagBefore = false;
        let flagAfter = false;


        const feature = loadFeature(featurFilePath);
        defineFeature(feature, (test) => {
            Object.keys(tests).forEach((testClass) => {

                Object.keys(tests[testClass]).forEach((testItem) => {
                    const actualTest = tests[testClass][testItem];

                    if (tests[testClass]['beforeAll'] && !flagBefore) {
                        flagBefore = true;
                        beforeAll(async () => {
                            await tests[testClass]['beforeAll'].bind(this)();
                        });
                    }

                    if (tests[testClass]['afterAll'] && !flagAfter) {
                        flagAfter = true;
                        afterAll(async () => {
                            await tests[testClass]['afterAll'].bind(this)();
                        });
                    }


                    if (!actualTest || !actualTest.forEach) {
                        return;
                    }


                    const testInstance = new Object();
                    test(testItem, ({ given, when, then }) => {

                        actualTest.forEach((item) => {
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
        });
    }
}