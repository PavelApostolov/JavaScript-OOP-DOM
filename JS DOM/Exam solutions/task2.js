function solve() {
    return function (fileContentsByName) {
        var allFileItems = $('.file-item');
        var aside = $('.file-preview');
        var asideContent = aside.find('.file-content');
        var allDirectories = $('.dir-item');

        var entityMap = {
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': '&quot;',
            "'": '&#39;',
            "/": '&#x2F;'
        };

        function escapeHtml(string) {
            return String(string).replace(/[&<>"'\/]/g, function (s) {
                return entityMap[s];
            });
        }

        function showItemsInAside() {
            allFileItems.on('click', function () {
                var $this = $(this);
                var fileName = $this.children('a').first().text();

                var escaped = escapeHtml(fileContentsByName[fileName]);

                asideContent.empty();
                asideContent.html(escaped);
            });
        }

        function toggleDirectory() {
            allDirectories.on('click', function () {
                var $this = $(this);

                if ($this.hasClass('collapsed')) {
                    $this.removeClass('collapsed');
                } else if (!$this.hasClass('collapsed')) {
                    $this.addClass('collapsed');
                }
            });
        }

        function removeItem() {
            $('.file-explorer').on('click', '.del-btn', function () {
                var $this = $(this);

                if ($this.parent().hasClass('dir-item')) {
                    $this.parent().remove();
                } else if ($this.parent().hasClass('file-item')) {
                    $this.parent().remove();
                }
            });
        }

        function createFile(fileName) {
            var li = $('<li />').addClass('file-item item');
            var itemName = $('<a />').addClass('item-name').html(fileName);
            var delBtn = $('<a />').addClass('del-btn');

            itemName.appendTo(li);
            delBtn.appendTo(li);

            return li;
        }

        function addItem() {
            $('.add-btn').on('click', function () {
                var $this = $(this);

                $this.removeClass('visible');
                $this.next().addClass('visible');
            });

            $('.file-explorer').on('keydown', function (e) {
                if (e.keyCode === 13) {
                    var text = $('input').val();
                    var fileName;

                    if (text.indexOf('/') !== -1) {
                        var textTokens = text.split('/');
                        var dirName = textTokens[0];
                        fileName = textTokens[1];
                        var dirToPlaceIn;
                        var children = allDirectories.children('.item-name');

                        for (var i = 0; i < children.length; i += 1) {
                            var currentName = $(children[i]).text();

                            if (currentName.toLowerCase() === dirName.toLowerCase()) {
                                dirToPlaceIn = $(children[i]).parent();
                            }
                        }

                        if (dirToPlaceIn) {
                            dirToPlaceIn.find('.items').append(createFile(fileName));
                        }
                    } else {
                        fileName = text;

                        $('.file-explorer').children('.items').append(createFile(fileName));
                    }
                }
            });
        }

        showItemsInAside();
        toggleDirectory();
        removeItem();
        addItem();
    }
}

if (typeof module !== 'undefined') {
    module.exports = solve;
}