<template>
    <div>
        <div>解析Vue文件了哟~</div>
        <p>{{name}}</p>
    </div>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue';
export default defineComponent({
    setup() {
        const name = ref('txm')
        return {
            name
        }
    }
})
</script>