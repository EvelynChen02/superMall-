$(function () {
    //点击上面的li，当前li添加current类，其余兄弟移除类
    $('.detail_tab_list li').click(function () {
        $(this).addClass('current').siblings().removeClass('current');
        //点击的同时，拿到当前li的索引号
        var index = $(this).index();
        // console.log($(this).index());
        $('.item_info li').eq(index).show().siblings().hide();
    })
})