const RegistrationForm = {
    data() {
        return {
            adressSamedChecked: true,
        }
    },
    props: ["items"],
    template: `
        <h3>Registration Form</h3>
        <hr>
        <form autocomplete="off" class="needs-validation" novalidate>
            <text-input label="First Name" name="first-name" type="text" required="true" type="text"></text-input>
            <text-input label="Last Name" name="last-name" type="text" required="true" type="text"></text-input>
            <text-input label="Email" name="email" type="email" required="true" type="text"></text-input>
            <text-input label="Password" name="password" type="password" required="true" type="password"></text-input>

            <div class="row mt-5">
            </div>
            
            <text-input
                label="Address" 
                name="address" 
                type="text" 
                required="true" 
                type="text">
            </text-input>
            <text-input
                label="City"
                name="city"
                type="text"
                required="true"
                type="text">
            </text-input>
            <text-input
                label="Postcode"
                name="postcode"
                type="text"
                required="true"
                type="text">
            </text-input>

            <check-input
                label="Mailling address is the same as my residential address"
                v-on:click="adressSame"
                checked="true"
                v-model="adressSamedChecked">
            </check-input>

            <div v-if="adressSamedChecked === false">
                <div class="mt-5">
                    <text-input
                        label=" Mailling Address" 
                        name="address2" 
                        type="text" 
                        type="text">
                    </text-input>
                    <text-input
                        label=" Mailing City"
                        name="city2"
                        type="text"
                        type="text">
                    </text-input>
                    <text-input
                        label="Mailing Postcode"
                        name="postcode2"
                        type="text"
                        type="text">
                    </text-input>
                </div>
            </div>

            <div class="row mt-5">
            </div>
           
            <select-input 
                label="Favourite colour" 
                name="colour" 
                required="true" 
                :items="items">
            </select-input>
            <check-input 
                label="I accept the terms and conditions" 
                name="terms" 
                required="true">
            </check-input>
            <hr>
            <button type="submit" class="btn btn-primary" value="Register">Submit</button>
        </form> 
    `,
    components: {
        'text-input': TextInput,
        'select-input': SelectInput,
        'check-input': CheckInput,
    },
    methods: {
        adressSame() {
            console.log("adressSame triggered");
            if (this.adressSamedChecked === true) { 
                console.log("adressSamedChecked is true");
                this.adressSamedChecked = false;
            } else {
                console.log("adressSamedChecked is false");
                this.adressSamedChecked = true;
            }
        }
    },
    mounted() {
        console.log("Vue is mounted");
        (function () {
            'use strict'
            
            // Fetch all the forms we want to apply custom Bootstrap validation styles to
            var forms = document.querySelectorAll('.needs-validation')
            
            // Loop over them and prevent submission
            Array.prototype.slice.call(forms)
                .forEach(function (form) {
                form.addEventListener('submit', function (event) {
                    if (!form.checkValidity()) {
                    event.preventDefault()
                    event.stopPropagation()
                    }
            
                    form.classList.add('was-validated')
                }, false)
            })
        })()
    },

}