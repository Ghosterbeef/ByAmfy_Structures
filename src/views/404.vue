<template>
    <div class="not_found-section">
        <div class="container">
            <div class="message">
                <h1>Такую страничку не сделала =)</h1>
                <h2>Простите, у меня лапки!</h2>
                <img src="../assets/Cat.png" alt="Cat">
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
        max-height: 50vh;
        display: flex;
        justify-content: center;
    }

    .message{
        position: relative;
        width: 100%;
        box-shadow: 0 0 25px 7px darkgrey;
        min-height: 400px;
        border: 1px solid gray;
        margin-top: 340px;
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
        align-items: center;
    }


    img{
        height: 420px;
        position: absolute;
        top: -295px;
        left: calc(50% - 210px);
    }


</style>