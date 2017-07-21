'use strict';

const error_time = 7 * 1000;

function requestSuccess(acts, disp, ...actionParams) {
    return response => (
        requestStatus(acts, disp, response),
        disp({ type: acts.SUCCESS, data: response.body, params: actionParams || [], text: response.body ? null : response.text }),
        response
    )
}

function requestFailure(acts, disp, ...actionParams) {
    return error => {
        requestStatus(acts, disp, error);
        disp({ type: acts.FAILURE, error, params: actionParams || [] });
    }
}

function requestStatus(acts, disp, resp) {
    if (acts.hasOwnProperty('STATUS')) {
        disp({ 
            type: acts.STATUS, 
            status: resp.statusCode || resp.status 
        });
        setTimeout(function() {
            disp({ type: acts.STATUS });
        }, error_time);
    }
}

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