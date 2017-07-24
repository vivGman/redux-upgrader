'use strict';

import { boundReducer } from './reducers.js'

test(`Simple reducer "SET_USER_NAME"`, () => {
    const action = {
        type: "SET_USER_NAME", 
        data: "Вася"
    };

    expect(boundReducer("SET_USER_NAME", String)('', { type: 'OTHER_TYPE' }))
        .toBe('');
});