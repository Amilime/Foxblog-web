<template>
    <div class="special-body">
        <div class="left">
            <div class="special-info">
                <div class="cover">
                    <img :src="proxy.globalInfo.imageUrl+specialInfo.cover"
                        v-if="specialInfo.cover">
                    <img v-else
                        src="../assets/default_img.png" >       
                </div>
                <div class="special-panel">
                    <div style="color: #5f3434;">{{ specialInfo.categoryName}}</div>
                    <div class="count-info">文章数：{{ specialInfo.blogCount}}</div>
                </div>
            </div>
            <div class="desc">简介：{{ specialInfo.categoryDesc }}</div>
            <div class="blog-tree">
                <el-tree ref="treeRef"
                         node-key="blogId"
                         class="filter-tree"
                         :data="blogList"
                         :props="defaultProps"
                         default-expand-all
                         :hightlight-current="true"
                         @node-click="getBlogDetail"></el-tree>
            </div>
        </div>
<!--middle-->
        <div class="right">
            <div v-html="blogInfo.content"
                class="content"
                id="content"></div>

                <div class="toc-list" 
                :style="{left:rightMarginLeft + 'px'}">
                    <!--目录-->
           
            <el-collapse v-model="activeToc">
                <el-collapse-item title="目录结构"
                             name="toc">
                           
                  <div v-if="tocArray.length==0" class="no-toc">暂无目录</div>
                  <div v-for="item in tocArray">
                    <div class="toc-item" 
                    :style="{'padding-left':((item.level-1)*15+5)+'px'}">
                  <a :href="'#'+item.id" >{{ item.title }}</a>
                </div>
               
                </div>  
                            </el-collapse-item>
            </el-collapse>

           

                </div>
                
        </div>
    </div>
</template>

<script setup>
import {getCurrentInstance, ref,nextTick,onMounted,onBeforeMount} from "vue";
import { useRoute } from "vue-router";
import hljs from "highlight.js";
import "highlight.js/styles/atom-one-light.css";
const {proxy} =getCurrentInstance();
const route = useRoute();
const categoryId = route.params.specialId;

const api = {
    "getSpecialDetail":"/view/getSpecialDetail",
    "blogDetail":"view/getBlogDetail",
}

const rightMarginLeft = ref(910);
const updateRightMarginLeft = () => {
    rightMarginLeft.value = 890+ (window.innerWidth -1200)/2;
};
onMounted(()=> {
    updateRightMarginLeft();
    window.addEventListener('resize',updateRightMarginLeft);
});
onBeforeMount(() =>{
    window.removeEventListener('resize',updateRightMarginLeft);
});

const activeToc = ref(["toc"]);

const specialInfo = ref({});
const blogList = ref([]);
const treeRef =ref();

const loadSpecialInfo = async () => {
    let result = await proxy.Request({
        url:api.getSpecialDetail,
        params:{
            categoryId:categoryId,
        },
    })
    if(!result){
        return;
    }
    specialInfo.value = result.data.blogCategory;
    blogList.value = result.data.blogList;
    const firstBlogId = result.data.blogList[0].blogId;
    //选第一个
    nextTick(()=>{
        treeRef.value.setCurrentKey(firstBlogId);
    })
    

    getBlogDetail({blogId:firstBlogId});
}
loadSpecialInfo();

const defaultProps = {
    children:'children',
    label:'title',
}
//获取详情 
const blogInfo = ref({});
const getBlogDetail = async(node)=>{
    let result = await proxy.Request({
        url:api.blogDetail,
        params:{
            blogId:node.blogId,
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
//getBlogDetail();

//目录
const tocArray =ref([]);
const createToc = () => {
    const tocTags = ["H1","H2","H3","H4","H5","H6"];
    let contentDom = document.querySelector("#content");
    const childNodes = contentDom.childNodes;
    tocArray.value =[];

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
.special-body{
    background: #fff;
    overflow: hidden;
    border-radius: 25px;
    .left{
        background: #fff;
        width: 300px;
        float: left;
        .special-info{
            display: flex;
            padding: 20px;
            .cover{
            background: #ddd;
            display: flex;
            align-items: center;
            justify-content: center;
            width: 70px;
            height: 70px;
            border-radius: 10px;
            overflow: hidden;
            img {
                min-width: 100%;
                 min-height: 100%;
                 object-fit: cover;
                object-position: center;
            }
        }
        .special-panel{
           margin-left: 3px;
           .count-info{
            margin-top: 5px;
            font-size: 14px;
            color:#919da9
           }
        }
        }
        .desc {
            font-size: 14px;
            padding: 0px 5px 15px 5px;
            color: #5f3434;
            border-bottom:1px solid #ddd;
            white-space: normal; /* 设置文本换行方式为自动换行 */
            word-wrap: break-word; /* 在长单词或 URL 地址内部进行换行 */
        }
        .blog-tree{
            padding: 0px 3px;
            background: #f8f2f2;
            
            
        }
    }
    .right{
        position: relative;
        margin-left: 300px;
        border-left: 1px solid #ddd;
        flex:1;
        padding: 20px;
        min-height: calc(100vh - 150px);
        #content{
            width: 100%;
            overflow: auto;
            img {
                        max-width: 100%;
                        max-height: 500px;
                        object-fit:contain;
                        height: auto;
                        display: block;
                    }
            code{
                max-width: 100%;
                overflow: auto;
            }
        }
        .toc-list {
            z-index: 8;
            border:1px solid #ddd;
            border-radius: 10px;
            position: fixed;
            width: 300px;
            top: 80px;
            right: 0px;
            padding:10px 5px;
            .no-toc{
            text-align: center;
            color: #5f6471;
            font-size:14px;
            overflow: auto;
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