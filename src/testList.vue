<template>
    <router-link to="/" tag="a">router-link home</router-link>
    <br/>

    <ul>
        <li v-for="item in list" :key="item">
            <h3>{{item.title}}</h3>
            <h4>{{item.conctent}}</h4>
        </li>
    </ul>
</template>

<script>
    export default {
        name: "testList",
        data() {
            return {
                list:[]
            }
        },
        async serverPrefetch(){
            if(this.isSSR)await this.fnsearch()
        },
        async created() {
            if(!this.isSSR){
                if(window.__SSR_COMP_STATE__)  window.__SSR_COMP_STATE__ = false
                else await this.fnsearch(1)
            }
        },
        methods: {
            async fnsearch() {
                let res = await this.axios.get('/api')
                this.list = res.data
            }
        }
    }
</script>

<style scoped>

</style>
