"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Yi2 = require("../../../bean/Yi.js");

var _Yi3 = _interopRequireDefault(_Yi2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /*
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *  役种类：门前清自摸
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *	役种类型：普通役
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *  役种番数：1
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *  和牌牌型：不限
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *  役种条件：门前清状态下自摸和牌
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *  冲突役种：无
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


var MenQianQingZiMo = function (_Yi) {
	_inherits(MenQianQingZiMo, _Yi);

	function MenQianQingZiMo() {
		_classCallCheck(this, MenQianQingZiMo);

		return _possibleConstructorReturn(this, (MenQianQingZiMo.__proto__ || Object.getPrototypeOf(MenQianQingZiMo)).call(this, "MenQianQingZiMo", "门前清自摸", 1, []));
	}
	/*
 	判断和牌牌型是否有当前役
 	参数：
 	hePaiPaixing：HePaiPaixing类型，和牌牌型
 	state：State类型，状态对象
 	返回值：
 	有当前役返回该牌型具有的役的对象数组，否则返回空数组
 */


	_createClass(MenQianQingZiMo, null, [{
		key: "getCurrentYi",
		value: function getCurrentYi(hePaiPaixing, state) {
			if (hePaiPaixing.isMenQianQing() && state.isZimo) return [new MenQianQingZiMo()];
			return [];
		}
	}]);

	return MenQianQingZiMo;
}(_Yi3.default);

exports.default = MenQianQingZiMo;
;