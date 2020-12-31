$(function(){
    // 调用layui表单验证
var form = layui.form
var layer = layui.layer
form.verify({
    username:function(value){
        if(value.length>6){
            return "名字个数不能超过6个"
        }
    }

})
// 调用函数获取用户信息
initUserInfo()

})
// 定义获取用户信息的函数
function initUserInfo(){
    $.ajax({
        method:"GET",
        url:"http://ajax.frontend.itheima.net/my/userinfo",
        headers:{
            Authorization:localStorage.getItem("token"),

        }
        ,
        success:function(res){
            if(res.status != 0){
                layer.msg("获取用户信息失败！")
            }
            // 填充用户信息
            $("#userId").val(res.data.id)
            $("#username").val(res.data.username)
            $("#nickname").val(res.data.nickname)
            $("#email").val(res.data.email)
        }
    })
}
// 重置表单的数据
$("#btnReset").on('click',function(e){
//    阻止表单的默认提交行为
    e.preventDefault()
    initUserInfo()
})
// 发起ajax修改用户的信息
$(".layui-form").on('submit',function(e){
    // 阻止表单的默认提交行为
    e.preventDefault()
    $.ajax({
        method:'POST',
        url:"http://ajax.frontend.itheima.net/my/userinfo",
        headers:{
            Authorization:localStorage.getItem('token')
        },
        // 获取表单的数据
        data:$(".layui-form").serialize(),
        success:function(res){
            if(res.status != 0){
                layer.msg("更新用户信息失败！")
            }
            
            layer.msg('更新用户信息成功！')
            
            window.parent.getUserinfo()
        }
    })

})
