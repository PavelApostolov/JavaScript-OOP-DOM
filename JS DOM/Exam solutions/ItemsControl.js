function solve () {      //for the test running, change this line to: module.exports = function () {
 
  return function (selector, isCaseSensitive) {
    isCaseSensitive = isCaseSensitive || false;   // If isCaseSensitive is not set, by default it is false
 
    var mainDiv = document.getElementById("root"); //root
    mainDiv.setAttribute("class", "items-control");
 
    var addcontrols = document.createElement("div");
    addcontrols.setAttribute("class", "add-controls");
    mainDiv.appendChild(addcontrols);
 
    var text = document.createElement("label"); //Label to the first input
    var textcontent = document.createTextNode("Enter text");
    text.appendChild(textcontent);
    addcontrols.appendChild(text);
 
    var inputfield = document.createElement("input"); //First input
    addcontrols.appendChild(inputfield);
 
    var button = document.createElement("button"); //The Add button
    button.setAttribute("class", "button");
    var t = document.createTextNode("Add");      
    button.appendChild(t);                        
    addcontrols.appendChild(button);
 
    var searchcontrols = document.createElement("div");   //search div
    searchcontrols.setAttribute("class", "search-controls");
    mainDiv.appendChild(searchcontrols);
 
    var searchtext = document.createElement("label"); // Label to the second input
    var searchtextContent = document.createTextNode("Search:");
    searchtext.appendChild(searchtextContent);
    searchcontrols.appendChild(searchtext); //append
 
    var inputfieldSearch = document.createElement("input"); //Second input
    searchcontrols.appendChild(inputfieldSearch);
 
    var resultcontrols = document.createElement("div"); //resultcontrols div
    resultcontrols.setAttribute("class", "result-controls");
    mainDiv.appendChild(resultcontrols);
 
    var ul = document.createElement("ul");  //items-list
    ul.setAttribute("class", "items-list");
    resultcontrols.appendChild(ul); 
 
    button.addEventListener("click", onClick);
    function onClick() {
      var buttonX = document.createElement("button");
      buttonX.setAttribute("class", "button");
      var tX = document.createTextNode("X");      
      buttonX.appendChild(tX);                        
 
      buttonX.addEventListener("click", onClickX); //Event for the small button
      function onClickX() {
        ul.removeChild(li);
      }
 
      var li = document.createElement("li"); //list-item
      li.setAttribute("class", "list-item");
      ul.appendChild(li);
      var strong = document.createElement('strong');  // Create a new element strong whose inner HTML will be the input value 
      strong.innerHTML = inputfield.value;
      li.appendChild(strong);  // Append the strong to the li
      li.appendChild(buttonX);
    }
 
    var liContent = ul.getElementsByTagName('strong');   // Take all the strong's in order to iterate over them
    inputfieldSearch.addEventListener('input', function() {     
        for (var i = 0, itemsLength = liContent.length; i < itemsLength; i++) {
            if (!isCaseSensitive) {
                var searchValue = inputfieldSearch.value.toLowerCase();
                var liValue = liContent[i].innerHTML.toLowerCase();               
            }
            if (isCaseSensitive) {
                searchValue = inputfieldSearch.value;
                liValue = liContent[i].innerHTML;
            }          
          if (liValue.indexOf(searchValue) === -1) {
              liContent[i].parentElement.style.display = "none";
          }
          else {
              liContent[i].parentElement.style.display = "";
          }
        }
      } 
    );
  };
}