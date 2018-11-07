import { loadFeature, defineFeature } from 'jest-cucumber';
export class JestRunner {
    static run(featurFilePath, tests) {
        const feature = loadFeature(featurFilePath);
        defineFeature(feature, (test) => {
            Object.keys(tests).forEach((testItem) => {
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