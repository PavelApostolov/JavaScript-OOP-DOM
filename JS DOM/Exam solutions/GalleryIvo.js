$.fn.gallery = function (columnsPerRow){
    columnsPerRow = columnsPerRow || 4;

    var $gallery = this;
    var $selected = $gallery.children('.selected');
    var $galleryList = $gallery.children('.gallery-list')
    var $imageConrainers = $galleryList.children('.image-container'); //$this.find
    var $currentImage = $selected.find('#current-image');
    var $previousImage = $selected.find('#previous-image');
    var $nextImage = $selected.find('#next-image');

    $imageConrainers.each(function(index, element){
        if (index % columnsPerRow == 0){
            $(element).addClass('clearfix');
        }
    });

    $galleryList.on('click', 'img', function(){
        var $this = $(this);
        $galleryList.addClass('blurred');
        $('<div />').addClass('disabled-background').appendTo($gallery);            
        applySelected($this);
        $selected.show();
    });

    $currentImage.on('click', function(){
        $galleryList.removeClass('blurred');
        $selected.hide()
        $gallery.children('.disabled-background').remove();
    });

    $previousImage.on('click', function() {
        var $this = $(this);
        applySelected($this);
    });

    $nextImage.on('click', function(){
        var $this = $(this);
        applySelected($this);
    });

    $gallery.addClass('gallery');
    $selected.hide();

    function applySelected($element){
        var currentImageInfo = getImageInformation($element);
        setImageInformatuin($currentImage, currentImageInfo.src, currentImageInfo.index);
        var previousIndex = getPreviousIndex(currentImageInfo.index);
        var nextIndex = getNextIndex(currentImageInfo.index);
        var previousImage = getImageByIndex(previousIndex);
        var nextImage = getImageByIndex(nextIndex);
        var previousImageInfo = getImageInformation(previousImage);
        var nextImageInfo = getImageInformation(nextImage);
        setImageInformatuin($previousImage, previousImageInfo.src, previousImageInfo.index);
        setImageInformatuin($nextImage, nextImageInfo.src, nextImageInfo.index);
    }

    function getImageInformation($element){
        return{
            src: $element.attr('src'),
            index: parseInt($element.attr('data-info'))
        }:
    }

    function getImageByIndex(index){
        return $gallery.find('img[data-info = "' + index + '"]');
    }
    
    function setImageInformatuin($element, src, index){
        $element.attr('src', src);
        $element.attr('data-info', index);
    }

    function getNextIndex(index){
        index ++;
        if(index > $imageConrainers.length){
            index = 1;
        }
        return index;
    }

    function getPreviousIndex(index){
        index --;
        if(index < 1) {
            index = $imageConrainers.length;
        }
        return index;
    }

    return this;
};