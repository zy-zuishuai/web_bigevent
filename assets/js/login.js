$(function(){
    //1.点击去注册账号，隐藏登陆区域，显示注册区域
    $("#link_reg").on("click", function(){
        $('.login-box').hide();
        $('.reg-box').show();
    })

    //点击去登录，显示登陆区域，隐藏注册区域
    $("#link_login").on("click", function(){
        $('.login-box').show();
        $('.reg-box').hide();
    })

    //2.自定义校验规则
    //从layui中获取form对象
    var form = layui.form
    form.verify({
        pwd: [/^[\S]{6,12}$/, '密码必须6到12,且不能出现空格'],
        repwd: function(value){ 
            var pwd = $('.reg-box [name=password]').val();
            if(pwd !=value){
                return'两次密码不一致!'
            }
        }
    })

    //3.注册
    $("#form_reg").on("submit", function(e){
        //阻止提交
        e.preventDefault();
        //ajax注册
        var layer = layui.layer
        $.ajax({
            method: 'POST',
            url: '/api/reguser',
            data:{
                username:$(".reg-box [name=username]").val(),
                password:$(".reg-box [name=password]").val(),
            },
            success: function(res){
                if(res.status !==0){
                      return alert(res.message);
                      return layer.msg(res.message); 
                }
                // alert('恭喜您注册成功!');
                //提交成功后处理代码
                layer.msg('恭喜您注册成功!');
                //手动切换到登录表单
                $("#link_login").click();
                //重置form表单
                $("#form_reg")[0].reset(); 
            }
        })
    })

    //4.登录
    $("#form_login").submit(function(e){
        //阻止默认提交
        e.preventDefault();
        //ajax登录
        $.ajax({
            method: 'POST',
            url: '/api/login',
            data: $(this).serialize(),
            success: function(res){
                if(res.status !==0){
                    return layer.msg(res.message);
                }
                layer.msg("恭喜您,登陆成功!");
                localStorage.setItem('token', res.token);
                location.href = '/index.html';
            }
        })
    })
})