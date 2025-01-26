<template>
    <div>
        <div class="top">
            <div class="top-nav">
                <router-link to="/" class="logo">狐のBLog</router-link>
               
                <router-link v-for="item in menus" 
                            :class= "['nav-item',item.path==activePath?'active':'']"
                            :to="item.path">
                    {{ item.name }}
                </router-link>
            </div>
        </div>

        <div class="body-container">
            <div class=""></div>
            <router-view />
        </div>
    
        <div class="footer">
            <div>已经到底了咪>w<{{ SysInfo.policeProvince }}{{ SysInfo.icpNo }}</div>
            <div>{{SysInfo.policeNo}}</div>
        </div>
    </div>
</template>


<script setup>
import { getCurrentInstance, ref,watch } from "vue";
import {useRouter} from "vue-router";
const { proxy } = getCurrentInstance();
const router = useRouter();
const menus = ref([
    {
        name:"博客(｀･ω･)",
        path:"/",
    },
    {
        name:"分类专栏( ﾟ∀。)",
        path:"/category",
    },
    {
        name:"专题(`ヮ´ )",
        path:"/special",
    },
    {
        name:"成员( `w`)",
        path:"/user",
    },
    {
        name:"留言板(｀･ω･)",
        path:"/message",
    },
])

const api ={
    "getSysInfo":"/view/getSysInfo"
}

const SysInfo = ref({});
const loadSysInfo = async () => {
    let result = await proxy.Request({
        url:api.getSysInfo
    })
    if(!result){
        return;
    }
    SysInfo.value = result.data;
}
loadSysInfo();

const activePath = ref(null);
watch(()=>router, (newVal,oldVal) => {
   activePath.value = newVal.currentRoute.value.meta.activePath;
   
}, {immediate: true, deep: true})
</script>

<style lang="scss">
</style>