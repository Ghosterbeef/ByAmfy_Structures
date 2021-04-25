<template>
    <footer>
        <div class="container">
            <p class="signature">Спроектировано и разработано <span>ByAmfy</span></p>
            <p>Визуализировано с помщью фреймфорка <span>Vue.js</span></p>
            <p class="copyright" v-if="currentYear===2021">2021</p>
            <p class="copyright" v-else>2021-{{currentYear}}</p>
        </div>
    </footer>
</template>

<script>
    export default {
        name: "Footer",
        computed: {
            currentYear: function () {
                const date = new Date()
                return date.getFullYear()
            }
        }
    }
</script>

<style scoped>
    footer {
        display: flex;
        justify-content: center;
        min-width: 100vw;
        background-color: #475050;
        text-align: center;
        padding: 20px 0;
        color: white;
        font-size: 1.1rem;
        font-weight: bold;
    }

    span {
        font-family: 'Zen Dots', cursive;
    }


</style>