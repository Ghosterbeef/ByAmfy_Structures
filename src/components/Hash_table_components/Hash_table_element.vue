<template>
    <div class="table_element">
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
        props:{
            hash:{
                type: String,
                required: true
            },
            surname:{
                type: String,
                required: true
            },
            name:{
                type: String,
                required: true
            },
            patronymic:{
                type: String,
                required: true
            },
            age:{
                type: String,
                required: true
            }
        }
    }
</script>

<style>
    .table_element{
        display: grid;
        grid-template-columns: repeat(5, 1fr);
        margin: 5px 0 5px ;
        background-color: white;
    }

    .table_element:hover{
        background-color: #8CC271;
    }

    .element_text{
        border: 1px solid black;
        text-align: center;
        color: black;
        text-overflow:ellipsis;
    }

</style>