$(function(){
    //1.自定义验证规则
    var form = layui.form;
    form.verify({
        nickname: function(value){
            if(value.length > 6){
                 return"昵称长度为1~6位之间";
            }
        }
    })
    //用户渲染
    initUserInfo();
    //导出layer
    var layer = layui.layer;
    //封装函数
    function initUserInfo(){
        $.ajax({
            method: 'GET',
            url: '/my/userinfo',
            success: function(res){
                if(res.status !==0){
                    // console.log(res);
                    return layer.msg(res.message);
                }
                //成功后，渲染
                form.val('formUserInfo', res.data);
            }
        })
    }


    $("#btnReset").on("click", function(e){
        //阻止重置
        e.preventDefault();
        //从新用户渲染
        initUserInfo()
    })
    $('.layui-form').on('submit', function(e){
        e.preventDefault();
        $.ajax({
            method: 'POST',
            url: '/my/userinfo',
            data: $(this).serialize(),
            success: function(res){
                if(res.status !== 0){
                    return layer.msg("用户信息修改失败!")
                }
                layer.msg("恭喜您,用户信息修改成功!")
                window.parent.getUserInfo();
            }
        })
    })
})