/**
 * Created by Davis on 2015/6/15.
 * 开始游戏UI图层
 */

MyGame.StartUILayer = cc.Layer.extend({
    m_btnStart: null,
    m_btnShare: null,
    m_btnMoreGame: null,

    ctor: function () {
        this._super();

        var winSize = cc.winSize;
        var label = null;

        {
            var labelTitle = new cc.LabelTTF("水果派对", "microsoft yahei", 100);
            var actionDelay = cc.delayTime(0.7);
            var action0 = cc.scaleBy(0.2, 1.1);
            var action1 = action0.reverse();
            var seq = cc.sequence(action0, action1);

            labelTitle.setColor(cc.color(255, 50, 75));
            labelTitle.x = winSize.width / 2;
            labelTitle.y = winSize.height / 2 + 180;
            this.addChild(labelTitle);
            labelTitle.runAction(cc.sequence(actionDelay, seq, seq.clone(), seq.clone()).repeatForever());
        }

        { // 添加开始按钮
            this.m_btnStart = new cc.MenuItemImage("res/btn_start.png", "res/btn_start.png", this.OnStartGame, this);
            this.m_btnStart.x = winSize.width / 2;
            this.m_btnStart.y = winSize.height / 2;
            this.m_btnStart.setScale(2);

            label = new cc.LabelTTF("开始游戏", "microsoft yahei", 30);
            label.x = this.m_btnStart.getNormalImage().texture.width / 2;
            label.y = this.m_btnStart.getNormalImage().texture.height / 2;
            label.setScale(0.8);
            label.setColor(cc.color(0, 0, 255));
            this.m_btnStart.addChild(label);
        }

        { // 添加分享按钮
            this.m_btnShare = new cc.MenuItemImage("res/btn_start.png", "res/btn_start.png", this.OnShare, this);
            this.m_btnShare.x = winSize.width / 2;
            this.m_btnShare.y = winSize.height / 2 - 240;
            this.m_btnShare.setScale(2);

            label = new cc.LabelTTF("挑战好友", "microsoft yahei", 30);
            label.x = this.m_btnShare.getNormalImage().texture.width / 2;
            label.y = this.m_btnShare.getNormalImage().texture.height / 2;
            label.setScale(0.8);
            label.setColor(cc.color(0, 0, 255));
            this.m_btnShare.addChild(label);
        }

        { // 添加更多游戏按钮
            this.m_btnMoreGame = new cc.MenuItemImage("res/btn_start.png", "res/btn_start.png", this.OnMoreGame, this);
            this.m_btnMoreGame.x = winSize.width / 2;
            this.m_btnMoreGame.y = winSize.height / 2 - 120;
            this.m_btnMoreGame.setScale(2);

            label = new cc.LabelTTF("更多游戏", "microsoft yahei", 30);
            label.x = this.m_btnMoreGame.getNormalImage().texture.width / 2;
            label.y = this.m_btnMoreGame.getNormalImage().texture.height / 2;
            label.setScale(0.8);
            label.setColor(cc.color(0, 0, 255));
            this.m_btnMoreGame.addChild(label);
        }

        var menu = null;

        menu = new cc.Menu(this.m_btnStart, this.m_btnShare, this.m_btnMoreGame);
        this.addChild(menu);
        menu.x = 0;
        menu.y = 0;
    },

    OnStartGame: function () {
        MyGame.GameScene.sm_share.SetState(MyGame.GAME_STATE.RUN);
    },

    OnShare: function () {
        cc.log("share game.");
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

            cc.log("share info");
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
    },

    OnMoreGame: function () {
        MyPlatform.More();
//        if (ih5game != undefined) {
//            ih5game.more();
//        }
    }
});