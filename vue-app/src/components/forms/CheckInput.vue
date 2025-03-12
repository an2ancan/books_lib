<template>
    <div class="form-check">
        <input 
            type=checkbox
            :name="name"
            :id="name"
            :value="value"
            :required="required"
            :checked="checked"
            class="form-check-input"
        >
        <label class="form-check-label" :for="name">{{label}}</label>
    </div>
</template>

<script>
export default {
    name: 'CheckInput',
    props: {
        items: Array,
        name: String,
        label: String,
        required: String,
        value: String,
        checked: String
    },
}
</script>