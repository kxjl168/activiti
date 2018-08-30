package com.ztgm.activiti_test;

import java.io.BufferedInputStream;
import java.io.File;
import java.io.FileOutputStream;
import java.io.InputStream;
import java.lang.reflect.Type;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.activiti.engine.HistoryService;
import org.activiti.engine.IdentityService;
import org.activiti.engine.ProcessEngine;
import org.activiti.engine.RepositoryService;
import org.activiti.engine.RuntimeService;
import org.activiti.engine.TaskService;
import org.activiti.engine.history.HistoricActivityInstance;
import org.activiti.engine.history.HistoricIdentityLink;
import org.activiti.engine.history.HistoricTaskInstance;
import org.activiti.engine.identity.Group;
import org.activiti.engine.identity.User;
import org.activiti.engine.impl.persistence.entity.HistoricTaskInstanceEntityImpl;
import org.activiti.engine.impl.persistence.entity.TaskEntityImpl;
import org.activiti.engine.repository.Deployment;
import org.activiti.engine.repository.Model;
import org.activiti.engine.repository.ProcessDefinition;
import org.activiti.engine.runtime.Execution;
import org.activiti.engine.runtime.ProcessInstance;
import org.activiti.engine.task.IdentityLink;
import org.activiti.engine.task.Task;
import org.activiti.engine.task.TaskInfo;
import org.activiti.engine.task.TaskQuery;

import org.apache.poi.util.IdentifierManager;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.github.pagehelper.Page;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;

/**
 * Hello world!
 *
 */
@Controller
public class App {
	public static void main(String[] args) {
		System.out.println("Hello World!");
	}

	@Autowired
	private ProcessEngine processEngine;

	@Autowired
	private RuntimeService runtimeService;

	@Autowired
	private IdentityService identityService;

	@Autowired
	private RepositoryService repositoryService;

	@Autowired
	private HistoryService historyService;

	@Autowired
	TaskService taskService;

	@RequestMapping("/procss/display")
	public String display(Map<String, String> maps, HttpServletRequest request) {

		// maps.put("dddddd","xxxxxx");

		maps.put("id", request.getParameter("id"));
		maps.put("type", request.getParameter("type"));
		maps.put("processid", request.getParameter("processid"));

		// return "activiti_app/display/display";

		return "display/display";
	}

	/**
	 * 发布流程， 流程文件名与id相同
	 * 
	 * @param id
	 * @param maps
	 * @return
	 * @author zj
	 * @date 2018年8月28日
	 */
	@RequestMapping("/deploy/{id}")
	public String test(@PathVariable("id") String id, Map<String, String> maps) {

		RepositoryService repositoryService = processEngine.getRepositoryService();
		Deployment dp = repositoryService.createDeployment().key(id)
				.addClasspathResource("/diagrams/" + id + ".bpmn20.xml").deploy();

		ProcessDefinition pd = repositoryService.createProcessDefinitionQuery().processDefinitionKey(id).latestVersion()
				.singleResult();

		if (dp != null)
			maps.put("msg", "流程：[" + pd.getName() + "] 发布完成 ,id:" + dp.getId());
		else
			maps.put("msg", "流程发布失败");

		return "page/success";
	}

	/**
	 * 流程执行
	 * 
	 * @param id
	 * @param action
	 * @param maps
	 * @return
	 * @author zj
	 * @date 2018年8月28日
	 */
	@RequestMapping("/start/{id}/{userid}")
	public String start(@PathVariable("id") String id, @PathVariable("userid") String userid,
			Map<String, String> maps) {

		RepositoryService repositoryService = processEngine.getRepositoryService();

		Map<String, Object> variables = new HashMap<String, Object>();
		variables.put("person", "张三");

		User user = identityService.createUserQuery().userId(userid).singleResult();

		// 用来设置启动流程的人员ID，引擎会自动把用户ID保存到activiti:initiator中
		identityService.setAuthenticatedUserId(userid);
		String businessKey = "";// 业务key
		ProcessInstance processInstance = runtimeService.startProcessInstanceByKey(id, businessKey, variables);
		String processInstanceId = processInstance.getId();

		ProcessDefinition pd = repositoryService.createProcessDefinitionQuery().processDefinitionKey(id).latestVersion()
				.singleResult();

		// 下一步处理人
		// 根据流程实例ID查询 最新一步的任务
		Task task = taskService.createTaskQuery().processInstanceId(processInstanceId).orderByTaskCreateTime().desc()
				.limitTaskVariables(1).singleResult();

		List<HistoricIdentityLink> identityLinks = processEngine.getHistoryService()
				.getHistoricIdentityLinksForTask(task.getId());
		String groups = "";
		String users = "";
		for (HistoricIdentityLink historicIdentityLink : identityLinks) {
			if (historicIdentityLink.getGroupId() != null)
				groups += historicIdentityLink.getGroupId() + ",";
			if (historicIdentityLink.getUserId() != null)
				users += historicIdentityLink.getUserId() + ",";

		}

		maps.put("msg",
				"启动成功！启动用户" + user.getFirstName() + user.getLastName() + " " + user.getId() + "<br/>" + " 下一步处理：<br/>"
						+ "&nbsp;用户组：" + groups + "  <br/>&nbsp;用户：" + users + "<br/>  ProcessDefinition:"
						+ pd.getName() + "  " + pd.getId() + " <br/> " + " ProcessInstance:" + processInstance.getId()
						+ " <br> 当前任务id:" + task.getId());

		return "page/success";
	}

	@RequestMapping("/tasklist/{userid}")
	public String tasklist(@PathVariable("userid") String userid, Map<String, String> maps) {

		User user = identityService.createUserQuery().userId(userid).singleResult();
		maps.put("user", user.getFirstName() + " " + user.getLastName());
		maps.put("uid", userid);

		Group gp = identityService.createGroupQuery().groupMember(userid).singleResult();
		maps.put("group", gp.getName());
		return "page/list";
	}

	@RequestMapping("/todo/{userid}")
	@ResponseBody
	public String todotask(@PathVariable("userid") String userid, Map<String, String> maps) {

		// 根据用户id查询其待办任务
		List<Task> t2 = taskService.createTaskQuery().taskCandidateOrAssigned(userid).list();
		String rst = packageTableData(t2);

		return rst;
	}

	@RequestMapping("/done/{userid}")
	@ResponseBody
	public String done(@PathVariable("userid") String userid, Map<String, String> maps) {

		// 根据用户id查询其已完成的任务
		List<HistoricTaskInstance> t2 = historyService.createHistoricTaskInstanceQuery().taskAssignee(userid).finished().list();
	
		String rst = packageTableData(t2);

		return rst;
	}

	public <T> String packageTableData(List<T> dataList) {
		String resultString = "";
		try {
			Gson gs = new GsonBuilder().setDateFormat("yyyy-MM-dd HH:mm:ss").create();
			JSONObject data = new JSONObject();

			JSONArray ja = new JSONArray();

			for (T o : dataList) {

				JSONObject jo = new JSONObject();
				
				if (o instanceof TaskEntityImpl) {
					Task	t = (Task) o;

					//待办节点
					jo.put("name", t.getName());

					ProcessDefinition pd = repositoryService.createProcessDefinitionQuery()
							.processDefinitionId(t.getProcessDefinitionId()).singleResult();

					List<HistoricIdentityLink> hlinks = historyService
							.getHistoricIdentityLinksForProcessInstance(t.getProcessInstanceId());
					String startUser = "";
					for (HistoricIdentityLink historicIdentityLink : hlinks) {
						if (historicIdentityLink.getType().equals("starter")
								&& historicIdentityLink.getUserId() != null) {
							User u = identityService.createUserQuery().userId(historicIdentityLink.getUserId())
									.singleResult();
							startUser += u.getFirstName() + " " + u.getLastName() + "";
						}

					}
					jo.put("assige", t.getAssignee());
					jo.put("startUser", startUser);
					jo.put("pname", pd.getName() + " :" + pd.getVersion());
					jo.put("id", t.getId());
					jo.put("iid", t.getProcessInstanceId());
					jo.put("prodid", t.getProcessDefinitionId());

				}
				if (o instanceof HistoricTaskInstanceEntityImpl) {
					HistoricTaskInstanceEntityImpl	t = (HistoricTaskInstanceEntityImpl) o;

					
					HistoricActivityInstance hinstance=	historyService.createHistoricActivityInstanceQuery().processInstanceId(t.getProcessInstanceId())
					.orderByHistoricActivityInstanceStartTime().desc().list().get(0);
					
					//查询任务实例的当前状态
					jo.put("name",hinstance.getActivityName());

					ProcessDefinition pd = repositoryService.createProcessDefinitionQuery()
							.processDefinitionId(t.getProcessDefinitionId()).singleResult();

					List<HistoricIdentityLink> hlinks = historyService
							.getHistoricIdentityLinksForProcessInstance(t.getProcessInstanceId());
					String startUser = "";
					for (HistoricIdentityLink historicIdentityLink : hlinks) {
						if (historicIdentityLink.getType().equals("starter")
								&& historicIdentityLink.getUserId() != null) {
							User u = identityService.createUserQuery().userId(historicIdentityLink.getUserId())
									.singleResult();
							startUser += u.getFirstName() + " " + u.getLastName() + "";
						}

					}
					jo.put("done", true);
					jo.put("assige", t.getAssignee());
					jo.put("startUser", startUser);
					jo.put("pname", pd.getName() + " :" + pd.getVersion());
					jo.put("id", t.getId());
					jo.put("iid", t.getProcessInstanceId());
					jo.put("prodid", t.getProcessDefinitionId());
				}

				ja.put(jo);
			}

			data.put("total", dataList.size());
			data.put("rows", ja);
			resultString = data.toString();
		} catch (Exception e) {
			System.out.println(e.getMessage());
		}

		return resultString;
	}

	/**
	 * 签收
	 * 
	 * @param id
	 * @param userid
	 * @param action
	 * @param maps
	 * @return
	 * @author zj
	 * @date 2018年8月30日
	 */
	@RequestMapping("/claim/{userid}/{taskid}/")
	public String claim(@PathVariable("taskid") String id, @PathVariable("userid") String userid,
			Map<String, String> maps) {

		Task task = taskService.createTaskQuery().taskId(id).singleResult();

		// 签收当前任务，在任务表中记录当前处理人，以便后续查询
		taskService.claim(id, userid);

		maps.put("msg", "签收完成");

		return "page/success";
	}

	/**
	 * 流程执行
	 * 
	 * @param id
	 * @param action
	 * @param maps
	 * @return
	 * @author zj
	 * @date 2018年8月28日
	 */
	@RequestMapping("/complete/{userid}/{taskid}/{action}")
	public String complete(@PathVariable("taskid") String id, @PathVariable("userid") String userid,
			@PathVariable("action") String action, Map<String, String> maps) {

		Task task = taskService.createTaskQuery().taskId(id).singleResult();


		// 当前处理人 模拟
		identityService.setAuthenticatedUserId(userid);
		

		Map<String, Object> variables = new HashMap<String, Object>();
		variables.put("agree", action);

		
		// 存储特殊的与任务关联的变量值  -将审批通过与否与taskid关联起来，存储在 act_hi_varinst时保留taskid
		taskService.setVariableLocal(id, "agree", action);  
		taskService.complete(id, variables);

		
		
		maps.put("msg", "流程处理完成,参数：" + action);

		return "page/success";
	}

	@RequestMapping("/test")
	public void test() {

		RepositoryService repositoryService = processEngine.getRepositoryService();
		repositoryService.createDeployment().addClasspathResource("/diagrams/test1.bpmn20.xml").deploy();

		System.out
				.println("Number of process definitions: " + repositoryService.createProcessDefinitionQuery().count());

		// 启动流程

		Map<String, Object> variables = new HashMap<String, Object>();
		variables.put("person", "张三");

		ProcessInstance pi = runtimeService.startProcessInstanceByKey("test", variables);

		// runtimeService.startProcessInstanceByKey("test");
		System.out.println("process id" + pi.getId());
		System.out.println("process name" + pi.getName());

		// variables.put("agress", "true");
		// taskService.complete(taskId, variables);

		// 获取任务

		List<Task> list = taskService.createTaskQuery().taskAssignee("张三").list();
		System.out.println("任务个数" + list.size());
		if (list != null && list.size() > 0) {
			for (Task t : list) {
				System.out.print(t.getId() + ",");
				System.out.print(t.getName() + ",");
				System.out.print(t.getAssignee() + ",");
				System.out.println(t.getProcessInstanceId());
			}
		}

	}
}
