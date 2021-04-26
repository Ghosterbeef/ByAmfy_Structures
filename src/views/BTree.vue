<template>
    <div class="b_tree_section">
        <div class="container">
            <div id="b_svg_container" class="b_svg_container">
                <svg class="canvas"></svg>
            </div>
            <ControlPanel @addElement="addElement" @updateElement="updateElement"
                          @deleteElement="deleteElement"></ControlPanel>
        </div>
    </div>
</template>


<script>
    import ControlPanel from "../components/AVL_Tree_components/Control_panel"
    import * as btree from "../vendor/btree"
    import * as d3 from "d3/dist/d3"

    export default {
        name: "BTree",
        components: {
            ControlPanel
        },
        data() {
            const defaultOrder = 2
            const Tree = btree.create(defaultOrder)
            return {
                currentOrder: defaultOrder,
                bTree: new Tree(),
                margin: {
                    top: 40,
                    right: 90,
                    bottom: 50,
                    left: 90
                }
            }
        },
        methods: {
            addElement: function (data) {
                this.bTree.put(data.id, {
                    surname: data.surname,
                    name: data.name,
                    patronymic: data.patronymic,
                    age: data.age
                })
                console.clear()
                console.log(this.bTree)
                console.log(JSON.stringify(this.bTree.root, function replacer(key, value) {
                    return (key == 'parent') ? undefined : value;
                }))
                console.log(d3.hierarchy(JSON.parse(JSON.stringify(this.bTree, function replacer(key, value) {
                    return (key == 'parent') ? undefined : value;
                }))))
                this.bTree.print()
                this.drawTree()
            },
            updateElement: function (data) {
                let searchResult = this.bTree.get(data.id)
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
                console.clear()
                console.log(this.bTree)
                this.bTree.print()
            },
            deleteElement: function (data) {
                let searchResult = this.bTree.get(data.id)
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
                    this.bTree.del(data.id)
                    console.clear()
                    console.log(this.bTree)
                    this.bTree.print()
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
                d3.select("svg").remove()
                if (!this.bTree.root) {
                    return
                }

                const tempData = JSON.parse(JSON.stringify(this.bTree, function replacer(key, value) {
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
                const treeMap = d3.tree().size([width, height])
                console.log(treeData)
                let nodes = d3.hierarchy(treeData, function (d) {
                    console.log(d)
                    if (d)
                        return d.children
                })
                console.log(nodes)

                nodes = treeMap(nodes)

                const svg = d3.select("#b_svg_container").append("svg").attr("class", "canvas")
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
                        return d.data.name[0].key;
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
                        return d.data.name[0].value.name;
                    })
                    .style("fill", "hotpink")
            }
        }
    }
</script>

<style scoped>
    .b_tree_section {
        display: flex;
        justify-content: center;
    }

    #b_svg_container {
        min-height: 50vh;
        width: 100%;
    }
</style>