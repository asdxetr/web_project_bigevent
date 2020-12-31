$(function(){
    var form = layui.form
    var layer = layui.layer
    // 密码框输入验证规则
    form.verify({
        pwd:[
            /^[\S]{6,12}$/
            ,'密码必须6到12位，且不能出现空格'
          ],
        rePwd:function(value){
            if(value===$("[name=oldPwd]").val()){
                return "新密码不能和原密码一样"
            }
        },
        newPwd:function(value){
            if(value!== $("[name=newPwd").val()){
                return "两次密码输入不一致"
            }
        }
    })
    // 发起Ajax请求更新密码
    $(".layui-form").on('submit',function(e){
        // 阻止表单的默认提交行为
        e.preventDefault()
        // 发起ajax请求更新密码
        $.ajax({
            method:"POST",
            url:"http://ajax.frontend.itheima.net/my/updatepwd",
            
            data:$(this).serialize(),
            headers:{
                Authorization:localStorage.getItem('token')
            },
            success:function(res){
                if(res.status!=1){
                   layer.msg("密码更新失败！")
                }
               layer.msg("密码更新成功！")
               $(".layui-form")[0].reset()
            }
        })

    })

})