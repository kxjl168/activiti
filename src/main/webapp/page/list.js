function GetQueryString(name) {

	var index = window.location.href.lastIndexOf("/");
	var indexj = window.location.href.lastIndexOf("?");

	// 最后一个/开始 截取#前面的，兼容history.js html4 url
	var searchpath = window.location.search;

	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$|#)", "i");

	var r = searchpath.substr(1).match(reg);

	if (r != null)

		return decodeURI(r[2]);

	return null;
}

var userid="";
$(function() {

	todolist();
	donelist();
	
	// 模拟用户
	userid=$("#uid").val();
});

function doquery() {
	var opt = {
		url : basePath + '/todo/' + $("#uid").val(),
		silent : true
	};
	$("#tb").bootstrapTable('refresh', opt);
	
	//success("test");
}
function todolist() {
	// 初始化Table
	$('#tb').bootstrapTable({
		url : basePath + '/todo/' + $("#uid").val(), // 请求后台的URL（*）
		method : 'post', // 请求方式（*）
		contentType : 'application/x-www-form-urlencoded',
		toolbar : '#toolbar', // 工具按钮用哪个容器
		showHeader : true,
		searchAlign : 'left',
		buttonsAlign : 'left',

		searchOnEnterKey : true,
		striped : true, // 是否显示行间隔色
		cache : false, // 是否使用缓存，默认为true，所以一般情况下需要设置一下这个属性（*）
		pagination : true, // 是否显示分页（*）
		sortable : false, // 是否启用排序
		sortName : 'id', // 排序字段
		sortOrder : "desc", // 排序方式
		sidePagination : "server", // 分页方式：client客户端分页，server服务端分页（*）
		pageNumber : 1, // 初始化加载第一页，默认第一页
		pageSize : 10, // 每页的记录行数（*）
		pageList : [ 10, 25 ], // 可供选择的每页的行数（*）
		search : false, // 是否显示表格搜索，此搜索是客户端搜索，不会进服务端，所以，个人感觉意义不大

		// showColumns: true, //是否显示所有的列
		uniqueId : "id", // 每一行的唯一标识，一般为主键列
		// queryParamsType : "limit",
		queryParams : function queryParams(params) { // 设置查询参数
			var param = {
				pageSize : params.limit, // 每页要显示的数据条数
				offset : params.offset, // 每页显示数据的开始行号
				sortName : params.sort, // 要排序的字段
				sortOrder : params.order, // 排序规则
				name : $("#q_name").val(),
			};
			return param;
		},
		columns : [ 
		{
			field : 'pname',
			title : '流程名称：版本',
			align : 'center',
			valign : 'middle'
		},
		{
			field : 'startUser',
			title : '发起人',
			align : 'center',
			valign : 'middle'
		}, 
		

		{
			field : 'name',
			title : '当前节点',
			align : 'center',
			valign : 'middle'
		}, {
			field : 'id',
			title : '任务id',
			align : 'center',
			valign : 'middle',
			formatter : function(value, row, index) {

				return value;
			}
		},

		{
			field : 'iid',
			title : 'processInstanceId',
			align : 'center',
			valign : 'middle',
			formatter : function(value, row, index) {

				if (value == "1")
					return "启用";
				else if (value == "0")
					return "禁用";

				return value;
			}
		},

		{
			field : 'assige',
			title : '当前处理人',
			align : 'center',
			valign : 'middle',
			formatter : function(value, row, index) {

				if (value == "1")
					return "启用";
				else if (value == "0")
					return "禁用";

				return value;
			}
		},
		

		{
			field : 'prodid',
			title : 'processDefineId',
			align : 'center',
			valign : 'middle'
		},

		{
			title : '操作',
			field : '',
			align : 'center',
			formatter : modifyAndDeleteButton,
			events : PersonnelInformationEvents
		}

		]
	});
}



function donelist() {
	// 初始化Table
	$('#tb2').bootstrapTable({
		url : basePath + '/done/' + $("#uid").val(), // 请求后台的URL（*）
		method : 'post', // 请求方式（*）
		contentType : 'application/x-www-form-urlencoded',
		toolbar : '#toolbar', // 工具按钮用哪个容器
		showHeader : true,
		searchAlign : 'left',
		buttonsAlign : 'left',

		searchOnEnterKey : true,
		striped : true, // 是否显示行间隔色
		cache : false, // 是否使用缓存，默认为true，所以一般情况下需要设置一下这个属性（*）
		pagination : true, // 是否显示分页（*）
		sortable : false, // 是否启用排序
		sortName : 'id', // 排序字段
		sortOrder : "desc", // 排序方式
		sidePagination : "server", // 分页方式：client客户端分页，server服务端分页（*）
		pageNumber : 1, // 初始化加载第一页，默认第一页
		pageSize : 10, // 每页的记录行数（*）
		pageList : [ 10, 25 ], // 可供选择的每页的行数（*）
		search : false, // 是否显示表格搜索，此搜索是客户端搜索，不会进服务端，所以，个人感觉意义不大

		// showColumns: true, //是否显示所有的列
		uniqueId : "id", // 每一行的唯一标识，一般为主键列
		// queryParamsType : "limit",
		queryParams : function queryParams(params) { // 设置查询参数
			var param = {
				pageSize : params.limit, // 每页要显示的数据条数
				offset : params.offset, // 每页显示数据的开始行号
				sortName : params.sort, // 要排序的字段
				sortOrder : params.order, // 排序规则
				name : $("#q_name").val(),
			};
			return param;
		},
		columns : [ 
		{
			field : 'pname',
			title : '流程名称：版本',
			align : 'center',
			valign : 'middle'
		},
		{
			field : 'startUser',
			title : '发起人',
			align : 'center',
			valign : 'middle'
		}, 
		

		{
			field : 'name',
			title : '当前节点',
			align : 'center',
			valign : 'middle'
		}, {
			field : 'id',
			title : '任务id',
			align : 'center',
			valign : 'middle',
			formatter : function(value, row, index) {

				return value;
			}
		},

		{
			field : 'iid',
			title : 'processInstanceId',
			align : 'center',
			valign : 'middle',
			formatter : function(value, row, index) {

				if (value == "1")
					return "启用";
				else if (value == "0")
					return "禁用";

				return value;
			}
		},

		{
			field : 'prodid',
			title : 'processDefineId',
			align : 'center',
			valign : 'middle'
		},

		{
			title : '操作',
			field : '',
			align : 'center',
			formatter : modifyAndDeleteButton,
			events : PersonnelInformationEvents
		}

		]
	});
}

/*
 * 
 * function modifyAndDeleteButton(value, row, index) { return [ '<div
 * class="">' + '<button id = "update" type = "button" class = "btn btn-info"><i
 * class="glyphicon glyphicon-pencil">修改</i> </button>&nbsp;' + '<button id =
 * "delete" type = "button" class = "btn btn-danger"><i class="glyphicon
 * glyphicon-trash">删除</i> </button>' + '</div>' ].join(""); }
 * 
 * window.PersonnelInformationEvents = { "click #update" : function(e, value,
 * row, index) { alert(1); } }
 */



function modifyAndDeleteButton(value, row, index) {
	var html='<div class="">'
			+ '<button id = "digyi" type = "button" class = "test btn btn-info"><i class="glyphicon ">流程定义</i> </button>&nbsp;';
	
	if(row.name!='结束') //完成的不显示处理
		html+='<button id = "run" type = "button" class = "btn btn-warning"><i class="glyphicon ">当前状况</i> </button>&nbsp;';
			
	if(!row.done) //完成的不显示处理
		{	
	if(row.assige==null)
			//当前处理人为空，只有处理组，组中人物均可签收，优先处理
		html+='<button id = "qs" type = "button" class = "btn  btn-info"><i class="glyphicon ">签收</i> </button>&nbsp;';
	
	else
		{
			
			if($("#gname").val().indexOf("领导")>-1)
				html+= '<button id = "bl" type = "button" class = "btn btn-danger "><i class="glyphicon ">审核</i> </button>&nbsp;'
			else if($("#gname").val().indexOf("研发")>-1)
					html+= '<button id = "resub" type = "button" class = "btn btn-danger "><i class="glyphicon ">重新提交</i> </button>&nbsp;'
			else
				html+= '<button id = "ct" type = "button" class = "btn btn-danger "><i class="glyphicon ">记录</i> </button>&nbsp;'
		}
	
		}
					
					html+= '</div>';
			
			return html;
}

window.PersonnelInformationEvents = {
	"click #digyi" : function(e, value, row, index) {
		$("#myModal").modal('show');	
		$("#myModalLabel").html("流程定义");
		$(".dwin").load(basePath + "/procss/display?processid="
				+ row.prodid + "&type=process-definition",function(){
	
			
			setTimeout(() => {
				$(".modal-dialog").width($("#bpmnModel").width()+20);
				$(".modal-body").height($("#bpmnModel").height()+20);
			},200);
		});
		
	},
	"click #run" : function(e, value, row, index) {
	$("#myModal").modal('show');	
	$("#myModalLabel").html("当前流程执行状态");
		$(".dwin").load(basePath + "/procss/display?id="
				+ row.iid + "&type=runtime",function(){
			
			setTimeout(() => {
				$(".modal-dialog").width($("#bpmnModel").width()+20);
				$(".modal-body").height($("#bpmnModel").height()+20);
			}, 300);
		});
		
	/*
	 * window.open(basePath + "/activiti-app/display/display.jsp?id=" + row.iid +
	 * "&type=runtime");
	 */
	},

	"click #qs" : function(e, value, row, index) {
		function doassigne(){
			// var msg = "您真的确定要删除吗？";
			var url = basePath + "/claim/"+userid+"/"+row.id+"/";
			// cconfirm(msg, function() {
				$.ajax({
					type : "post",
					url : url,
					data : {
						
					},
					success : function(response) {
						
						msg("签收完成");
						
						doquery();
					}
				});
		}
		doassigne();

	},
	"click #bl" : function(e, value, row, index) {
		var action="false"
			
		function docomplete(){
			// var msg = "您真的确定要删除吗？";
			var url = basePath + "/complete/"+userid+"/"+row.id+"/"+action;
			// cconfirm(msg, function() {
				$.ajax({
					type : "post",
					url : url,
					data : {
						
					},
					success : function(response) {
						var h=$.parseHTML(response);
						msg(h[4].data);
						
						doquery();
					}
				});
		}
		cconfirm("审批通过?确认通过，否在不通过", function() {
			action="true";
	    	docomplete();},
	    	function(){
	    		action="false";
		    	docomplete();
	    	}
	    	);
		

	},
	
	"click #resub" : function(e, value, row, index) {
		var action="false"
			
		function docomplete(){
			// var msg = "您真的确定要删除吗？";
			var url = basePath + "/complete/"+userid+"/"+row.id+"/"+action;
			// cconfirm(msg, function() {
				$.ajax({
					type : "post",
					url : url,
					data : {
						
					},
					success : function(response) {
						//var h=$.parseHTML(response);
						//msg(h[4].data);
						
						doquery();
					}
				});
		}
		docomplete();
		

	},"click #ct" : function(e, value, row, index) {
		var action="false"
			
		function docomplete(){
			// var msg = "您真的确定要删除吗？";
			var url = basePath + "/complete/"+userid+"/"+row.id+"/"+action;
			// cconfirm(msg, function() {
				$.ajax({
					type : "post",
					url : url,
					data : {
						
					},
					success : function(response) {
						//var h=$.parseHTML(response);
						//msg(h[4].data);
						
						doquery();
					}
				});
		}
		docomplete();
		

	},
	
	
	
};