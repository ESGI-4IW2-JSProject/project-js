function createCalendar() {
    let root = document.getElementById("root")

    var table = document.createElement("table")
    var headTr = document.createElement("tr")
    for (var i = 0; i < 7; i++) {
        var thead = document.createElement("thead")
        headTr.appendChild(thead)
    }
    table.appendChild(headTr)
    root.appendChild(table)
}