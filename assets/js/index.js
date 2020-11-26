$(function(){
   getUserInof();


   //退出
   var layer = layui.layer;
   $("#logout").on('click', function(){
       //框架提供的询问框
    layer.confirm('是否确认退出?', {icon: 3, title:'提示'}, function(index){
        //清空本地token
        localStorage.removeItem('token');
        //页面跳转
        location.href = "/login.html"
        //关闭询问框
        layer.close(index);
      });
   })
});
function getUserInof(){
    $.ajax({
        method: 'GET',
        url: '/my/userinfo',
        // headers: {
        //     Authorization: localStorage.getItem('token') || ""
        // },
        success: function(res){
            // console.log(res);
            if(res.status !== 0){
                return layui.layui.msg(res.message)
            }
            renderAvatar(res.data);
        }
    })
}
function renderAvatar(user){
    var name = user.nickname || user.username;
    $("#welcome").html("欢迎&nbsp;&nbsp;" + name);
    if(user.user_pic !== null){
        $(".layui-nav-img").show().attr("src", user.user_pic);
        $(".user-avatar").hide();
    }else{
        $(".layui-nav-img").hide();
        var text = name[0].toUpperCase();
        $(".user-avatar").show().html(text);
    }
}
