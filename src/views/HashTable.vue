<!--suppress ALL -->
<template>
    <div class="hash-table_section">
        <div class="container">
            <Element_popup v-if="dataToPopup?.data" :data-to-popup="dataToPopup" @deleteElementFromPopup="function(data) {
                deleteElement(data)
                hidePopup()
            }"></Element_popup>
            <button class="test_button" @click="addRandomElement">Добавить случайный элемент</button>
            <div class="hash_table">
                <div class="hash_table_header">
                    <button id="hashSort" class="sortChange-btn" @click.stop="sortChange">#
                        <span class="asc"
                                v-if="typeOfSort.type === 'hashSort' && typeOfSort.counter === 0" ></span>
                        <span  class="desc"
                                v-else-if="typeOfSort.type === 'hashSort' && typeOfSort.counter === 1"></span>
                    </button>
                    <button id="surnameSort" class="sortChange-btn" @click.stop="sortChange">Фамилия
                        <span  class="asc"
                                v-if="typeOfSort.type === 'surnameSort' && typeOfSort.counter === 0"></span>
                        <span  class="desc"
                                v-else-if="typeOfSort.type === 'surnameSort' && typeOfSort.counter === 1"></span>
                    </button>
                    <button id="nameSort" class="sortChange-btn" @click.stop="sortChange">Имя
                        <span  class="asc"
                                v-if="typeOfSort.type === 'nameSort' && typeOfSort.counter === 0"></span>
                        <span  class="desc"
                                v-else-if="typeOfSort.type === 'nameSort' && typeOfSort.counter === 1"></span>
                    </button>
                    <button id="patronymicSort" class="sortChange-btn" @click.stop="sortChange">Отчество
                        <span  class="asc"
                                v-if="typeOfSort.type === 'patronymicSort' && typeOfSort.counter === 0"></span>
                        <span  class="desc"
                                v-else-if="typeOfSort.type === 'patronymicSort' && typeOfSort.counter === 1"></span>
                    </button>
                    <button id="ageSort" class="sortChange-btn" @click.stop="sortChange">Возраст
                        <span  class="asc"
                                v-if="typeOfSort.type === 'ageSort' && typeOfSort.counter === 0"></span>
                        <span  class="desc"
                                v-else-if="typeOfSort.type === 'ageSort' && typeOfSort.counter === 1"></span>
                    </button>
                </div>
                <div class="hash_table_body">
                    <Hash_table_element v-for="(elements, index) in elementsToDraw" :key="index"
                                        :hash="elements.hash"
                                        :surname="elements.surname"
                                        :name="elements.name"
                                        :patronymic="elements.patronymic"
                                        :age="elements.age" @onElementClick="showPopup">
                    </Hash_table_element>
                </div>
            </div>
            <div class="control_panel-wrapper">
                <Hash_table_control_panel :length="trashCanLength" @addElement="addElement"
                                          @searchElement="searchElement"
                                          @deleteElement="deleteElement" @rollBack="rollBack">
                </Hash_table_control_panel>
                <button class="search_cancellation" v-if="isSearched" @click.stop="cancelSearch">
                    <img src="../assets/cross.svg" alt="Крестик"></button>
            </div>
        </div>
    </div>
</template>

<script>
    import Hash_table_control_panel from "../components/Hash_table_components/Hash_table_control_panel";
    import Hash_table_element from "../components/Hash_table_components/Hash_table_element";
    import Element_popup from "../components/Hash_table_components/Element_popup";

    let hashTable = {}
    let trashCan = []

    export default {
        name: "HashTable",
        components: {
            Hash_table_control_panel,
            Hash_table_element,
            Element_popup
        },
        data() {
            return {
                elementsToDraw: [],
                typeOfSort: {
                    type: "default",
                    counter: 0
                },
                isSearched: false,
                dataToPopup: {
                    data: null,
                    coords: {
                        x: null,
                        y: null
                    }
                },
                trashCanLength: trashCan.length
            }
        },
        mounted() {
            let ctx = this
            document.addEventListener("click", function (e) {
                if (e.target.className === "table_element" ||
                    e.target.closest("div").className === "table_element") {
                    return
                } else ctx.hidePopup()
            })
            this.hashFunction({
                surname: "Вахнин",
                name: "Антон",
                patronymic: "Владимирович",
                age: "20"
            })
            this.getElementsToDraw()
        },
        methods: {
            hashFunction: function (data) {
                return "#" + data.surname.charCodeAt(0)
                    + data.surname[1]
                    + data.name.charCodeAt(0)
                    + data.name[1]
                    + data.patronymic.charCodeAt(0)
                    + data.patronymic[1]
                    + data.age
            },
            addElement: function (data) {
                const hash = this.hashFunction(data)
                const result = this.isHashEmpty(hash)
                if (!result) {
                    hashTable[hash] = {
                        dataField: {
                            surname: data.surname,
                            name: data.name,
                            patronymic: data.patronymic,
                            age: data.age
                        },
                        next: null
                    }
                } else {
                    if (this.searchElementWithCollision(result, data)) {
                        alert("Точно такой же элемент уже есть в таблице!")
                        return
                    }
                    let tempElement = hashTable[hash]
                    while (tempElement.next) {
                        tempElement = tempElement.next
                    }
                    tempElement.next = {
                        dataField: {
                            surname: data.surname,
                            name: data.name,
                            patronymic: data.patronymic,
                            age: data.age
                        },
                        next: null
                    }
                }
                this.getElementsToDraw()
            },
            searchElement: function (data) {
                const hash = this.hashFunction(data)
                const result = this.isHashEmpty(hash)
                if (!result) {
                    alert("Элемент с введенными данными отсутствует в таблице")
                } else {
                    const searchResult = this.searchElementWithCollision(result, data)
                    if(!searchResult){
                        alert("Элемент с введенными данными отсутствует в таблице!")
                        return
                    }
                    this.elementsToDraw = []
                    this.elementsToDraw.push({
                        hash: hash,
                        surname: searchResult.dataField.surname,
                        name: searchResult.dataField.name,
                        patronymic: searchResult.dataField.patronymic,
                        age: searchResult.dataField.age
                    })
                    this.isSearched = true
                }
            },
            deleteElement: function (data) {
                const hash = this.hashFunction(data)
                const result = this.isHashEmpty(hash)
                if (!result) {
                    alert("Элемент с введенными данными отсутствует в таблице")
                } else {
                    let searchResult = this.searchElementWithCollision(result, data)
                    let prevElement = this.searchPrevElement(result, searchResult)
                    if (prevElement === -1) {
                        hashTable[hash] = searchResult.next
                        trashCan.unshift({
                            surname: data.surname,
                            name: data.name,
                            patronymic: data.patronymic,
                            age: data.age,
                        })
                        searchResult = null
                    } else {
                        prevElement.next = searchResult.next
                        trashCan.unshift({
                            surname: data.surname,
                            name: data.name,
                            patronymic: data.patronymic,
                            age: data.age,
                        })
                        searchResult = null
                    }
                }
                if (hashTable[hash] === null) {
                    delete hashTable[hash]
                }
                this.trashCanLength = trashCan.length
                this.getElementsToDraw()
            },
            isHashEmpty: function (hash) {
                const result = hashTable[hash]
                if (result) return result
                else return null
            },
            searchElementWithCollision: function (slot, data) {
                let tempElement = slot
                if (tempElement.dataField.surname === data.surname &&
                    tempElement.dataField.name === data.name &&
                    tempElement.dataField.patronymic === data.patronymic &&
                    tempElement.dataField.age === data.age) {
                    return tempElement
                }
                while (tempElement.next !== null) {
                    tempElement = tempElement.next
                    if (tempElement.dataField.surname === data.surname &&
                        tempElement.dataField.name === data.name &&
                        tempElement.dataField.patronymic === data.patronymic &&
                        tempElement.dataField.age === data.age) {
                        return tempElement
                    }
                }
                return null
            },
            searchPrevElement: function (result, element) {
                let tempElement = result
                if (result === element) {
                    return -1
                }
                while (tempElement.next !== element) {
                    tempElement = tempElement.next
                }
                return tempElement
            },
            getElementsToDraw: function () {
                this.isSearched = false
                this.elementsToDraw = []
                for (let element in hashTable) {
                    let tempElement = hashTable[element]
                    while (tempElement) {
                        this.elementsToDraw.push({
                            hash: element,
                            surname: tempElement.dataField.surname,
                            name: tempElement.dataField.name,
                            patronymic: tempElement.dataField.patronymic,
                            age: tempElement.dataField.age
                        })
                        tempElement = tempElement.next
                    }
                }
                switch (this.typeOfSort.type) {
                    case "hashSort": {
                        if (!this.typeOfSort.counter) {
                            this.elementsToDraw.sort(function (a, b) {
                                const hashA = a.hash.toLowerCase()
                                const hashB = b.hash.toLowerCase()
                                if (hashA < hashB)
                                    return -1
                                if (hashA > hashB)
                                    return 1
                                return 0
                            })
                        } else {
                            this.elementsToDraw.sort(function (a, b) {
                                const hashA = a.hash.toLowerCase()
                                const hashB = b.hash.toLowerCase()
                                if (hashA > hashB)
                                    return -1
                                if (hashA < hashB)
                                    return 1
                                return 0
                            })
                        }
                        break
                    }
                    case "surnameSort": {
                        if (!this.typeOfSort.counter) {
                            this.elementsToDraw.sort(function (a, b) {
                                const surnameA = a.surname.toLowerCase()
                                const surnameB = b.surname.toLowerCase()
                                if (surnameA < surnameB)
                                    return -1
                                if (surnameA > surnameB)
                                    return 1
                                return 0
                            })
                        } else {
                            this.elementsToDraw.sort(function (a, b) {
                                const surnameA = a.surname.toLowerCase()
                                const surnameB = b.surname.toLowerCase()
                                if (surnameA > surnameB)
                                    return -1
                                if (surnameA < surnameB)
                                    return 1
                                return 0
                            })
                        }
                        break
                    }
                    case "nameSort": {
                        if (!this.typeOfSort.counter) {
                            this.elementsToDraw.sort(function (a, b) {
                                const nameA = a.name.toLowerCase()
                                const nameB = b.name.toLowerCase()
                                if (nameA < nameB)
                                    return -1
                                if (nameA > nameB)
                                    return 1
                                return 0
                            })
                        } else {
                            this.elementsToDraw.sort(function (a, b) {
                                const nameA = a.name.toLowerCase()
                                const nameB = b.name.toLowerCase()
                                if (nameA > nameB)
                                    return -1
                                if (nameA < nameB)
                                    return 1
                                return 0
                            })
                        }
                        break
                    }
                    case "patronymicSort": {
                        if (!this.typeOfSort.counter) {
                            this.elementsToDraw.sort(function (a, b) {
                                const patronymicA = a.patronymic.toLowerCase()
                                const patronymicB = b.patronymic.toLowerCase()
                                if (patronymicA < patronymicB)
                                    return -1
                                if (patronymicA > patronymicB)
                                    return 1
                                return 0
                            })
                        } else {
                            this.elementsToDraw.sort(function (a, b) {
                                const patronymicA = a.patronymic.toLowerCase()
                                const patronymicB = b.patronymic.toLowerCase()
                                if (patronymicA > patronymicB)
                                    return -1
                                if (patronymicA < patronymicB)
                                    return 1
                                return 0
                            })
                        }
                        break
                    }
                    case "ageSort": {
                        if (!this.typeOfSort.counter) {
                            this.elementsToDraw.sort(function (a, b) {
                                const ageA = parseInt(a.age)
                                const ageB = parseInt(b.age)
                                return ageA - ageB
                            })
                        } else {
                            this.elementsToDraw.sort(function (a, b) {
                                const ageA = parseInt(a.age)
                                const ageB = parseInt(b.age)
                                return ageB - ageA
                            })
                        }
                        break
                    }
                    default: {
                        break
                    }
                }
            },
            getRandomIntInclusive: function (min, max) {
                min = Math.ceil(min);
                max = Math.floor(max);
                return Math.floor(Math.random() * (max - min + 1)) + min; //Максимум и минимум включаются
            },
            addRandomElement: function () {
                const ctx = this
                fetch("randomInfo.json").then(response => response.json()).then(function (json) {
                    const data = {
                        surname: json.surnames[ctx.getRandomIntInclusive(0, json.surnames.length - 1)].toString(),
                        name: json.names[ctx.getRandomIntInclusive(0, json.names.length - 1)].toString(),
                        patronymic: json.patronymics[ctx.getRandomIntInclusive(0, json.patronymics.length - 1)].toString(),
                        age: ctx.getRandomIntInclusive(1, 120).toString()
                    }
                    ctx.addElement(data)
                    ctx.getElementsToDraw()
                })
            },
            sortChange: function (e) {
                let target
                if (e.target.tagName === "IMG") {
                    target = e.target.parentNode
                } else target = e.target
                switch (target.id) {
                    case "hashSort": {
                        if (this.typeOfSort.type !== "hashSort") {
                            this.typeOfSort = {
                                type: "hashSort",
                                counter: 0
                            }
                            break
                        }
                        if (this.typeOfSort.counter === 1) {
                            this.typeOfSort = {
                                type: "default",
                                counter: 0
                            }
                            break
                        }
                        this.typeOfSort.counter++
                        break
                    }
                    case "surnameSort": {
                        if (this.typeOfSort.type !== "surnameSort") {
                            this.typeOfSort = {
                                type: "surnameSort",
                                counter: 0
                            }
                            break
                        }
                        if (this.typeOfSort.counter === 1) {
                            this.typeOfSort = {
                                type: "default",
                                counter: 0
                            }
                            break
                        }
                        this.typeOfSort.counter++
                        break
                    }
                    case "nameSort": {
                        if (this.typeOfSort.type !== "nameSort") {
                            this.typeOfSort = {
                                type: "nameSort",
                                counter: 0
                            }
                            break
                        }
                        if (this.typeOfSort.counter === 1) {
                            this.typeOfSort = {
                                type: "default",
                                counter: 0
                            }
                            break
                        }
                        this.typeOfSort.counter++
                        break
                    }
                    case "patronymicSort": {
                        if (this.typeOfSort.type !== "patronymicSort") {
                            this.typeOfSort = {
                                type: "patronymicSort",
                                counter: 0
                            }
                            break
                        }
                        if (this.typeOfSort.counter === 1) {
                            this.typeOfSort = {
                                type: "default",
                                counter: 0
                            }
                            break
                        }
                        this.typeOfSort.counter++
                        break
                    }
                    case "ageSort": {
                        if (this.typeOfSort.type !== "ageSort") {
                            this.typeOfSort = {
                                type: "ageSort",
                                counter: 0
                            }
                            break
                        }
                        if (this.typeOfSort.counter === 1) {
                            this.typeOfSort = {
                                type: "default",
                                counter: 0
                            }
                            break
                        }
                        this.typeOfSort.counter++
                        break
                    }
                    default: {
                        console.log("Какие то траблы с id")
                        break
                    }
                }
                this.getElementsToDraw()
            },
            cancelSearch: function () {
                this.isSearched = false
                this.getElementsToDraw()
            },
            showPopup: function (data, e) {
                this.dataToPopup = {
                    data: data,
                    coords: {
                        x: e.pageX,
                        y: e.pageY
                    }
                }
            },
            hidePopup: function () {
                this.dataToPopup = {
                    data: null,
                    coords: {
                        x: null,
                        y: null
                    }
                }
            },
            rollBack: function () {
                this.addElement(trashCan[0])
                trashCan.splice(0, 1)
                this.trashCanLength = trashCan.length
            }
        }
    }

</script>

<style scoped>
    @font-face {
        font-family: 'icomoon';
        src: url('../assets/fonts/icomoon.eot?5ttvyb');
        src: url('../assets/fonts/icomoon.eot?5ttvyb#iefix') format('embedded-opentype'),
        url('../assets/fonts/icomoon.ttf?5ttvyb') format('truetype'),
        url('../assets/fonts/icomoon.woff?5ttvyb') format('woff'),
        url('../assets/fonts/icomoon.svg?5ttvyb#icomoon') format('svg');
        font-weight: normal;
        font-style: normal;
        font-display: block;
    }


    .hash-table_section {
        display: flex;
        justify-content: center;
    }

    .hash_table {
        width: 100%;
        min-width: 300px;
        max-height: 50vh;
        min-height: 50vh;
        display: flex;
        flex-direction: column;
        overflow: auto;
    }

    .hash_table_header {
        display: grid;
        grid-template-columns: repeat(5, minmax(30px, 1fr));
        grid-template-rows: max-content;
        border-bottom: 1px solid black;
        position: sticky;
        background-color: hotpink;
        color: #2c3e50;
        font-weight: bold;
        top: 0;
    }

    .hash_table_header button{
        position: relative;
    }

    .hash_table_header button span::after {
        position: absolute;
        top: 8px;
        right: 5px;
        font-family: 'icomoon' !important;
        speak: never;
        font-size: 1.1rem;
        font-style: normal;
        font-weight: normal;
        font-variant: normal;
        text-transform: none;
        line-height: 1;

        /* Enable Ligatures ================ */
        letter-spacing: 0;
        -webkit-font-feature-settings: "liga";
        -moz-font-feature-settings: "liga=1";
        -moz-font-feature-settings: "liga";
        -ms-font-feature-settings: "liga" 1;
        font-feature-settings: "liga";
        -webkit-font-variant-ligatures: discretionary-ligatures;
        font-variant-ligatures: discretionary-ligatures;

        /* Better Font Rendering =========== */
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
    }

    .asc::after{
        content: "\ea4c";
    }

    .desc::after{
        content: "\ea4d";
    }

    .sortChange-btn {
        height: 30px;
        position: relative;
        text-align: center;
        font-weight: bold;
        color: black;
        background-color: hotpink;
        border: 1px solid black;
        cursor: pointer;
    }

    img {
        position: absolute;
        right: 10px;
        width: 20px;
        height: 20px;
    }

    .sortChange-btn:hover {
        background-color: #7e345a;
        color: white;
    }

    .hash_table_body {
    }


    .test_button {
        width: 120px;
        opacity: 0;
        position: absolute;
        top: 100px;
        left: 5vw;
        padding: 5px 10px;
        background-color: white;
        border: 2px solid gray;
        font-weight: bold;
        font-size: 1.05rem;
        border-radius: 5px;
        cursor: pointer;
        transition: 0.1s;
        z-index: 20;
    }

    .test_button:hover {
        opacity: 1;
        background-color: gray;
        color: black;
        border: 2px solid black;
    }


    .control_panel-wrapper {
        position: relative;
    }

    .search_cancellation {
        border: 2px solid crimson;
        background-color: white;
        border-radius: 5px;
        width: 20px;
        height: 20px;
        position: absolute;
        left: calc(41% - 5px);
        transition: 0.2s;
        cursor: pointer;
    }

    .search_cancellation img {
        width: 80%;
        margin-right: -8px;
        margin-top: -10px;
    }

    .search_cancellation:hover {
        transform: scale(1.2);
        background-color: crimson;
    }

</style>
