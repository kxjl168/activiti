# activiti6.0 web-ui集成说明
简单使用demo

入门相关及配置过程等参见本人blog日志相关记录.
https://www.256kb.cn/public/index/bt/activiti.html




# 配置数据库：
activiti-app数据配置：
resouces/META-INF/activiti-app/activit-app.properties

web项目自己的数据库配置：
resouces/config.properties



# 配置activit-api访问路径：
/webapp/activit-app/script/app-cfg.js
修改
contextRoot，及webContextRoot路径
> ACTIVITI.CONFIG = {
> 		'onPremise' : true,
> 		'contextRoot' : '/activiti_test_demo',
> 		'webContextRoot' : '/activiti_test_demo/activiti-app'
> 	};



# 更新：
之前使用的包 activiti-app-logic-6.0.1-SNAPSHOT.jar 
和activiti-app-rest-6.0.1-SNAPSHOT.jar 都是我自己本地打出的包，
我本地使用的eclipse jetty启动。没有发现问题，
网友 提出问题，排查后发现pom中缺少配置，已修改
增加如下 ，将jar包打入war即可。
	<build>

		<resources>

			<!--190428-补充，修复idea，mvn打包缺失 自定义jar lib -->
			<resource>
				<targetPath>${basedir}/src/main/webapp/WEB-INF/lib</targetPath>
				<directory>${basedir}/lib</directory>
				<!-- <filtering>true</filtering> -->
				<includes>
					<!--  native lib -->
					<include>**/*.jar</include>
				</includes>
			</resource>

		</resources>
	</build>



#启动
idea里面把deploy时，把 application_contenxt 路径设置为 /activiti_test_demo。

# 启动完成：

activit-app访问路径：
http://127.0.0.1:8080/activiti_test_demo/activiti-app/#/login

- 用户密码：
admin/test





# 流程操作相关：

- 发布：
http://127.0.0.1:8080/activiti_test_demo/deploy/test

发布test.bpmn20.xml
发布数据表：
ACT_RE_PROCDEF

上方test为如下文件开头
deploy/{resouces/diagrams/流程名称.bpmn20.xml}

发布完成的流程id为 test:1:xxxx

使用如下链接查看流程，
http://127.0.0.1:8080/activiti_test_demo/activiti-app/display/display.html?processid=test:1:2504&type=process-definition
访问前需要先登陆如下地址，(demo没有改造权限相关)
http://127.0.0.1:8080/activiti_test_demo/activiti-app/#/login



- 流程的启动，
需要导入或者自己在控制台新建用户，
导入测试脚本如下：
1. 用户：

> INSERT INTO `activiti2`.`act_id_user` (`ID_`, `REV_`, `FIRST_`, `LAST_`, `EMAIL_`, `PWD_`, `PICTURE_ID_`) VALUES ('l2', '1', 'll', > 'llder', 'l2@l123.com', '111111', NULL);
> INSERT INTO `activiti2`.`act_id_user` (`ID_`, `REV_`, `FIRST_`, `LAST_`, `EMAIL_`, `PWD_`, `PICTURE_ID_`) VALUES ('test-u', '1', 'test-u', NULL, 't@123.com', '111111', NULL);
> INSERT INTO `activiti2`.`act_id_user` (`ID_`, `REV_`, `FIRST_`, `LAST_`, `EMAIL_`, `PWD_`, `PICTURE_ID_`) VALUES ('u1', '2', 'z', '三', 'u1@123.com', '111111', NULL);
> INSERT INTO `activiti2`.`act_id_user` (`ID_`, `REV_`, `FIRST_`, `LAST_`, `EMAIL_`, `PWD_`, `PICTURE_ID_`) VALUES ('u2', '2', 'li', '四', 'u2@123.com', '111111', NULL);
> INSERT INTO `activiti2`.`act_id_user` (`ID_`, `REV_`, `FIRST_`, `LAST_`, `EMAIL_`, `PWD_`, `PICTURE_ID_`) VALUES ('u3', '2', 'w', '五', 'u3@123.com', '111111', NULL);


2. 分组：
> INSERT INTO `activiti2`.`act_id_group` (`ID_`, `REV_`, `NAME_`, `TYPE_`) VALUES ('cc', '1', '人事', 'assignment');
> INSERT INTO `activiti2`.`act_id_group` (`ID_`, `REV_`, `NAME_`, `TYPE_`) VALUES ('leader-group', '1', '领导组', 'assignment');
> INSERT INTO `activiti2`.`act_id_group` (`ID_`, `REV_`, `NAME_`, `TYPE_`) VALUES ('leader2', '1', '领导组2', 'assignment');
> INSERT INTO `activiti2`.`act_id_group` (`ID_`, `REV_`, `NAME_`, `TYPE_`) VALUES ('normal', '1', '研发组', 'assignment');

3. 关系：
> INSERT INTO `activiti2`.`act_id_membership` (`USER_ID_`, `GROUP_ID_`) VALUES ('u3', 'cc');
> INSERT INTO `activiti2`.`act_id_membership` (`USER_ID_`, `GROUP_ID_`) VALUES ('u2', 'leader-group');
> INSERT INTO `activiti2`.`act_id_membership` (`USER_ID_`, `GROUP_ID_`) VALUES ('l2', 'leader2');
> INSERT INTO `activiti2`.`act_id_membership` (`USER_ID_`, `GROUP_ID_`) VALUES ('u1', 'normal');


- 流程的启动：（u1用户，普通员工）
用户u1开始流程test
http://127.0.0.1:8080/activiti_test_demo/start/test/u1

- 流程当前进度查看，id为instanceid
http://127.0.0.1:8080/activiti_test_demo/activiti-app/display/display.html?id=2505&type=runtime



- 流程的待办： （u2用户，领导组）
http://127.0.0.1:8080/activiti_test_demo/tasklist/u2


其他操作参见blog说明。
基本功能已经具备.
