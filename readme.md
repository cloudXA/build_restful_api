# build_restful_api
### 搭建环境
```npm install```安装依赖<br />
```npm run dev```启动端口3000
### 数据库模型
* exercise 模型
  * 一个exercise模型对应多个comment模型
* category 模型 
  * 一个category模型对应多个exercise模型
* comment 模型
  * 一个comment模型对应一个user模型
* user 模型
### 接口文档
#### 1.1 题目相关(exercise)
* `exercise_post_all` 新增题目：名称、选项、解析、答案、简答答案、属性(1.单选2.所选3.判断4.简答)
#### 用户提交答案
当用户登录时，拿到用户个人信息id；在某个题目下提交答案信息的同时，将用户id、题目id、选项传递到后端。
后端中将用户模型----关联到-----exerReply模型，exerReply中的reply记录用户的id、题目id、选项信息。
User--->exerReply(exerId),
当用户提交试卷时或者刷新页面信息丢失时，获取exerReply信息。最后完成该题库后，将exerReply清空。
#### 