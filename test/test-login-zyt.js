var help=require("../sources/help.js");
var expect=require("chai").expect;
var request=require("superagent")

var config=help.config;

describe('病人端登录流程相关测试',function()
{
	describe('验证手机号是否已注册->'+config.routes.getUserID,function()
	{
		var varlidPhoneNum=config.validPatient.username;
		var validReq=help.createRequest(config.baseUrl,config.routes.getUserID,{
																					"phoneNo":varlidPhoneNum
																				});
		it('已注册的手机号 param->'+varlidPhoneNum, function(done){

			request.get(validReq)
			.end(function(err, res){

				var data=res.body;
				// console.log(data);
				expect(data.mesg).to.be.equal("Get UserId Success!");
				expect(data.roles).to.include("patient");

				done();
			});
		});

		var invarlidPhoneNum=help.createInvalidPhoneNumber();
		var invalidReq=help.createRequest(config.baseUrl,config.routes.getUserID,{
																					"phoneNo":invarlidPhoneNum
																				});
		it('无效的手机号 param->'+invarlidPhoneNum,function(done){

			request.get(invalidReq)
			.end(function(err,res){

				var data=res.body;
				// console.log(data);
				expect(data.mesg).to.be.equal("User doesn't Exist!");

				done();
			})
		})
	});

	describe('已注册用户重置密码->'+config.routes.reset,function()
	{
		var varlidPhoneNum=config.validPatient.username;
		var newPassword="123456";
		var validReq=help.createRequest(config.baseUrl,config.routes.reset,{
																					"phoneNo":varlidPhoneNum,
																					"password":newPassword
																				});
		it('重置成功 param->'+varlidPhoneNum+' '+newPassword, function(done){

			request.post(validReq)
			.end(function(err, res){

				var data=res.body;
				// console.log(data);
				expect(data.mesg).to.be.equal("password reset success!");

				done();
			});
		});
	});

	describe('已注册用户登录->'+config.routes.logIn,function()
	{
		var varlidPhoneNum=config.validPatient.username;
		var varlidPassword=config.validPatient.password;
		var varlidRole=config.validPatient.role;
		var validReq=help.createRequest(config.baseUrl,config.routes.logIn);
		console.log(validReq)

			request
			// .post(validReq,{
			// 				phoneNo:"13208017796",
			// 				password:"123456",
			// 				role:"doctor"
			// 			})
			.post(validReq)
			// .set('Content-Type', 'application/x-www-form-urlencoded')
			.send({
				phoneNo:varlidPhoneNum,
				password:varlidPassword,
				role:varlidRole
			})
			.end(function(err, res){
				// console.log(validReq);
				var data=res.body;
				console.log(data);
				expect(data.results.mesg).to.be.equal("login success!");

				done();
			});
		});

		var varlidPhoneNum=config.validPatient.username;
		var invarlidPassword="55555";
		var varlidRole=config.validPatient.role;
		it('账号正确密码错误 param->'+varlidPhoneNum+' '+invarlidPassword+' '+varlidRole, function(done){
			request
			.post(validReq)
			.send({
				phoneNo:varlidPhoneNum,
				password:invarlidPassword,
				role:varlidRole
			})
			.end(function(err, res){
				var data=res.body;
				console.log(data);
				expect(data.mesg).to.be.equal("User password isn't correct!");

				done();
			});
		});

		var invarlidPhoneNum=help.createInvalidPhoneNumber();
		var invarlidPassword=config.validPatient.password;
		var varlidRole=config.validPatient.role;
		it('账号不存在 param->'+invarlidPhoneNum+' '+invarlidPassword+' '+varlidRole, function(done){
			request
			.post(validReq)
			.send({
				phoneNo:invarlidPhoneNum,
				password:invarlidPassword,
				role:varlidRole
			})
			.end(function(err, res){
				var data=res.body;
				console.log(data);
				expect(data.mesg).to.be.equal("User doesn't Exist!");

				done();
			});
		});

		var varlidPhoneNum=config.validPatient.username;
		var varlidPassword=config.validPatient.password;
		var invarlidRole="doctor";
		it('用户无权限 param->'+varlidPhoneNum+' '+varlidPassword+' '+invarlidRole, function(done){

			request
			.post(validReq)
			.send({
				phoneNo:varlidPhoneNum,
				password:varlidPassword,
				role:invarlidRole
			})
			.end(function(err, res){
				var data=res.body;
				console.log(data);
				expect(data.mesg).to.be.equal("No authority!");

				done();
			});
		});

	})
})
