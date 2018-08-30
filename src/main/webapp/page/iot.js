

var tipTimeout=null
function showPopover(target, msg,type) {
	
	clearTimeout(tipTimeout);

	
    target.attr("data-original-title", msg);
    $('[data-toggle="tooltip"]').tooltip();
    var tp=target.tooltip('show');
    
    $($(document.body).find(".tooltip")[0]).removeClass("success").removeClass("error");
    if(typeof(type)!="undefined")
    $( $(document.body).find(".tooltip")[0]). addClass(type) ;
    
    $( $(document.body).find(".tooltip")[0]).css("z-index", 1100);
    
    
    
    target.focus();

   //2秒后消失提示框
    tipTimeout = setTimeout(
        function () {
            target.attr("data-original-title", "");
            target.tooltip('hide');
        }, 2000
    );
}

function cconfirm(msg,donecallback,cancelcallback)
{
	swal({
		  title: '确定执行操作吗？', 
		  text: msg,//'你将无法恢复它！', 
		  type: 'warning',
		  showCancelButton: true, 
		  confirmButtonColor: '#3085d6',
		  cancelButtonColor: '#d33',
		  confirmButtonText: '确定', 
		  cancelButtonText: '取消',
		  confirmButtonClass: 'btn btn-success',
		  cancelButtonClass: 'btn btn-danger',
		  buttonsStyling: true,
		  allowOutsideClick:	false,//	如果设置为false，用户无法通过点击弹窗外部关闭弹窗。
		  allowEscapeKey:	false,	//如果设置为false，用户无法通过按下Escape键关闭弹窗。
		  allowEnterKey:false,
		}).then(function(rst) {
			
			
			if(rst.value)
			{
			if(typeof(donecallback)=="function")
				donecallback();
			}
			
			if(rst.dismiss)
				{
				if(typeof(cancelcallback)=="function")
					cancelcallback();
				}
			
		  /*swal(
		    '已删除！',
		    '你的文件已经被删除。'+rst.dismiss,
		    'success'
		  ); */
		})
}



function success(msg)
{
/*	swal({ 
		  title: "操作成功", 
		  text: msg, 
		  timer: 500, 
		  type:"success",
		  showConfirmButton: false 
		});
	
	return;*/
	
	
	//swal("干得漂亮！", "你点击了按钮！","success")
	
	var target=$('<div class="row col-xs-12 toptooltip ">'
			 +'<span class="col-xs-3"></span>'
			 +'<span id="message_new"  class="col-xs-2" style="margin-left: 20px;"></span>'
			+'</div> ');
	var size=$("#page-wrapper").find(".toptooltip").length;
	if(size!=0)
		target=$("#message_new");
	else
		{
		$("#page-wrapper").prepend(target);
		target=$($(target).find("#message_new")[0]);
		}
	
	
	showPopover($(target),msg,"success");
}

function msg(msg)
{
	swal({ 
		  title: "提示信息", 
		  text: msg, 
		 // timer: 1000, 
		  type:"info",
		  showConfirmButton: true 
		});
	
	return;
	
  success(msg);
}



function successInfo(msg,callback)
{
	

	
	 swal({
         title: '温馨提示',
         type: 'success',
         text: msg, 
         showConfirmButton: true 
     }).then(
         function () {
             if(typeof(callback)=="function")
            	 callback();
         }
     );
}

function info(msg,callback)
{
	

	
	 swal({
         title: '温馨提示',
         type: 'info',
         text: msg, 
         showConfirmButton: true 
     }).then(
         function () {
             if(typeof(callback)=="function")
            	 callback();
         }
     );
	
	
	var target=$('<div class="row col-xs-12 toptooltip ">'
			 +'<span class="col-xs-3"></span>'
			 +'<span id="message_new"  class="col-xs-2" style="margin-left: 20px;"></span>'
			+'</div> ');
	var size=$("#page-wrapper").find(".toptooltip").length;
	if(size!=0)
		target=$("#message_new");
	else
		{
		$("#page-wrapper").prepend(target);
		target=$($(target).find("#message_new")[0]);
		}
	
	
	showPopover($(target),msg);
}

function error(msg)
{
	/*swal({ 
		  title: "操作异常", 
		  text: msg, 
		  timer: 1000, 
		  type:"error",
		  showConfirmButton: false 
		});
	
	return;*/
	
	
	var target=$('<div class="row col-xs-12 toptooltip ">'
			 +'<span class="col-xs-3"></span>'
			 +'<span id="message_new"  class="col-xs-2" style="margin-left: 20px;"></span>'
			+'</div> ');
	var size=$("#page-wrapper").find(".toptooltip").length;
	if(size!=0)
		target=$("#message_new");
	else
		{
		$("#page-wrapper").prepend(target);
		target=$($(target).find("#message_new")[0]);
		}
	
	
	showPopover($(target),msg,"error");
}





function GetQueryString(name) {

/*    var index = window.location.href.lastIndexOf("/");
    var indexj = window.location.href.lastIndexOf("#");

    // 最后一个/开始 截取#前面的，兼容history.js html4 url
    var searchpath = window.location.href.substr(index + 1);
    if (indexj > 0)
        searchpath = window.location.href.substr(index + 1, indexj - index - 1);
*/
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$|#)", "i");

    var r = window.location.search.substr(1).match(reg);

    if (r != null)

        return decodeURI(r[2]);

    return null;
}






function ajaxLoading() {
	var berthDocument = window.parent.document;
	// 创建背景层
	var bgDiv = $("<div id='bgDiv' class='ie'></div>");
	// 获取当前文档宽度作为背景层宽度
	var bdWidth = $(berthDocument).width();
	// 获取当前文档高度作为背景层高度
	var bdHeight = $(berthDocument).height();
	// 设置背景层样式
	bgDiv.css({
		'width' : bdWidth,
		'height' : bdHeight,
		'position' : "fixed",
		'top' : 0,
		'left' : 0,
		"z-index" : 100000,
		"background-color" : "#fff",
		"opacity" : "0.85",
		"-moz-opacity" : "0.85",

		'position' : "absolute"

	});

	var maskWidth = 200;
	var maskHeight = 90;

	// var loadingDiv = $('<div id="loadingDiv" style="border:1px;"><img
	// src="'+basePath+'/images/loading.gif" /><br/><a
	// style="font-size:14px;">正在加载数据，请稍候...</a></div>');

	// var url=getImUrl()+"szhmpt/android/images/loading.gif";

	var loadingDiv = $("<div class=\"datagrid-mask-msg ie \"></div>")
			.html(
					"<div class='loadimgdiv'><div src='1'  border='0' alt='' style='margin:10px 80px;' class='loadimg'></div></div><div style='color:#ddd;text-align:center;'>正在处理，请稍候...</div>")
			.css({
				display : "block",

				background : '#333',
				width : maskWidth,
				height : maskHeight,
				left : ($(document.body).outerWidth(true) - maskWidth) / 2,
				top : ($(window).height() - maskHeight) / 2
			});

	loadingDiv.css({

		'position' : "absolute",

		"z-index" : 999,
		"border-radius" : "5px",
		"-moz-border-radius" : "5px",
		"-webkit-border-radius" : "5px",
		"-moz-box-shadow" : "0 1px 2px rgba(0,0,0,0.5)",
		"-webkit-box-shadow" : "0 1px 2px rgba(0,0,0,0.5)",
		"text-shadow" : "0 -1px 1px rgba(0,0,0,0.25)",
		"border-bottom" : "1px solid rgba(0,0,0,0.25)"

	});
	// 将确认框添加到背景层中
	bgDiv.append(loadingDiv);
	// 将背景层添加 到页面中
	$(berthDocument).find("body").eq(0).append(bgDiv);
}
function ajaxLoadEnd() {
	$(window.parent.document).find("#bgDiv").remove();
}
