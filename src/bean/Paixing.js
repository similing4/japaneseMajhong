/*
 *	牌型类（包括手牌、副露区牌在内的牌组成的牌型）
 *	用于整副牌的属性的存储。
 *	使用方法：
 *	var paixing = Paixing([
		new Pai("Wanzi",2),
		new Pai("Wanzi",2),
		new Pai("Wanzi",3),
		new Pai("Wanzi",3),
		new Pai("Wanzi",4),
		new Pai("Wanzi",4),
		new Pai("Wanzi",5),
		new Pai("Wanzi",5)
 	],[
 		new Mianzi("Shunzi",false,new Pai("Wanzi",6)),
 		new Mianzi("Shunzi",false,new Pai("Wanzi",6))
 	]);
 	或使用工厂方法：
 	Paixing.parseFromString("22334455m 678m 678m")
 *	对象方法详见注释
 */
import Pai from "./Pai.js"
import Mianzi from "./Mianzi.js";
export default class Paixing {
	hand; // List<Pai>类型，存储手牌的数据
	fulu; // List<Mianzi>类型，存储副露区的数据。

	/*
		构造方法
		参数：
		hand：手牌，详见属性
		fulu：副露面子，详见属性
		错误：
		当手牌与副露牌数总和不正确时报错。
	*/
	constructor(hand, fulu) {
		if (![13, 14].includes(hand.length + fulu.length * 3)) //总牌数（不计杠子）应为13或14
			throw "牌数不正确，手牌数加副露数乘3应为13或14张";
		if (!(hand instanceof Array))
			throw "手牌传入参数应为数组类型，您传入的参数是" + hand;
		hand.map((pai) => {
			if (!(pai instanceof Pai))
				throw "手牌中传入参数应为Pai类型，您传入的参数是：" + pai;
		});
		if (!(fulu instanceof Array))
			throw "副露传入参数应为数组类型，您传入的参数是" + hand;
		fulu.map((mianzi) => {
			if (!(mianzi instanceof Mianzi))
				throw "副露中传入参数应为Mianzi类型，您传入的参数是：" + mianzi;
		});
		this.hand = hand;
		this.fulu = fulu;
	}

	/*
		将天凤麻将牌谱字符串解析为Paixing对象
		参数：
		str：天凤麻将牌谱字符串，格式如下：
			手牌 副露
		其中手牌部分可由如下几种写法组成：
			[1-9]m万子 [1-9]p筒子 [1-9]s索子 [1-4]z 东南西北  [5-7]z 白发中 0代表赤5
		副露部分由手牌部分延伸，可由如下几种写法组成：
			吃：340m（三四红五萬顺子） 碰：222z（南风刻子） 明杠：4444z（北风明杠） 暗杠：33333z(西风暗杠)
		和牌项请放到【手牌】最后，副露后续不满足输入规则的内容会被忽略。
		例：手牌四索两个、二三萬，摸来的牌是四萬，副露为东风碰，五六七万吃，9筒暗杠，那么手牌的格式应为：
		错误：
			44s23m4m 111z 567m 99999p
			输入格式不正确时报错。
	*/
	static parseFromString(str) {
		var data = str.split(" "); //根据空格区分类型
		var hand = data[0].match(/(\d+[mpsz]{1})/g);
		var handRet = [];
		var fulu = [];
		for (var i = 1; i < data.length; i++) {
			if (/^[0-9]{3,5}[mpsz]{1}$/.test(data[i]))
				fulu.push(data[i]);
		}
		hand.map((group) => {
			var match = /(\d+)([mpsz]{1})/.exec(group);
			var num = match[1].split("");
			var type = match[2];
			switch (type) {
				case "m":
					type = "Wanzi";
					break;
				case "p":
					type = "Tongzi";
					break;
				case "s":
					type = "Suozi";
					break;
				case "z":
					type = "Zipai";
					break;
			}
			num.map((paiAscii) => {
				paiAscii = parseInt(paiAscii);
				if (type == "Zipai") {
					if (paiAscii == 0)
						throw "不存在z0";
					if (paiAscii < 5)
						handRet.push(new Pai("Feng", paiAscii));
					else if (paiAscii < 8)
						handRet.push(new Pai("Sanyuan", paiAscii - 4));
					else
						throw "不存在z" + paiAscii;
				} else {
					handRet.push(new Pai(type, paiAscii == 0 ? 5 : paiAscii, paiAscii == 0));
				}
			});
		});
		fulu = fulu.map((group) => {
			var match = /(\d+)([mpsz]{1})/.exec(group);
			var mianzi = match[1];
			var redDoraCount = mianzi.split("").filter((t) => {
				return t == "0";
			}).length;
			mianzi = mianzi.replace(/0/g, 5);
			var num = mianzi.split("").sort();
			var type = match[2];
			var paiType;
			var isPaiFulu = true;
			if (num.length == 5 && num[0] == num[1] && num[1] == num[2] && num[2] == num[3] && num[3] ==
				num[4]) { //暗杠
				paiType = "Gangzi";
				isPaiFulu = false;
			} else if (num.length == 4 && num[0] == num[1] && num[1] == num[2] && num[2] == num[3]) { //明杠
				paiType = "Gangzi";
			} else if (num.length == 3 && num[0] == num[1] && num[1] == num[2]) { //刻子
				paiType = "Kezi";
			} else if (parseInt(num[0]) + 1 == parseInt(num[1]) && parseInt(num[2]) - 1 == parseInt(num[
					1])) { //顺子
				paiType = "Shunzi";
			} else {
				throw "不存在牌型：" + num.join("") + type;
			}
			if (paiType == "Shunzi" && type == "z")
				throw "字牌不能有顺子";
			switch (type) {
				case "m":
					return new Mianzi(paiType, isPaiFulu, new Pai("Wanzi", parseInt(num[0])), redDoraCount);
				case "p":
					return new Mianzi(paiType, isPaiFulu, new Pai("Tongzi", parseInt(num[0])),
					redDoraCount);
				case "s":
					return new Mianzi(paiType, isPaiFulu, new Pai("Suozi", parseInt(num[0])), redDoraCount);
				case "z":
					if (parseInt(num[0]) > 7)
						throw "不存在z" + num[0];
					else if (parseInt(num[0]) > 4)
						return new Mianzi(paiType, isPaiFulu, new Pai("Sanyuan", parseInt(num[0]) - 4),
							redDoraCount);
					else
						return new Mianzi(paiType, isPaiFulu, new Pai("Feng", parseInt(num[0])),
							redDoraCount);
					break;
				default:
					throw "不存在类型：" + type;
			}
		});
		return new Paixing(handRet, fulu);
	}
}
