package com.ztgm.activiti_test;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.activiti.engine.IdentityService;
import org.activiti.engine.ProcessEngine;
import org.activiti.engine.RepositoryService;
import org.activiti.engine.RuntimeService;
import org.activiti.engine.TaskService;
import org.activiti.engine.runtime.ProcessInstance;
import org.activiti.engine.task.Task;
import org.apache.poi.util.IdentifierManager;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 * Hello world!
 *
 */
@Controller
public class Activiti_AngularController {
	public static void main(String[] args) {
		System.out.println("Hello World!");
	}

	@Autowired
	private ProcessEngine processEngine;

	@Autowired
	private RuntimeService runtimeService;

	@Autowired
	TaskService taskService;

	/**
	 * activiti-ui界面controller转给前台angularjs Controller控制
	 * @return
	 * @author zj
	 * @date 2018年8月27日
	 */
	@RequestMapping("/activiti-app/*")
	public String activiti_app() {

		return "activiti-app/index";
		

	}
}
