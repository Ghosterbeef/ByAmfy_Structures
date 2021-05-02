<template>
    <div class="home-section">
        <div class="container">
            <div class="rofl">
                <router-link to="/NotFound">К котику!</router-link>
            </div>
            <nav>
                <div ref="card_container1" class="card_container" @mousemove="onMouseMove" @mouseenter="onMouseEnter"
                     @mouseleave="onMouseLeave">
                    <router-link to="/avl_tree">
                        <h2>AVL дерево</h2>
                    </router-link>
                </div>
                <div ref="card_container2" class="card_container" @mousemove="onMouseMove" @mouseenter="onMouseEnter"
                     @mouseleave="onMouseLeave">
                    <router-link to="/b_tree">
                        <h2>B дерево</h2>
                    </router-link>
                </div>
                <div ref="card_container3" class="card_container" @mousemove="onMouseMove" @mouseenter="onMouseEnter"
                     @mouseleave="onMouseLeave">
                    <router-link to="/hash_table">
                        <h2>Хеш-таблица</h2>
                    </router-link>
                </div>
            </nav>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Home",
        data() {
            return {}
        },
        methods: {
            onMouseMove: function (e) {
                let target
                if (e.target.classList.contains("card_container"))
                    target = e.target.childNodes[0]
                else if (e.target.parentNode.classList.contains("card_container"))
                    target = e.target
                else
                    target = e.target.parentNode
                const xAxis = (300 / 2 - e.offsetX) / 10
                const yAxis = (300 / 2 - e.offsetY) / 10
                target.style.transform = `rotateY(${xAxis}deg) rotateX(${yAxis}deg)`
            },
            onMouseEnter: function (e) {
                let target
                if (e.target.classList.contains("card_container"))
                    target = e.target.childNodes[0]
                else if (e.target.parentNode.classList.contains("card_container"))
                    target = e.target
                else
                    target = e.target.parentNode
                target.style.transition = 'none'
                target.childNodes[0].style.transform = 'translateZ(100px)'
            },
            onMouseLeave: function (e) {
                let target
                if (e.target.classList.contains("card_container"))
                    target = e.target.childNodes[0]
                else if (e.target.parentNode.classList.contains("card_container"))
                    target = e.target
                else
                    target = e.target.parentNode
                target.style.transition = '0.5s'
                target.style.transform = `rotateY(0deg) rotateX(0deg)`
                target.childNodes[0].style.transform = 'translateZ(0px)'
            }
        }
    }
</script>

<style scoped>
    .home-section {
        display: flex;
        justify-content: center;
        align-items: center;
        min-height: 50vh;
        perspective: 1000px;
    }

    .rofl {
        position: absolute;
        opacity: 0;
        left: 50px;
        top: 200px;
        transition: 0.1s;
    }

    .rofl:hover {
        opacity: 1;
    }

    .rofl a {
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

    .card_container {
        transform-style: preserve-3d;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 300px;
        height: 300px;
        margin: 20px;
        overflow: visible;
    }

    nav a {
        transform-style: preserve-3d;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        background-color: gray;
        width: 300px;
        height: 300px;
        color: white;
        box-shadow: 0 0 25px 7px darkgrey;
    }

    nav a h2 {
        transition: 0.2s;
        text-align: center;
        line-height: 300px;
        width: 300px;
        height: 300px;
    }

</style>