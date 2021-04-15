/**
 * 演示程序当前的 “注册/登录” 等操作，是基于 “本地存储” 完成的
 * 当您要参考这个演示程序进行相关 app 的开发时，
 * 请注意将相关方法调整成 “基于服务端Service” 的实现。
 **/
(function($, owner) {
	/**
	 * 用户登录
	 **/
	var rul = 'http://47.107.153.102:8502/default.aspx';
//	var rul = 'http://192.168.2.85:8089/default.aspx';
//	var rul = 'http://120.77.237.243:8068/default.aspx';
	owner.login = function(tuser,tpass, callback) {
		callback = callback || $.noop;
		var loginInfo = {
						account: tuser,
						password: tpass
					};
//		loginInfo = loginInfo || {};
//		loginInfo.account = loginInfo.account || '';
//		loginInfo.password = loginInfo.password || '';
		if (loginInfo.account.length < 1) {
			return callback('请输入用户名');
		}
//		if (loginInfo.password.length < 4) {
//			return callback('密码最短为 4个字符');
//		}
//		alert('tdfdfd');
		$.ajax({
		    url: rul,
		    data: {execmode:'login',username: loginInfo.account,password:loginInfo.password},
		    async: true , // 异步 || 同步
//		    dataType: 'json',
		    dataType: 'text',
		    type: 'get',
		    timeout: 3000,
//		    contentType: "application/json; charset=utf-8",  //设置类型，注意一定不能丢		    
		    contentType: "application/text; charset=utf-8",  //设置类型，注意一定不能丢
		    success: function(data) {
		        // 请求成功
		        if (data=='True')   {
		        	return owner.createState(loginInfo.account,loginInfo.password, callback);		        	
		        } else {
		        	return callback('用户名或密码错误');
		        }
		        
//		        alert(data);
//		        var tjson = eval(data);
//              alert(tjson[0].DianHao);
		    },
		    error: function(xhr, type, errorThrown) {
		        // 请求失败
		        return callback('连接服务器失败，请稍后重试!');
//		        alert('请求失败，请检查服务器');
		    }
		});		
		

	

	};

	owner.createState = function(name,pass, callback) {
		var state = owner.getState();
		state.account = name;
		state.token = pass;
		owner.setState(state);
		return callback();
	};

	

	/**
	 * 获取当前状态
	 **/
	owner.getState = function() {
		var stateText = localStorage.getItem('$state') || "{}";
		return JSON.parse(stateText);
	};

	/**
	 * 设置当前状态
	 **/
	owner.setState = function(state) {
		state = state || {};
		localStorage.setItem('$state', JSON.stringify(state));

	};

	
	/**
	 * 获取应用本地配置
	 **/
	owner.setSettings = function(settings) {
		settings = settings || {};
		localStorage.setItem('$settings', JSON.stringify(settings));
	}

	/**
	 * 设置应用本地配置
	 **/
	owner.getSettings = function() {
			var settingsText = localStorage.getItem('$settings') || "{}";
			return JSON.parse(settingsText);
		}
	/**
	 * 测试
	 **/
	owner.jtext = function() {
		alert('测试对话框');

	};
	
	/**
	 * 检查生产任务是否已完成
	 **/
	owner.checkgdinfo = function(cmode,cdianhao, callback) {
		cdianhao = cdianhao || '';
		cmode = cmode || '';
//		alert(cdianhao + cmode);
//		cmode = "'" + cmode +"'";		
//		alert('工单状态检测');
		$.ajax({
		    url: rul,
		    data: {execmode:cmode,dianhao: cdianhao},
		    async: true , // 异步 || 同步
//		    dataType: 'json',
		    dataType: 'text',
		    type: 'get',
		    timeout: 3000,
//		    contentType: "application/json; charset=utf-8",  //设置类型，注意一定不能丢		    
		    contentType: "application/text; charset=utf-8",  //设置类型，注意一定不能丢
		    success: function(data) {
		        // 请求成功
		        return callback(data);			        
		        
		    },
		    error: function(xhr, type, errorThrown) {
		        // 请求失败
		        return callback('搜索请求操作失败!');
//		        alert('请求失败，请检查服务器');
		    }
		});		
		
	};
	/**
	 * 提交数据
	 **/
	owner.updategd = function(cmode,cdianhao,cid,cuser, callback) {
		cdianhao = cdianhao || '';
		cmode = cmode || '';
//		alert(cdianhao);
//		cmode = "'" + cmode +"'";		
//		alert('工单状态检测');
		$.ajax({
		    url: rul,
		    data: {execmode:cmode,dianhao: cdianhao,lcid:cid,isupgd:'true',username:cuser},
		    async: true , // 异步 || 同步
//		    dataType: 'json',
		    dataType: 'text',
		    type: 'get',
		    timeout: 3000,
//		    contentType: "application/json; charset=utf-8",  //设置类型，注意一定不能丢		    
		    contentType: "application/text; charset=utf-8",  //设置类型，注意一定不能丢
		    success: function(data) {
		        // 请求成功
		        return callback(data);			        
		        
		    },
		    error: function(xhr, type, errorThrown) {
		        // 请求失败
		        return callback('提交请求操作失败!');
//		        alert('请求失败，请检查服务器');
		    }
		});		
		
	};
	/**
	 * 取送货单数据
	 **/
	owner.getgddatainfo = function(tcdianhao,texecmode,callback) {
		tcdianhao = tcdianhao || '';
		texecmode = texecmode || '';
		$.ajax({
		    url: rul,
		    data: {execmode:'getgd',dianhao: tcdianhao,lget:texecmode},
		    async: true , // 异步 || 同步
//		    dataType: 'json',
		    dataType: 'text',
		    type: 'get',
		    timeout: 5000,
//		    contentType: "application/json; charset=utf-8",  //设置类型，注意一定不能丢		    
		    contentType: "application/text; charset=utf-8",  //设置类型，注意一定不能丢
		    success: function(tdata) {
		        // 请求成功		        
//		        alert(tdata);
		        return callback(tdata);			        		        
		    },
		    error: function(xhr, type, errorThrown) {
		        // 请求失败
		        return callback('搜索数据请求失败!');
//		        alert('请求工单数据失败，请检查服务器');
		    }
		});		
		
	};
	/**
	 * 取已接单未送货数据
	 **/
	owner.getjddata = function(tcdianhao,texecmode,cuser,callback) {
		tcdianhao = tcdianhao || '';
		texecmode = texecmode || '';
		$.ajax({
		    url: rul,
		    data: {execmode:'getJd',dianhao: tcdianhao,lget:texecmode,username:cuser},
		    async: true , // 异步 || 同步
//		    dataType: 'json',
		    dataType: 'text',
		    type: 'get',
		    timeout: 5000,
//		    contentType: "application/json; charset=utf-8",  //设置类型，注意一定不能丢		    
		    contentType: "application/text; charset=utf-8",  //设置类型，注意一定不能丢
		    success: function(tdata) {
		        // 请求成功		        
//		        alert(tdata);
		        return callback(tdata);			        		        
		    },
		    error: function(xhr, type, errorThrown) {
		        // 请求失败
		        return callback('搜索数据请求失败!');
//		        alert('请求工单数据失败，请检查服务器');
		    }
		});		
		
	};
	
	
}(mui, window.app = {}));