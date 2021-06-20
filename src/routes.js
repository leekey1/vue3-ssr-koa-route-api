import home from "./home.vue";
import Test from "./testList.vue";

const routes = [
    {
        path: "/",
        name: "Home",
        component: home,
    },
    {
        path: "/list",
        name: "Test",
        component: Test,
    },
    { path: '/:pathMatch(.*)*', redirect: { name: 'Home' }}
];

export default routes;
