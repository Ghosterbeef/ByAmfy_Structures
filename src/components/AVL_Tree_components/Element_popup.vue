<template>
    <div class="popup-container" :style="{left: xPosition+'px', top: yPosition+'px'}">
        <ul>
            <li>Id:{{id}}</li>
            <li>Фамилия:{{surname}}</li>
            <li>Имя:{{name}}</li>
            <li>Отчество:{{patronymic}}</li>
            <li>Возраст:{{age}}</li>
        </ul>
    </div>
</template>

<script>
    export default {
        name: "Element_popup",
        props: {
            id: {
                type: String,
                required: true
            },
            surname: {
                type: String,
                required: true
            },
            name: {
                type: String,
                required: true
            },
            patronymic: {
                type: String,
                required: true
            },
            age: {
                type: String,
                required: true
            },
            anchor: {
                type: Object,
                required: true
            }
        },
        data() {
            return {
                anchorData: this.anchor
            }
        },
        computed: {
            xPosition: function () {
                if (window.innerWidth > this.anchorData.top + 2 + 300)
                    return this.anchorData.left+2
                else
                    return window.innerWidth-220
            },
            yPosition: function () {
                if (window.innerWidth > this.anchorData.top + 2 + 300)
                return this.anchorData.top + 5 + window.scrollY
                else
                    return this.anchorData.top + 5 + 30 + window.scrollY
            }
        }
    }
</script>

<style scoped>
    .popup-container {
        position: absolute;
        background-color: hotpink;
        padding: 10px;
        border: 1px solid gray;
    }

    ul {
        width: 180px;
        list-style: none;
        display: flex;
        flex-wrap: wrap;
        flex-direction: column;
        justify-content: space-evenly;
    }
</style>