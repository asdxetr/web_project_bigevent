$(function(){
    getUserinfo()
    // 退出登录提示框
    var layer = layui.layer
    $('#loginOut').click(function(){
        layer.confirm('退出登录？', {icon: 3, title:'提示'}, function(index){
        //do something
        // 清空本地的localstorage信息
        localStorage.removeItem('token')
        // 跳转到登录页面
        location.href = "/login.html"
        layer.close(index);
      })

    })
    
    
    

})
// 用户信息获得函数
function getUserinfo(){
    $.ajax({
        method:'GET',
        url:"http://ajax.frontend.itheima.net/my/userinfo",
        headers:{
            Authorization:localStorage.getItem("token"),
        },
       success:function(res){
            // console.log(localStorage.getItem("token"))
           console.log(res)
           if(res.status == 0){
            renderAvatar(res.data)
           }
            
        },
        complete:function(res){
          
            if(res.responseJSON.status ===1 && res.responseJSON.message =='身份认证失败！'){
                    localStorage.removeItem('token')
                    location.href= "/login.html"
                }
        }

    })
}
// 用户登录信息渲染函数
function renderAvatar(user){
    var name = user.nickname||user.username
    console.log(name)
    $(".welcome span").text(name)
    $(".avatar").text(name.substring(0,1).toUpperCase())
    // 获取用户图像

    if(user.user_pic){
       $(".layui-nav-img").attr('src',user.user_pic).show()
       $(".welcome span").hide()
       
    }
    else{
        $(".layui-nav-img").hide()
        $(".welcome span").show()
    }
}