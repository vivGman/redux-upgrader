'use strict';

export function actionCreator(type, data, params = []) {
    return { 
        type, 
        data, 
        params 
    }
}

export function ApiActions(...actions) {
    actions.forEach(config => {
        let [ name, traceStatus ] = typeof config == 'string'
            ? [config]
            : config;
        this[name] = new ApiAction(name, traceStatus);
    })
}

export function ApiAction(name, traceStatus = 0) {
    this.REQUEST = `${name}_REQUEST`;
    this.SUCCESS = `${name}_SUCCESS`;
    this.FAILURE = `${name}_FAILURE`;
    this.RESET   = `${name}_RESET`;
    if (traceStatus) {
        this.STATUS  = `${name}_STATUS`;
    }
}