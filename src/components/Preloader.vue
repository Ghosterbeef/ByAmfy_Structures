<template>
    <div class="preloader" v-if="!isLoaded">
        <div class="cube">A</div>
        <div class="cube">M</div>
        <div class="cube">F</div>
        <div class="cube">Y</div>
    </div>
</template>

<script>
    export default {
        name: "Preloader",
        data(){
          return{
              isLoaded: false
          }
        },
        mounted() {
            document.onreadystatechange = () => {
                if (document.readyState === 'complete'){
                    const ctx = this
                    setTimeout(function () {
                        ctx.isLoaded = true
                    },1000)
                }
            }
        }
    }
</script>

<style scoped>

    .preloader {
        display: flex;
        justify-content: center;
        align-items: center;
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        background-color: white;
        z-index: 999;
    }


    .cube {
        display: flex;
        justify-content: center;
        align-items: center;
        color: white;
        font-weight: bold;
        font-size: 1.3rem;
        width: 40px;
        height: 40px;
        margin-right: 10px;
    }

    .cube:nth-child(1) {
        background-color: #69BEEB;
        animation: left 1s infinite;
    }

    .cube:nth-child(2) {
        background-color: #8CC271;
        animation: rightLilBit 1s infinite 0.5s;
    }

    .cube:nth-child(3) {
        background-color: #E9643B;
        animation: leftLilBit 1s infinite 1s;
    }

    .cube:nth-child(4) {
        background-color: #F5AA39;
        animation: right 1s infinite 0.5s;
    }

    @keyframes left {
        40% {
            transform: translateX(-60px);
        }

        47%{
            transform: translateX(10px);
        }
        50% {
            transform: translateX(0);
        }
    }

    @keyframes leftLilBit {
        10% {
            transform: translateX(-5px);
        }
        50% {
            transform: translateX(0);
        }
    }

    @keyframes right {
        40% {
            transform: translateX(60px);
        }
        47%{
            transform: translateX(-10px);
        }

        50% {
            transform: translateX(0);
        }
    }

    @keyframes rightLilBit {
        10% {
            transform: translateX(5px);
        }
        50% {
            transform: translateX(0);
        }
    }

</style>