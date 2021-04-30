<template>
    <div class="table_element" @click="onElementClick">
        <p class="element_text">{{hash}}</p>
        <p class="element_text">{{surname}}</p>
        <p class="element_text">{{name}}</p>
        <p class="element_text">{{patronymic}}</p>
        <p class="element_text">{{age}}</p>
    </div>
</template>

<script>
    export default {
        name: "Hash_table_element",
        props: {
            hash: {
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
            }
        },
        methods: {
            onElementClick: function (e) {
                let data
                if (e.target.tagName !== "div")
                    data = {
                        surname: e.target.closest("div").childNodes[1].textContent,
                        name: e.target.closest("div").childNodes[2].textContent,
                        patronymic: e.target.closest("div").childNodes[3].textContent,
                        age: e.target.closest("div").childNodes[4].textContent
                    }
                else
                    data = {
                        surname: e.target.childNodes[1].textContent,
                        name: e.target.childNodes[2].textContent,
                        patronymic: e.target.childNodes[3].textContent,
                        age: e.target.childNodes[4].textContent
                    }
                this.$emit('onElementClick', data, e)
            }
        }
    }
</script>

<style>
    .table_element {
        width: 100%;
        display: grid;
        grid-template-columns: repeat(5, minmax(0, 1fr));
        margin: 5px 0 5px;
        background-color: white;
    }

    .table_element:hover {
        background-color: #69BEEB;
    }

    .element_text {
        line-height: 30px;
        overflow: hidden;
        text-overflow: ellipsis;
        border: 1px solid black;
        text-align: center;
        color: black;
        height: 30px;
    }

</style>