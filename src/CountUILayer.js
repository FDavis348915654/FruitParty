/**
 * Created by Davis on 2015/8/4.
 */

MyGame.CountUILayer = cc.Layer.extend({
    ctor: function () {
        this._super();
        var winSize = cc.winSize;
        var label = null;
        var btnRestart = null;
        var btnShare = null;
        var labelTitle = null;

        {
            labelTitle = new cc.LabelTTF("分数", "microsoft yahei", 90);
            labelTitle.setColor(cc.color(255, 50, 75));
            labelTitle.x = winSize.width / 2;
            labelTitle.y = winSize.height / 2 + 180;
            this.addChild(labelTitle);
        }

        {
            label = new cc.LabelTTF("" + MyGame.g_lastScore, "microsoft yahei", 65);
            label.setColor(cc.color(255, 50, 75));
            label.x = winSize.width / 2;
            label.y = winSize.height / 2 + 70;
            this.addChild(label);
        }

        { // 添加重玩按钮
            btnRestart = new cc.MenuItemImage("res/btn_start.png", "res/btn_start.png", this.OnRestart, this);
            btnRestart.x = winSize.width / 2;
            btnRestart.y = winSize.height / 2 - 20;
            btnRestart.setScale(2);

            label = new cc.LabelTTF("再来一局", "microsoft yahei", 30);
            label.x = btnRestart.getNormalImage().texture.width / 2;
            label.y = btnRestart.getNormalImage().texture.height / 2;
            label.setScale(0.8);
            label.setColor(cc.color(0, 0, 255));
            btnRestart.addChild(label);
        }

        { // 添加重玩按钮
            btnShare = new cc.MenuItemImage("res/btn_start.png", "res/btn_start.png", this.OnShare, this);
            btnShare.x = winSize.width / 2;
            btnShare.y = winSize.height / 2 - 140;
            btnShare.setScale(2);

            label = new cc.LabelTTF("挑战好友", "microsoft yahei", 30);
            label.x = btnShare.getNormalImage().texture.width / 2;
            label.y = btnShare.getNormalImage().texture.height / 2;
            label.setScale(0.8);
            label.setColor(cc.color(0, 0, 255));
            btnShare.addChild(label);
        }

        var menu = null;

        menu = new cc.Menu(btnRestart, btnShare);
        this.addChild(menu);
        menu.x = 0;
        menu.y = 0;
    },

    OnRestart: function () {
        MyGame.GameScene.sm_share.SetState(MyGame.GAME_STATE.RUN);
    },

    OnShare: function () {
        cc.log("count, share game.");
//        if (ih5game != undefined)
        {
            var shareTitle = "水果派对";
            var shareSummary = "一起来参加水果派对吧";

            if (MyGame.g_isEnableShowScore) {
                if (MyGame.g_lastScore > 0) {
                    shareSummary += ", 我得了 " + MyGame.g_lastScore + " 分！！！";
                }
                else {
                    shareSummary += ", 我得了 " + MyGame.g_lastScore + " 分！！！";
                }
            }

            cc.log("count, share info");
            MyPlatform.Share([shareTitle, shareSummary]);
        }
//        else {
//            var shareTitle = "" + "水果派对";
//            var shareSummary = "" + "一起来参加水果派对吧";
//            var shareUrl = "" + window.location.href;
//            var sharePicUrl = "http://chuantu.biz/t2/11/1438246079x-954498987.png";
//
//            if (MyGame.g_isEnableShowScore) {
//                if (MyGame.g_lastScore > 0) {
//                    shareSummary += ", 我得了 " + MyGame.g_lastScore + " 分！！！";
//                }
//                else {
//                    shareSummary += ", 我只得了 " + MyGame.g_lastScore + " 分！！！";
//                }
//            }
//
//            window.open("http://v.t.sina.com.cn/share/share.php?title=" + shareTitle + "，" + shareSummary + "&url=" + shareUrl + "&pic=" + sharePicUrl);
//        }
    }
});