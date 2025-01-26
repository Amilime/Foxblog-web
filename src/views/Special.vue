<template>
    <div  class="category-body">
        <div class="category-list">
             <categoryItem4List  v-for="item in specialInfo.list"
                                :data="item" 
                                :type="1"></categoryItem4List>
        </div>

        <div class="pagination">
                <el-pagination v-if="specialInfo.totalCount"
                        background
                        :total="specialInfo.totalCount"
                        :page-size="specialInfo.pageSize"
                        :current-page.sync="specialInfo.pageNo"
                        layout="total,prev,pager,next"
                        @current-change="handlePageNoChange"
                        hide-on-single-page
                        style="text-align: right"></el-pagination>
            </div>
        </div>
</template>

<script setup>
import {getCurrentInstance, ref} from "vue";
const { proxy } = getCurrentInstance();
const api = {
    loadSpecial:"/view/loadSpecial",
}

const specialInfo =ref({});

const loadSpecial =async(pageNo)=>{
    let result = await proxy.Request({
        url:api.loadSpecial,
        params:{
            pageNo:pageNo,
            pageSize:15,
        }
    })
    specialInfo.value = result.data;
}
loadSpecial(1);

const handlePageNoChange = (pageNo) => {
    loadSpecial(pageNo);
}
</script>

<style lang="scss">
.category-body{
    background: #fdf4f4b9;
    padding: 10px;
    .category-list {
        display: flex;
        flex-wrap:wrap;
    }
}
</style>