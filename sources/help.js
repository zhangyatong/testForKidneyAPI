var fs = require("fs");

var help={};

//获取配置文件
help.config=JSON.parse(fs.readFileSync('./sources/config.json'));

//生成REST路由
help.createRequest=function(baseUrl,route,param)
{
	var request=baseUrl+route;
	var p="";
	for(var key in param)
	{
		if(p.length)
			p+="&";
		p+=key+"="+param[key];
	}
	if(p.length)
		request+="?"+p;
	return request;
}

//随机生成一个以0开头的无效电话号码
help.createInvalidPhoneNumber=function()
{
	var random=Math.random()*10000000000;
	var ret='0'+parseInt(random);
	return ret;
}

module.exports=help;