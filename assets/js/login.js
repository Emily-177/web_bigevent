$(function () {
    //点击"去注册账号链接"
    $("#link_reg").on('click', function () {
        $('.login-box').hide()
        $('.reg-box').show()
    })
    //点击"去登录链接"
    $("#link_login").on('click', function () {
        $('.login-box').show()
        $('.reg-box').hide()
    })
    //从layui中获取form对象
    var form = layui.form
    var layer = layui.layer
    //通过form.verify自定义规则
    form.verify({
        pwd: [
            /^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'
        ],
        repwd: function (value) {
            //获得密码框密码
            //获得确认密码框密码
            //对比是否一致
            //如果判断失败,则return一个提示消息
            var pwd = $(".reg-box [name =password]").val();
            if (pwd !== value) {
                return '两次密码不一致';
            }
        }
    });
    //监听注册表单的提交
    $('#form-reg').on('submit', function (e) {
        //阻止默认的提交行为
        e.preventDefault()
        //发送用户注册信息
        var data = { username: $('#form-reg [name=username]').val(), password: $('#form-reg [name=password]').val() }
        $.post(
            '/api/reguser',
            data,
            function (res) {
                if (res.status !== 0) {
                    //利用layui 的layer.msg弹出层,优化用户体验
                    return layer.msg(res.message);
                }
                layer.msg('注册成功, 请登录!');
                //模拟人的点击事件
                $('#link_login').click()
            })
    })
    // 监听表单提交
    $('#form_login').on('submit', function (e) {
        e.preventDefault()
        $.ajax({
            type: "POST",
            url:'/api/login',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('登录失败')
                }
                layer.msg('成功登录')
                //用于有权限接口的身份认证
                // console.log(res.token);
                localStorage.setItem('token', res.token)
                //跳转到后台主页
                location.href = '/index.html';
            }
        })
    })
})