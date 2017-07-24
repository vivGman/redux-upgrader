'use strict';

import { actionCreator, ApiAction, ApiActions } from './actions.js'

test(`Create simple action "SET_USER_NAME" for "Вася"`, () => {
    const action = {
        type: "SET_USER_NAME", 
        data: "Вася"
    };

    expect(actionCreator("SET_USER_NAME", "Вася"))
        .toMatchObject(action);
});

test(`Create simple action "SET_USER_NAME" for "Петя" with params`, () => {
    const action = {
        type: "SET_USER_NAME", 
        data: "Петя", 
        params: [1,2,3]
    };

    expect(actionCreator("SET_USER_NAME", "Петя", [1,2,3]))
        .toMatchObject(action);
});


test(`Create types for API action "SET_USER_NAME"`, () => {
    const actions = {
        REQUEST: 'SET_USER_NAME_REQUEST', 
        SUCCESS: 'SET_USER_NAME_SUCCESS', 
        FAILURE: 'SET_USER_NAME_FAILURE', 
        RESET:   'SET_USER_NAME_RESET'
    };

    expect(new ApiAction("SET_USER_NAME"))
        .toMatchObject(actions);
});

test(`Create types for API actions "SET_USER_NAME" and "SET_USER_EMAIL"`, () => {
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

    const result = {
        SET_USER_NAME: SET_USER_NAME,
        SET_USER_EMAIL: SET_USER_EMAIL
    }

    expect(new ApiActions("SET_USER_NAME", "SET_USER_EMAIL"))
        .toMatchObject(result);
});