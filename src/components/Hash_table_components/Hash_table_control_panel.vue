<template>
    <div class="control_panel">
        <form @submit.prevent="addElement">
            <input class="getSurname" type="text" placeholder="Фамилия" v-model="formData.surname">
            <input class="getName" type="text" placeholder="Имя" v-model="formData.name">
            <input class="getPatronymic" type="text" placeholder="Отчество" v-model="formData.patronymic">
            <input class="getAge" type="number" placeholder="Возраст" v-model="formData.age" max="999">
        </form>
        <button class="addElement-btn" @click.prevent="addElement" @mouseup="deleteFocus">Добавить</button>
        <button class="searchElement-btn" @click.prevent="searchElement" @mouseup="deleteFocus">Поиск</button>
        <button class="deleteElement-btn" @click.prevent="deleteElement" @mouseup="deleteFocus">Удалить</button>
    </div>
</template>

<script>
    export default {
        name: "Hash_table_control_panel",
        data() {
            return {
                formData: {
                    surname: "",
                    name: "",
                    patronymic: "",
                    age: ""
                }
            }
        },
        methods: {
            addElement: function () {
                if (this.formData.surname === ""
                    && this.formData.name === "" && this.formData.patronymic === ""
                    && this.formData.age === "") {
                    return
                }
                if (this.formData.surname !== ""
                    && this.formData.name !== "" && this.formData.patronymic !== ""
                    && this.formData.age !== "") {
                    this.$emit("addElement", this.formData)
                    this.formData.age = this.formData.surname = this.formData.name = this.formData.patronymic = ""
                }

            },
            searchElement: function () {
                if (this.formData.surname === ""
                    && this.formData.name === "" && this.formData.patronymic === ""
                    && this.formData.age === "") {
                    return
                }
                if (this.formData.surname !== ""
                    && this.formData.name !== "" && this.formData.patronymic !== ""
                    && this.formData.age !== "") {
                    this.$emit("searchElement", this.formData)
                    this.formData.age = this.formData.surname = this.formData.name = this.formData.patronymic = ""
                }
            },
            deleteElement: function () {
                if (this.formData.surname === ""
                    && this.formData.name === "" && this.formData.patronymic === ""
                    && this.formData.age === "") {
                    return
                }
                if (this.formData.surname !== ""
                    && this.formData.name !== "" && this.formData.patronymic !== ""
                    && this.formData.age !== "") {
                    this.$emit("deleteElement", this.formData)
                    this.formData.age = this.formData.surname = this.formData.name = this.formData.patronymic = ""
                }
            },
            deleteFocus: function (e) {
                e.target.blur()
            }
        }
    }
</script>

<style scoped>
    .control_panel {
        width: 100%;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-evenly;
        position: relative;
    }

    button {
        outline: none;
        margin: 20px 0;
        padding: 5px 10px;
        background-color: white;
        font-weight: bold;
        font-size: 1.05rem;
        border-radius: 5px;
        cursor: pointer;
        transition: 0.1s;
    }

    .addElement-btn {
        border: 2px solid lime;
        color: lime;
    }

    .searchElement-btn {
        border: 2px solid blueviolet;
        color: blueviolet;
    }

    .deleteElement-btn {
        border: 2px solid red;
        color: red;
    }

    .addElement-btn:hover,.addElement-btn:focus {
        color: white;
        background-color: lime;
    }

    .searchElement-btn:hover,.searchElement-btn:focus {
        color: white;
        background-color: blueviolet;
    }

    .deleteElement-btn:hover,.deleteElement-btn:focus {
        color: white;
        background-color: red;
    }

    form {
        margin-top: 20px;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-evenly;
        align-items: center;
        width: 100%;
    }

    input {
        padding: 5px 10px;
        margin: 5px 0;
        color: black;
        border: 2px solid gray;
        transition: 0.1s;
    }

    input:hover {
        border: 2px solid black;
    }
</style>