import {Console} from 'node:console';

abstract class defaultConsole {
    
    defaultConsole: Console;
    
    constructor () {
        this.defaultConsole = new Console({ stdout: process.stdout, stderr: process.stderr });
    }
}
interface LogInterface {
    message: string;
    option?: any;
}

interface LoggerInterface {
    setLogger(logGroup: string): void;
    info(log:LogInterface):void;
    error(message: any, option?: any):void;
    debug(message: any, option?: any):void;
    warn(message: any, option?: any):void;
}

class logger extends defaultConsole implements LoggerInterface {
    message: string;
    logGroup: string = '[default]';
    _obj: object = {
        timeStamps: this.dateformat(),
        logGroup: this.logGroup,
    }
    constructor(){
        super();
        this.message = ``;
    }

    setLogger(logGroup: string): void {
        this._obj = {...this._obj, ...{logGroup: `[${logGroup}]`}}
    }

    private dateformat(): string {
        let _date = new Date();
        return `[${_date.toISOString()}]`;
    }

    info(message: any, option?: any): void {
        this.defaultConsole.info({...this._obj, ...{type: 'info'}, ...{message}}, option? option: '')
    }

    debug(message: any, option?: any): void {
        this.defaultConsole.debug({...this._obj, ...{type: 'debug'}, ...{message}}, option? option: '')
    }

    error(message: any, option?: any): void {
        this.defaultConsole.error({...this._obj, ...{type: 'error'}, ...{message}}, option? option: '')
    }

    warn(message: any, option?: any): void {
        this.defaultConsole.warn({... this._obj, ...{type: 'warn'}, ...{message}}, option? option: '')
    }
}

export default logger;