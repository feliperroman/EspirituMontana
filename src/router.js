import { createRouter, createWebHashHistory } from 'vue-router';
import App from './App.vue';

const routes = [
    {
        path: '/',
        name: 'app',
        component: App,
        children: [
            {
                path: '/',
                name: 'dashboard',
                component: () => import('./views/DashboardView.vue'),
                // meta: {
                //     requiresAuth: false,
                //     isTradeUser: true,

                // }
            },
            {
                path: '/rutas',
                name: 'rutas',
                component: () => import('./views/RoutesView.vue')
            },
            {
                path: '/verRuta',
                name: 'verRuta',
                component: () => import('./views/SeeRouteView.vue')
            },
            {
                path: '/quienesSomos',
                name: 'quienesSomos',
                component: () => import('./views/QuieneSomosView.vue')
            },
            {
                path: '/dashboardAdmin',
                name: 'dashboardAdmin',
                component: () => import('./views/DashboardAdmin.vue'),
                meta: {
                    requiresAuth: true,
                }
            },
            {
                path: '/rutasAdmin',
                name: 'rutasAdmin',
                component: () => import('./views/RoutesAdmin.vue'),
                meta: {
                    requiresAuth: true,
                }
            },
            {
                path: '/crearRuta',
                name: 'crearRuta',
                component: () => import('./views/CreateRoute.vue'),
                meta: {
                    requiresAuth: true,
                }
            },
            {
                path: '/verRutas',
                name: 'verRutas',
                component: () => import('./views/AllRoutesAdmin.vue'),
                meta: {
                    requiresAuth: true,
                }
            },
            {
                path: '/crearCliente',
                name: 'crearCliente',
                component: () => import('./views/CreateClientAdmin.vue'),
                meta: {
                    requiresAuth: true,
                }
            },
            {
                path: '/verClientes',
                name: 'verClientes',
                component: () => import('./views/AllClientsAdmin.vue'),
                meta: {
                    requiresAuth: true,
                }
            },
            {
                path: '/payment',
                name: 'payment',
                component: () => import('./views/Payment.vue')
            },
        ]
    },
    {
        path: '/loginAdmin',
        name: 'loginAdmin',
        component: () => import('./views/Login.vue')
    },
    
  
    // {
    //     path: '/login',
    //     name: 'login',
    //     component: () => import('./pages/Login.vue')
    // }
];

const router = createRouter({
    history: createWebHashHistory(),
    routes,
});

 router.beforeEach(async (to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
        //Authentication Check
        const token = localStorage.getItem('tkn');
        const rol = localStorage.getItem('rol')

        if (token && rol === 'admin') {
            //Check if token is valid
            return next()
        }
        return next('/loginAdmin')
    }

    
    next()
//     if (to.matched.some(record => record.meta.requireRole)) {
//         //Authentication Check
//         const token = localStorage.getItem('token')
//         const role = localStorage.getItem('roleUser')

//         if (token) {
//             //Check if token is valid
//             if (role == 'DEVELOPER' || role == 'ANALYTIC_ADMIN') {

//                 return next()
//             }
//             return next('/notfoundRole')
//         }
//         return next('/login')

//     }


//     if (to.matched.some(record => record.meta.noTradeUser)) {
//         const token = localStorage.getItem('token')
//         const role = localStorage.getItem('roleUser')

//         if (token) {
//             //Check if token is valid
//             if (role == 'TRADE_USER') {
//                 return next('/notfoundRole');
//             }
//             return next();
//         }
//         return next('/login')

//     }

//     if (to.matched.some(record => record.meta.isTradeUser)) {
//         const token = localStorage.getItem('token')
//         const role = localStorage.getItem('roleUser')

//         if (token) {
//             //Check if token is valid
//             if (role == 'TRADE_USER') {
//                 return next('/crearPqc');
//             }
//             return next();
//         }
//         return next('/login')

//     }

//     next()

 })

export default router;
