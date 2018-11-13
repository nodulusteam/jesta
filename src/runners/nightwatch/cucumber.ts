import { Given, Then, When, setDefaultTimeout, AfterAll, BeforeAll,After, Before } from 'cucumber';

export class CucumberNightWatchRunner {
    static flagBefore = false;
    static flagAfter = false;
    static usedDefinitions: any[] = [];
    static run(featurFilePath, tests) {
        setDefaultTimeout(80000);
        // if (tests['beforeAll']) {
        //     BeforeAll(async () => {
        //         await tests['beforeAll']();
        //     });
        // }
        // if (tests['afterAll']) {
        //     AfterAll(async () => {
        //         await tests['afterAll']();
        //     });
        // }

        function uniqueIdent(action) {
            if (action.source) {
                return action.source;
            } else {
                return action;
            }


        }


        Object.keys(tests).forEach((testClass) => {
            const tc = tests[testClass];
            if (!tc.processed) {
                tc.processed = true;
                Object.keys(tc).forEach((testItem) => {
                    const actualTest = tc[testItem];
                    const testInstance = new Object();

                    if (tc['beforeAll'] && !this.flagBefore) {
                        this.flagBefore = true;
                        BeforeAll(async () => {
                            await tc['beforeAll'].bind(testInstance)();
                        });
                    }

                    if (tc['afterAll'] && !this.flagAfter) {
                        this.flagAfter = true;
                        AfterAll(async () => {
                            await tc['afterAll'].bind(testInstance)();
                        });
                    }

                    if (!actualTest || !actualTest.forEach) {
                        return;
                    }

                    actualTest.forEach((item) => {
                        if (item.given) {
                            if (this.usedDefinitions.indexOf(uniqueIdent(item.given)) === -1) {
                                this.usedDefinitions.push(uniqueIdent(item.given));
                                Given(item.given, {}, item.call.bind(testInstance));
                            }

                        }

                        if (item.when) {
                            if (this.usedDefinitions.indexOf(uniqueIdent(item.when)) === -1) {
                                this.usedDefinitions.push(uniqueIdent(item.when));
                                When(item.when, {}, item.call.bind(testInstance));
                            }
                        }

                        if (item.then) {
                            if (this.usedDefinitions.indexOf(uniqueIdent(item.then)) === -1) {
                                this.usedDefinitions.push(uniqueIdent(item.then));
                                Then(item.then, {}, item.call.bind(testInstance));
                            }
                        }

                    });
                });
            }
        });
    }
}