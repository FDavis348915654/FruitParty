/**
 * Created by Davis on 2015/6/15.
 * 公共类
 */

var MyGame = MyGame || {};

console.log("v1.0f");

MyGame.STYLE_1 = "style1_";
//MyGame.STYLE_2 = "style2_";

MyGame.g_style = MyGame.STYLE_1;
MyGame.MAX_STRIKE_SCORE = 10; // 最大连击数
MyGame.STRIKE_CONTINUE_TIME = 1.2; // 连击效果持续时间
MyGame.g_lastScore = 0;
MyGame.g_isEnableShowScore = false;
MyGame.TOTLE_TIME = 30; // 30
MyGame.PUNISH_SCORE = 5; // 惩罚扣得分数
