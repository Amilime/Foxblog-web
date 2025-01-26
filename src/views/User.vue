<template>
    <div class="user-body">
        <UserItem4User v-for="item in userList"
                        :data="item"></UserItem4User>
    </div>
</template>

<script setup>
import { getCurrentInstance, ref, nextTick } from "vue";
import { useRoute } from "vue-router";
import UserItem4User from "../components/UserItem4User.vue";
const route = useRoute();
const {proxy} = getCurrentInstance();

const api = {
    "loadTeamUser" : "/view/loadTeamUser"
}
const userList = ref([]);

const loadUserList = async() =>{
    let result = await proxy.Request({
        url: api.loadTeamUser,
    })
    if(!result){
        return;
    }
    userList.value = result.data;

    //nextTick(() => {
     //   let url = document.location.href;
    //    let hashId = url.substring(url.indexOf("#") + 1);
    //    document.getElementById(hashId).scrollerIntoView();
    //})
    nextTick(() => {
    let url = document.location.href;
    let hashId = url.substring(url.indexOf("#") + 1);
    console.log("hashId:", hashId);
    let element = document.getElementById(hashId);
    console.log("element:", element);
    if (element) {
        element.scrollIntoView();
    } else {
        console.error("Element with ID " + hashId + " not found.");
    }
});
}
loadUserList();
</script>

<style lang="scss">
.user-body{
    background: #f8f2f2;
    padding: 20px;
}
</style>