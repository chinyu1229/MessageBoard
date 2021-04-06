var http = require('http');
var fs = require('fs');
var template = require('art-template');
var url = require('url'); // a modular

var comments = [
	{
		name:'TWICE',
		message:'one in a million',
		dateTime:'2015-10-20'
	},
	{
		name:'TWICE2',
		message:'one in a million',
		dateTime:'2015-10-20'
	},
	{
		name:'TWICE3',
		message:'one in a million',
		dateTime:'2015-10-20'
	},
	{
		name:'TWICE4',
		message:'one in a million',
		dateTime:'2015-10-20'
	},
	{
		name:'TWICE5',
		message:'one in a million',
		dateTime:'2015-10-20'
	}
]

http.createServer(function(req,res){
	//var parseObj = new URL(req.url , 'http://127.0.0.1:3000/');
	var parseObj = url.parse(req.url,true);//true is for get class type
	var pathname = parseObj.pathname; // get pathname  without seraching string(without string after "?")

	if(pathname === '/'){
		fs.readFile('./views/index.html',function(err,data){
			if(err)
			{
				return res.end('404 Not Found.');
			}
			var htmlStr = template.render(data.toString(),{
				comments: comments
			})
			res.end(htmlStr);
		})
	}
	else if(pathname == '/addpage'){
		fs.readFile('./views/addpage.html', function(err,data){
			if(err)
			{
				return res.end('404 Not Found.');
			}

			res.end(data);
		})

	}
	else if(pathname === '/submit_comment'){

		//res.end(JSON.stringify(parseObj.searchParams));
		var comment = parseObj.query
		comment.dateTime = new Date().toLocaleString()
		comments.push(comment)//unshift
		res.statusCode = 302
		res.setHeader('Location','/')
		res.end()

	}
	else if(pathname.indexOf('/public/')=== 0){
		fs.readFile('.' + pathname, function(err,data){
			if(err)
			{
				return res.end('404 Not Found.');
			}
			res.end(data);
		})
	}

	else{
		fs.readFile('./views/404.html',function(err,data){
			if(err)
			{
				return res.end('404 Not Found');
			}
			res.end(data);
		})
	}
})
.listen(3000,function(){
	console.log('running');
})

