<template>
    <div class="container">
        <div class="row">
            <div class="col" >
                <h1 class="mt-3">User</h1>
                
                <hr>
                <form-tag @userEditEvent="SubmitHandler" name="userEditForm" event="userEditEvent">
                    
                    <text-input
                        v-model="user.first_name"
                        name="first-name"
                        type="text"
                        label="First Name"
                        required="true"
                        :value="user.first_name">

                    </text-input>
                    <text-input
                        v-model="user.last_name"
                        name="last-name"
                        type="text"
                        label="Last Name"
                        required="true"
                        :value="user.last_name">
                    </text-input>

                    <text-input
                        v-model="user.email"
                        name="email"
                        type="email"
                        label="Email"
                        placeholder="Enter Email"
                        required="true"
                        :value="user.email">
                    </text-input>

                    <text-input
                        v-if="this.user.id === 0"
                        v-model="user.password"
                        name="password"
                        type="password"
                        label="Password"
                        required="true"
                        :value="user.password">
                    </text-input>

                    <text-input
                        v-else
                        v-model="user.password"
                        name="password"
                        type="password"
                        label="Password"
                        :value="user.password">
                    </text-input>
                    <hr>
                </form-tag>
            </div>
        </div>
    </div>
</template>

<script>
import Security from './security';
import FormTag from './forms/FormTag.vue';
import TextInput from './forms/TextInput.vue';
// import notie  from 'notie';

export default ({
    beforeMount() {
        Security.requireToken();

        if (parseInt(String(this.$route.params.userId), 10 >0)) {
            // editing an existing user
            // TODO - get user from database
        }
    }, 
    data(){
        return{
            user: {
                id: 0,
                first_name: "",
                last_name: "",
                email: "",
                password: "",
            }
        }
    },
    components: {
        'form-tag': FormTag,
        'text-input': TextInput,
    },
    methods:{
        SubmitHandler(){

        }
    }
})
</script>
