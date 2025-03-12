const TextInput = {
    props: {
        name: String,
        type: String,
        label: String,
        placeholder: String,
        required: String,
        min: String,
        max: String,
        value: String,
    },
    template: `
        <div class="mb-3">
            <label :for="name" class="form-label">{{label}}</label>
            <input 
                :type="type"
                :name="name"
                :placeholder="placeholder"
                :required="required"
                :min="min"
                :max="max"
                :value="value"
                :autocomplete="name + '-new'"
                class="form-control"
        </div>
    `,
}

const SelectInput = {
    props: {
        items: Array,
        name: String,
        label: String,
        required: String,
    },
    template: `
        <div class="mb-3">
            <label :for="name" class="form-label">{{label}}</label>
            <select 
                :id="name"
                :name="name"
                :required="required"
                class="form-select"
            >
                <option v-for="option in items" :value="option.value">
                    {{option.text}}
                </option>
            </select>
        </div>
    `,
}

const CheckInput = {
    props: {
        items: Array,
        name: String,
        label: String,
        required: String,
        value: String,
        checked: String
    },
    template: `
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
    `
            
}