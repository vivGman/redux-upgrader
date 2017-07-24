'use strict';

var _reducers = require('./reducers.js');

test('Simple reducer "SET_USER_NAME"', function () {
    var action = {
        type: "SET_USER_NAME",
        data: "Вася"
    };

    expect((0, _reducers.boundReducer)("SET_USER_NAME", String)('', { type: 'OTHER_TYPE' })).toBe('');
});