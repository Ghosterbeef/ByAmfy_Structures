<template>
    <div class="popup" v-bind:style="{left: dataToPopup.coords.x + 'px', top: dataToPopup.coords.y + 'px'}">
        <button class="deleteElement-btn" @click="deleteElementFromPopup">Удалить</button>
    </div>
</template>

<script>
    export default {
        name: "Element_popup",
        props:{
            dataToPopup:{
                type: Object,
                required: true
            }
        },
        data(){
            return{
                dataToPopup_: this.dataToPopup
            }
        },
        methods:{
            deleteElementFromPopup: function () {
                this.$emit("deleteElementFromPopup", this.dataToPopup_.data)
            }
        }
    }
</script>

<style scoped>
    .popup {
        background-color: white;
        border: 2px solid black;
        padding: 7px;
        border-radius: 5px;
        position: absolute;
    }

    .deleteElement-btn {
        font-weight: bold;
        border: 2px solid red;
        color: red;
        background-color: white;
        padding: 5px;
        border-radius: 5px;
    }

    .deleteElement-btn:hover {
        color: white;
        background-color: red;
    }
</style>