function solve() {
    let currentPlayerId = 0,
        currentPlaylistId = 0,
        currentPlayableId = 0;

    function mySort(a, b) {
        if (a > b) {
            return 1;
        }
        else if (a < b) {
            return -1;
        }
        else {
            return 0;
        }
    }

    class Validator {

        static get constants() {
            return {
                MIN_STRING_NAME_LENGTH: 3,
                MAX_STRING_NAME_LENGTH: 25
            };
        }

        static checkIfUndefined(val, name) {
            name = name || 'Value';
            if (val === undefined) {
                throw new Error(`${name} cannot be undefined!`);
            }
        }

        static checkString(str, name) {
            name = name || 'Value';

            Validator.checkIfUndefined(str, name);

            if (typeof str !== 'string') {
                throw new Error(`${name} must be a string!`);
            }

            if (str.length < Validator.constants.MIN_STRING_NAME_LENGTH ||
                Validator.constants.MAX_STRING_NAME_LENGTH < str.length) {
                throw new Error(`${name} must be string between ${Validator.constants.MIN_STRING_NAME_LENGTH} and ${Validator.constants.MAX_STRING_NAME_LENGTH} symbols!`);
            }
        }

        static chekNumber(val, name, min, max) {
            name = name || 'Value';
            min = min || -(Math.max);
            max = max || Math.max;

            Validator.checkIfUndefined(val, name);

            if (typeof val !== 'number') {
                throw new Error(`${name} must be a number!`);
            }

            if (val < min || val > max) {
                throw new Error(`${name} must be between ${min} and ${max}`);
            }
        }
    }

    class Player {
        constructor(name) {
            this.id = ++currentPlayerId;
            this.name = name;
            this._playlists = [];
        }

        get name() {
            return this._name;
        }

        set name(val) {
            Validator.checkString(val, 'Player name');
            this._name = val;
        }

        addPlaylist(playlistToAdd) {
            if (playlistToAdd instanceof Playlist) {
                this._playlists.push(playlistToAdd);
            }
            else {
                throw new Error('playlistToAdd must be a Playlist instance!');
            }
            return this;
        }

        getPlaylistById(id) {
            let currentPlaylist = this._playlists.find(p => p.id === id) || null;

            return currentPlaylist;
        }

        removePlaylist(id) {
            if (typeof id !== 'number') {
                id = id.id;
            }

            if (!(this.getPlaylistById(id))) {
                throw new Error('Playlist with the provided id is not contained in the player!');
            }

            let indexOfPlaylist = this._playlists.findIndex(p => p.id === id);
            this._playlists.splice(indexOfPlaylist, 1);
        }

        listPlaylists(page, size) {
            if (page < 0) {
                throw new Error('Page must be 0 or greater number!');
            }

            if (size <= 0) {
                throw new Error('Size must be a positive numebr!');
            }

            let start = page * size,
                end = (page + 1) * size,
                currentPlaylists = [];

            if (start > this._playlists.length) {
                throw new Error('Page and size are greater than count of playlists in player!');
            }

            let sortedlist = this._playlists.sort((a, b) => mySort(a.name, b.name) || mySort(a.id, b.id));

            for (let i = start; i < end; i += 1) {
                if (sortedlist[i] === undefined) {
                    break;
                }

                currentPlaylists.push(sortedlist[i]);
            }
            return currentPlaylists;
        }

        contains(playable, playlist) {
            isContain = playlist.getPlayableById(playable.id);

            return isContain ? true : false;
        }

        search(pattern) {
            let currentPlaylists = [];

            for (let playlist of this._playlists) {
                if (playlist.find(p => p._title.indexOf(pattern) >= 0)) {
                    let output = {
                        name: playlist.name,
                        id: playlist.id
                    };

                    currentPlaylists.push(output);
                }
            }

            return currentPlaylists;
        }
    }

    class Playlist {
        constructor(name) {
            this.id = ++currentPlaylistId;
            this.name = name;
            this._playables = [];
        }

        get name() {
            return this._name;
        }

        set name(val) {
            Validator.checkString(val, 'Playlist name');
            this._name = val;
        }

        addPlayable(playable) {
            this._playables.push(playable);
            return this;
        }

        getPlayableById(id) {
            let currentPlayable = this._playables.find(p => p.id === id);
            currentPlayable = currentPlayable || null;
            return currentPlayable;
        }

        removePlayable(id) {
            if (typeof id !== 'number') {
                id = id.id;
            }

            if (!(this.getPlayableById(id))) {
                throw new Error('Playable with the provided id is not contained in the playlist!');
            }

            let indexOfPlayable = this._playables.findIndex(p => p.id === id);

            this._playables.splice(indexOfPlayable, 1);

            return this;
        }

        listPlayables(page, size) {
            if (page < 0) {
                throw new Error('Page must be 0 or greater number!');
            }

            if (size <= 0) {
                throw new Error('Size must be a positive numebr!');
            }

            let start = page * size,
                end = (page + 1) * size,
                playables = [];

            if (start > this._playables.length) {
                throw new Error('Page and size are greater than count of playlists in player!');
            }

            let sortedList = this._playables.sort((a, b) => mySort(a.title, b.title) || mySort(a.id, b.id));

            for (let i = start; i < end; i += 1) {
                if (sortedList[i] === undefined) {
                    break;
                }

                playables.push(sortedList[i]);
            }
            return playables;
        }
    }

    class Playable {
        constructor(title, author) {
            this.id = ++currentPlayableId;
            this.title = title;
            this.author = author;
        }

        get author() {
            return this._author;
        }

        set author(val) {
            Validator.checkString(val, 'Author');
            this._author = val;
        }

        get title() {
            return this._title;
        }

        set title(val) {
            Validator.checkString(val, 'Title');
            this._title = val;
        }

        play() {
            return `${this.id}. ${this.title} - ${this.author}`;
        }
    }

    class Audio extends Playable {
        constructor(title, author, length) {
            super(title, author);
            this.length = length;
        }

        get length() {
            return this._length;
        }

        set length(val) {
            Validator.chekNumber(val, 'Length', 1);
            this._length = val;
        }

        play() {
            return super.play() + ` - ${this.length}`;
        }
    }

    class Video extends Playable {
        constructor(title, author, imdbRating) {
            super(title, author);
            this.imdbRating = imdbRating;
        }

        get imdbRating() {
            return this._imdbRating;
        }

        set imdbRating(val) {
            Validator.chekNumber(val, 'imdbRating', 1, 5);
            this._imdbRating = val;
        }

        play() {
            return super.play() + ` - ${this.imdbRating}`;
        }
    }

    return {
        getPlayer: function (name) {
            return new Player(name);
        },
        getPlaylist: function (name) {
            return new Playlist(name);
        },
        getAudio: function (title, author, length) {
            return new Audio(title, author, length);
        },
        getVideo: function (title, author, imdbRating) {
            return new Video(title, author, imdbRating);
        }
    };
}

// var result = solve();

// var pl = result.getPlaylist('asd');

// var playable = { id: 1, name: 'Rock', author: 'Stephen' };
// pl.addPlayable(playable);
// console.log(pl.getPlayableById(1));

// console.log(pl.listPlayables(0, 10));
// pl.removePlayable(1);
// console.log(pl.getPlayableById(1));

// var list = result.getPlaylist('Rock');
// for (var i = 0; i < 35; i += 1) {
//     list.addPlayable({ id: (i + 1), name: 'Rock' + (9 - (i % 10)) });
// }

// console.log(list.listPlayables(0, 10));

// returnedPlayables = list.listPlayables(2, 10);
// returnedPlayables = list.listPlayables(3, 10);
// console.log(returnedPlayables);

module.exports = solve;