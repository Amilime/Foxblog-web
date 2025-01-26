import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import Request from '@/utils/Request'
import "@/assets/base.scss"
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import BlogItem from '@/components/BlogItem.vue'
import CategoryItem from '@/components/CategoryItem.vue'
import UserItem from '@/components/UserItem.vue'

import CategoryItem4List from './components/CategoryItem4List.vue'
const app =createApp(App)


app.use(router)
app.use(ElementPlus);
app.config.globalProperties.Request = Request;
app.config.globalProperties.globalInfo = {
    imageUrl: "/api/file/getImage/"
}

app.component("BlogItem",BlogItem);
app.component("CategoryItem",CategoryItem);
app.component("UserItem",UserItem);
app.component("CategoryItem4List",CategoryItem4List)
app.mount('#app')