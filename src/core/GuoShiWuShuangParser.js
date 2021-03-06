/*
 *	国士无双牌型解析类
 *	用于国士无双和牌向听数及和牌拆解的解析
 *	使用方法：
 *	var parser = new GuoShiWuShuangParser([
 		new Pai("Wanzi",1),
 		new Pai("Wanzi",9),
 		new Pai("Tongzi",1),
 		new Pai("Tongzi",9),
 		new Pai("Suozi",1),
 		new Pai("Suozi",9),
 		new Pai("Feng",1),
 		new Pai("Feng",2),
 		new Pai("Feng",3),
 		new Pai("Feng",4),
 		new Pai("Sanyuan",1),
 		new Pai("Sanyuan",2),
 		new Pai("Sanyuan",3),
 		new Pai("Sanyuan",3),
 	]);
 *	对象方法详见注释
 */

import Pai from "../bean/Pai.js";
const PaiState = {
	Discard: "DISCARD", //待出牌状态或自摸/荣和状态
	Deal: "DEAL" //待摸牌状态
};
const guoshiNums = [0, 8, 9, 17, 18, 26, 27, 28, 29, 30, 31, 32, 33];
class GuoShiWuShuangParser {
	paiList; //传入的手牌
	/*
	 *	构造方法
	 *	参数：
	 *	paiList：手牌数组，应传入Pai对象的数组
	 */
	constructor(paiList) {
		this.paiList = paiList;
	}
	/*
	 *	计算向听数
	 *	参数：
	 *  无
	 *  返回值如下：
	 *  {
	 		xiangTingCount: 1, //向听数，和牌与听牌均为0
	 		paiState: "DISCARD", //PaiState类型，标识待摸牌状态还是待出牌状态
	 		divideResult: [], //List<Pai>类型，待出牌状态或自摸/荣和状态时意为推荐打的牌，待摸牌状态为推荐摸的牌。
	 	}
	 *	错误：
	 *	当输入牌不合法时会throw错误，请注意catch
	 */
	calcXiangting() {
		if (this.paiList.length < 13)
			throw "国士无双在鸣牌后不能计算向听数与牌效";
		var hand = [
			0, 0, 0, 0, 0, 0, 0, 0, 0,
			0, 0, 0, 0, 0, 0, 0, 0, 0,
			0, 0, 0, 0, 0, 0, 0, 0, 0,
			0, 0, 0, 0, 0, 0, 0
		];
		var rest = [
			4, 4, 4, 4, 4, 4, 4, 4, 4,
			4, 4, 4, 4, 4, 4, 4, 4, 4,
			4, 4, 4, 4, 4, 4, 4, 4, 4,
			4, 4, 4, 4, 4, 4, 4
		];
		var wuxiaopai = []; //无效牌
		this.paiList.map((pai) => {
			hand[pai.pai_real_ascii]++;
			rest[pai.pai_real_ascii]--;
			if (rest[pai.pai_real_ascii] < 0)
				throw "输入的牌数不正确";
			if (!guoshiNums.includes(pai.pai_real_ascii))
				wuxiaopai.push(pai);
		});
		var ret = {};
		var res = [];
		ret.xiangTingCount = guoshiNums.reduce((sum, pai_real_ascii, index) => { //国士无双的向听数直接数幺九的数量就行了，为0的就是一次向听计数，也是待牌
			if (index == 1 && hand[0] == 0) {
				sum++;
				res.push(Pai.fromRealAscii(0));
			}
			if (hand[pai_real_ascii] == 0) {
				sum++;
				res.push(Pai.fromRealAscii(pai_real_ascii));
			}
			return sum;
		});
		if (this.paiList.length == 13) {
			ret.paiState = PaiState.Deal
			ret.divideResult = res;
		} else {
			ret.paiState = PaiState.Discard;
			ret.divideResult = wuxiaopai;
		}
		if (ret.paiState == PaiState.Deal && ret.xiangTingCount == 0) //十三面听牌
			ret.divideResult = guoshiNums.map((i) => {
				return Pai.fromRealAscii(i);
			});
		return ret;
	}
	/*
	 * 判断是否和牌
	 * 参数：
	 * 无
	 * 返回值：
	 * 和牌了返回true，否则返回false
	 */
	isHepai() {
		if (this.paiList.length < 14)
			return false;
		var xiangting = this.calcXiangting();
		return xiangting.xiangTingCount == 0 && xiangting.divideResult.length == 0;
	}
}
export default GuoShiWuShuangParser;