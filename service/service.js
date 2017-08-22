var fs=require('fs');
//获取测试数据
exports.get_test_data=function (){
	var data=fs.readFileSync('./mock/test.json','utf-8');
	return data;
}
//获取首页数据
exports.get_index_data=function (){
	var data=fs.readFileSync('./mock/home.json','utf-8');
	return data;
}
//获取排行数据
exports.get_rank_data=function (){
	var data=fs.readFileSync('./mock/rank.json','utf-8');
	return data;
}

//获取分类数据
exports.get_category_data=function (){
	var data=fs.readFileSync('./mock/category.json','utf-8');
	return data;
}

//获取封面数据
exports.get_bookbacket_data=function (){
	var data=fs.readFileSync('./mock/bookbacket.json','utf-8');
	return data;
}

//获取男生频道数据
exports.get_male_data=function (){
	var data=fs.readFileSync('./mock/channel/male.json','utf-8');
	return data;
}

//获取女生频道数据
exports.get_female_data=function (){
	var data=fs.readFileSync('./mock/channel/female.json','utf-8');
	return data;
}

//获取书籍数据
exports.get_book_data=function (id){
	if(!id){
		id='18218';
	}
	var data=fs.readFileSync('./mock/book/'+id+'.json','utf-8');
	return data;
}


//获取搜索结果数据
exports.get_search_data=function(start,end,keyword){
	return function(cb){
		var http=require('http');
		var qs=require('querystring');
		var data={
			s:keyword,
			start:start,
			end:end
		};
		var content=qs.stringify(data);
		var http_request={
			hostname:'dushu.xiaomi.com',
			port:80,
			path:'/store/v0/lib/query/onebox?'+content
		}

		req_obj=http.request(http_request,function(_res){
			var content='';
			_res.setEncoding('utf8');
			_res.on('data',function(chunk){
				content+=chunk;
			});

			_res.on('end',function(){
				cb(null,content);
			});
		});

		req_obj.on('error',function(){

		});
		req_obj.end();

	}
}