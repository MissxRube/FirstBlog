
'use strict';

const Controller = require('egg').Controller

class MainController extends Controller{

    async index(){
       
        this.ctx.body='hi api'
    }
   
    //判斷用戶是否存在
    async checkLogin(){
        let userName = this.ctx.request.body.userName
        let password = this.ctx.request.body.password
        const sql = " SELECT userName FROM admin_user WHERE userName = '"+userName +
                    "' AND password = '"+password+"'"

        const res = await this.app.mysql.query(sql)
        if(res.length>0){
            //登录成功,进行session缓存
            let openId=new Date().getTime()
            this.ctx.session.openId={ 'openId':openId }
            this.ctx.body={'data':'ok','openId':openId}

        }else{
            this.ctx.body={'data':'登陸失敗'}
        } 
    }
    //讀取文章分類
    async getTypeInfo(){
        //異步獲取type表
        const resType = await this.app.mysql.select('type')
        this.ctx.body = {data:resType}
    }
    //添加文章
    async addArticle(){
        //取得前台資料
        let tmpArticle= this.ctx.request.body
        //mysql插入數據
        const result = await this.app.mysql.insert('article',tmpArticle)
        const insertSuccess = result.affectedRows === 1
        const insertId = result.insertId
    
        this.ctx.body={
            isScuccess:insertSuccess,
            insertId:insertId
        }
    }
    //修改文章
    async updateArticle(){
        let tempArticle = this.ctx.request.body
        //tempArticle裡面也有包含id所以只要傳過去不一樣的會自動做修改
        const result = await this.app.mysql.update('article',tempArticle)
        const updateSuccess = result.affectedRows === 1
        this.ctx.body={
            isScuccess:updateSuccess 

        }

    }
    async getArticleList(){

        let sql = 'SELECT article.id as id,'+
                    'article.title as title,'+
                    'article.introduce as introduce,'+
                    'article.view_count as view_count,'+
                    "FROM_UNIXTIME(article.addTime,'%Y-%m-%d' ) as addTime,"+
                    'type.typeName as typeName '+
                    'FROM article LEFT JOIN type ON article.type_id = type.Id '+
                    'ORDER BY article.id DESC '
    
        const resList = await this.app.mysql.query(sql)
        this.ctx.body={list:resList}
    
    }
    //刪除文章
    async delArticle(){
        let id = this.ctx.params.id
        const res = await this.app.mysql.delete('article',{'id':id})
        this.ctx.body={data:res}
    }
    //獲取文章id
   
    async getArticleById(){
        let id = this.ctx.params.id
        let sql = 'SELECT article.id as id,'+
        'article.title as title,'+
        'article.introduce as introduce,'+
        'article.article_content as article_content,'+
        "FROM_UNIXTIME(article.addTime,'%Y-%m-%d' ) as addTime,"+
        'article.view_count as view_count ,'+
        'type.typeName as typeName ,'+
        'type.id as typeId '+
        'FROM article LEFT JOIN type ON article.type_id = type.Id '+
        'WHERE article.id='+id
        const result = await this.app.mysql.query(sql)
        this.ctx.body={data:result}
    }

}

module.exports = MainController