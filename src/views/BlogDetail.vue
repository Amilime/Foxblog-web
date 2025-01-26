<template>
    <!--2025.1.23完成 am-->
    <div class="container blog-detail">
        <div class="left">
            <div class="title">{{ blogInfo.title }}</div>
            <div class="info">
                <span class="time">{{ blogInfo.createTime }}</span>
            <span class="nick-name">作者：<router-link :to="'/user#'+blogInfo.userId" class="a-link">{{ blogInfo.nickName }}</router-link></span>
            <span class="category-name">分类专栏：<router-link :to="'/category/'+blogInfo.categoryId" class="a-link">{{ blogInfo.categoryName }}</router-link></span>    
            </div>
            <div v-html="blogInfo.content" 
                class="content" 
                id="content"></div>
        </div>
        <div class="right"
            :style="{left:rightMarginLeft + 'px'}">
            <!--目录-->
            <div class="part-title">
                <span class="ri-title">目录</span> 
            </div>
            <div class="toc-list">
                  <div v-if="tocArray.length==0" class="no-toc">暂无目录</div>
                  <div v-for="item in tocArray">
                    <div class="toc-item" 
                    :style="{'padding-left':((item.level-1)*15+5)+'px'}">
                  <a :href="'#'+item.id" >{{ item.title }}</a>
                </div>
                </div>
                </div>  
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

<!--<div>详情{{ blogId }}</div>-->
</template>

<script setup>
import { getCurrentInstance, nextTick, onBeforeMount, ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import hljs from "highlight.js";
import "highlight.js/styles/atom-one-light.css";
const {proxy} =getCurrentInstance();
const route = useRoute();

//const rightMarginLeft = ref(910+(window.innerWidth-1200)/2);
const rightMarginLeft = ref(910);
const updateRightMarginLeft = () => {
    rightMarginLeft.value =910 +(window.innerWidth -1200)/2;
};
onMounted(()=> {
    updateRightMarginLeft();
    window.addEventListener('resize',updateRightMarginLeft);
});
onBeforeMount(() =>{
    window.removeEventListener('resize',updateRightMarginLeft);
});
const api = {
    "blogDetail":"view/getBlogDetail",
    "loadCategory":"view/loadCategory",
}

const blogId = ref(route.params.blogId);
const blogInfo = ref({})
const getBlogDetail = async () => {
    let result = await proxy.Request({
        url:api.blogDetail,
        params:{
            blogId:blogId.value
        }
    })
    if(!result){
        return;
    }
    blogInfo.value = result.data;
    nextTick(() => {
    //高亮
    let blocks =document.querySelectorAll("pre code");
    blocks.forEach((block) => {
        hljs.highlightBlock(block);
    });

    createToc();
});
}
getBlogDetail();

//分类
const categoryList =ref([]);
const loadCategoryList = async () => {
    let result = await proxy.Request({
        url: api.loadCategory,
        params:{
            pageSize: 5,
        }
    })
    if(!result){
        return;
    }
    categoryList.value = result.data;
}

loadCategoryList();
 
//目录
const tocArray =ref([]);
const createToc = () => {
    tocArray.value =[];
    const tocTags = ["H1","H2","H3","H4","H5","H6"];
    let contentDom = document.querySelector("#content");
    const childNodes = contentDom.childNodes;
    

    let index =0;
    childNodes.forEach(item => {
        let tagName = item.tagName;
        if(tagName == undefined){
            return true;
        }
        if(!tocTags.includes(tagName.toUpperCase())){
            return true;
        }
        index++;
        let id = "toc" + index;
        item.setAttribute("id",id);
        tocArray.value.push({
            id: id,
            title:item.innerText,
            level:Number.parseInt(tagName.substring(1))
        })
    })
}
</script>

<style lang="scss">
.blog-detail{
    .left{
        width: 900px;
        flex: none;
    }
    .title{
        font-weight: bold;
        font-size: 20px;
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
    .content{
        margin-top: 20px;
        line-height: 26px;
        word-break: break-all;
        img{
            max-width:100%;
        }
    }
    .right{
        position:fixed;
        right: 0px;

        .toc-list {
            padding:10px 5px;
            .no-toc{
            text-align: center;
            color: #5f6471;
            font-size:14px;
        }
            .toc-item{
                font-size:14px;
                line-height: 25px;
                cursor: pointer;
                a{
                    color: #5f6471;
                    text-decoration: none;
                }
            }
            .toc-item:hover{
                background: #faeded;
            }
        }
        
    }
}
</style>