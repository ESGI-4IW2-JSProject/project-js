import { today } from '../index.mjs'

function calendarCreate(month, year) {
    var days = ["Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi"];
    var months = ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"];

    Date.prototype.longFormat = function () {
        return this.getDate() + " " + months[today.getMonth()] + " " + this.getFullYear()
    };
    
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
                cell.id = date + '/' + month + '/' + year;
                var cellText = document.createTextNode(date);
                p.style.width = "25px";
                p.style.height = "25px";
                p.style.textAlign = "center";
                p.style.borderRadius = "25px";
                p.appendChild(cellText);
                cell.appendChild(p);
                row.appendChild(cell);

                if (date === today.getDate() && year === today.getFullYear() && month === today.getMonth()) {
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
                var dateClicked = e.target.getAttribute('data-day') + '/' + e.target.getAttribute('data-month') + '/' + e.target.getAttribute('data-year');
                
                setDayDetailView(eventDiv, detailDate, dateClicked)
            }
        });
    }
}

function setDayDetailView(eventDiv, today, dateClicked) {
    var eventElement = document.getElementById("event");

    var promise = new Promise(function (resolve, reject) {
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
        
        var divTask = document.createElement("div");
        divTask.classList.add("card");
        divTask.style.marginTop = "15px";
        divTask.style.display = "15px";
        divTask.style.marginTop = "15px";
        
        divTask.id = "divTask";
        
        createEventBtn.appendChild(createEventBtnText);
        h4Date.appendChild(h4DateText);
        h4Div.appendChild(h4Date);
        h4Div.appendChild(createEventBtn);
        div.appendChild(h4Div);
        div.appendChild(divTask);
        eventDiv.appendChild(div);

        var eventTask = new Event();
        eventTask.displayData(dateClicked);
        
        createEventBtn.addEventListener('click', function (e) {
            var form = new eventCreator();
            form.createForm(h4Div, dateClicked);
        });
        
    })
}

function eventCreator() {

    this.createForm = function(divForm, dateClicked) {
        var formEvent = document.createElement("form");
        formEvent.classList.add("card");
        formEvent.classList.add("border-primary");
        divForm.appendChild(formEvent);
        formEvent.name = "formEvent";
        formEvent.id = "formEvent";

        formEvent.style.marginTop = "15px";
        formEvent.style.padding = "1.25rem";
        
        var inputText = document.createElement("input");
        inputText.type = "text";
        inputText.name = "task";
        
        var inputSubmitEvent = document.createElement("input");
        inputSubmitEvent.type = "submit";
        inputSubmitEvent.style.marginTop = "15px"

        formEvent.appendChild(inputText);
        formEvent.appendChild(inputSubmitEvent);

        formEvent.addEventListener('submit', function(e) {  
            var taskValue = document.getElementById("formEvent").elements[0].value;
            var event = new Event();
            event.displayDataAfterAddEvent(taskValue, dateClicked);
            formEvent.remove();
            e.preventDefault();
        });
    };
  }
  

HTMLElement.prototype.getStatusLengthItemById = function (htmlItem) {

    if( type_check( htmlItem, { type: "string" } ) == false){
        console.log("Veuillez entrer un élément html.");
        return false;
    }
    
    if( this.getElementsByTagName(htmlItem).length > 0 ) {
        return false;
    }else{
        return true;
    }

};

function Event() {
    
    this.displayDataAfterAddEvent = function(task, dateClicked){
        
        var divTask = document.getElementById("divTask");
        divTask.style.padding = "10px";
        
        var divCalendarClicked = document.getElementById(dateClicked);
        var statusDiv = divCalendarClicked.getStatusLengthItemById('div');
        
        if( statusDiv == true ){
            var divTaskedAdded = document.createElement("div");
            divTaskedAdded.style.width = "20px";
            divTaskedAdded.style.height = "20px";
            divTaskedAdded.style.borderRadius = "10px";
            divTaskedAdded.style.backgroundColor = "lightseagreen";
            divTaskedAdded.id = "taskAdded";
            divCalendarClicked.appendChild(divTaskedAdded);
        }
        
        var spanEvent = document.createElement("span");
        var taskSpanEvent = document.createTextNode(task);
        spanEvent.style.display = "none";
        spanEvent.appendChild(taskSpanEvent);
        divCalendarClicked.appendChild(spanEvent);

        var spanEvent = document.createElement("span");

        var span = document.createElement("span");
        var taskSpan = document.createTextNode(task);
        span.appendChild(taskSpan);
        divTask.appendChild(span);
    }
    
    this.displayData = function(dateClicked){
        
        var spans = document.getElementById(dateClicked).getElementsByTagName('span');

        var divTask = document.getElementById("divTask");
        for(var i = 0, l = spans.length; i < l; i++){
            divTask.style.padding = "10px";
            
            var taskSpanEvent = document.createTextNode(spans[i].textContent);
            var spanEvent = document.createElement("span");

            spanEvent.appendChild(taskSpanEvent);
            divTask.appendChild(spanEvent);
            
        }
    }
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
    selectList.addEventListener('change', function(){
        console.log(this.value);
        var detailDate = new Date(e.target.dataset.year, this.value, e.target.dataset.day);
        setDayDetailView(eventDiv, detailDate)
      });
  
}

function type_check_v1(data, type) {
    switch(typeof data) {
        case "number":
        case "string":
        case "boolean":
        case "undefined":
        case "function":
            return type === typeof data;
        case "object":
            switch(type) {
                case "null":
                    return data === null;
                case "array":
                    return Array.isArray(data);
                default:
                    return data !== null && !Array.isArray(data);
            }

    }
    
    return false;
}

function type_check_v2(data, conf) {
    for (let key of Object.keys(conf)) {
        switch (key) {
            case 'type':
                if (!type_check_v1(data, conf[key])) return false;
                break;
            case 'value':
                if (JSON.stringify(data) !== JSON.stringify(conf[key])) return false;
                break;
            case 'enum':
                let valid = false;
                for (let value of conf[key]) {
                    valid = type_check_v2(data, {value});
                    if (valid) break;
                }
                if(!valid) return false;
        }
    }

    return true;
}

function type_check(data, conf) {
    for (let key of Object.keys(conf)) {
        switch (key) {
            case 'type':
            case 'value':
            case 'enum':
                let newConf = {};
                newConf[key] = conf[key];
                if (!type_check_v2(data, newConf)) return false;
                break;
            case 'properties':
                for (let prop of Object.keys(conf[key])) {
                    if (data[prop] === undefined) return false;
                    if (!type_check(data[prop], conf[key][prop])) return false;
                }
                break;
        }
    }

    return true;
}



export { calendarCreate, setDayDetailView };