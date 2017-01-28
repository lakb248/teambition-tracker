class Logger {
    constructor(prefix) {
        this.prefix = prefix;
        /* global window */
        let console = window.console;
        for (let key in console) {
            if (typeof console[key] === 'function') {
                this[key] = (...args) => {
                    console[key].apply(console[key], [this.prefix].concat(args));
                };
            }
        }
    }
}

export default Logger;
