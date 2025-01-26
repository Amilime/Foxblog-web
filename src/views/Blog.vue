<template>
    <div class="container">
        <div class="left">
            <!--博客列表-->
            <div class="blog-list">
                <div v-for="item in blogInfo.list">
                <BlogItem :data="item"></BlogItem>
            </div>   
            </div>

           
            <div class="pagination">
                <el-pagination v-if="blogInfo.totalCount"
                        background
                        :total="blogInfo.totalCount"
                        :page-size="blogInfo.pageSize"
                        :current-page.sync="blogInfo.pageNo"
                        layout="total,prev,pager,next"
                        @current-change="handlePageNoChange"
                        hide-on-single-page
                        style="text-align: right"></el-pagination>
            </div>

        </div>
        <div class="right">
            <!--分类-->
            <div class="part-title">
                <span class="ri-title">分类专栏</span>
                <router-link to="/category" class="a-link">更多&gt;&gt;</router-link>
            </div>
            <div v-for="item in categoryList">
                <div class="category-list">
                    <CategoryItem :data="item">
                            </CategoryItem>
                </div>     
            </div>
            
            <!--专题-->
            <div class="part-title">
                <span class="ri-title">专题</span>
                <router-link to="/special" class="a-link">更多&gt;&gt;</router-link>
            </div>
            <div v-for="item in specialList">
                <div class="category-list">
                    <CategoryItem :data="item"
                                    :type="1">
                                </CategoryItem>
                </div>
            </div>

             <!--用户-->
             <div class="part-title">
                <span class="ri-title">博客成员</span>
                <router-link to="/user" class="a-link">更多&gt;&gt;</router-link>
            </div>
            <div v-for="item in userList">
                <div class="user-list">
                    <UserItem :avatar="item.avatar"
                              :nickName="item.nickName"
                              :count="item.blogCount"
                              :profession="item.profession"
                              :userId="item.userId">
                            </UserItem>
                </div>     
            </div>
            
        </div>
        
    </div>
</template>

<script setup>
import { getCurrentInstance,ref } from "vue"

const {proxy} =getCurrentInstance();

const api = {
    "loadBlogList": "view/loadBlogList",
    "loadCategory":"view/loadCategory",
    "loadSpecial":"view/loadSpecial",
    "loadTeamUser":"view/loadTeamUser"
}
//博客列表 

const blogInfo = ref([]);
const loadDataList = async (pageNo) => {
    let result = await proxy.Request({
        url: api.loadBlogList,
        params:{
            pageNo:pageNo,
            pageSize:15,

        }
    })
    if(!result){
        return;
    }
    blogInfo.value = result.data;
}
loadDataList();

const handlePageNoChange = (pageNo) => {
    loadDataList(pageNo);
}
//分类
const categoryList =ref([]);
const loadCategoryList = async () => {
    let result = await proxy.Request({
        url: api.loadCategory,
        params:{
            pageSize: 8,
        }
    })
    if(!result){
        return;
    }
    categoryList.value = result.data;
}

loadCategoryList();

//专题
const specialList =ref([]);
const loadSpecialList = async () => {
    let result = await proxy.Request({
        url: api.loadSpecial,
        params:{
            pageNo: 1,
            pageSize: 8,
        }
    })
    if(!result){
        return;
    }
    specialList.value = result.data.list;
}

loadSpecialList();

//用户列表
const userList = ref([]);
const loadUserList = async () => {
    let result = await proxy.Request({
        url: api.loadTeamUser,
        params:{
            
            pageSize: 8,
        }
    })
    if(!result){
        return;
    }
    userList.value = result.data;
}

loadUserList();
</script>

<style lang="scss">
.container{
    margin-top: 10px;
    display: flex;

    .left {
        flex: 1;
        background:#fff;
        border-radius: 30px;
        padding:20px;
        .pagination{
            margin-top:5px;
        }
    }
    .right {
        margin-left:10px;
        margin-right: 10px;
        width: 280px;
        background:#fff;
        border-radius: 30px;
        padding: 15px;
        .part-title{
            display: flex;
            align-items: center;
            justify-content: space-between;
            border-bottom: 1px solid #ddd;
            padding: 8px 8px 10px 5px;
            .ri-title{
                font-size: 16px;
                color: #ac3e3e;
            }
            .a-link{
                font-size: 13px;
            }

        }
        .category-list,
        .user-list {
            margin-bottom: 10px;
        }
    }
}
</style>