<template>
    <div class="not_found-section">
        <div class="container">
            <div class="wrapper">
                <div class="message">
                    <h1>Такую страничку не сделала =)</h1>
                    <h2>Простите, у меня лапки!</h2>
                    <img src="../assets/Cat.png" alt="Cat">
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "404"
    }
</script>

<style scoped>
    .not_found-section {
        width: 100%;
        display: flex;
        justify-content: center;
    }

    .wrapper{
        width: 100%;
        padding-top: 255px;
        padding-bottom: 100px;
    }

    .message {
        padding: 10px;
        position: relative;
        width: 100%;
        box-shadow: 0 0 25px 7px darkgrey;
        min-height: 400px;
        border: 1px solid gray;
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
        align-items: center;
    }


    img {
        top: -288px;
        width: 500px;
        height: 360px;
        position: absolute;
        left: calc(50% - 250px);
    }


</style>