import { today } from '../index.mjs'

function calendarCreate(month, year) {
    var days = ["Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi"];
    var months = ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"];

    Date.prototype.longFormat = function () {
        return this.getDate() + " " + months[today.getMonth()] + " " + this.getFullYear()
    };

    console.log(month, year);
    var firstDay = (new Date(year, month)).getDay();

    //body reference
    const root = document.getElementById('root');

    var row = document.createElement("div");

    row.classList.add("row");

    var calDiv = document.createElement("div");
    var eventDiv = document.createElement("div");
    eventDiv.id = "event";

    calDiv.classList.add("col-7");
    calDiv.classList.add("m-3");

    eventDiv.classList.add("col-4");
    eventDiv.classList.add("m-3");

    root.appendChild(row);

    row.appendChild(calDiv);
    row.appendChild(eventDiv);

    var cardDiv = document.createElement("div");

    cardDiv.classList.add("card");
    cardDiv.classList.add("border-primary");

    var monthAndYearHeader = document.createElement("h3");
    var monthAndYearHeaderText = document.createTextNode(months[month] + " " + year);

    monthAndYearHeader.classList.add("card-header");
    monthAndYearHeader.classList.add("bg-primary");
    monthAndYearHeader.classList.add("text-white");
    monthAndYearHeader.classList.add("border-primary");
    monthAndYearHeader.appendChild(monthAndYearHeaderText);

    cardDiv.appendChild(monthAndYearHeader);

    calDiv.appendChild(cardDiv);
    monthChange(months,cardDiv);
    var tbl = document.createElement("table");
    tbl.classList.add("table");
    tbl.classList.add("table-responsive-sm");
    tbl.style.marginBottom = "1px";

    tbl.style.tableLayout = "fixed";

    var daysRow = document.createElement("tr");

    for (let i = 0; i < 7; i++) {
        // create element <td> and text node
        //Make text node the contents of <td> element
        // put <td> at end of the table row
        var dayCell = document.createElement("td");
        var dayCellText = document.createTextNode(days[i]);

        dayCell.style.border = "1px solid #dee2e6";
        dayCell.style.fontWeight = "bold";
        dayCell.style.textAlign = "center";

        dayCell.appendChild(dayCellText);

        daysRow.appendChild(dayCell);
    }

    tbl.appendChild(daysRow);

    var date = 1;
    var lastRow = 0;
    for (let  i = 0; i < 6; i++) {
        // creates a table row
        row = document.createElement("tr");

        //creating individual cells, filing them up with data.
        for (let j = 0; j < 7; j++) {
            console.log(date)
            if (i === 0 && j < firstDay) {
                var cell = document.createElement("td");
                cell.style.border = "1px solid #dee2e6";
                cell.style.backgroundColor = "#eeeeee";
                cell.style.height = "80px";
                var cellText = document.createTextNode("");
                cell.appendChild(cellText);
                row.appendChild(cell);
            }
            else if (date > daysInMonth(month, year)) {
                break;
            }
            else {
                cell = document.createElement("td");
                cell.style.padding = "6px";
                var p = document.createElement("p");
                cell.style.height = "80px";
                cell.style.border = "1px solid #dee2e6";
                cell.dataset.day = date;
                cell.dataset.month = month;
                cell.dataset.year = year;
                var cellText = document.createTextNode(date);
                p.style.width = "25px";
                p.style.height = "25px";
                p.style.textAlign = "center";
                p.style.borderRadius = "25px";
                p.appendChild(cellText);
                cell.appendChild(p);
                row.appendChild(cell);

                if (date === today.getDate() && year === today.getFullYear() && month === today.getMonth()) {
                    console.log(cell)
                    p.style.backgroundColor = "#007bff";
                    p.style.color = "white";
                } // highlight today’s date

                date++;
            }
        }

        tbl.appendChild(row); // appending each row into calendar body.
    }
    // put <table> in the <body>
    cardDiv.appendChild(tbl);

    const cells = document.querySelectorAll('td');
    for (var i = 0; i < cells.length; i++) {
        cells[i].addEventListener('click', function (e) {
            if (e.target.hasAttribute("data-day")) {
                [].forEach.call(cells, function(el) {
                    el.style.border = "1px solid #dee2e6";
                });
                e.target.style.border = "3px solid #007bff";
                var detailDate = new Date(e.target.dataset.year, e.target.dataset.month, e.target.dataset.day);

                setDayDetailView(eventDiv, detailDate)
            }
        });
    }
}

 function setDayDetailView(eventDiv, today) {
    var eventElement = document.getElementById("event");

    var promise = new Promise(function (resolve, reject) {
        console.log(eventElement.getElementsByClassName("card")[0]);
        console.log(eventElement);
        if (eventElement.getElementsByClassName("card")[0] != undefined) {
            eventElement.getElementsByClassName("card")[0].remove()
        }
        resolve()
    });


    promise.then(function () {
        var div = document.createElement("div");
        div.classList.add("card");
        div.classList.add("border-primary");
        div.classList.add("mb-3");
        div.classList.add("h-100");

        var divBody = document.createElement("div");
        div.classList.add("card-body");

        var h4Div = document.createElement("div");

        h4Div.classList.add("text-primary");

        var h4Date = document.createElement("span");
        h4Date.classList.add("h4");
        var h4DateText = document.createTextNode(today.longFormat());

        var createEventBtn = document.createElement("a");
        createEventBtn.style.width = "50px"
        var createEventBtnText = document.createTextNode("+");
        createEventBtn.classList.add("btn");
        createEventBtn.classList.add("btn-sm");
        createEventBtn.classList.add("btn-primary");
        createEventBtn.classList.add("text-white");
        createEventBtn.classList.add("float-right");

        createEventBtn.appendChild(createEventBtnText);
        h4Date.appendChild(h4DateText);
        h4Div.appendChild(h4Date);
        h4Div.appendChild(createEventBtn);
        div.appendChild(h4Div)
        eventDiv.appendChild(div)
    })
}

 function monthSwitchCreate() {
    var div = document.createElement("div");
    var p = document.createElement("p")
}

 function daysInMonth(iMonth, iYear) {
    return 32 - new Date(iYear, iMonth, 32).getDate();
}

function monthChange(months,cardDiv) {
    //Create and append select list
    var selectList = document.createElement("select");
    selectList.setAttribute("id", "mySelect");
    cardDiv.appendChild(selectList);

    //Create and append the options
    for (var i = 0; i < months.length; i++) {
        var option = document.createElement("option");
        option.setAttribute("value", months[i]);
        option.text = months[i];
        selectList.appendChild(option);
    }

}


export { calendarCreate, setDayDetailView };