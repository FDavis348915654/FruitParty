/**
 * Created by Davis on 2015/6/15.
 * 游戏逻辑图层
 */
MyGame.GAME_PLAY_STATE = {IDLE: "IDLE", START: "START", RUN: "RUN", END: "END"};

MyGame.PlayLayer = cc.Layer.extend({
    m_state: null,
    m_costTime: 0,
    m_fallInterval: 0,
    m_score: 0,
    m_labelScore: null,

    m_lastType: 0, // 最后一个选中的类型
    m_lastAddScore: 1, // 这种类型所加的分数
    m_continueTime: 0, // 持续获得连击加成的时间

    m_bTouched: false,

    ctor: function () {
        this._super();
        var winSize = cc.winSize;

        this.m_state = MyGame.GAME_PLAY_STATE.IDLE;
        this.m_labelScore = new cc.LabelTTF("0", "microsoft yahei", 30);
        this.m_labelScore.setColor(cc.color(200, 50, 100));
        this.m_labelScore.setAnchorPoint(cc.p(0, 0.5));
        this.m_labelScore.x = 30;
        this.m_labelScore.y = winSize.height - 30;
        this.addChild(this.m_labelScore, 10);
        this.scheduleUpdate();
    },

    onExit: function () {
        this.m_state = MyGame.GAME_PLAY_STATE.IDLE;
        this._super();
    },

    update: function (dt) {
        this._super(dt);

        if (this.GetState() == MyGame.GAME_PLAY_STATE.RUN) {
            this.m_fallInterval -= dt;
            if (this.m_continueTime > 0) {
                this.m_continueTime -= dt;
            }
            // 产生 N 个下落的方块
            if (this.m_fallInterval <= 0) {
                this.m_fallInterval = 1.0 * Math.random();

                var randCount = ~~(3 * Math.random() + 1);
                var randType = 0;
                var winSize = cc.winSize;
                var thisLayer = this;
                var sprite = null;

                cc.warn("randCount: " + randCount);

                for (var i = 0; i < randCount; i++) {
                    randType = ~~(4 * Math.random());
                    sprite = new cc.Sprite("res/" + MyGame.g_style + "item_" + randType + ".png");

                    sprite.m_isDead = false;
                    sprite.m_type = randType;
                    sprite.m_touchListener = cc.EventListener.create({
                        event: cc.EventListener.TOUCH_ONE_BY_ONE,
                        swallowTouches: false,
                        onTouchBegan: function (touch, event) {
                            if (thisLayer.m_bTouched) {
                                return true;
                            }
                            if (thisLayer.GetState() != MyGame.GAME_PLAY_STATE.RUN) {
                                return true;
                            }

                            var target = event.getCurrentTarget(); // 即为 sprite
                            var locationInNode = target.convertToNodeSpace(touch.getLocation());
                            var s = target.getContentSize();
                            var rect = cc.rect(0, 0, s.width, s.height);

                            // 点中了图片
                            if (!target.m_isDead && cc.rectContainsPoint(rect, locationInNode)) {
                                thisLayer.m_bTouched = true;

                                // 减分或加分
                                if (target.m_type == 0) {
                                    thisLayer.m_lastAddScore = 1;
                                    thisLayer.m_lastType = target.m_type;
                                    thisLayer.m_score -= MyGame.PUNISH_SCORE; // 点中大便一次减 N 分
                                }
                                else {
                                    if (thisLayer.m_lastType == target.m_type) {
                                        if (thisLayer.m_continueTime > 0) {
                                            if (thisLayer.m_lastAddScore >= MyGame.MAX_STRIKE_SCORE) {
                                                thisLayer.m_lastAddScore = MyGame.MAX_STRIKE_SCORE;
                                            }
                                            else {
                                                thisLayer.m_lastAddScore++;
                                            }
                                        }
                                        else {
                                            thisLayer.m_lastAddScore = 1;
                                        }
                                    }
                                    else {
                                        thisLayer.m_lastAddScore = 1;
                                        thisLayer.m_lastType = target.m_type;
                                    }
                                    thisLayer.m_continueTime = MyGame.STRIKE_CONTINUE_TIME;
                                    thisLayer.m_score += thisLayer.m_lastAddScore;
                                }

                                target.m_isDead = true;

                                { // 表现
                                    var actDelSelf = cc.callFunc(function (sender) {
                                        sender.removeFromParent(true);
                                    }, target);

                                    target.runAction(
                                        cc.sequence(
                                            cc.scaleBy(0.3, 1.5, 1.5),
                                            actDelSelf
                                        )
                                    );

                                    var labelScore = new cc.LabelTTF("", "microsoft yahei", 50);
                                    var actDelSelfLabel = cc.callFunc(function (sender) {
                                        sender.removeFromParent(true);
                                    }, labelScore);

                                    if (target.m_type == 0) {
                                        labelScore.string = "-" + MyGame.PUNISH_SCORE;
                                        labelScore.setColor(cc.color(255, 0, 0));
                                    }
                                    else {
                                        labelScore.string = "+" + thisLayer.m_lastAddScore;
                                        labelScore.setColor(cc.color(0, 0, 255));
                                    }
                                    labelScore.setPosition(target.getPosition());
                                    target.getParent().addChild(labelScore);
                                    labelScore.setLocalZOrder(20);
                                    labelScore.runAction(cc.sequence(
                                        cc.scaleBy(0.3, 1.5, 1.5),
                                        cc.delayTime(0.2),
                                        cc.fadeOut(0.2),
                                        actDelSelfLabel
                                    ));
                                }
                                return true;
                            }
                            else {
                                return false;
                            }
                        },
                        onTouchEnded: function (touch, event) {
                            if (thisLayer.m_bTouched) {
                                thisLayer.m_bTouched = false;
                            }
                        },
                        onTouchCancelled: function (touch, event) {
                            if (thisLayer.m_bTouched) {
                                thisLayer.m_bTouched = false;
                            }
                        }
                    });
                    cc.eventManager.addListener(sprite.m_touchListener, sprite);

                    // 改变角度、大小和颜色
//                sprite.setScale(1.5 + 1.5 * Math.random());
//                sprite.setRotation(360 * Math.random())
//                sprite.setColor(cc.color(~~(255 * Math.random()), ~~(255 * Math.random()), ~~(255 * Math.random())));
                    // 让图片往下落
                    var randNum = Math.random();

                    sprite.x = 40 * randNum + (winSize.width - 40) * (1 - randNum);
                    sprite.y = winSize.height + 90;
                    sprite.runAction(
                        cc.sequence(
                            cc.moveTo(1.5 + 5 * Math.random(), sprite.x, -90),
                            cc.callFunc(function (sender) {
                                sender.removeFromParent(true);
                            }, sprite)
                        )
                    );
                    this.addChild(sprite);
                }
            }

            if (this.m_costTime >= MyGame.TOTLE_TIME) {
                this.m_costTime = MyGame.TOTLE_TIME;
                this.SetState(MyGame.GAME_PLAY_STATE.END);
            }

            // 更新分数
            this.m_labelScore.string = "分数: " + this.m_score + ", 时间： " + (MyGame.TOTLE_TIME - this.m_costTime).toFixed(2);
        }

        if (this.GetState() == MyGame.GAME_PLAY_STATE.RUN) {
            this.m_costTime += dt;
        }
    },

    // 从这里开始游戏
    PlayGame: function () {
        this.SetState(MyGame.GAME_PLAY_STATE.START);
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
        cc.log("GAME_PLAY_STATE: " + oldState + " --> " + newState);
        if ((oldState == MyGame.GAME_PLAY_STATE.IDLE || oldState == MyGame.GAME_PLAY_STATE.END) &&
            newState == MyGame.GAME_PLAY_STATE.START) {
            // 倒计时，这里先不做 //...
            // 初始化数据
            this.m_bTouched = false;
            this.m_lastAddScore = 1;
            this.m_continueTime = 0;
            this.m_lastType = 0;
            this.m_score = 0;
            this.m_costTime = 0;
            this.m_fallInterval = 0.2 * Math.random();
            this.SetState(MyGame.GAME_PLAY_STATE.RUN);

        }
        else if (oldState == MyGame.GAME_PLAY_STATE.RUN && newState == MyGame.GAME_PLAY_STATE.END) {
            MyGame.g_isEnableShowScore = true;
            MyGame.g_lastScore = this.m_score;
            MyGame.GameScene.sm_share.SetState(MyGame.GAME_STATE.END);
        }
    }
});