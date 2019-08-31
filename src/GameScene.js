/**
 * Created by Davis on 2015/6/15.
 * 游戏场景
 */
MyGame.GAME_STATE = {IDLE: "IDLE", START: "START", RUN: "RUN", END: "END"};

MyGame.GameScene = cc.Scene.extend({
    m_state: null,

    m_startUILayer: null,
    m_countUILayer: null,
    m_playLayer: null,
    m_countUILayer: null,

    ctor: function () {
        this._super();
        MyGame.GameScene.sm_share = this;
        this.m_state = MyGame.GAME_STATE.IDLE;

        // init
        MyGame.g_style = MyGame.STYLE_1;
        MyPlatform.Init();

        this.SetState(MyGame.GAME_STATE.START)
    },

    onExit: function () {
        this.m_state = MyGame.GAME_STATE.IDLE;
        MyGame.GameScene.sm_share = null;
        this._super();
    },

    SetState: function (state) {
        var oldState = this.m_state;

        this.m_state = state;
        this.OnStateChanged(oldState, this.m_state);
    },

    GetState: function () {
        return this.m_state;
    },

    OnStateChanged: function (oldState, newState) {
        cc.log("GAME_STATE: " + oldState + " --> " + newState);
        if (oldState == MyGame.GAME_STATE.IDLE && newState == MyGame.GAME_STATE.START) {
            var winSize = cc.winSize;
            var spriteBg = new cc.Sprite("res/" + MyGame.g_style + "bg.jpg");

            spriteBg.x = winSize.width / 2;
            spriteBg.y = winSize.height / 2;
            this.addChild(spriteBg);
            this.m_startUILayer = new MyGame.StartUILayer();
            this.addChild(this.m_startUILayer, 3);
        }
        else if (oldState == MyGame.GAME_STATE.START && newState == MyGame.GAME_STATE.RUN) {
            this.m_startUILayer.removeFromParent(true);
            this.m_startUILayer = null;

            if (this.m_playLayer == null) {
                this.m_playLayer = new MyGame.PlayLayer();
                this.addChild(this.m_playLayer, 2);
            }
            this.m_playLayer.PlayGame();
        }
        else if (oldState == MyGame.GAME_STATE.RUN && newState == MyGame.GAME_STATE.END) {
            this.m_countUILayer = new MyGame.CountUILayer();
            this.addChild(this.m_countUILayer, 3);
        }
        else if (oldState == MyGame.GAME_STATE.END && newState == MyGame.GAME_STATE.RUN) {
            this.m_countUILayer.removeFromParent(true);
            this.m_countUILayer = null;

            if (this.m_playLayer == null) {
                this.m_playLayer = new MyGame.PlayLayer();
                this.addChild(this.m_playLayer, 2);
            }
            this.m_playLayer.PlayGame();
        }

    }
});