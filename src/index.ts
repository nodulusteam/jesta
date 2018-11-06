import { loadFeature, defineFeature } from 'jest-cucumber';
import { type } from 'os';

class Jester {
    static tests: {} = {};
    constructor() {

    }
    static initJester(target) {
        // (target as any).jester = (target as any).jester || { tests: {} };
        // const jester = (target as any).jester;
        // return jester
    }

    static verifyTests(test: string) {
        if (!this.tests[test]) {
            this.tests[test] = [];
        }
    }

    static addStep(type, test, expression, callback) {
        if (!Array.isArray(test)) {
            throw new Error('parameter tests must be an array');
        }

        [...test].forEach((_test) => {
            this.verifyTests(_test);

            this.tests[_test].push({ [type]: expression, 'call': callback });
        })

    }

    static given(test, expression, callback) {
        this.addStep('given', test, expression, callback);
    }

    static when(test, expression, callback) {
        this.addStep('when', test, expression, callback);
    }

    static then(test, expression, callback) {
        this.addStep('then', test, expression, callback);
    }
}

export function Jesta(featurFilePath: string, options?: any) {
    return function (target: Function) {
        const feature = loadFeature(featurFilePath);
        Object.getOwnPropertyNames(target.prototype).forEach((member) => {
            if (member !== 'constructor') {
                target.prototype[member]();
            }
        });
        defineFeature(feature, (test) => {
            Object.keys(Jester.tests).forEach((testItem) => {
                const testInstance = new Object();
                test(testItem, ({ given, when, then }) => {
                    Jester.tests[testItem].forEach((item) => {
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

export function Given(test: string | string[], expression: any) {
    return function (target: Object, propertyKey: string, descriptor: TypedPropertyDescriptor<any>) {
        const assertion = descriptor.value;
        Jester.initJester(target);
        Jester.given(test, expression, assertion);
        descriptor.value = () => { };
        return descriptor;
    };
}

export function When(test: string | string[], expression: any) {
    return function (target: Object, propertyKey: string, descriptor: TypedPropertyDescriptor<any>) {
        const assertion = descriptor.value;
        Jester.initJester(target);
        Jester.when(test, expression, assertion);
        descriptor.value = () => { };
        return descriptor;
    }
}

export function Then(test: string | string[], expression: any) {
    return function (target: Object, propertyKey: string, descriptor: TypedPropertyDescriptor<any>) {
        const assertion = descriptor.value;
        Jester.initJester(target);
        Jester.then(test, expression, assertion);
        descriptor.value = () => { };
        return descriptor;
    }
}
