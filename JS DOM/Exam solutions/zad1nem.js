/* globals document, window, console */
 
function solve() {
    return function(selector, initialSuggestions) {
        var root = document.querySelector(selector),
            fragment = document.createDocumentFragment(),
            list = document.querySelector('.suggestions-list'),
            suggestions = document.getElementsByClassName('suggestion'),
            input = document.getElementsByClassName('tb-pattern')[0],
            button = document.getElementsByClassName('btn-add')[0];
 
        function checkIfDuplicate(currentSuggestion) {
                for(var i = 0, len = suggestions.length; i < len; i += 1) {
                    if(currentSuggestion != undefined) {
                        if(currentSuggestion.toLowerCase() === suggestions[i].getElementsByTagName('a')[0].innerHTML.toLowerCase()) {
                            return true;
                        }
                    }
                }
            }
 
            function createLi(suggestion) {
                var li = document.createElement('li'),
                    a = document.createElement('a');
                li.className = 'suggestion';
                li.style.display = 'none';
                a.className = 'suggestion-link';
                a.innerHTML = suggestion;
                li.appendChild(a);
                list.appendChild(li);
            }
 
 
        if(initialSuggestions != undefined) {
            for (var i = 0, len = initialSuggestions.length; i < len; i += 1) {
                var currentSuggestion = initialSuggestions[i];
 
                if(i === 0) {
                   createLi(currentSuggestion);
                }
                else {
                    var duplicated = checkIfDuplicate(currentSuggestion);
                    if(!duplicated) {
                        createLi(currentSuggestion);
                    }
                }
            }
        }
 
        list.addEventListener('click', function (event) {
            var target = event.target;
           
                if(target.className === 'suggestion-link') {
                    input.value = target.innerHTML;
                }
                if(target.className === 'suggestion') {
                    input.value = target.firstChild.innerHTML;
                }
        });
 
        input.addEventListener('input', function () {
            var searchVal = input.value.toLowerCase();
           
            for(var i = 0, len = suggestions.length; i < len; i += 1) {
                var text = suggestions[i].getElementsByTagName('a')[0].innerHTML.toLowerCase();
               
                if(searchVal.length === 0) {
                    suggestions[i].style.display = 'none'
                }
                else {
                    if (text.indexOf(searchVal) < 0) {
                        suggestions[i].style.display = 'none';
                    }
                    else {
                        suggestions[i].style.display = '';
                    }
                }
            }
        });
 
        button.addEventListener('click', function (ev) {
            if(input.value.length > 0) {
                var duplicated = checkIfDuplicate(input.value);
               
                if(!duplicated) {
                    createLi(input.value);
                }
 
                input.value = '';
                for(var i = 0, len = suggestions.length; i < len; i += 1) {
                    suggestions[i].style.display = 'none';
                }
            }
        });
 
        fragment.appendChild(list);
        root.appendChild(fragment);
    };
}

======================

function solve() {
    return function(selector, initialSuggestions) {

        var btnAdd = document.getElementsByClassName('btn-add');
        var inputText = document.getElementsByClassName('tb-pattern');
        var suggestedList = document.getElementsByClassName('suggestions-list');
        var suggestion = document.getElementsByClassName('suggestion');
  
        if (initialSuggestions) {


            var i,
                len;
            for (i = 0, len = initialSuggestions.length; i < len; i += 1) {
                var isContain = false;

                for (var element of suggestion) {
                    if (element.innerText.toLowerCase() === initialSuggestions[i].toLowerCase()) {
                        isContain = true;
                    }
                }

                if (!isContain) {
                    var newSuggestion = document.createElement('li');
                    var link = document.createElement('a');
                    link.innerText = initialSuggestions[i];
                    link.setAttribute('href', '#');
                    link.className = 'suggestion-link';
                    newSuggestion.appendChild(link);
                    newSuggestion.className = 'suggestion';
                    newSuggestion.style.display = 'none';
                    suggestedList[0].appendChild(newSuggestion);
                    suggestion = document.getElementsByClassName('suggestion');


                }
            }

        }


        btnAdd[0].addEventListener("click", function() {
            var isContain = false;
            suggestion = document.getElementsByClassName('suggestion');
            for (var element of suggestion) {
                if (element.innerText === inputText[0].value) {
                    isContain = true;
                }
            }
          
            if (!isContain) {
                var newSuggestion = document.createElement('li');
                var link = document.createElement('a');
                link.innerText = inputText[0].value;
                link.setAttribute('href', '#');
                link.className = 'suggestion-link';
                newSuggestion.appendChild(link);
                newSuggestion.className = 'suggestion';
                newSuggestion.style.display = 'none';
                suggestedList[0].appendChild(newSuggestion);
            }

        });

        suggestedList[0].addEventListener('click', function(e) {
            if (e.target && e.target.nodeName == 'A') {
                inputText[0].value = e.target.innerText;

                var pattern = e.target.innerText.toLowerCase();
                var titles = suggestedList[0].querySelectorAll('.suggestion');
                var i,
                    len;

                for (i = 0, len = titles.length; i < len; i += 1) {
                    var isPatternFound = titles[i].innerText
                        .toLowerCase()
                        .indexOf(pattern) >= 0;
                    if (isPatternFound) {
                        titles[i].style.display = 'block';
                    } else {
                        titles[i].style.display = 'none';

                    }
                }

            }

        }, false);

        inputText[0].addEventListener('input', function(ev) {
            var pattern = this.value.toLowerCase();
            var titles = suggestedList[0].querySelectorAll('.suggestion');
            var i,
                len;

            for (i = 0, len = titles.length; i < len; i += 1) {
                var isPatternFound = titles[i].innerText
                    .toLowerCase()
                    .indexOf(pattern) >= 0;
                if (isPatternFound) {
                    titles[i].style.display = 'block';
                } else {
                    titles[i].style.display = 'none';

                }
            }

            if (!this.value) {
                for (i = 0, len = titles.length; i < len; i += 1) {
                    titles[i].style.display = 'none';
                }
            }
        });

        var suggestionCount = document.querySelectorAll('.suggestion').length;
        console.log(suggestionCount);

    };
}


/* globals document, window, console */

function solve() {
    return function(selector, initialSuggestions) {

        var root = document.querySelector(selector),
            sugList = document.querySelector('.suggestions-list'),
            input = document.querySelector('.tb-pattern'),
            button = document.querySelector('.btn-add');

        function createList(e) {
            var sugLi = document.createElement('li');
            sugLi.className += ' suggestion';
            sugLi.style.display = 'none';
            var sug = document.createElement('a');
            sug.className += ' suggestion-link';
            sug.innerHTML = e;
            sug.setAttribute('href', '#');
            sugLi.appendChild(sug);
            return sugLi;
        }

        if (initialSuggestions) {

            var initial = initialSuggestions,
                i, e, len = initial.length;

            if (initial.length > 1) {
                for (i = 0; i < len; i++) {
                    for (e = 0; e < len; e++) {
                        if (initial[e] && initial[i] && initial[e].toLowerCase() === initial[i].toLowerCase() && (i != e)) {
                            delete initial[e];
                            if (initial.length <= 1) {
                                return;
                            }
                        }
                    }
                }
            }

            initial.forEach(function(element) {
                if (element) {
                    sugList.appendChild(createList(element));
                }
            });
        }

        input.addEventListener('input', function(ev) {

            var pattern = this.value.toLowerCase();
            var sugs = document.querySelectorAll('.suggestion-link');
            var i, len;

            for (i = 0, len = sugs.length; i < len; i++) {
                var isPatternFound = (sugs[i].innerHTML
                        .toLowerCase()
                        .indexOf(pattern) >= 0) &&
                    (pattern.length > 0);

                if (isPatternFound) {
                    sugs[i].parentNode.style.display = '';
                } else {
                    sugs[i].parentNode.style.display = 'none';
                }
            }
        });

        button.addEventListener('click', function(ev) {
            var target = ev.target,
                i,
                len;
            var ss = document.querySelectorAll('.suggestion-link');
            for (i = 0, len = ss.length; i < len; i++) {
                if (!ss[i] || ss[i].innerText.toLowerCase().trim() === input.value.toLowerCase().trim()) {
                    return;
                }
            }
            if (target.className.indexOf('btn-add') >= 0 && input.value.length > 0) {
                sugList.appendChild(createList(input.value));
            }
            input.value = '';
        });

        sugList.addEventListener('mouseover', function(ev) {
            var target = ev.target;
            if (target.className.indexOf('suggestion-link') < 0) {
                return;
            }
            target.style.cursor = "pointer";
        });

        sugList.addEventListener('click', function(ev) {
            var target = ev.target;
            if (target.className.indexOf('suggestion-link') < 0) {
                target = target.children;
            }
            input.value = target.innerHTML;
        });
    };
}

module.exports = solve;