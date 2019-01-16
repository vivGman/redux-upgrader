"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Scope = function (_Array) {
    _inherits(Scope, _Array);

    function Scope() {
        var array = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

        _classCallCheck(this, Scope);

        var _this = _possibleConstructorReturn(this, (Scope.__proto__ || Object.getPrototypeOf(Scope)).call(this));

        [].concat(array).forEach(function (item) {
            _this.push(item);
        });
        return _this;
    }

    _createClass(Scope, [{
        key: "first",
        get: function get() {
            return this[0];
        }
    }, {
        key: "last",
        get: function get() {
            return this[this.length - 1];
        }
    }]);

    return Scope;
}(Array);

var Hash = function (_Object) {
    _inherits(Hash, _Object);

    function Hash() {
        var hash = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

        _classCallCheck(this, Hash);

        var _this2 = _possibleConstructorReturn(this, (Hash.__proto__ || Object.getPrototypeOf(Hash)).call(this, hash));

        Object.keys(hash).forEach(function (key) {
            _this2[key] = hash[key];
        });
        return _this2;
    }

    return Hash;
}(Object);

exports.Scope = Scope;
exports.Hash = Hash;
exports.Object = Object;
exports.Array = Array;
exports.Number = Number;
exports.String = String;