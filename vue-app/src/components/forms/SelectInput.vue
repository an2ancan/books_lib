<template>
    <div class="mb-3">
        <label :for="name" class="form-label">{{ label }}</label>
        <select :id="name" :name="name" :required="required" class="form-select">
            <option v-for="option in items" :value="option.value" :key="option.value">
                {{ option.text }}
            </option>
        </select>
    </div>
</template>

<script>
export default {
    name: 'SelectInput',
    props: {
        items: Array,
        name: String,
        label: String,
        required: String,
    },
}
</script>