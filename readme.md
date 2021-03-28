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
