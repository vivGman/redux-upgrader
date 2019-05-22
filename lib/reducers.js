'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

exports.boundReducer = boundReducer;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var MultuReducerState = function () {
    function MultuReducerState(Constructor) {
        var _this = this;

        var def = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

        _classCallCheck(this, MultuReducerState);

        Object.keys(def).forEach(function (key) {
            return _this.setValue(key, def[key]);
        });
        this.Constructor = Constructor;
    }

    _createClass(MultuReducerState, [{
        key: 'getValue',
        value: function getValue(key) {
            return this[key] || new ApiState(false, new this.Constructor(), {}, false);
        }
    }, {
        key: 'setValue',
        value: function setValue(key, value) {
            return this[key] = value, this;
        }
    }]);

    return MultuReducerState;
}();

function ApiState() {
    var pending = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
    var payload = arguments[1];
    var error = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
    var isInited = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
    var requestedAt = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : new Date();

    this.pending = pending;
    this.payload = payload;
    this.error = error;
    this.isInited = isInited;
    this.updatedAt = new Date();
    this.requestedAt = requestedAt;
}

var apiReducer = function apiReducer(types, Constructor, prepare, state, action) {
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
};

var multiApiReducer = function multiApiReducer(types, Constructor, extendKey, prepare, state, action) {
    try {
        var key = extendKey(action, state);
        var _state = new MultuReducerState(Constructor, state);
        var _curr = _state.getValue(key);
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
    } catch (error) {
        return state instanceof MultuReducerState ? state : new MultuReducerState(Constructor, state);
    }
};

var boundApiReducer = exports.boundApiReducer = function boundApiReducer(types, Constructor) {
    var extendKey = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
    var prepare = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : function (action) {
        return action.data;
    };

    if (typeof extendKey === 'function') {
        return multiApiReducer.bind(null, types, Constructor, extendKey, prepare);
    } else {
        return apiReducer.bind(null, types, Constructor, prepare);
    }
};

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

function boundReducer() {
    var defaultState = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
    var config = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return function () {
        var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : defaultState;
        var action = arguments[1];

        if (config.hasOwnProperty(action.type) && typeof config[action.type] === 'function') {
            return config[action.type](state, action);
        } else if (config.hasOwnProperty(action.type)) {
            return config[action.type];
        } else {
            return state;
        }
    };
}