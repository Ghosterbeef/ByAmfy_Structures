<template>
    <div class="avl_tree_section">
        <div class="container">
            <div id="svg_container" class="svg_container">
                <svg class="canvas"></svg>
            </div>
            <ControlPanel @addElement="addElement" @updateElement="updateElement"
                          @deleteElement="deleteElement"></ControlPanel>
        </div>
    </div>
</template>

<script>
    // @ is an alias to /src
    import {bst} from "../vendor/BST_AVL";
    import ControlPanel from '../components/Avl_tree_control_panel'
    import * as d3 from "d3/dist/d3"

    export default {
        name: 'Home',
        components: {
            ControlPanel,
        },
        data() {
            return {
                margin: {
                    top: 40,
                    right: 90,
                    bottom: 50,
                    left: 90
                }
            }
        },
        mounted() {
            window.addEventListener('resize', this.drawTree)
        },
        methods: {
            addElement: function (data) {
                if (bst.root !== null) {
                    if (bst.Search(data.id) !== -1) {
                        //Вывести ошибку что такой элемент существует
                        //Пока что алерт
                        alert("Елемент с таким id уже есть в дереве")
                        return
                    }
                }
                const dataToAdd = {
                    id: data.id,
                    surname: data.surname,
                    name: data.name,
                    patronymic: data.patronymic,
                    age: data.age,
                }
                bst.InsertVal(dataToAdd)
                this.drawTree()
            },
            updateElement: function (data) {
                if (bst.root !== null) {
                    let element = bst.Search(data.id)
                    if (element !== -1) {
                        element.value = {
                            id: element.value.id,
                            surname: data.surname || element.value.surname,
                            name: data.name || element.value.name,
                            patronymic: data.patronymic || element.value.patronymic,
                            age: data.age || element.value.age,
                        }
                        element.json.name = {
                            id: element.value.id,
                            surname: data.surname || element.value.surname,
                            name: data.name || element.value.name,
                            patronymic: data.patronymic || element.value.patronymic,
                            age: data.age || element.value.age
                        }
                        this.drawTree()
                        console.log(bst.root)
                    } else {
                        //Вывести ошибку что такой элемент отсутствует
                        //Пока что алерт
                        alert("Елемент с таким id отсутствует")
                    }
                }
            },
            deleteElement: function (data) {
                const element = bst.Search(data.id)
                if (element !== -1) {
                    if (element.value.surname === (data.surname || element.value.surname)
                        && element.value.name === (data.name || element.value.name)
                        && element.value.patronymic === (data.patronymic || element.value.patronymic)
                        && element.value.age === (data.age || element.value.age)) {
                        bst.DeleteVal(data.id)
                        this.drawTree()
                        return
                    }
                }
                //Вывести ошибку что такой элемент отсутствует
                //Пока что алерт
                alert("Елемент с такими данными отсутствует")
            },
            drawTree: function () {
                d3.select("svg").remove()
                if (!bst.root) return

                const treeData = bst.root.json

                const svg_container = document.querySelector("#svg_container")

                const width = svg_container.clientWidth - 10 - this.margin.left - this.margin.right
                const height = svg_container.clientHeight - 10 - this.margin.top - this.margin.bottom
                const treeMap = d3.tree().size([width, height])
                let nodes = d3.hierarchy(treeData)

                nodes = treeMap(nodes)

                const svg = d3.select("#svg_container").append("svg")
                    .attr("width", width + this.margin.left + this.margin.right)
                    .attr("height", height + this.margin.top + this.margin.bottom)

                const g = svg.append("g").attr("transform", `translate(${this.margin.left},${this.margin.top})`)

                g.selectAll(".link")
                    .data(nodes.descendants().slice(1))
                    .enter()
                    .append("path")
                    .attr("class", "link")
                    .attr("d", function (d) {
                        if (d.parent && d.parent.children.length === 1) {
                            if (d.data.direction === 'right') {
                                if (d.parent.parent)
                                    d.x += Math.abs(d.parent.x - d.parent.parent.x) / 2;
                                else
                                    d.x += width / 4;
                            } else {
                                if (d.parent.parent)
                                    d.x -= Math.abs(d.parent.x - d.parent.parent.x) / 2;
                                else
                                    d.x -= width / 4;
                            }
                        }
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
                    .attr("transform", function (d) {
                        return "translate(" + d.x + "," + d.y + ")";
                    })
                    .on('mouseover', this.elementHover)
                    .on('mouseout', this.elementUnhover)

                node.append("circle")
                    .attr("r", 15)
                .style("fill", "#6d7373")
                .style("stroke", "hotpink")
                .style("stroke-width", "2px")

                node.append("text")
                    .attr("dy", ".35em")
                    .attr("y", function () {
                        return 0;
                    })
                    .style("text-anchor", "middle")
                    .text(function (d) {
                        return d.data.name.id;
                    })
                    .style("fill", "hotpink")
                node.append("text")
                    .attr("dy", ".35em")
                    .attr("y", function () {
                        return 0;
                    })
                    .style("text-anchor", "start")
                    .attr("x", 20)
                    .text(function (d) {
                        return d.data.name.name;
                    })
                    .style("fill", "hotpink")
            },
            elementHover: function () {

            },
            elementUnhover: function () {

            }
        }
    }
</script>

<style scoped>
    .avl_tree_section {
        display: flex;
        justify-content: center;
    }

    .svg_container {
        min-height: 50vh;
        width: 100%;
        border: 1px solid gray;
    }

</style>
