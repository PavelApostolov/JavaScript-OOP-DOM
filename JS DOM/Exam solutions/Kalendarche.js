function createCalendar(selector, events) {
    var calendarDiv = document.querySelector(selector),
        daysOfWeekArray = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
 
    calendarDiv.style.width = "1200px";
    calendarDiv.style.marginLeft = "20px";
 
    function createDateBlocks() {
        var blocksFragment = document.createDocumentFragment(),
            block = document.createElement("div"),
            blockTitle = document.createElement("div");
 
        // Block Styles
        block.style.cssFloat = "left";
        block.style.width = "150px";
        block.style.height = "150px";
        block.style.border = "1px solid black";
 
        // Block Title Styles
        blockTitle.style.height = "20px";
        blockTitle.style.textAlign = "center";
        blockTitle.style.background = "#cccccc";
        blockTitle.style.fontWeight = "bold";
        blockTitle.className = "blockTitle";
        blockTitle.style.borderBottom = "1px solid black";
 
        for (var i = 0; i < 30; i++) {
            block.setAttribute("id", i + 1);
 
            while (block.firstChild) {
                block.removeChild(block.firstChild);
            }
 
            blockTitle.innerHTML = daysOfWeekArray[i % 7] + " " + (i + 1) + " June 2014";
 
            block.appendChild(blockTitle.cloneNode(true));
 
            var clonedBlock = block.cloneNode(true);
 
            clonedBlock.addEventListener("click", clickDate);
            clonedBlock.addEventListener("mouseover", hoverIn);
            clonedBlock.addEventListener("mouseout", hoverOut);
 
            blocksFragment.appendChild(clonedBlock);
        }
 
        return blocksFragment;
    }
 
    function addEventsToCalendar() {
        for (var i = 0; i < events.length; i++) {
            var currentEvent = events[i];
            var currentEventBlock = document.getElementById(currentEvent.date);
           
            // Yeah yeah there are smarter ways im on exam and i want to do it fast;
            var textToBlock = "<p style='margin:0'>";
            textToBlock += currentEvent.hour + "h. ";
            textToBlock += currentEvent.title + " ";
            textToBlock += "</p>";
           
            currentEventBlock.innerHTML += textToBlock;
        }
    }
 
    function hoverIn() {
        title = this.getElementsByClassName("blockTitle")[0];
        title.style.background = "#999";
    }
 
    function hoverOut() {
        title = this.querySelector(".blockTitle");
        if (title.parentNode.className != "selected") {
            title.style.background = "#ccc";
        } else {
            title.style.background = "#fff";
        }
    }
 
    function clickDate() {
        // Select previously selected items and remove style
        var selectedElement = document.getElementsByClassName("selected")[0],
            selectedElementID = 0; // Enabling Deselect of block;
 
        if (selectedElement != undefined) {
            var titleElement = selectedElement.getElementsByClassName("blockTitle")[0];
            titleElement.style.background = "#ccc";
            selectedElement.setAttribute('class', '');
            selectedElementID = selectedElement.getAttribute('id');
        }
 
        if (selectedElementID !== this.id) {
            // Set this item style
            this.setAttribute('class', 'selected');
            titleElement = this.getElementsByClassName("blockTitle")[0];
            titleElement.style.background = "#fff";
        }
    }
       
    // Add blocks to main div
    calendarDiv.appendChild(createDateBlocks());
 
    // Add Events to calendar
    addEventsToCalendar();
}

//Two
function createCalendar(selector, events) {
    var daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    var selectedBox = null;
    var calendarParent = document.querySelector(selector);
    calendarParent.style.width = '1100px';
    var fragment = document.createDocumentFragment();
    var dayBox = document.createElement('div');
    dayBox.style.width = '150px';
    dayBox.style.height = '150px';
    dayBox.style.border = '1px solid black';
    dayBox.style.display = 'inline-block';
    dayBox.style.cursor = 'pointer';


    var boxTitle = document.createElement('strong');
    boxTitle.style.display = 'block';
    boxTitle.style.width = '100%';
    boxTitle.style.height = '25px';
    boxTitle.style.background = 'lightgray';
    boxTitle.style.borderBottom = '1px solid black';
    boxTitle.style.textAlign = 'center';
    boxTitle.style.lineHeight = '25px';

    dayBox.appendChild(boxTitle);

    for (var i = 1; i <= 30; i++) {
        boxTitle.innerHTML = daysOfWeek[i % 7] + ' ' + i + ' June 2014';
        var currentBox = dayBox.cloneNode(true);
        currentBox.addEventListener('click', onBoxClick);
        currentBox.addEventListener('mouseover',onBoxMouseover);
        currentBox.addEventListener('mouseout', onBoxMouseout);
        var currentEvent = hasEvent(i, events);
        if(currentEvent){
            var eventContent = document.createElement('span');
            eventContent.innerHTML = currentEvent.hour + ' ' + currentEvent.title;
            currentBox.appendChild(eventContent);

            // Fix for the bugged shifting
            currentBox.style.position = 'relative';
            currentBox.style.top = '23px';
            currentBox.style.marginTop = '-23px';
        }
        fragment.appendChild(currentBox);
    }
    calendarParent.appendChild(fragment);

    function onBoxClick() {
        var clickedBox = this;
        if(selectedBox){
            selectedBox.style.background = '';
        }
        clickedBox.style.background = 'green';
        selectedBox = clickedBox;
    }

    function onBoxMouseover() {
        var hoveredBox = this;
        if(hoveredBox != selectedBox){
            hoveredBox.style.background = 'yellowgreen';
        }
    }

    function onBoxMouseout() {
        var hoveredBox = this;
        if(hoveredBox != selectedBox){
            hoveredBox.style.background = '';
        }
    }

    function hasEvent(day, eventsList) {
        for (var i = 0; i < eventsList.length; i++) {
            if(day === parseInt(eventsList[i].date)){
                return eventsList[i];
            }
        }
    }
}

//Treto
function createCalendar(containerId, events) {
    var container = document.querySelector(containerId);
    var selectedBox = null;
    var calendar = createCalendar(new Date(2014, 5, 1), 30);
    fillTasks(calendar, events);
    container.appendChild(calendar);
 
    function createCalendar(date, numDays) {
        var i, day;
        var dayTemplate = createDayTemplate();
        var calendar = document.createElement('ul');
        for (i = 1; i <= numDays; i += 1) {
            day = dayTemplate.cloneNode(true);
            date.setDate(i);
            day.children[0].innerHTML = date.toDateString();
            addEventListeners(day);
            calendar.appendChild(day);
        }
 
        calendar.style.fontFamily = 'calibri';
        calendar.style.fontSize = '0.8em';
        calendar.style.width = 128 * 7 + 'px';
 
        return calendar;
    }
 
    function createDayTemplate() {
        var day = document.createElement('li');
        day.style.float = 'left';
        day.style.listStyleType = 'none';
        day.style.margin = '0 -1px -1px 0';
        day.style.border = '1px solid black';
        day.style.width = '120px';
 
        var dateRow = document.createElement('div');
        dateRow.style.borderBottom = '1px solid black';
        dateRow.style.textAlign = 'center';
        dateRow.style.fontWeight = 'bold';
        dateRow.style.backgroundColor = 'rgb(204, 204, 204)';
 
        var taskRow = document.createElement('div');
        taskRow.style.padding = '3px';
        taskRow.style.height = '100px';
 
        day.appendChild(dateRow);
        day.appendChild(taskRow);
 
        return day;
    }
 
    function fillTasks(calendar, events) {
        events.forEach(function (event) {
            var date = +event.date;
            var dayBox = calendar.children[date - 1];
            dayBox.children[1].innerHTML = event.hour + ' - ' + event.title;
        });
    }
 
    function addEventListeners(day) {
        day.addEventListener('mouseover', function (evt) {
            if (selectedBox !== this)
                this.children[0].style.backgroundColor = 'rgb(153, 153, 153)';
        });
        day.addEventListener('mouseout', function (evt) {
            if (selectedBox !== this)
                this.children[0].style.backgroundColor = 'rgb(204, 204, 204)';
        });
        day.addEventListener('click', function (evt) {
            if (selectedBox === this) {
                selectedBox = null;
                this.children[0].style.backgroundColor = 'rgb(153, 153, 153)';
            } else {
                if (selectedBox)
                    selectedBox.children[0].style.background = 'rgb(204, 204, 204)';
                this.children[0].style.backgroundColor = 'rgb(255, 255, 255)';
                selectedBox = this;
            }
        });
    }
}