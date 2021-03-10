addEventListener('load', function () {
    var focus = document.querySelector('.focus');
    var arrow_l = document.querySelector('.arrow-l');
    //放到这里变成全局变量，方便点击箭头使用
    var arrow_r = document.querySelector('.arrow-r')
    var focusWidth = focus.offsetWidth;
    //鼠标经过焦点图 箭头显示
    focus.addEventListener('mouseenter', function () {
        arrow_l.style.display = 'block';
        arrow_r.style.display = 'block';
        clearInterval(timer);
        timer = null;
    })
    //鼠标离开，箭头隐藏
    focus.addEventListener('mouseleave', function () {
        arrow_l.style.display = 'none';
        arrow_r.style.display = 'none';
        //启用定时器，之前已经声明，这里复制过来即可，不需要加var
        timer = setInterval(function () {
            arrow_r.click();
        }, 2000);
    })
    //上面有几张图片，下面就有几个小圆点。
    var ul = focus.querySelector('ul');
    var ol = document.querySelector('.circle');
    for (var i = 0; i < ul.children.length; i++) {
        var li = document.createElement('li');
        //设置属性 索引号
        li.setAttribute('index', i);
        //追加li到ol里面
        ol.appendChild(li);

        //可以在生成小圆圈的时候绑定点击事件
        li.addEventListener('click', function () {
            for (var i = 0; i < ol.children.length; i++) {
                // 干掉其他人
                ol.children[i].className = '';
            }
            //留下我自己
            this.className = 'current';
            //当我们点击了某个li就得到它的索引号
            var index = this.getAttribute('index');
            //把得到的索引号给num
            num = index;
            //把索引号给circle
            circle = index;
            // 在函数里面是局部变量，下边点击按钮就用不了了，所以要提到外面作全局变量
            // var focusWidth = focus.offsetWidth;
            console.log(focusWidth);
            console.log(index);
            //调用函数
            animate(ul, -index * focusWidth);
        })
    }
    ol.children[0].className = 'current';
    //克隆第一张图片li放到ul最后
    var first = ul.children[0].cloneNode(true);
    ul.appendChild(first);
    //点击右侧按钮，图片滚动一张
    var num = 0;
    var circle = 0; //控制小圆圈的播放
    //节流阀
    var flag = true;
    arrow_r.addEventListener('click', function () {
        if (flag) {
            flag = false;
            //当图片滚动到克隆的最后一张图片时，让ul快速的
            //不做动画的跳到最左侧，left为0；
            if (num == ul.children.length - 1) {//4
                ul.style.left = 0;
                num = 0;
            }
            num++;
            animate(ul, -num * focusWidth, function () {
                flag = true;
            });
            //点击右侧按钮，小圆圈跟随一起变化，可以再声明一个变量控制小圆圈的播放。
            circle++;
            //如果circle=4.说明走到最后一张图片了，就复原。
            if (circle == ol.children.length) {
                circle = 0
            }
            //调用函数
            circleChange();
        }


    })
    //**左侧按钮
    arrow_l.addEventListener('click', function () {
        if (flag) {
            flag = false;
            //当图片滚动到克隆的最后一张图片时，让ul快速的
            //不做动画的跳到最右侧，left为0；
            if (num == 0) {//4
                num = ul.children.length - 1;
                ul.style.left = -num * focusWidth + 'px';
            }
            num--;
            //节流阀，在回调函数里面‘打开水龙头’;
            animate(ul, -num * focusWidth, function () {
                flag = true;
            });
            //点击左侧按钮，小圆圈跟随一起变化，可以再声明一个变量控制小圆圈的播放。
            circle--;
            //如果circle<0.说明跳到最后一张图片，index=3。
            if (circle < 0) {
                circle = ol.children.length - 1;//3
            }
            circleChange();
        }
    })
    function circleChange() {
        //先清除其余小圆圈的类名
        for (var i = 0; i < ol.children.length; i++) {
            ol.children[i].className = '';
        }
        //当前小圆圈的类名设置为current
        ol.children[circle].className = 'current';
    }
    //自动播放图片
    var timer = setInterval(function () {
        arrow_r.click();
    }, 2000);
})