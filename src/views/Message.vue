<template>
    <div>
        <div class="message-button" @click="showMessageBox">留言（｀△´）</div>
        <div v-if="showMessage" class="message-box">
            <img src="..\assets\what.jpg" class="centered-image" @click="hideMessageBox">
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';

const showMessage = ref(false);

const showMessageBox = () => {
    showMessage.value = true;
}

const hideMessageBox = () => {
    showMessage.value = false;
}
</script>

<style lang="scss">
.message-button {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #ff7563;
    color: #fff;
    padding: 10px 20px;
    border-radius: 5px;
    cursor: pointer;
}

.message-button:hover {
    background-color: #7673a1;
}

.message-box {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.103);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 9999;
}

.centered-image {
    max-width: 80%;
    max-height: 80%;
    cursor: pointer;
}
</style>
