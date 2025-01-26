<template>
    <div class="container">
        <div class="left">
            <div class="category-detail">

                <CategoryItem4List :data="categoryData"></CategoryItem4List>

            </div>
            <!--博客列表-->
            <div class="blog-list">
                <div v-for="item in blogInfo.list">
                <BlogItem  :data="item"></BlogItem>
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
            
           
            
        </div>
        
    </div>
</template>

<script setup>
import { getCurrentInstance,ref } from "vue"
import { useRoute } from "vue-router";

const {proxy} =getCurrentInstance();
const route =useRoute();
const api = {
    "loadBlogList": "view/loadBlogList",
    "loadCategory":"view/loadCategory",
    "getCategory":"view/getCategory",

}

//分类ID
const categoryId = ref(route.params.categoryId);

//分类详情
const categoryData =ref({});
const getCategoryDetail =async () => {
    let result = await proxy.Request({
        url:api.getCategory,
        params:{
            categoryId: categoryId.value
        }
    })
    if(!result){
        return;
    }
    categoryData.value = result.data;
}
getCategoryDetail();

//博客列表 

const blogInfo = ref([]);
const loadDataList = async (pageNo) => {
    let result = await proxy.Request({
        url: api.loadBlogList,
        params:{
            pageNo:pageNo,
            categoryId:categoryId.value,
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


</script>

<style lang="scss">
.category-detail{
    border-bottom: 1px solid #d6c1c1;
.category-item-list{
    width:100%;
    .item-inner{
        border:none;
    }
}
}
</style>