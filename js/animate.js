function animate(obj, target, callback) {
    //每次点击都会开启一个定时器 可以事先清除定时器 这样就解决了
    clearInterval(obj.timer);
    //避免开辟太多空间 占用内存 这里用对象的方式来定义
    obj.timer = setInterval(function () {
        //步长值 写到定时器的里面
        var step = (target - obj.offsetLeft) / 10;
        //取整数
        step = step > 0 ? Math.ceil(step) : Math.floor(step);
        if (obj.offsetLeft == target) {
            clearInterval(obj.timer);
            if (callback) {
                callback();
            }
        } else {
            //把每次+1 改为慢慢变小的值
            obj.style.left = obj.offsetLeft + step + 'px';
        }


    }, 15)
}