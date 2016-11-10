function solve() {
    return function(selector, isCaseSensitive) {
        //isCaseSensitive = isCaseSensitive || false;
        var itemsList = document.createElement('div');
        itemsList.className = 'items-list';
 
        var element = document.querySelector(selector);
        element.className = 'items-control';
 
        //Search text
        var enterTextElement = document.createElement('label');
        enterTextElement.innerHTML = 'Enter text';
 
        //Search box
        var enterTextInput = document.createElement('input');
 
        var btn = document.createElement('button');
        btn.innerHTML = 'Add';
        btn.className = 'button';
 
        btn.addEventListener('click', function() {
            var currentItemListElement = document.createElement('div');
            currentItemListElement.className = 'list-item';
            currentItemListElement.innerHTML = enterTextInput.value;
            var innerButton = document.createElement('button');
            innerButton.className = 'button';
            innerButton.innerHTML = 'X';
 
            currentItemListElement.appendChild(innerButton);
            itemsList.appendChild(currentItemListElement);
            innerButton.addEventListener('click', function() {
                currentItemListElement.parentNode.removeChild(currentItemListElement);
            })
        })
 
 
 
        //Adding elements part
        var addElementsPart = document.createElement('div');
        addElementsPart.className = 'add-controls';
        addElementsPart.appendChild(enterTextElement);
        addElementsPart.appendChild(enterTextInput)
        addElementsPart.appendChild(btn);
 
        //Search controls part
        var searchControlsPart = document.createElement('div');
        searchControlsPart.className = 'search-controls';
        var labelSearch = document.createElement('label');
        labelSearch.innerHTML = 'Search:';
        var inputSearch = document.createElement('input');
 
 
 
        // var minLength = Math.min(currentValue.length, secondHTML.length);
        // if(currentValue.length > secondHTML.length) {
        //  minLength = Math.max(currentValue.length, secondHTML.length);
        // }
        //          for (var j = 0; j < minLength; j += 1) {
        //              if (secondHTML[j] != currentValue[j]) {
        //                  if(elements[i] instanceof HTMLElement) {
        // elements[i].style.display = 'none';
        //                  }
        //                  hasToBreak = true;
        //                  break;
        //              }
        //          }
 
 
        //Result
        var resultElement = document.createElement('div');
        resultElement.className = 'result-controls';
        resultElement.appendChild(itemsList);
 
        //final
        searchControlsPart.appendChild(labelSearch);
        searchControlsPart.appendChild(inputSearch);
        element.appendChild(addElementsPart);
        element.appendChild(searchControlsPart);
        element.appendChild(resultElement);
        inputSearch.addEventListener('input', function() {
            var currentValue = inputSearch.value;
            var elements = document.getElementsByClassName('list-item');
            for (var i = 0; i < elements.length; i++) {
                var currentHTML = elements[i].innerHTML;
                var secondHTML = "";
                if (currentHTML != undefined) {
                    for (var q = 0; true; q += 1) {
                        if (currentHTML[q] == '<') {
                            break;
                        }
                        secondHTML += currentHTML[q];
                    }
                }
                if (!isCaseSensitive) {
                    currentValue = currentValue.toLowerCase();
                    secondHTML = secondHTML.toLowerCase();
                }
 
                if (!(secondHTML.indexOf(currentValue) > -1)) {
                    elements[i].style.display = 'none';
 
                } else {
                    elements[i].style.display = 'block';
                }
            }
        })
    };
}