使用方法如下：

首先下载源码，在模板页加入上传框，结构如下：
```
<div class="control-group js_uploadBox">
    <div class="btn-upload">
      <a href="javascript:void(0);"><i class="icon-upload"></i><span class="js_uploadText">上传</span>图片</a>
      <input class="js_upFile" type="file" name="cover">
    </div>
    
    <div class="js_showBox "><img class="js_logoBox" src="" width="100px" ></div>
</div>
```

然后再引入插件jquery.uploadView.js（注意先后顺序，jquery必须要在插件之前引入）然后在模板页配置插件参数，配置如下
```
$(".js_upFile").uploadView({
	uploadBox: '.js_uploadBox',//设置上传框容器
	showBox : '.js_showBox',//设置显示预览图片的容器
	width : 100, //预览图片的宽度，单位px
	height : 100, //预览图片的高度，单位px
	allowType: ["gif", "jpeg", "jpg", "bmp", "png"], //允许上传图片的类型
	maxSize :2, //允许上传图片的最大尺寸，单位M
	success:function(e){
		$(".js_uploadText").text('更改');
		alert('图片上传成功');
	}
});
```

其中.js_uplFile是上传按钮,uploadBox用来设置上传框容器，showBox用来设置显示预览图片的容器，width用来设置预览图片的宽度，height用来设置预览图片的高度，width不传值时显示图片原始宽度，height不传值时显示图片原始高度，maxSize用来设置允许上传文件的最大尺寸，单位为M。success为上传成功时的回调函数。