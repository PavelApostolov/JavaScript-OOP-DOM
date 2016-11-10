var root = document.querySelector(selector)

var left = document.createElement('div');
var right = document.createElement('div');
left.className += ' image-preview';
left.style.width = '60%';
right.style.width = '18%';
left.style.float = 'left';
right.style.float = 'left';

//Left
var bigTitle = document.createElement('h1');
bigTitle.innerHTML = items[0].bigTitle;
left.appendChild(bigTitle);

var bigImg = document.createElement('img');
bigImg.src = items[0].url;
bigImg.width = 400;
left.appendChild(bigImg);

//Filter search
var filterLabel = document.createElement('label');
filterLabel.innerHTML = 'Filter';
var id = 'input-id-' + Math.random();
filterLabel.setAttribute('for', id);
var filterInput = document.createElement('input');
filterInput.id = id;

filterInput.addEventListener('input', function (ev) {
    var pattern = this.value.toLowerCase();
    var titles = imagesList.querySelectorAll('strong')
    var i,
        len;
    for (i = 0, len = titles.length; i < len; i++) {
        var isPatternFound = titles[i].innerHTML.toLowerCase()
        .indexOf(pattern) >=0;
        if (isPatternFound) {
           titles[i].parentNode.style.display = ''; 
        }
        else{
           titles[i].parentNode.style.display = 'none'; 
        }
    }
})

right.appendChild(filterInput);
right.appendChild(filterLabel);

//Right list of images
var imagesList = document.createElement('div');

imagesList.style.overflowY = 'scroll';
imagesList.style.height = '400px';
right.appendChild(imagesList);
items.forEach(function(item) {
    var title = document.createElement('strong');
    title.innerHTML = item.title;
    title.style.display = 'block';

    var img = document.createElement('img');
    img.src = item.url;
    img.width = 150;

    var container = document.createElement('div');
    container.className += ' image-container';
    container.style.textAlign = 'center';

    container.appendChild(title);
    container.appendChild(img);
    imagesList.appendChild(container);
});

//Right images hover
imagesList.addEventListener('mouseover', function (ev) {
    var target = ev.target;
    while (target.className.indexOf('image-container') < 0) {
        target = target.parentNode;
    }
    target.style.background = 'pink';
});

imagesList.addEventListener('mouseout', function (ev) {
        var target = ev.target;
    if (target.className.indexOf('image-container') < 0) {
        return;
    }
    target.style.background = '';
});

imagesList.addEventListener('click', function (ev) {
    var target = ev.target;
    while (target.className.indexOf('image-container') < 0) {
    target = target.parentNode;
    }   
    var img = target.querySelector('img');
    var title = target.querySelector('strong');
    bigImg.src = img.src;
    bigTitle.innerHTML = title.innerHTML;
});

root.appendChild(left);
root.appendChild(right);