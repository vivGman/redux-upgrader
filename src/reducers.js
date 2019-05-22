'use strict';

class MultuReducerState {
    constructor(Constructor, def={}) {
        Object
            .keys(def)
            .forEach(key => this.setValue(key, def[key]));
        this.Constructor = Constructor;
    }
    getValue(key) {
        return this[key] || new ApiState(false, new this.Constructor(), {}, false)
    }
    setValue(key, value) {
        return this[key] = value, this;
    }
}

function ApiState(pending=false, payload, error={}, isInited=false, requestedAt=new Date()) {
    this.pending = pending;
    this.payload = payload;
    this.error   = error;
    this.isInited = isInited
    this.updatedAt = new Date();
    this.requestedAt = requestedAt
}

const apiReducer = (types, Constructor, prepare, state, action) => {
    switch (action.type) {
        case types.REQUEST:
            return new ApiState(true, state.payload, state.error, true);
        case types.RESET:
            return new ApiState(false, new Constructor(), {}, false);
        case types.SUCCESS: 
            action.data = action.data || new Constructor();
            return new ApiState(false, action.requestedAt < state.requestedAt ? state.payload : prepare(action, state), null, true);
        case types.FAILURE: 
            return new ApiState(false, state.payload, action.error, true);
        default: 
            return state || new ApiState(false, new Constructor(), {}, false);
    }
}

const multiApiReducer = (types, Constructor, extendKey, prepare, state, action) => {
    try {
        let key = extendKey(action, state);
        let _state = new MultuReducerState(Constructor, state);
        let _curr = _state.getValue(key);
        switch (action.type) {
            case types.REQUEST:
                return _state.setValue(key, new ApiState(true, _curr.payload, null, true));
            case types.RESET:
                return _state.setValue(key, new ApiState(false, new Constructor(), {}, false));
            case types.SUCCESS: 
                action.data = action.data || new Constructor();
                return _state.setValue(key, new ApiState(false, prepare(action, state), null, true));
            case types.FAILURE: 
                return _state.setValue(key, new ApiState(false, _curr.payload, action.error, true));
            default: 
                return state instanceof MultuReducerState ? state : new MultuReducerState(Constructor, state);
        }
    } catch(error) {
        return state instanceof MultuReducerState ? state : new MultuReducerState(Constructor, state);
    }
}

export const boundApiReducer = (types, Constructor, extendKey=null, prepare=(action)=>action.data) => {
    if (typeof extendKey === 'function') {
        return multiApiReducer.bind(null, types, Constructor, extendKey, prepare)
    } else {
        return apiReducer.bind(null, types, Constructor, prepare)
    }
    
}

// export function boundReducer(reducerType, Constructor = Object) {
//     return (state, action) => {
//         switch (action.type) {
//             case reducerType: {
//                 return action.data
//             };
//             default: {
//                 return state || new Constructor().valueOf()
//             };
//         }
//     }
// }

export function boundReducer(defaultState = null, config = {}) {
    return (state = defaultState, action) => {
        if (
            config.hasOwnProperty(action.type) &&
            typeof config[action.type] === 'function'
        ) {
            return config[action.type](state, action);
        } else if (config.hasOwnProperty(action.type)) {
            return config[action.type];
        } else {
            return state;
        }
    };
}
