/**
 * Created by Davis on 2015/8/7.
 * 各平台的接入文件
 */

var MyPlatform = MyPlatform || {};

MyPlatform.PLATFORM = 2; // 1 为火舞，2 为 5秒

// 定义一些外部接口
var ih5game = ih5game || undefined; // 火舞的接口
var yw = yw || undefined; // 5秒的接口

MyPlatform.Init = function (args) {
    switch (MyPlatform.PLATFORM) {
        case 2:
            if (yw != undefined) {
                yw.init({
                    gameId: "10002320",
                    barrageEnabled: true
                });
                yw.showSplash(1500, "游戏即将开始。。。");
            }
            break;

        default:
            break;
    }
};

MyPlatform.Share = function (args) {
    switch (MyPlatform.PLATFORM) {
        case 1:
            if (ih5game != undefined) {
                ih5game.setShare({
                    title: args[0],
                    desc: args[1]
                });
                ih5game.share();
            }
            break;
        case 2:
            if (yw != undefined) {
                yw.openSocialShareMenu({title: args[0] + "，" + args[1], text: "", imageUrl: "http://chuantu.biz/t2/11/1438246079x-954498987.png"});
//                yw.socialShare("sina_weibo", {title: args[0] + "，" + args[1], text: "", imageUrl: "http://chuantu.biz/t2/11/1438246079x-954498987.png"});
            }
            break;

        default:
            break;
    }
};

MyPlatform.More = function (args) {
    switch (MyPlatform.PLATFORM) {
        case 1:
            if (ih5game != undefined) {
                ih5game.more();
            }
            break;
        case 2:
            if (yw != undefined) {
                yw.moreGame();
            }
            break;

        default:
            break;
    }
};