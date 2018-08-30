<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>


<c:set var="basePath" value="${pageContext.request.contextPath}" />

<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>待办任务</title>

<script src="${basePath}/vendor/jquery/jquery.min.js"></script>
<script src="${basePath}/vendor/jquery/jquery-migrate-3.0.1.min.js"></script>

<script src="${basePath}/vendor/sweetalert/js/sweetalert2.min.js"></script>

<script src="${basePath}/vendor/bootstrap/js/bootstrap.min.js"></script>
<script src="${basePath}/vendor/bootstrap-table/js/bootstrap-table.js"></script>
<script
	src="${basePath}/vendor/bootstrap-table/js/bootstrap-table-zh-CN.js"></script>



<script type="text/javascript">
	var basePath = "${basePath}";
</script>

<script src="${basePath}/page/list.js"></script>

<script src="${basePath}/page/iot.js"></script>



<link rel="stylesheet" type="text/css"
	href="${basePath}/vendor/bootstrap/css/bootstrap.min.css">
<link rel="stylesheet" type="text/css"
	href="${basePath}/vendor/bootstrap-table/css/bootstrap-table.min.css">

<link rel="stylesheet" type="text/css"
	href="${basePath}/vendor/sweetalert/css/sweetalert2.min.css">

</head>
<body>
	<input type="hidden" id="uid" value="${uid }">
	<input type="hidden" id="gname" value="${group }">
	<div id="cuuser">当前用户:${user } -用户组：${group }</div>



	<div class="col-xs-12">

		<ul class="nav nav-tabs" id="myTab">
			<li class="active"><a href="#identifier1" data-toggle="tab">待办任务</a></li>
			<li class=""><a href="#identifier2" data-toggle="tab">已办任务</a></li>

		</ul>

		<div class="tab-content">
			<div class="row  col-xs-12 tab-pane fade in active " id="identifier1">
				
				<div id="tb"></div>
			</div>

			<div class="row  col-xs-12 tab-pane fade in  " id="identifier2">
				
				<div id="tb2"></div>
			</div>
		</div>

	</div>






	<div class="modal fade" data-backdrop="static" id="myModal"
		tabindex="-1" role="dialog" aria-labelledby="myModalLabel"
		aria-hidden="true" style="display: none;">
		<div class="modal-dialog">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal"
						aria-hidden="true">&times;</button>
					<h4 class="modal-title" id="myModalLabel">流程</h4>

				</div>

				<form id="mform" name="mform" class="form-horizontal" role="form"
					action="" method="post">

					<div class="modal-body" style="width: 300px; height: 200px;">
						<div class="dwin"></div>
					</div>

				</form>

			</div>

		</div>
	</div>

</body>
</html>