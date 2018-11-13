
import { Types } from './types';
import { Runner } from './runners/run';
class Jester {
    static tests: {};//{ afterAll: null, beforeAll: null } = { afterAll: null, beforeAll: null };
    constructor() {

    }
    static jestMethods: any = {};
    static initJester(target, propertyKey) {
        if (!this.jestMethods[target]) {
            this.jestMethods[target] = [];
        }
        this.jestMethods[target].push(propertyKey);
        // (target as any).jester = (target as any).jester || { tests: {} };
        // const jester = (target as any).jester;
        // return jester
    }

    static verifyTests(target: any, test?: string) {

        if (!this.tests) {
            this.tests = {};
        }

        if (!this.tests[target]) {
            this.tests[target] = {};
        }

        if (test) {
            if (!this.tests[target][test]) {
                this.tests[target][test] = [];
            }
        }

    }

    static addStep(type, target, test, expression, callback) {
        if (!Array.isArray(test)) {
            throw new Error('parameter tests must be an array');
        }

        [...test].forEach((_test) => {
            this.verifyTests(target, _test);
            this.tests[target][_test].push({ [type]: expression, 'call': callback });
        })

    }

    static given(target, test, expression, callback) {
        this.addStep('given', target, test, expression, callback);
    }

    static when(target, test, expression, callback) {
        this.addStep('when', target, test, expression, callback);
    }

    static then(target, test, expression, callback) {
        this.addStep('then', target, test, expression, callback);
    }

    static beforeAll(target, callback) {
        this.verifyTests(target);
        this.tests[target].beforeAll = callback;
    }

    static afterAll(target, callback) {
        this.verifyTests(target);
        this.tests[target].afterAll = callback;
    }
}
let featurFilePathKey = '';

function getName(target) {
    if (target.name) {
        return target.name;
    } else {
        return target.constructor.name;
    }
}

export function Jesta(jestaType: Types, featurFilePath: string, options?: any) {
    featurFilePathKey = featurFilePath;
    return function (target: any) {

        target.featurFilePath = featurFilePath;
        // Object.getOwnPropertyNames(target.prototype)
        Jester.jestMethods[getName(target)].forEach((member) => {
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
        Jester.initJester(getName(target), propertyKey);
        Jester.given(getName(target), test, expression, assertion);
        descriptor.value = () => { };
        return descriptor;
    };
}

export function When(test: string | string[], expression: any) {
    return function (target: Object, propertyKey: string, descriptor: TypedPropertyDescriptor<any>) {
        const assertion = descriptor.value;
        Jester.initJester(getName(target), propertyKey);
        Jester.when(getName(target), test, expression, assertion);
        descriptor.value = () => { };
        return descriptor;
    }
}

export function Then(test: string | string[], expression: any) {
    return function (target: Object, propertyKey: string, descriptor: TypedPropertyDescriptor<any>) {
        const assertion = descriptor.value;
        Jester.initJester(getName(target), propertyKey);
        Jester.then(getName(target), test, expression, assertion);
        descriptor.value = () => { };
        return descriptor;
    }
}

export function BeforeAll() {
    return function (target: Object, propertyKey: string, descriptor: TypedPropertyDescriptor<any>) {
        const assertion = descriptor.value;
        Jester.initJester(getName(target), propertyKey);
        Jester.beforeAll(getName(target), assertion);
        descriptor.value = () => { };
        return descriptor;
    }
}

export function AfterAll() {
    return function (target: Object, propertyKey: string, descriptor: TypedPropertyDescriptor<any>) {
        const assertion = descriptor.value;
        Jester.initJester(getName(target), propertyKey);
        Jester.afterAll(getName(target), assertion);
        descriptor.value = () => { };
        return descriptor;
    }
}



