function solve() {
    let module = (function () {
        let validator,
            CONSTANTS = {
                MIN_POSITIVE_NUMBER: 1,
                MIN_TEXT_LENGTH: 3,
                MAX_TEXT_LENGTH: 25,
                MAX_RATING_NUM: 5,
                OPT_NAME: 'Value'

            },
            ERR_MSGS = {
                UNDEFINED: ' must not be an undefined',
                NULL: ' must not be null',
                OBJ: ' must be an object',
                STRING: ' must be a string',
                NUM: ' must be a number',
                RANGE: ' must be in a range ',
                POSITIVE_NUM: ' must be a positive number',
                NON_NEGATIVE_NUM: ' must be a non negative number',
                COUNT_PLAYABLES: 'Count of playables is less than wanted to show',
                PlAYLIST: ' must be an instance of Playlist'
            };

        function sortByTwoParams(firstParam, secondParam) {
            validator.validateIfUndefined(firstParam, 'First parameter for sorting');
            validator.validateIfUndefined(secondParam, 'Second parameter for sorting');

            return function (first, second) {
                if (first[firstParam] < second[firstParam]) {
                    return - 1;
                }
                else if (first[firstParam] > second[firstParam]) {
                    return 1;
                }

                if (first[secondParam] < second[secondParam]) {
                    return - 1;
                }
                else if (first[secondParam] > second[secondParam]) {
                    return 1;
                }
                else {
                    return 0;
                }
            };
        }

        function getElOfCollectionByInd(collection, ind) {
            if (ind < 0) {
                return null;
            }
            else {
                return collection[ind];
            }
        }

        function getId(val) {
            if (typeof val === 'number') {
                return val;
            }
            else {
                return val.id;
            }
        }

        function checkForIndexOfElementInCollectionByID(collection, id) {
            var i, len;

            for (i = 0, len = collection.length; i < len; i += 1) {
                var currEl = collection[i];
                if (currEl.id === id) {
                    return i;
                }
            }

            return -1;
        }

        validator = {
            validateIfUndefined: function (val, name) {
                name = name || CONSTANTS.OPT_NAME;
                if (val === undefined) {
                    throw new Error(name + ERR_MSGS.UNDEFINED);
                }
            },
            validateIfNull: function (val, name) {
                name = name || CONSTANTS.OPT_NAME;

                if (val === null) {
                    throw new Error(name + ERR_MSGS.NULL);
                }
            },
            validateIfObject: function (val, name) {
                name = name || CONSTANTS.OPT_NAME;
                this.validateIfUndefined(val, name);

                if (typeof val !== 'object') {
                    throw new Error(name + ERR_MSGS.OBJ);
                }
            },
            validateIfValidString: function (val, name) {
                name = name || CONSTANTS.OPT_NAME;
                this.validateIfUndefined(val, name);

                if (typeof val !== 'string') {
                    throw new Error(name + ERR_MSGS.STRING);
                }
            },
            validateIfValidText: function (val, name) {
                name = name || CONSTANTS.OPT_NAME;

                this.validateIfUndefined(val, name);
                this.validateIfValidString(val, name);
                this.validateIfValidTextLengthInRange(val, name);
            },
            validateIfValidTextLengthInRange: function (val, name) {
                name = name || CONSTANTS.OPT_NAME;

                if (val.length < CONSTANTS.MIN_TEXT_LENGTH || CONSTANTS.MAX_TEXT_LENGTH < val.length) {
                    throw new Error(name + ERR_MSGS.RANGE + CONSTANTS.MIN_TEXT_LENGTH + ' and ' + CONSTANTS.MAX_TEXT_LENGTH);
                }
            },
            validateIfNumber(val, name) {
                name = name || CONSTANTS.OPT_NAME;

                this.validateIfUndefined(val, name);

                if (typeof val !== 'number') {
                    throw new Error(name + ERR_MSGS.NUM);
                }
            },
            validateIfNonNegativeNumber: function (val, name) {
                name = name || CONSTANTS.OPT_NAME;
                this.validateIfNumber(val, name);

                if (val < 0) {
                    throw new Error(name + ERR_MSGS.NON_NEGATIVE_NUM);
                }
            },
            validateIfPositiveNumber: function (val, name) {
                name = name || CONSTANTS.OPT_NAME;

                this.validateIfNumber(val, name);

                if (val < CONSTANTS.MIN_POSITIVE_NUMBER) {
                    throw new Error(name + ERR_MSGS.POSITIVE_NUM);
                }
            },
            validateIfPositiveNumberInRange(val, max, name) {
                name = name || CONSTANTS.OPT_NAME;
                this.validateIfPositiveNumber(val, name);

                if (val < CONSTANTS.MIN_POSITIVE_NUMBER || max < val) {
                    throw new Error(name + ERR_MSGS.RANGE + CONSTANTS.MIN_POSITIVE_NUMBER + ' and ' + max);
                }
            },
            validatePageAndSize: function (page, size, length) {
                this.validateIfNonNegativeNumber(page, 'Page');
                this.validateIfPositiveNumber(size, 'Size');

                if (page * size > length) {
                    throw new Error(ERR_MSGS.COUNT_PLAYABLES);
                }
            },
            validateIfObjectWithID: function (value, name) {
                name = name || CONSTANTS.OPT_NAME;
                this.validateIfObject(value, name);
                this.validateIfUndefined(value.id);
            },
            validateIfPlaylist: function (value, name) {
                this.validateIfObjectWithID(value, name);

                if (!Array.isArray(value._playables)) {
                    throw new Error(name + ERR_MSGS.PlAYLIST);
                }
            }

        };

        let playable = (function () {
            let currIdPlayable = 0;

            class Playable {
                constructor(title, author) {
                    this.title = title;
                    this.author = author;
                    this._id = ++currIdPlayable;
                }

                get title() {
                    return this._title;
                }

                set title(value) {
                    validator.validateIfValidText(value, 'Title of the playable');
                    validator.validateIfValidTextLengthInRange(value, 'Lenght of Title of the playable');
                    this._title = value;
                }

                get author() {
                    return this._author;
                }

                set author(value) {
                    validator.validateIfValidText(value, 'Author of the playble');
                    validator.validateIfValidTextLengthInRange(value, 'Length of author of the playable');
                    this._author = value;
                }

                get id() {
                    return this._id;
                }

                play() {
                    let result = `[${this._id}]. [${this.title}] - [${this.author}]`;
                    return result;
                }
            }

            return Playable;
        })();

        let audio = (function () {
            class Audio extends playable {
                constructor(title, author, length) {
                    super(title, author);
                    this.length = length;
                }

                get length() {
                    return this._length;
                }

                set length(value) {
                    validator.validateIfPositiveNumber(value, 'Length of the audio');
                    this._length = value;
                }

                play() {
                    let result = super.play() + ` [${this.length}]`;
                    return result;
                }
            }

            return Audio;
        })();

        let video = (function () {
            class Video extends playable {
                constructor(title, author, imdbRating) {
                    super(title, author);
                    this.imdbRating = imdbRating;
                }

                get imdbRating() {
                    return this._imdbRating;
                }

                set imdbRating(value) {
                    validator.validateIfPositiveNumberInRange(
                        value,
                        CONSTANTS.MAX_RATING_NUM,
                        'Imdb rating of the video');
                    this._imdbRating = value;
                }
            }

            return Video;
        })();

        let NameIdMixin = (function () {
            let currMixinId = 0;

            let nameIdMixin = Base => class extends Base {
                constructor(name) {
                    super();
                    this.name = name;
                    this._id = ++currMixinId;
                }

                get name() {
                    return this._name;
                }

                set name(value) {
                    validator.validateIfValidText(value, "Name");
                    this._name = value;
                }

                get id() {
                    return this._id;
                }
            };

            return nameIdMixin;
        })();


        let playlist = (function () {
            let currIdPlaylist = 0;

            class Playlist extends NameIdMixin(Object) {
                constructor(name) {
                    super(name);
                    this._playables = [];
                }

                addPlayable(playable) {
                    validator.validateIfObjectWithID(playable, 'Playable to add');
                    this._playables.push(playable);

                    return this;
                }

                getPlayableById(id) {
                    validator.validateIfPositiveNumber(id);
                    let playableToShow = this._playables.find(playable => playable.id === id);

                    return playableToShow || null;
                }

                removePlayable(value) {
                    validator.validateIfUndefined(value, 'Removing pass value');
                    let playableId = getId(value);
                    let playableToRemove = this.getPlayableById(playableId);

                    validator.validateIfNull(playableToRemove);
                    let playableToRemoveInd = this._playables.indexOf(playableToRemove);
                    this._playables.splice(playableToRemoveInd, 1);

                    return this;
                }

                listPlayables(page, size) {
                    validator.validateIfNonNegativeNumber(page, 'Page for listing');
                    validator.validateIfPositiveNumber(size, 'Size for listing');
                    if (page * size > this._playables.length) {
                        throw new Error('Page * Size less than or equal to Playlist count');
                    }

                    let playablesToShow = this._playables
                        .slice()
                        .sort(sortByTwoParams('title', 'id'))
                        .slice(page * size, (page * size) + size);

                    return playablesToShow;
                }
            }

            return Playlist;
        })();

        let player = (function () {
            class Player extends NameIdMixin(Object) {
                constructor(name) {
                    super(name);
                    this._playlists = [];
                }

                addPlaylist(playlistToAdd) {
                    validator.validateIfPlaylist(playlistToAdd);
                    this._playlists.push(playlistToAdd);

                    return this;
                }

                getPlaylistById(id) {
                    validator.validateIfPositiveNumber(id);
                    let playlistToShow = this._playlists.find(playlist => playlist.id === id);

                    return playlistToShow || null;
                }

                removePlaylist(value) {
                    validator.validateIfUndefined(value, 'Removing pass value');
                    let playlistId = getId(value);
                    let playListToRemove = this.getPlaylistById(playlistId);

                    validator.validateIfNull(playListToRemove);
                    let playlistToRemoveInd = this._playlists.indexOf(playListToRemove);
                    this._playlists.splice(playlistToRemoveInd, 1);

                    return this;
                }

                listPlaylists(page, size) {
                    validator.validateIfNonNegativeNumber(page, 'Page for listing');
                    validator.validateIfPositiveNumber(size, 'Size for listing');
                    if (page * size > this._playlists.length) {
                        throw new Error('Page * Size less than or equal to count of playlists in player');
                    }

                    let playlistsToShow = this._playlists
                        .slice()
                        .sort(sortByTwoParams('name', 'id'))
                        .slice(page * size, page * size + size);
                }

                contains(playable, playlist) {
                    validator.validateIfObjectWithID(playable, 'Playable for searching');
                    validator.validateIfPlaylist(playlist, 'Playlist for searchig in');

                    let ifContains = this._playlists
                        .some(plist => plist._playables.some(pable => pable === playable));

                    return ifContains;
                }

                search(pattern) {
                    validator.validateIfValidString(pattern, 'Search pattern');

                    let playlistsToShow = this._playlists
                        .filter(playlist => playlist._playables.some(playable => playable.title.toLowerCase().indexOf(pattern.toLowerCase()) >= 0))
                        .map(plist => {
                            return {
                                id: plist.id,
                                title: plist.name
                            };
                        });

                    return playlistsToShow;
                }
            }

            return Player;
        })();


        return {
            getPlayer: function (name) {
                return new player(name);
            },
            getPlaylist: function (name) {
                return new playlist(name);
            },
            getAudio: function (title, author, length) {
                return new audio(title, author, length);
            },
            getVideo: function (title, author, imdbRating) {
                return new video(title, author, imdbRating);
            }
        };
    } ());

    return module;
}

module.exports = solve;