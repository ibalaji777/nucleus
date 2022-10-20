<template>
    <div>
        <h4>Create Machine</h4>

<v-text-field v-model="machine.name"></v-text-field>

        
    </div>
</template>
<script>
export default {
    data(){
        return {
            machine:{
                name:''
            }
        }
    }
}
</script>
<style lang="scss">
    
</style>