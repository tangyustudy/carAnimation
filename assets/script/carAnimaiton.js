
const staticTime = 0.5;

cc.Class({
    extends: cc.Component,

    properties: {
        car: cc.Node,
        boxList: [cc.Node],
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    // 汽车的动画
    carAnimation() {
        let carShape = this.car.getChildByName('carShape');
        this.carShapeAnima(carShape, staticTime);
        let frontTyre = carShape.getChildByName('tyre_front');
        let behindTyre = carShape.getChildByName('tyre_behind');
        this.carTyreAnimation(frontTyre);
        this.carTyreAnimation(behindTyre);
        this.boxListAnimation(this.boxList);
        let tie = this.car.getChildByName('tie');
        this.carTieAnimation(tie);
    },

    // 箱子和盖子的运动
    boxListAnimation(list) {
        for (let i = 0; i < list.length; i++) {
            let item = list[i];
            this.boxAnima(item, staticTime);
            let lid = item.getChildByName('lid');
            this.lidFallDownAnimation(lid, staticTime);
        }
    },



    // 箱子动画
    boxAnima(node, time) {
        let action = cc.sequence(
            cc.moveTo(time, cc.v2(node.x, node.y - 2)),
            cc.moveTo(time, cc.v2(node.x, node.y + 2)),
        ).repeatForever();
        node.runAction(action);
    },

    // 车身动画
    carShapeAnima(node, time) {
        let action = cc.sequence(
            cc.moveTo(time, cc.v2(node.x, node.y + 3)),
            cc.moveTo(time, cc.v2(node.x, node.y - 3)),
            // cc.callFunc(function () {
            //     console.log('helloworld');
            //     console.log(node.position, node.x, node.y);
            // })
        ).repeatForever();
        node.runAction(action);
    },

    // 车轮动画
    carTyreAnimation(node) {
        let action = cc.rotateBy(1.5, 360).repeatForever();
        node.runAction(action);
    },

    //盖子动画
    boxLidAnimation(node) {
        let action = cc.sequence(
            cc.moveTo(0.2, cc.v2(node.x, node.y - 10)),
            cc.moveTo(0.2, cc.v2(node.x, node.y + 10)),
        ).repeatForever();
        node.runAction(action);
    },

    // 盖子从上到下掉落回弹动画
    lidFallDownAnimation(node, time) {
        let action = cc.sequence(
            cc.spawn(
                cc.moveTo(0.2, cc.v2(node.x, node.y - 65)),
                cc.sequence(
                    cc.rotateBy(0.15, 10),
                    cc.rotateBy(0.15, -20),
                    cc.rotateBy(0.15, 15),
                    cc.rotateBy(0.15, -10),
                    cc.rotateBy(0.15, 12),
                    cc.rotateTo(0.15, 0),
                )

            ),
            cc.callFunc(function () {
                console.log('fuck');
            })
        )

        node.runAction(action);
    },



    // 汽车的尾气动画
    carTieAnimation(node) {
        node.getComponent(cc.Animation).play();
    },


    start() {
        this.carAnimation();
    },

    // update (dt) {},
});
