<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>

<c:set var="basePath" value="${pageContext.request.contextPath}" />

<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>流程部署结果</title>

<script src="${basePath}/activiti-app/libs/angular_1.3.13/angular.min.js"></script>
<script src="${basePath }/activiti-app/libs/angular-animate_1.3.13/angular-animate.min.js"></script>
<script src="${basePath }/activiti-app/libs/bootstrap_3.1.1/js/bootstrap.min.js"></script>
<script src="${basePath }/activiti-app/libs/angular-resource_1.3.13/angular-resource.min.js"></script>
<script src="${basePath }/activiti-app/libs/angular-cookies_1.3.13/angular-cookies.min.js"></script>
<script src="${basePath }/activiti-app/libs/angular-sanitize_1.3.13/angular-sanitize.min.js"></script>
<script src="${basePath }/activiti-app/libs/angular-route_1.3.13/angular-route.min.js"></script>
<script src="${basePath }/activiti-app/libs/angular-translate_2.4.2/angular-translate.min.js"></script>
<script src="${basePath }/activiti-app/libs/angular-translate-storage-cookie/angular-translate-storage-cookie.js"></script>
<script src="${basePath }/activiti-app/libs/angular-translate-loader-static-files/angular-translate-loader-static-files.js"></script>
<script src="${basePath }/activiti-app/libs/angular-strap_2.1.6/angular-strap.min.js"></script>
<script src="${basePath }/activiti-app/libs/angular-strap_2.1.6/angular-strap.tpl.min.js"></script>
<script src="${basePath }/activiti-app/libs/momentjs_2.5.1/momentjs.min.js"></script>
<script src="${basePath }/activiti-app/libs/bootstrap-tour_0.9.1/bootstrap-tour.min.js"></script>
<script src="${basePath }/activiti-app/libs/ng-file-upload/ng-file-upload-shim.min.js"></script>
<script src="${basePath }/activiti-app/libs/ng-file-upload/ng-file-upload.min.js"></script>


<script src="${basePath }/activiti-app/libs/ui-grid_3.0.0/ui-grid.js" type="text/javascript"></script>
<script src="${basePath }/activiti-app/libs/angular-dragdrop_1.0.11/angular-dragdrop.min.js" type="text/javascript"></script>


<!-- Configuration -->
<script src="${basePath }/activiti-app/scripts/app-cfg.js?v=2"></script>

        <!-- build:css display/styles/displaymodel-style.css -->
        <link type="text/css" rel="stylesheet" href="${basePath }/activiti-app/display/jquery.qtip.min.css" />
        <link type="text/css" rel="stylesheet" href="${basePath }/activiti-app/display/displaymodel.css" />
        <!-- endbuild -->

        <!-- Configuration -->
       <!--
         todo
         Remove this? shouldn't this be on the page already,
         and wouldn't it override settings form app-cfg-on-premise & others
         -->
       <!--
        <script type="text/javascript" src="${basePath }/activiti-app/scripts/app-cfg.js?v=1"></script>
       -->
        <!-- build:js display/scripts/displaymodel-logic.js -->
        <script type="text/javascript" src="${basePath }/activiti-app/display/jquery.qtip.min.js"></script>
        <script type="text/javascript" src="${basePath }/activiti-app/display/raphael.js"></script>
        <script type="text/javascript" src="${basePath }/activiti-app/display/bpmn-draw.js"></script>
        <script type="text/javascript" src="${basePath }/activiti-app/display/bpmn-icons.js"></script>
        <script type="text/javascript" src="${basePath }/activiti-app/display/Polyline.js"></script>
        <script type="text/javascript" src="${basePath }/display/display.js"></script>
        <!-- endbuild -->

    </head>
    
  <body>
   
   <input type="hidden" id="dis_processid" value="${processid }"/>
<input type="hidden" id="dis_type" value="${type }"/>
<input type="hidden" id="dis_id" value="${id}"/>

     <div class="popup-wrapper clearfix">
                    <div class="model-preview-wrapper">
                        <div id="bpmnModel" />
                    </div>
                </div>
  </body>
</html>