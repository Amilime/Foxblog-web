<template>
        <div class="category-item-list">
            <div class="item-inner">
                <div class="cover">
        <img :src="proxy.globalInfo.imageUrl+data.cover"
             v-if="data.cover">
        <img v-else
             src="../assets/default_img.png" >       
    </div>
    <div class="category-info">
            <div class="name">
            <router-link :to="'/category/'+data.categoryId" 
            class="a-link" v-if="type==0">{{ data.categoryName }}</router-link>
            <router-link :to="'/special/'+data.categoryId" 
            class="a-link" v-else>{{ data.categoryName }}</router-link>
        </div>
            <div class="desc">{{ data.categoryDesc }}</div>
            <div class="count">{{ data.blogCount }}篇</div>
    </div>

            </div>
   
    </div>
</template>

<script setup>
import { getCurrentInstance } from 'vue';
const {proxy} = getCurrentInstance();

const props =defineProps({
    data:{
        type: Object
    },
    type:{
        type:Number,
        default: 0,
    }
})
</script>

<style lang="scss">
.category-item-list{
        display: flex;
        padding: 13px;
        align-items: center;
        //border: 1px solid #ddd;
        width: 30%;
        

        .item-inner{
            border: 2px solid #d2cefd;
            width:100%;
            padding: 10px;
            display: flex;
            border-radius: 15px;
            .cover{
            background: #ddd;
            display: flex;
            align-items: center;
            justify-content: center;
            width: 100px;
            height: 100px;
            overflow: hidden;
            border-radius: 10px;
            
            img {
                min-width: 100%;
                 min-height: 100%;
                 object-fit: cover;
                object-position: center;
            }
        }
        .category-info{
            flex: 1;
            margin-left: 10px;
            .name{
            flex:1;
            display: block;
            word-break:break-all;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            margin:0px 4px;
            font-size: 18px;
            font-weight: 400;
        }
        .desc {
            margin-top: 10px;
            margin:6px 4px;
            font-size: 13px;
            display: -webkit-box;
            -webkit-line-clamp: 2; /* 设置最大行数为2 */
            -webkit-box-orient: vertical;
            overflow: hidden;
            color: #373647;
        }
        .count{
            margin-top: 10px;
            width: 30px;
            font-size: 13px;
            color: #999aaa;
        }
        }
        
        }
       
    }
</style>