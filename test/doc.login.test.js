var help=require("../sources/help.js");
var expect=require("chai").expect;
var request=require("superagent")

var config=help.config;

describe('医生端登录流程相关测试',function()
{
	describe('验证手机号是否已注册->'+config.routes.getUserID,function()
	{
		var varlidPhoneNum=config.validDoc.username;
		var validReq=help.createRequest(config.baseUrl,config.routes.getUserID,{
																					"phoneNo":varlidPhoneNum
																				});
		it('已注册的手机号 param->'+varlidPhoneNum, function(done){

			request.get(validReq)
			.end(function(err, res){

				var data=res.body;

				expect(data).to.be.deep.equal({
					"results": 0,
					"UserId": "U201705120008",
					"roles": [
						"doctor"
					],
					"mesg": "Get UserId Success!"
				});

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

				expect(data).to.be.deep.equal({
					"results": 1,
					"mesg": "User doesn't Exist!"
				});

				done();
			})
		})
	})
})