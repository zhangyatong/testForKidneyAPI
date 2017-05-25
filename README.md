###肾病管理App服务器API测试用例

1. 环境要求:

	nodejs、mocha

2. 使用:
	1）克隆到本地，进入根目录运行以下命令以安装相应依赖
	
		npm install
	
	2)将测试用例放在 /test/ 文件夹下，将命令行定位到根目录，运行
	
		npm test
	即可运行测试用例。
	
	**note:**在 /test/ 目录下有 mocha.opts 文件，用来配置 mocha。
	/sources/ 文件夹下可以包含辅助函数。/package.json 文件中对工程进行配置，mocha不用进行全局安装。