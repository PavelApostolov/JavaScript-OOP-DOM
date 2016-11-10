/* globals document, window, console */

function solve() {
    return function (selector, initialSuggestions) {
        var root = document.querySelector(selector),
            addBtn = document.getElementsByClassName('btn-add')[0],
            input = document.getElementsByClassName('tb-pattern')[0],
            allSuggestions = initialSuggestions || [],
            suggestionsList = document.getElementsByClassName('suggestions-list')[0];

        function addSuggestionToTheList() {
            addBtn.addEventListener('click', function () {
                var text = input.value;
                var isfound = false;

                for (var i = 0; i < allSuggestions.length; i += 1) {
                    if (allSuggestions[i].toLowerCase() === text.toLowerCase()) {
                        isfound = true;
                    }
                }

                if (!isfound) {
                    allSuggestions.push(text);
                }

                appendSuggestions();
            });
        }

        function appendSuggestions() {
            var li = document.createElement('li');
            var anchor = document.createElement('a');
            var filteredSuggestions = [],
                i;

            anchor.setAttribute('class', 'suggestion-link');
            anchor.setAttribute('href', '#');

            for (i = 0; i < allSuggestions.length; i += 1) {
                var currentSuggestion = allSuggestions[i];

                if (!filteredSuggestions[currentSuggestion.toLowerCase()]) {
                    filteredSuggestions[currentSuggestion.toLowerCase()] = currentSuggestion;
                }
            }

            suggestionsList.innerHTML = '';
            li.setAttribute('class', 'suggestion');
            li.style.display = 'none';

            for (var key in filteredSuggestions) {
                var currentLi = li.cloneNode(true);
                var currentAnchor = anchor.cloneNode(true);

                currentAnchor.innerHTML = filteredSuggestions[key];
                currentLi.appendChild(currentAnchor);
                suggestionsList.appendChild(currentLi);
            }
        }

        function showSuggestions() {
            input.addEventListener('input', function (event) {
                var liElements = Array.prototype.slice.call(suggestionsList.childNodes, 0).filter(function (element) {
                    return element.nodeName !== '#text';
                });
                var text = event.target.value;

                for (var i = 0; i < liElements.length; i += 1) {
                    var currentLi = liElements[i];

                    if (currentLi.firstChild.innerHTML.toLowerCase().indexOf(text.toLowerCase()) === -1 || text === '') {
                        currentLi.style.display = 'none';
                    } else if(currentLi.firstChild.innerHTML.toLowerCase().indexOf(text.toLowerCase()) !== -1) {
                        currentLi.style.display = 'block';
                    }
                }
            });
        }

        function clickSugegstion() {
            suggestionsList.addEventListener('click', function (event) {
                var target = event.target;

                if (target.nodeName === 'LI' || target.nodeName === 'A') {
                    input.value = target.innerHTML;
                }
            });
        }

        addSuggestionToTheList();
        appendSuggestions();
        showSuggestions();
        clickSugegstion();
    };
}