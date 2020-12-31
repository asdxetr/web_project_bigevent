// 1.1 获取裁剪区域的 DOM 元素
var $image = $('#image')
// 1.2 配置选项
const options = {
    // 纵横比
    aspectRatio: 1,
    // 指定预览区域
    preview: '.img-preview'
}
// 1.3 创建裁剪区域
$image.cropper(options)
// 引入layui的layer库
var layer = layui.layer
// 入口函数
$(function () {
    // 模拟文件上传input
    $("#btnUpload").click(function () {
        $("#files").click()

    })
    // 点击上传图片
    $("#files").change(function () {
        // 获得文件
        var file = document.getElementById("files").files
        if (file.length == 0) {
            layer.msg('没有上传图片')
        }
        // 获得文件的url地址
        var newImgURL = URL.createObjectURL(file[0])
        // url得到的图片配置
        $image
            .cropper('destroy')    // 销毁旧的裁剪区域
            .attr('src', newImgURL)  // 重新设置图片路径
            .cropper(options)
    })
    // 点击确定按钮更换头像
    $("#btnCofirm").on('click', function () {
        //    获取裁剪后的图片
        var dataURL = $image
            .cropper('getCroppedCanvas', { // 创建一个 Canvas 画布
                width: 100,
                height: 100
            })
            .toDataURL('image/png')
        $.ajax({
            method:"POST",
            url:"http://ajax.frontend.itheima.net/my/update/avatar",
            data:{
                avatar:dataURL
            },
            headers:{
                Authorization:localStorage.getItem("token")
            },
            success:function(res){
                if(res.status!=0){
                    layer.msg("上传头像失败！")
                }
                else{
                    layer.msg("上传头像成功！")
                    window.parent.getUserinfo()
                }
            }
        })
    })

})
