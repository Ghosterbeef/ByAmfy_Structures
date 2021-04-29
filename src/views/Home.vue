<template>
    <div class="home-section">
        <div class="container">
            <div class="rofl">
                <router-link to="/NotFound">К котику!</router-link>
            </div>
            <nav>
                <router-link to="/avl_tree">
                    <h2>AVL дерево</h2>
                </router-link>
                <router-link to="/b_tree">
                    <h2>B дерево</h2>
                </router-link>
                <router-link to="/hash_table">
                    <h2>Хеш-таблица</h2>
                </router-link>
            </nav>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Home",
    }
</script>

<style scoped>
    .home-section{
        display: flex;
        justify-content: center;
        align-items: center;
        min-height: 50vh;
    }

    .rofl{
        position: absolute;
        opacity: 0;
        left: 50px;
        top: 200px;
        transition: 0.1s;
    }

    .rofl:hover{
        opacity: 1;
    }

    .rofl a{
        padding: 20px;
        background-color: #69BEEB;
        border-radius: 20px;
        border: 2px solid #2c3e50;
        text-decoration: none;
        color: #2c3e50;
    }

    nav {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: space-evenly;
    }

    nav a{
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        margin: 20px;
        background-color: gray;
        width: 300px;
        height: 300px;
        color: white;
        transition: 0.25s;
        box-shadow: 0 0 25px 7px darkgrey;
    }

    nav a:hover{
        transform: translateY(-5px);
    }
</style>