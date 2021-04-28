<template>
    <div class="b_tree_section">
        <div class="container">
            <button class="test_button" @click="addRandomElement">Добавить случайный элемент</button>
            <div id="b_svg_container" class="b_svg_container">
                <svg class="canvas"></svg>
                <Element_popup
                        :id="popupParams.id"
                        :surname="popupParams.surname"
                        :name="popupParams.name"
                        :patronymic="popupParams.patronymic"
                        :age="popupParams.age"
                        :anchor="popupParams.anchor" v-if="popupParams.id">
                </Element_popup>
            </div>
            <ControlPanel @addElement="addElement" @updateElement="updateElement"
                          @deleteElement="deleteElement"></ControlPanel>
        </div>
    </div>
</template>


<script>
    import ControlPanel from "../components/AVL_Tree_components/Control_panel"
    import Element_popup from "../components/Element_popup";
    import * as btree from "../vendor/btree"
    import * as d3 from "d3/dist/d3"


    const defaultOrder = 2
    const Tree = btree.create(defaultOrder, btree.numcmp)
    export const bTree = new Tree()

    export default {
        name: "BTree",
        components: {
            ControlPanel,
            Element_popup
        },
        data() {
            return {
                currentOrder: defaultOrder,
                margin: {
                    top: 40,
                    right: 90,
                    bottom: 50,
                    left: 90
                },
                popupParams: {
                    id: undefined,
                    surname: undefined,
                    name: undefined,
                    patronymic: undefined,
                    age: undefined,
                    anchor: undefined
                }
            }
        },
        mounted() {
            window.addEventListener('resize', this.drawTree)
            this.drawTree()
        },
        methods: {
            addElement: function (data) {
                bTree.put(parseInt(data.id), {
                    surname: data.surname,
                    name: data.name,
                    patronymic: data.patronymic,
                    age: data.age
                })
                bTree.print()
                this.drawTree()
            },
            updateElement: function (data) {
                let searchResult = bTree.get(parseInt(data.id))
                if (searchResult === undefined || !searchResult) {
                    //Вывести сообщение об отсутствии элемента с таким id
                    //Пока alert
                    alert("Элемент с таким id отсутствует!")
                    return
                }
                searchResult.value = {
                    surname: data.surname,
                    name: data.name,
                    patronymic: data.patronymic,
                    age: data.age
                }
                bTree.print()
            },
            deleteElement: function (data) {
                let searchResult = bTree.get(parseInt(data.id))
                if (searchResult === undefined || !searchResult) {
                    //Вывести сообщение об отсутствии элемента с таким id
                    //Пока alert
                    alert("Элемент с таким id отсутствует!")
                    return
                }
                if (searchResult.value.surname === (data.surname || searchResult.value.surname)
                    && searchResult.value.name === (data.name || searchResult.value.name)
                    && searchResult.value.patronymic === (data.patronymic || searchResult.value.patronymic)
                    && searchResult.value.age === (data.age || searchResult.value.age)) {
                    bTree.del(parseInt(data.id))
                    bTree.print()
                    return;
                }
                //Вывести сообщение об отсутствии элемента с таким id
                //Пока alert
                alert("Элемент с такими доп. данными отсутствует!")
            },
            orderChange: function () {
                // if (parseInt(orderSelect.value) < 2 || orderSelect.value == "")
                //     return
                // let TempBTree = new Tree()
                // MyBTree.walk(null, null, function (key, value) {
                //     TempBTree.put(key, value)
                // })
                // Tree = btree.create(parseInt(orderSelect.value), btree.numcmp)
                // MyBTree = new Tree()
                // TempBTree.walk(null, null, function (key, value) {
                //     MyBTree.put(key, value)
                // })
            },
            drawTree: function () {
                d3.select("#b_svg_container svg").remove()
                if (!bTree.root) {
                    return
                }

                const tempData = JSON.parse(JSON.stringify(bTree, function replacer(key, value) {
                    return (key == 'parent') ? undefined : value;
                }))


                const treeData = JSON.parse(JSON.stringify(tempData.root, function replacer(key, value) {
                    if (key == 'children') {
                        value = value.filter(item => item !== null)
                    }
                    return value
                }))




                const svg_container = document.querySelector("#b_svg_container")
                if (!svg_container) return;

                const width = svg_container.clientWidth - 10 - this.margin.left - this.margin.right
                const height = svg_container.clientHeight - 10 - this.margin.top - this.margin.bottom
                let nodes = d3.hierarchy(treeData, function (d) {
                    if (d)
                        return d.children
                })
                const treeMap = d3.tree().size([width*((nodes.height || 1)), height])


                nodes = treeMap(nodes)

                const svg = d3.select("#b_svg_container").append("svg").attr("class", "canvas")
                    .attr("width", width*((nodes.height || 1)) + this.margin.left + this.margin.right)
                    .attr("height", height + this.margin.top + this.margin.bottom)

                const g = svg.append("g").attr("transform", `translate(${this.margin.left},${this.margin.top})`)

                g.selectAll(".link")
                    .data(nodes.descendants().slice(1))
                    .enter()
                    .append("path")
                    .attr("class", "link")
                    .attr("d", function (d) {
                        return "M" + d.x + "," + d.y +
                            "C" + (d.x + d.parent.x) / 2 + "," + (d.y + d.parent.y) / 2 +
                            " " + (d.x + d.parent.x) / 2 + "," + (d.y + d.parent.y) / 2 +
                            " " + d.parent.x + "," + d.parent.y;
                    })
                    .style("fill", "none")
                    .style("stroke", "hotpink")
                    .style("stroke-width", "2px")

                const node = g.selectAll(".node")
                    .data(nodes.descendants())
                    .enter().append("g")
                    .attr("class", function (d) {
                        return "node" + (d.children ? " node--internal" : " node--leaf");
                    })
                    .attr("transform", function (d,) {
                        return "translate(" + d.x + "," + d.y + ")";
                    })


                node.selectAll("rect")
                    .data(
                        function (d, i) {
                            const data = nodes.descendants()[i].data.name
                            const length = nodes.descendants()[i].data.name.length
                            data.forEach(item => item.length = length)
                            return data
                        }
                    )
                    .enter()
                    .append("rect")
                    .attr("class", "rect")
                    .attr("width", 40)
                    .attr("height", 25)
                    // eslint-disable-next-line no-unused-vars
                    .attr("x", function (d, i) {
                        return -d.length * 20 + i * 40
                    })
                    .attr("y", -12.5)
                    .on('mouseover', this.elementHover)
                    .on('mouseout', this.elementUnhover)


                node.selectAll("text")
                    .data(
                        function (d, i) {
                            const data = nodes.descendants()[i].data.name
                            const length = nodes.descendants()[i].data.name.length
                            data.forEach(item => item.length = length)
                            return data
                        }
                    )
                    .enter()
                    .append("text")
                    .attr("width", 40)
                    .attr("dy", ".35em")
                    .attr("y", function () {
                        return 0;
                    })
                    // eslint-disable-next-line no-unused-vars
                    .attr("x", function (d, i) {
                        if (d.length === 1)
                            return 0
                        else
                            return -(d.length - 1) * 20 + i * 40
                    })
                    .style("text-anchor", "middle")
                    .style("fill", "hotpink")
                    .text(function (d) {
                        return d.key
                    })
                    .on('mouseover', this.elementHover)
                    .on('mouseout', this.elementUnhover)

                // node.append("text")
                //     .attr("dy", ".35em")
                //     .attr("y", function () {
                //         return 0;
                //     })
                //     .style("text-anchor", "start")
                //     .attr("x", 20)
                //     .text(function (d) {
                //         return d.data.name[0].value.name;
                //     })
                //     .style("fill", "hotpink")
            },
            elementHover: function (e, d) {
                this.popupParams = {
                    id: d.key.toString(),
                    surname: d.value.surname,
                    name: d.value.name,
                    patronymic: d.value.patronymic,
                    age: d.value.age,
                    anchor: {
                        top: e.clientY-21,
                        left: e.clientX+5
                    }
                }
            },
            elementUnhover: function () {
                this.popupParams = {
                    id: undefined,
                    surname: undefined,
                    name: undefined,
                    patronymic: undefined,
                    age: undefined,
                    anchor: undefined
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
                    const key = ctx.getRandomIntInclusive(1, 999)
                    const data = {
                        surname: json.surnames[ctx.getRandomIntInclusive(0, json.surnames.length - 1)].toString(),
                        name: json.names[ctx.getRandomIntInclusive(0, json.names.length - 1)].toString(),
                        patronymic: json.patronymics[ctx.getRandomIntInclusive(0, json.patronymics.length - 1)].toString(),
                        age: ctx.getRandomIntInclusive(1, 120).toString()
                    }
                    bTree.put(key, data)
                    ctx.drawTree()
                })
            }
        }
    }
</script>

<style>
    svg{
        overflow: auto;
    }


    .b_tree_section {
        display: flex;
        justify-content: center;
    }

    #b_svg_container {
        min-height: 50vh;
        width: 100%;
        overflow: auto;
    }

    .rect {
        fill: white;
        stroke-width: 2px;
        stroke: hotpink;
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
    }

    .test_button:hover {
        opacity: 1;
        background-color: gray;
        color: black;
        border: 2px solid black;
    }

</style>