<template>
    <div class="user-item">
        <div class="avatar">
            <img :src="proxy.globalInfo.imageUrl+avatar"
                 v-if="avatar">
            <img v-else
                 src="../assets/default_img.png" >       
        </div>
        <div class="nick-name">
            <router-link :to="'/user#' +userId" class="a-link">{{ nickName }}</router-link>
                                    <div class="profession">{{ profession }}</div>
        </div>
        <div class="count">{{ count }}篇</div>
    </div>
    </template>
    
    <script setup>
    import { getCurrentInstance } from 'vue'
    const {proxy} =getCurrentInstance();
    const props =defineProps({
        avatar:{
            type:String,
        },
        nickName:{
            type:String,
        },
        profession:{
            type:String,
        },
        count:{
            type:Number,
            default:0,
        },
        userId:{
            type:Number,
        }

    })
    
    </script>
    
    <style lang="scss">
        .user-item{
            display: flex;
            padding: 13px 0px;
            align-items: center;
            .avatar{
                background: #ddd;
                display: flex;
                align-items: center;
                justify-content: center;
                width: 60px;
                height: 60px;
                border-radius: 30px;
                overflow: hidden;
                img {
                    min-width: 100%;
                     min-height: 100%;
                     object-fit: cover;
                    object-position: center;
                }
            }
            .nick-name{
                flex:1;
                display: block;
                word-break:break-all;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
                margin:0px 9px;
                font-size: 14px;
                .a-link{
                    color:#494949;
                    font-weight: bold;
                }
                .profession{
                    color: #999aaa;
                    font-size: 13px;
                    margin-top: 5px;
                }
            }
            .count{
                width: 30px;
                font-size: 13px;
                color: #999aaa;
            }
        }
    </style>