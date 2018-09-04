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

function ApiState(pending=false, payload, error={}, isInited=false) {
    this.pending = pending;
    this.payload = payload;
    this.error   = error;
    this.updatedAt = new Date();
    this.isInited = isInited
}

const apiReducer = (types, Constructor, prepare, state, action) => {
    switch (action.type) {
        case types.REQUEST:
            return new ApiState(true, state.payload, state.error, true);
        case types.RESET:
            return new ApiState(false, new Constructor(), {}, false);
        case types.SUCCESS: 
            action.data = action.data || new Constructor();
            return new ApiState(false, prepare(action, state), null, true);
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
                return state || new MultuReducerState(Constructor);
        }
    } catch(error) {
        return state || new MultuReducerState(Constructor);
    }
}

export const boundApiReducer = (types, Constructor, extendKey=null, prepare=(action)=>action.data) => {
    if (typeof extendKey === 'function') {
        return multiApiReducer.bind(null, types, Constructor, extendKey, prepare)
    } else {
        return apiReducer.bind(null, types, Constructor, prepare)
    }
    
}

export function boundReducer(reducerType, Constructor = Object) {
    return (state, action) => {
        switch (action.type) {
            case reducerType: {
                return action.data
            };
            default: {
                return state || new Constructor().valueOf()
            };
        }
    }
}
