'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

exports.actionCreator = actionCreator;
exports.ApiActions = ApiActions;
exports.ApiAction = ApiAction;
var error_time = 7 * 1000;

function requestSuccess(acts, disp) {
    for (var _len = arguments.length, actionParams = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
        actionParams[_key - 2] = arguments[_key];
    }

    return function (response) {
        return requestStatus(acts, disp, response), disp({ type: acts.SUCCESS, data: response.body, params: actionParams || [], text: response.body ? null : response.text }), response;
    };
}

function requestFailure(acts, disp) {
    for (var _len2 = arguments.length, actionParams = Array(_len2 > 2 ? _len2 - 2 : 0), _key2 = 2; _key2 < _len2; _key2++) {
        actionParams[_key2 - 2] = arguments[_key2];
    }

    return function (error) {
        requestStatus(acts, disp, error);
        disp({ type: acts.FAILURE, error: error, params: actionParams || [] });
    };
}

function requestStatus(acts, disp, resp) {
    if (acts.hasOwnProperty('STATUS')) {
        disp({
            type: acts.STATUS,
            status: resp.statusCode || resp.status
        });
        setTimeout(function () {
            disp({ type: acts.STATUS });
        }, error_time);
    }
}

function actionCreator(type, data) {
    var params = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];

    return { type: type, data: data, params: params };
}

function ApiActions() {
    var _this = this;

    for (var _len3 = arguments.length, actions = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
        actions[_key3] = arguments[_key3];
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
    var traceStatus = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

    this.REQUEST = name + '_REQUEST';
    this.SUCCESS = name + '_SUCCESS';
    this.FAILURE = name + '_FAILURE';
    this.RESET = name + '_RESET';
    if (traceStatus) {
        this.STATUS = name + '_STATUS';
    }
}