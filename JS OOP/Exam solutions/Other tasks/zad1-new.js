function solve() {

    let uniquePlayerID = 0,
        uniquePlaylistID = 0,
        uniquePlayableID = 0;

    function validateString(value) {
        if (value.length < 3 || value.length > 25) {
            throw new Error('String is not in range 3-25 symbols!');
        }
    }

    class Player {
        constructor(name) {
            this.name = name;
            this._playlists = [];
            this._id = ++uniquePlayerID;
        }

        get id() {
            return this._id;
        }

        get playlists() {
            return this._playlists;
        }

        get name() {
            return this._name;
        }
        set name(value) {
            validateString(value);
            this._name = value;
        }

        addPlaylist(playlistToAdd) {
            if (!(playlistToAdd instanceof PlayList)) {
                throw new Error('The input item is not of type Playlist!');
            }

            this._playlists.push(playlistToAdd);
            return this;
        }

        getPlaylistById(id) {
            let playlist = null;

            for (let item of this.playlists) {
                if (item.id === id) {
                    playlist = item;
                    break;
                }
            }
            return playlist;
        }

        removePlaylist(obj) {
            var len = this.playlists.length,
                indexToRemove;

            obj = typeof obj === 'object' ? obj.id : obj;

            let playlistToRemove = null;

            for (var i = 0; i < len; i += 1) {
                if (this.playlists[i].id === obj) {

                    playlistToRemove = this.playlists[i];
                    break;
                }
            }

            indexToRemove = this.playlists.indexOf(playlistToRemove);
            this._playlists.splice(indexToRemove, 1);

            if (!playlistToRemove) {
                throw new Error('No such playable in the list to remove!');
            }

            return this;
        }

        listPlaylists(page, size){
            let playlistList = [];

            if (page < 0) {
                throw new Error('Page cannot be a negative number!');
            }

            if (size <= 0) {
                throw new Error('Size cannot be zero or a negative number!');
            }

            if (this.playlists.length < page * size) {
                throw new Error('Multiplication has a value bigger than the playlists length!');
            }

            size = size > this.playlists.length ? this.playlists.length : size;

            this.playlists
                .sort((a, b) => a.name - b.name)
                .sort((a, b) => a.id - b.id);

            let startIndex = page * size;
            for (let i = 0; i < size; i += 1) {
                let index = startIndex + i;

                if (this.playlists[index]) {
                    playlistList.push(this.playlists[index]);
                } else {
                    break;
                }
            }

            return playlistList;
        }

        // Input string playable and playlist ( title or name )
        contains(playable, playlist) {
            for (let item of this.playlists) {
                if (item.name === playlist) {
                    for (let songs of item.playables) {
                        if (songs.title === playable) {
                            return true;
                        }
                    }
                    return false;
                }
            }
        }

        search(pattern) {
            let matchingPlaylists = [];

            for (let lists of this.playlists) {
                for (let song of lists.playables) {
                    if (song.title.includes(pattern.toLowerCase())) {
                        let list = {};
                        list.name = lists.name;
                        list.id = lists.id;

                        matchingPlaylists.push(list);
                        break;
                    }
                }
            }

            return matchingPlaylists;
        }
    }

    class PlayList {
        constructor(name) {
            this.name = name;
            this._id = ++uniquePlaylistID;
            this._playables = [];
        }

        get playables() {
            return this._playables;
        }

        get id() {
            return this._id;
        }

        get name() {
            return this._name;
        }
        set name(value) {
            validateString(value);
            this._name = value;
        }

        addPlayable(playable) {
            // if (!(playable instanceof Playable)) {
            //     throw new Error('Element to add is not of type Playable!');
            // }

            this._playables.push(playable);
            return this;
        }

        getPlayableById(id) {
            let playable = null;

            for (let item of this.playables) {
                if (item.id === id) {
                    playable = item;
                    break;
                }
            }
            return playable;
        }

        removePlayable(obj) {
            var len = this.playables.length,
                indexToRemove;

            obj = typeof obj === 'object' ? obj.id : obj;

            let playableToRemove = null;

            for (var i = 0; i < len; i += 1) {
                if (this.playables[i].id === obj) {

                    playableToRemove = this.playables[i];
                    break;
                }
            }

            indexToRemove = this.playables.indexOf(playableToRemove);
            this._playables.splice(indexToRemove, 1);

            if (!playableToRemove) {
                throw new Error('No such playable in the list to remove!');
            }

            return this;
        }

        listPlayables(page, size) {

            let playablesList = [];

            if (page < 0) {
                throw new Error('Page cannot be a negative number!');
            }

            if (size <= 0) {
                throw new Error('Size cannot be zero or a negative number!');
            }

            if (this.playables.length < page * size) {
                throw new Error('Multiplication has a value bigger than the playables length!');
            }

            size = size > this.playables.length ? this.playables.length : size;

            this.playables
                .sort((a, b) => a.title - b.title)
                .sort((a, b) => a.id - b.id);

            let startIndex = page * size;
            for (let i = 0; i < size; i += 1) {
                let index = startIndex + i;

                if (this.playables[index]) {
                    playablesList.push(this.playables[index]);
                } else {
                    break;
                }
            }

            return playablesList;
        }
    }

    class Playable {
        constructor(title, author) {
            this.title = title;
            this.author = author;
            this._id = ++uniquePlayableID;
        }

        get id() {
            return this._id;
        }

        get title() {
            return this._title;
        }
        set title(value) {
            validateString(value);
            this._title = value;
        }

        get author() {
            return this._author;
        }
        set author(value) {
            validateString(value);
            this._author = value;
        }

        play() {
            let playString = `[${this.id}]. [${this.title}] - [${this.author}]`;
            return playString;
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
        set length(value) {
            if (value.length <= 0) {
                throw new Error('Length of audio should be greater than 0!');
            }

            this._length = value;
        }

        play() {
            let playString = super.play() + `- [${this.length}]`;
            return playString;
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
        set imdbRating(value) {
            if (value < 1 || value > 5) {
                throw new Error('IMDB rating should be in range 1-5!');
            }

            this._imdbRating = value;
        }

        play() {
            let playString = super.play() + `- [${this.imdbRating}]`;
            return playString;
        }
    }

    return {
        getPlayer: function (name) {
            let player = new Player(name);

            return player;
        },
        getPlaylist: function (name) {
            let playlist = new PlayList(name);

            return playlist;
        },
        getAudio: function (title, author, length) {
            let audio = new Audio(title, author, length);

            return audio;
        },
        getVideo: function (title, author, imdbRating) {
            let video = new Video(title, author, imdbRating);

            return video;
        }
    }
}

module.exports = solve;