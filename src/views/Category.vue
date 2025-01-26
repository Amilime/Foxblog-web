<template>
    <div  class="category-body">
        <div class="category-list">
             <categoryItem4List  v-for="item in categoryList"
                                :data="item"></categoryItem4List>
        </div>
        </div>
</template>

<script setup>
import {getCurrentInstance, ref} from "vue";
const { proxy } = getCurrentInstance();
const api = {
    loadCategory:"/view/loadCategory",
}

const categoryList =ref([]);

const loadCategory =async()=>{
    let result = await proxy.Request({
        url:api.loadCategory,
    })
    categoryList.value = result.data;
}
loadCategory();
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