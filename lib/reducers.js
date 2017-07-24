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
            return this[key] || {
                payload: new this.Constructor()
            };
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
    var status = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;

    this.pending = pending;
    this.payload = payload;
    this.error = error;
    this.status = status;
}

var apiReducer = function apiReducer(types, Constructor, prepare, state, action) {
    switch (action.type) {
        case types.REQUEST:
            return new ApiState(true, state.payload, state.error, state.status);
        case types.RESET:
            return new ApiState(false, new Constructor());
        case types.SUCCESS:
            action.data = action.data || new Constructor();
            return new ApiState(false, prepare(action), null, state.status);
        case types.FAILURE:
            return new ApiState(false, state.payload, action.error, state.status);
        case types.STATUS:
            return new ApiState(state.pending, state.payload, state.error, action.status);
        default:
            return state || new ApiState(false, new Constructor());
    }
};

var multiApiReducer = function multiApiReducer(types, Constructor, extendKey, prepare, state, action) {
    try {
        var key = extendKey(action, state);
        var _state = new MultuReducerState(Constructor, state);
        var _curr = _state.getValue(key);
        switch (action.type) {
            case types.REQUEST:
                return _state.setValue(key, new ApiState(true, _curr.payload, null, _curr.status));
            case types.RESET:
                return _state.setValue(key, new ApiState(false, new Constructor()));
            case types.SUCCESS:
                action.data = action.data || new Constructor();
                return _state.setValue(key, new ApiState(false, prepare(action), null, _curr.status));
            case types.FAILURE:
                return _state.setValue(key, new ApiState(false, _curr.payload, action.error, _curr.status));
            case types.STATUS:
                return _state.setValue(key, new ApiState(_curr.pending, _curr.payload, _curr.error, action.status));
            default:
                return state || new MultuReducerState(Constructor);
        }
    } catch (error) {
        return state || new MultuReducerState(Constructor);
    }
};

var boundApiReducer = exports.boundApiReducer = function boundApiReducer(types, Constructor) {
    var extendKey = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
    var prepare = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : function (action) {
        return action.data;
    };

    if (typeof extendKey === 'function') {
        return multiApiReducer.bind(null, types, Constructor, extendKey, prepare);
    }
    return apiReducer.bind(null, types, Constructor, prepare);
};

function boundReducer(reducerType) {
    var Constructor = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : Object;

    return function (state, action) {
        switch (action.type) {
            case reducerType:
                {
                    return action.data;
                };
            default:
                {
                    return state || new Constructor().valueOf();
                };
        }
    };
}