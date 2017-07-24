'use strict';

import { actionCreator, ApiAction, ApiActions } from './actions.js'

const type = "SET_USER_NAME"

test(`Create simple action ${type} for "Вася"`, () => {
    const name = "Вася";
    const action = {
        type: type, 
        data: name
    };

    expect(actionCreator(type, name)).toMatchObject(action);
});

test(`Create simple action ${type} for "Петя" with params`, () => {
    const name = "Петя";
    const action = {
        type: type, 
        data: name, 
        params: [1,2,3]
    };

    expect(actionCreator(type, name, [1,2,3])).toMatchObject(action);
});


test(`Create types for API action ${type}`, () => {
    const actions = {
        REQUEST: type + '_REQUEST', 
        SUCCESS: type + '_SUCCESS', 
        FAILURE: type + '_FAILURE', 
        RESET:   type + '_RESET'
    };

    expect(new ApiAction(type)).toMatchObject(actions);
});

test(`Create types for API actions ${type} and "SET_USER_EMAIL"`, () => {
    const SET_USER_NAME = {
        REQUEST: 'SET_USER_NAME_REQUEST', 
        SUCCESS: 'SET_USER_NAME_SUCCESS', 
        FAILURE: 'SET_USER_NAME_FAILURE', 
        RESET:   'SET_USER_NAME_RESET'
    }

    const SET_USER_EMAIL = {
        REQUEST: 'SET_USER_EMAIL_REQUEST', 
        SUCCESS: 'SET_USER_EMAIL_SUCCESS', 
        FAILURE: 'SET_USER_EMAIL_FAILURE', 
        RESET:   'SET_USER_EMAIL_RESET'
    }

    expect(new ApiActions("SET_USER_NAME", "SET_USER_EMAIL")).toMatchObject({
        SET_USER_NAME: SET_USER_NAME,
        SET_USER_EMAIL: SET_USER_EMAIL
    });
});