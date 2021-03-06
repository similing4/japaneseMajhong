/*
 *  役种类：对对和
 *	役种类型：普通役
 *  役种番数：2
 *  和牌牌型：面子手牌型
 *  役种条件：和牌牌型中所有面子都是刻子
 *  冲突役种：无
 */
import Yi from "../../../bean/Yi.js";
export default class DuiDuiHe extends Yi {
	constructor() {
		super("DuiDuiHe","对对和",2,[]);
	}
	/*
		判断和牌牌型是否有当前役
		参数：
		hePaiPaixing：HePaiPaixing类型，和牌牌型
		state：State类型，状态对象
		返回值：
		有当前役返回该牌型具有的役的对象数组，否则返回空数组
	*/
	static getCurrentYi(hePaiPaixing,state){
		if(!hePaiPaixing.isMianZiShou())
			return []; //只有面子手有对对和
		var mianziList = hePaiPaixing.getAllMianzi(); //拿到所有面子
		for(var i in mianziList)
			if(!mianziList[i].isKezi())
				return [];
		return [new DuiDuiHe()];
	}
};