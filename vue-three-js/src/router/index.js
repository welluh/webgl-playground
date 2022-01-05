import { createRouter, createWebHistory } from 'vue-router';
import Home from '../components/HelloWorld.vue';
import Cube from '../components/Cube.vue';

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home,
    },
    {
        path: '/cube',
        name: 'Cube',
        component: Cube,
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
