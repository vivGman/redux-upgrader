'use strict';

var _actions = require('./actions.js');

test('Create simple action "SET_USER_NAME" for "\u0412\u0430\u0441\u044F"', function () {
    var action = {
        type: "SET_USER_NAME",
        data: "Вася"
    };

    expect((0, _actions.actionCreator)("SET_USER_NAME", "Вася")).toMatchObject(action);
});

test('Create simple action "SET_USER_NAME" for "\u041F\u0435\u0442\u044F" with params', function () {
    var action = {
        type: "SET_USER_NAME",
        data: "Петя",
        params: [1, 2, 3]
    };

    expect((0, _actions.actionCreator)("SET_USER_NAME", "Петя", [1, 2, 3])).toMatchObject(action);
});

test('Create types for API action "SET_USER_NAME"', function () {
    var actions = {
        REQUEST: 'SET_USER_NAME_REQUEST',
        SUCCESS: 'SET_USER_NAME_SUCCESS',
        FAILURE: 'SET_USER_NAME_FAILURE',
        RESET: 'SET_USER_NAME_RESET'
    };

    expect(new _actions.ApiAction("SET_USER_NAME")).toMatchObject(actions);
});

test('Create types for API actions "SET_USER_NAME" and "SET_USER_EMAIL"', function () {
    var SET_USER_NAME = {
        REQUEST: 'SET_USER_NAME_REQUEST',
        SUCCESS: 'SET_USER_NAME_SUCCESS',
        FAILURE: 'SET_USER_NAME_FAILURE',
        RESET: 'SET_USER_NAME_RESET'
    };

    var SET_USER_EMAIL = {
        REQUEST: 'SET_USER_EMAIL_REQUEST',
        SUCCESS: 'SET_USER_EMAIL_SUCCESS',
        FAILURE: 'SET_USER_EMAIL_FAILURE',
        RESET: 'SET_USER_EMAIL_RESET'
    };

    var result = {
        SET_USER_NAME: SET_USER_NAME,
        SET_USER_EMAIL: SET_USER_EMAIL
    };

    expect(new _actions.ApiActions("SET_USER_NAME", "SET_USER_EMAIL")).toMatchObject(result);
});