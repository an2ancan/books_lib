<template>
    <div class="container">
        <div class="row">
            <div class="col" >
                <h1 class="mt-3">Books Admin</h1>
            </div>
        </div>
    </div>
</template>

<script>
import Security from './security';
export default ({
    beforeMount() {
        Security.requireToken();
    }
})
</script>
