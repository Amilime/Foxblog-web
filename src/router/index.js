import {createRouter , createWebHistory} from 'vue-router'
//2025/1/23

//这里不是通过new来创建，通过createRouter 方法创建，使用的模式不是通过mode来定义
const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path:'/framework',
            name:'framework',
            component:() => import('@/views/framework.vue'),
            children:[{
                path:'/',
                name:'blog',
                meta:{title:"博客(｀･ω･)",activePath:'/'},
                component: () => import('@/views/Blog.vue'),
            },{
                path:'/blog/:blogId',
                name:'blogDetail',
                meta:{title:"博客详情",activePath:'/'},
                component: () => import('@/views/BlogDetail.vue'),
            }
            ,{
                path:'/category',
                name:'category',
                meta:{title:"分类专栏",activePath:'/category'},
                component: () => import('@/views/Category.vue'),
            },{
                path:'/category/:categoryId',
                name:'categoryDetail',
                meta:{title:"分类专栏",activePath:'/category'},
                component: () => import('@/views/CategoryDetail.vue'),
            },{
                path:'/special',
                name:'special',
                meta:{title:"专题",activePath:'/special'},
                component: () => import('@/views/Special.vue'),
            },{
                path:'/special/:specialId',
                name:'specialDetail',
                meta:{title:"专题详情",activePath:'/special'},
                component: () => import('@/views/SpecialDetail.vue'),
            },{
                path:'/user',
                name:'user',
                meta:{title:"成员",activePath:'/user'},
                component: () => import('@/views/User.vue'),
            },{
                path:'/message',
                name:'message',
                meta:{title:"留言",activePath:'/message'},
                component: () => import('@/views/Message.vue'),
            }]
        },
    ]
})

router.beforeEach((to,from,next) => {
    document.title = to.meta.title;
    next();
})

export default router