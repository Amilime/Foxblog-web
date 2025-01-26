<template>
    <div class="user-item-user" :id="data.userId">
        <div class="avatar">
            <img :src="proxy.globalInfo.imageUrl+data.avatar"
                 v-if="data.avatar">
            <img v-else
                 src="../assets/default_img.png" >       
        </div>
        <div class="user-info">
            <div class="nick-name">{{ data.nickName }}</div>
            <div class="profession">
                    <div>职位：{{ data.profession }}</div>
                    <div class="blog-count">博客：{{ data.blogCount }}</div>
            </div>
            <div class="introduction" v-html="data.introduction">

            </div>
        </div>
    </div>
</template>

<script setup>

import { getCurrentInstance } from 'vue';

const {proxy} = getCurrentInstance();
const props = defineProps({
    data:{
        type:Object,
    }
})
</script>

<style lang="scss">
.user-item-user{
    font-size:15px;
    display: flex;
    border-bottom: 1px solid#ddd;
    padding-bottom: 10px;
    margin-bottom: 20px;
    .avatar{
                background: #ddd;
                display: flex;
                align-items: center;
                justify-content: center;
                width: 200px;
                height: 200px;
                border-radius: 100px;
                overflow: hidden;
                img {
                    min-width: 100%;
                     min-height: 100%;
                     object-fit: cover;
                    object-position: center;
                }
            }
          
            .user-info{
                color: #2b2e41;
                margin-left: 10px;
                flex: 1;
                .nick-name{
                    font-size:16px;
                    font-weight: bold;
                }
                .profession{
                    
                    margin-top: 10px;
                    display: flex;
                    .blog-count{
                        margin-left: 10px;
                    }
                }
                .introduction{
                    margin-top: 10px;
                    
                    img {
                        max-width: 100%;
                        max-height: 600px;
                        object-fit:contain;
                        height: auto;
                        display: block;
                    }
                }
            }
}
</style>