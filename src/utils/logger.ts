import { Console } from "node:console";
import * as fs from "fs";
import config from "config";

abstract class defaultConsole {
    defaultConsole: Console;

    constructor() {
        this.defaultConsole = new Console({
            stdout: process.stdout,
            stderr: process.stderr,
        });
        if (
            config.has("logger.output") &&
            config.get("logger.output") === "file" &&
            config.has("logger.location") &&
            config.has("logger.location.std_logout") &&
            config.has("logger.location.err_logout")
        ) {
            this.defaultConsole = new Console({
                stdout: fs.createWriteStream(
                    `${__dirname}/${config.get("logger.location.std_logout")}`
                ),
                stderr: fs.createWriteStream(
                    `${__dirname}/${config.get("logger.location.err_logout")}`
                ),
            });
        }
    }
}
interface LogInterface {
    message: string;
    option?: any;
}

interface LoggerInterface {
    setLogger(logGroup: string): void;
    getLogger(logGroup: string): logger;
    info(log: LogInterface): void;
    error(message: any, option?: any): void;
    debug(message: any, option?: any): void;
    warn(message: any, option?: any): void;
}

class logger extends defaultConsole implements LoggerInterface {
    message: string;
    logGroup: string = "[default]";
    _obj: object = {
        timeStamps: this.dateformat(),
        logGroup: this.logGroup,
    };
    constructor() {
        super();
        this.message = ``;
    }

    getLogger(logGroup: string = "[default]"): logger {
        this.setLogger(logGroup);
        return this;
    }

    setLogger(logGroup: string): void {
        this._obj = { ...this._obj, ...{ logGroup: `[${logGroup}]` } };
    }

    private dateformat(): string {
        let _date = new Date();
        return `[${_date.toISOString()}]`;
    }

    info(message: any, option?: any): void {
        this.defaultConsole.info(
            config.get("logger.output") === "file"
                ? JSON.stringify({
                      ...this._obj,
                      ...{ type: "info" },
                      ...{ message },
                  })
                : { ...this._obj, ...{ type: "info" }, ...{ message } },
            option ? option : ""
        );
    }

    debug(message: any, option?: any): void {
        this.defaultConsole.debug(
            config.get("logger.output") === "file"
                ? JSON.stringify({
                      ...this._obj,
                      ...{ type: "info" },
                      ...{ message },
                  })
                : { ...this._obj, ...{ type: "info" }, ...{ message } },
            option ? option : ""
        );
    }

    error(message: any, option?: any): void {
        this.defaultConsole.error(
            config.get("logger.output") === "file"
                ? JSON.stringify({
                      ...this._obj,
                      ...{ type: "info" },
                      ...{ message },
                  })
                : { ...this._obj, ...{ type: "info" }, ...{ message } },
            option ? option : ""
        );
    }

    warn(message: any, option?: any): void {
        this.defaultConsole.warn(
            config.get("logger.output") === "file"
                ? JSON.stringify({
                      ...this._obj,
                      ...{ type: "info" },
                      ...{ message },
                  })
                : { ...this._obj, ...{ type: "info" }, ...{ message } },
            option ? option : ""
        );
    }
}

export default logger;
