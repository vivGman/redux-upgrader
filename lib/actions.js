'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

exports.actionCreator = actionCreator;
exports.ApiActions = ApiActions;
exports.ApiAction = ApiAction;
function actionCreator(type, data) {
    var params = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];

    return {
        type: type,
        data: data,
        params: params
    };
}

function ApiActions() {
    var _this = this;

    for (var _len = arguments.length, actions = Array(_len), _key = 0; _key < _len; _key++) {
        actions[_key] = arguments[_key];
    }

    actions.forEach(function (config) {
        var _ref = typeof config == 'string' ? [config] : config,
            _ref2 = _slicedToArray(_ref, 2),
            name = _ref2[0],
            traceStatus = _ref2[1];

        _this[name] = new ApiAction(name, traceStatus);
    });
}

function ApiAction(name) {
    var traceStatus = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

    this.REQUEST = name + '_REQUEST';
    this.SUCCESS = name + '_SUCCESS';
    this.FAILURE = name + '_FAILURE';
    this.RESET = name + '_RESET';
    if (traceStatus) {
        this.STATUS = name + '_STATUS';
    }
}