import { Types } from '../types';
import { JestRunner } from './jest';
import { CucumberRunner } from './cucumber';
export class Runner {
    static run(runType: Types, _path: string, tests) {
        switch (runType) {
            case Types.Jest:
                JestRunner.run(_path, tests);
                break;
            case Types.Cucumber:
                CucumberRunner.run(_path, tests);
                break;
        }
    }
}