<template>
    <Preloader></Preloader>
    <div id="nav">
        <div class="container">
            <router-link to="/">Пользовательские структуры данных в языке <span>javascript</span></router-link>
        </div>
    </div>
    <router-view/>
    <Footer></Footer>
</template>


<script>
    import Footer from './components/Footer'
    import Preloader from "./components/Preloader";
    export default {
        name: 'App',
        components: {
            Preloader,
            Footer,
        }
    }
</script>

<style>
    *, *::before, *::after {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        font-family: 'Jura', sans-serif;
        user-select: none;
    }

    #app {
        font-family: Avenir, Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        color: #2c3e50;
        display: grid;
        grid-template-rows: max-content 1fr max-content;
        justify-content: center;
        min-height: 100vh;
        min-width: 300px;
        overflow: hidden;
    }

    #nav {
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 30px 0;
    }

    #nav a {
        text-align: center;
        font-weight: bold;
        color: #2c3e50;
    }

    #nav a.router-link-exact-active {
        color: #42b983;
    }

    .container {
        min-width: 60vw;
        max-width: 1000px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-evenly;
    }
</style>
