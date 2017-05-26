var help=require("../sources/help.js");
var expect=require("chai").expect;
var request=require("superagent")

var config=help.config;

describe('医生端登录流程相关测试',function()
{
	describe('验证手机号是否已注册->'+config.routes.getUserID,function()
	{
		var req;
		var phoneNum;
			
		it('已注册的手机号', function(done){

			phoneNum=config.validDoc.username;
			req=help.createRequest(config.baseUrl,config.routes.getUserID,{
				"phoneNo":phoneNum
			})

			request.get(req)
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

		
		it('无效的手机号',function(done){

			phoneNum=help.createInvalidPhoneNumber();
			req=help.createRequest(config.baseUrl,config.routes.getUserID,{
				"phoneNo":phoneNum
			})

			request.get(req)
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