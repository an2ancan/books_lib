<template>
    <div class="container">
        <div class="row">
            <div class="col">
                <h1 class="mt-5">Login</h1>
                <hr>
               <form-tag @myevent="submitHandler" name="myform" event="myevent">

                    <text-input
                        v-model="email"
                        name="Email"
                        type="email"
                        label="Username"
                        placeholder="Enter Email"
                        required="true"
                        value="">
                    </text-input>

                    <text-input
                        v-model="password"
                        name="Password"
                        type="password"
                        label="password"
                        placeholder="password"
                        required="true"
                        value="">
                    </text-input>

                    <hr>
                    <input type="submit" class="btn btn-primary" value="Login">
                </form-tag>
                <hr>
            </div>

        </div>
    </div>
</template>

<script>
import TextInput from './forms/TextInput.vue'
import FormTag from './forms/FormTag.vue'
import { store } from './store.js'
import router from './../router/index.js'
import notie from 'notie'
import Security from './security.js'

export default {
    name: 'AppLogin',
    components: {
        FormTag,
        TextInput,
    },
    data() {
        return {
            email: '',
            password: ''
        }
    },
    methods: {
        submitHandler() {

            const payload = {
                email: this.email,
                password: this.password
            }

            fetch(`${process.env.VUE_APP_API_URL}/users/login`, Security.requestOptions(payload))
                .then(response => response.json())
                .then(response => {
                    if (!response.error) {
                        console.log('Token:', response.data.token.token)
                        store.token = response.data.token.token

                        store.user = {
                            id: response.data.user.id,
                            first_name: response.data.user.first_name,
                            last_name: response.data.user.last_name,
                            email: response.data.user.email,
                        }

                        //save token to local storage cookie
                        let date = new Date();
                        let expDays = 1;
                        date.setTime(date.getTime() + (expDays * 24 * 60 * 60 * 1000));
                        const expires = "Expires=" + date.toUTCString();

                        // set the cookie
                        document.cookie = "_site_data="
                        + JSON.stringify(response.data)
                        + "; "
                        + expires
                        + "; Path=/; SameSite=Strict; Secure";

                        //log cookie
                        console.log(document.cookie)

                        router.push('/');
                    } else {
                        console.log('Error')
                        notie.alert({
                            type: 'error',
                            text: response.message,
                            // stay: true,
                            // position: 'bottom'
                        })
                    }
                })
                .catch(error => {
                    console.error('There was an error!', error)
                })
        }
    },
    
}
</script>