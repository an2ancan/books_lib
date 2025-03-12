import {createRouter, createWebHistory} from 'vue-router'
import AppBody from './../components/AppBody.vue'
import AppLogin from '@/components/AppLogin.vue'
import AppBooks from '@/components/AppBooks.vue'
import AppBook from '@/components/AppBook.vue'
import BooksAdmin from '@/components/AppBooksAdmin.vue'
import AppBookEdit from '@/components/AppBookEdit.vue'
import AppUsers from '@/components/AppUsers.vue'
import AppUserEdit from '@/components/AppUserEdit.vue'


const routes = [
    {
        path: '/',
        name: 'Home',
        component: AppBody,
    },
    {
        path: '/login',
        name: 'Login',
        component: AppLogin,
    },
    {
        path: "/books",
        name: "Books",
        component: AppBooks
    },
    {
        path: "/book/:bookName",
        name: "Book",
        component: AppBook
    },
    {
        path: "/admin/books",
        name: "BooksAdmin",
        component: BooksAdmin
    },
    {
        path: "/admin/book/:bookId",
        name: "BookEdit",
        component: AppBookEdit
    },
    {
        path: "/admin/users",
        name: "Users",
        component: AppUsers
    },
    {
        path: "/admin/users/:userId",
        name: "User",
        component: AppUserEdit
    },

]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router