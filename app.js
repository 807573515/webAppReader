var koa=require('koa');
var controller=require('koa-route');
var app=koa();
var view=require('co-views');
var render=view('./view',{
	map:{html:'ejs'}
});
var koa_static=require('koa-static-server');
var service=require('./service/service.js');
var qs=require('querystring');


app.use(koa_static({
	rootDir:'./static/',//文件路径
	rootPath:'/index/',//url路径
	maxAge:0
}));

//路由测试
app.use(controller.get('/route_test',function*(){
	this.set('Cache-Control','no-cache');
	this.body='This is route test';
}));

//模板测试
app.use(controller.get('/ejs_test',function*(){
	this.set('Cache-Control','no-cache');
	this.body=yield render('test',{title:'EJS 模板测试'});
}));

//后端接口测试
app.use(controller.get('/api_test',function*(){
	this.set('Cache-Control','no-cache');
	this.body=service.get_test_data();
}));

/*首页内容开始*/

//获取首页数据
app.use(controller.get('/ajax/index',function*(){
	this.set('Cache-Control','no-cache');
	this.body=service.get_index_data();
}));
//首页渲染
app.use(controller.get('/',function*(){
	this.set('Cache-Control','no-cache');
	this.body=yield render('index',{title:'这是首页'});
}));
/*首页内容结束*/

/*排行内容开始*/
//获取排行内容
app.use(controller.get('/ajax/rank',function*(){
	this.set('Cache-Control','no-cache');
	this.body=service.get_rank_data();
}));
app.use(controller.get('/rank',function*(){
	this.set('Cache-Control','no-cache');
	this.body=yield render('rank',{title:'这是排行'});
}));
/*排行内容结束*/


/*分类开始*/
app.use(controller.get('/ajax/category',function*(){
	this.set('Cache-Control','no-cache');
	this.body=service.get_category_data();
}));
app.use(controller.get('/category',function*(){
	this.set('Cache-Control','no-cache');
	this.body=yield render('category',{title:'这是分类'});
}));
/*分类结束*/

/*封面开始*/
app.use(controller.get('/ajax/bookbacket',function*(){
	this.set('Cache-Control','no-cache');
	this.body=service.get_bookbacket_data();
}));
app.use(controller.get('/bookbacket',function*(){
	this.set('Cache-Control','no-cache');
	this.body=yield render('bookbacket',{title:'这是封面'});
}));
/*封面结束*/

/*男生频道开始*/
app.use(controller.get('/ajax/male',function*(){
	this.set('Cache-Control','no-cache');
	this.body=service.get_male_data();
}));
app.use(controller.get('/male',function*(){
	this.set('Cache-Control','no-cache');
	this.body=yield render('male',{title:'这是男生频道'});
}));
/*男生频道结束*/

/*女生频道开始*/
app.use(controller.get('/ajax/female',function*(){
	this.set('Cache-Control','no-cache');
	this.body=service.get_female_data();
}));
app.use(controller.get('/female',function*(){
	this.set('Cache-Control','no-cache');
	this.body=yield render('female',{title:'这是女生频道'});
}));
/*女生频道结束*/


/*书籍开始*/
app.use(controller.get('/ajax/book',function*(){
	this.set('Cache-Control','no-cache');
	var params=qs.parse(this.req._parsedUrl.query);
	var id=params.id;
	if(!id){
		id='';
	}
	this.body=service.get_book_data(id);
}));
app.use(controller.get('/book',function*(){
	this.set('Cache-Control','no-cache');
	var params=qs.parse(this.req._parsedUrl.query);
	var bookId=params.id;
	this.body=yield render('book',{title:'这是书籍',id:bookId});
}));
/*书籍结束*/


/*搜索开始*/
app.use(controller.get('/ajax/search',function*(){
	this.set('Cache-Control','no-cache');
	var params=qs.parse(this.req._parsedUrl.query);
	var start=params.start;
	var end=params.end;
	var keyword=params.keyword;
	this.body=yield service.get_search_data(start,end,keyword);
}));
app.use(controller.get('/search',function*(){
	this.set('Cache-Control','no-cache');
	this.body=yield render('search',{title:'这是搜索页面'});
}));
/*搜索结束*/
app.listen(8181);
console.log('koa is started');