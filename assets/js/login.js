$(function(){
    // 登录和注册界面切换
    var layer = layui.layer
    
    $('.goReg').on('click',function(){
        $('.loginBox').hide()
        $('.regBox').show()
    })
    $('.goLogin').on('click',function(){
        $('.regBox').hide()
        $('.loginBox').show()
    })


// 注册部分
    $('#regForm').submit(function(e){
        e.preventDefault()
        $.ajax({
            method:"POST",
            url:"http://ajax.frontend.itheima.net/api/reguser",
            data:{
                username:$("#regUsername").val(),
                password:$("#pwd1").val()
            },
            success:function(res){
                // console.log($("#regUsername").val())
                // console.log(res)
                $('.goLogin').click()
            }
        })
    })
// 登录部分功能
    $('#loginFrom').submit(function(e){
        e.preventDefault()
        $.ajax({
            method:"POST",
            url:"http://ajax.frontend.itheima.net/api/login",
            data:{
                username:$('#loginUser').val(),
                password:$('#loginPwd').val()
            },
            success:function(res){
                if(res.status==0){
                    localStorage.setItem('token',res.token)
                    location.href = "/index.html"
                    
                }
                // console.log(res)
                else{
                    layer.msg('登录失败！')
                    localStorage.removeItem('token')
                }
                 
            }
        })
    })
})

var form = layui.form
form.verify({
    pwd:[/^[\S]{6,12}$/
    ,'密码必须6到12位，且不能出现空格'],
    pwdCon:function(value){
       
        // console.log($('#pwd1').val()+value)
        if($('#pwd1').val()!==value){
            return '两次密码输入不一致'
        }
    }

   
   

})
