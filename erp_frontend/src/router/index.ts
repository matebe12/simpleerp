import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
import Home from '../views/Home.vue';

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
    {
        path: '/main',
        name: 'Home',
        component: Home,
        children: [
            {
                path: '/main/employee',
                name: 'employee',
                // route level code-splitting
                // this generates a separate chunk (about.[hash].js) for this route
                // which is lazy-loaded when the route is visited.
                component: () =>
                    import(
                        /* webpackChunkName: "about" */ '../views/employee.vue'
                    ),
            },
            {
                path: '/main/code',
                name: 'code',
                // route level code-splitting
                // this generates a separate chunk (about.[hash].js) for this route
                // which is lazy-loaded when the route is visited.
                component: () =>
                    import(
                        /* webpackChunkName: "about" */ '../views/commonCode.vue'
                    ),
            },
            {
                path: '/main/menu',
                name: 'menu',
                // route level code-splitting
                // this generates a separate chunk (about.[hash].js) for this route
                // which is lazy-loaded when the route is visited.
                component: () =>
                    import(/* webpackChunkName: "about" */ '../views/menu.vue'),
            },
        ],
    },
    {
        path: '/login',
        name: 'login',
        component: () =>
            import(/* webpackChunkName: "about" */ '../views/login.vue'),
        meta: {
            hideNavbar: true,
        },
    },
    {
        path: '/about',
        name: 'About',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
            import(/* webpackChunkName: "about" */ '../views/About.vue'),
    },
];

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes,
});

export default router;
