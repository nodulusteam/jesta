
import { Types } from './types';
import { Runner } from './runners/run';
class Jester {
    static tests: { afterAll: null, beforeAll: null } = { afterAll: null, beforeAll: null };
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

    static beforeAll(callback) {
        this.tests.beforeAll = callback;
    }

    static afterAll(callback) {
        this.tests.afterAll = callback;
    }
}

export function Jesta(jestaType: Types, featurFilePath: string, options?: any) {
    return function (target: Function) {

        Object.getOwnPropertyNames(target.prototype).forEach((member) => {
            if (member !== 'constructor') {
                target.prototype[member]();
            }
        });
        Runner.run(jestaType, featurFilePath, Jester.tests);
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

export function BeforeAll() {
    return function (target: Object, propertyKey: string, descriptor: TypedPropertyDescriptor<any>) {
        const assertion = descriptor.value;
        Jester.initJester(target);
        Jester.beforeAll(assertion);
        descriptor.value = () => { };
        return descriptor;
    }
}

export function AfterAll() {
    return function (target: Object, propertyKey: string, descriptor: TypedPropertyDescriptor<any>) {
        const assertion = descriptor.value;
        Jester.initJester(target);
        Jester.afterAll(assertion);
        descriptor.value = () => { };
        return descriptor;
    }
}



