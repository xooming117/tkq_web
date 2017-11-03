import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

var router = new Router({
    routes: [
        {
            path: '/',
            redirect: '/index'
        },
        {
            path: '/login',
            component: resolve => require(['../components/page/Login.vue'], resolve)
        },
        {
            path: '/index',
            component: resolve => require(['../components/page/Home.vue'], resolve),
            children: [
                {
                    path: '/',
                    name: 'showitem',
                    component: resolve => require(['../components/page/ShowItem.vue'], resolve)
                },
                {
                    path: '/person',
                    component: resolve => require(['../components/page/Person.vue'], resolve),
                    children: [{
                        path: '/',
                        component: resolve => require(['../components/page/BaseCharts.vue'], resolve)    // Vue-Quill-Editor组件
                    },
                    {
                        path: '/setpinfo',
                        component: resolve => require(['../components/page/SettingPInfo.vue'], resolve)     // Vue-Quill-Editor组件
                    }, 
                    {
                        path: '/setpwd',
                        component: resolve => require(['../components/page/SettingPwd.vue'], resolve)
                    },
                    {
                        path: '/setpid',
                        component: resolve => require(['../components/page/SettingPID.vue'], resolve)     // vue-datasource组件
                    },
                    {
                        path: '/likes',
                        component: resolve => require(['../components/page/BaseTable.vue'], resolve)     // vue-datasource组件
                    },
                    {
                        path: '/logout',
                        component: resolve => require(['../components/page/Logout.vue'], resolve)     // vue-datasource组件
                    }]
                }
            ]
        }
    ]
})

router.beforeEach((to, from, next) => {
    if((to.path==='/index')||(to.path==='/login')) {
        next()
    } else {
        console.log(this.a.app.$store.getters.login)
        if(this.a.app.$store.getters.login) {
            next()
        } else {
            this.a.app.$router.push('/login')
        }
    }
});

router.afterEach((to, from, next) => {
});

export default router
