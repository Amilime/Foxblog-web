<template>
<div class="blog-item">
    <div class="cover">
        <img :src="proxy.globalInfo.imageUrl+data.cover"
             v-if="data.cover">
        <img v-else
             src="../assets/default_img.png" >       
    </div>
    <div class="content">
        <div class="title"><router-link :to="'/blog/' + data.blogId"
             class="a-link">{{ data.title }}</router-link>
            </div>
        <div class="summary">{{ data.summary }}</div>
        <div class="info">
            <span class="time">{{ data.createTime }}</span>
            <span class="nick-name">作者：<router-link :to="'/user#'+ data.userId" class="a-link">{{ data.nickName }}</router-link></span>
            <span class="category-name">分类专栏：
                
        <router-link :to="'/category/' + data.categoryId" 
        class="a-link" v-if="data.categoryId!=null&&data.categoryId!=0">{{ data.categoryName }}</router-link>
        <router-link to="/category" 
        class="a-link" v-else>全部</router-link>
    </span>
                
    </div>
    </div>
</div>
</template>

<script setup>

import { getCurrentInstance } from 'vue';


const props = defineProps({
    data:{
        type:Object,
    }
    
})

const { proxy } = getCurrentInstance();
</script>

<style lang="scss">
.blog-item{
    display: flex;
    padding: 10px 0px;
    border-bottom: 1px solid #ddd;
    .cover{
    background: #ddd;
    display: flex;
    align-items:center;
    width: 120px;
    height: 120px;
    justify-content: center;
    overflow: hidden;
    border-radius:10px;
    }
    img{
        min-width: 100%;
          min-height: 100%;
          object-fit: cover;
          object-position: center;
    }
    .content {
        flex: 1;
        margin-left: 10px;
        .title{
            color:#7f93ca;
        }
        .summary{
            word-break: break-all;
            margin-top: 6px;
            font-size: 14px;
            line-height: 22px;
            white-space: normal;
            color: #999aaa;
            display: block;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 3;
            -webkit-box-orient: vertical;
            height: 70px;
        }
        .info{
            margin-top:10px;
            color: #5f6471;
            font-size: 13px;
            .time{
                margin-right: 10px;
            }
            .nick-name{
                margin-right: 10px;
            }
        }
    }

}

</style>