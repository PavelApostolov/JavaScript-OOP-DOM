function solve() {

    let validator = (() => {
        let uniquePlayableID = 0,
            uniquePlayerID = 0,
            uniquePlaylistID = 0;

        return {
            uniquePlayableID,
            uniquePlayerID,
            uniquePlaylistID,
            validateString(text) {
                if (text.length < 3 || text.length > 25) {
                    throw new Error('Invalid string length!');
                }
            }
        }
    })();

    class Player {
        constructor(name) {
            this.name = name;
            this._playlists = [];
            this._id = ++validator.uniquePlayerID;
        }

        get playlists() {
            return this._playlists;
        }

        get id() {
            return this._id;
        }

        get name() {
            return this._name;
        }
        set name(value) {
            validator.validateString(value);
            this._name = value;
        }

        addPlaylist(playlist) {
            this.playlists.push(playlist);
            return this;
        }

        getPlaylistById(id) {
            let foundPlaylists = this.playlists.filter(x => x.id === id)[0] || null;
            return foundPlaylists;
        }

        removePlaylist(obj) {
            if (typeof obj === 'object') {
                this.removePlaylist(obj.id);
                return;
            }

            let playlistToRemove = this.playlists.filter(x => x.id === obj)[0],
                removeIndex = this.playlists.indexOf(playlistToRemove);

            if (removeIndex !== 0 && (!playlistToRemove || !removeIndex)) {
                throw new Error('Item to remove not found!');
            }

            this.playlists.splice(removeIndex, 1);

            return this;
        }

        listPlaylists(page, size){
            let playlistCount = this.playlists.length,
                pageSizeProduct = page * size;

            if (pageSizeProduct > playlistCount || page < 0 || size <= 0) {
                throw new Error('Invalid input ( page/size )!');
            }

            size = pageSizeProduct + size > playlistCount ? playlistCount - pageSizeProduct : size;

            let sortedPlaylists = this.playables
                .sort((a, b) => a.name - b.name)
                .sort((a, b) => a.id - b.id);

            let startIndex = pageSizeProduct,
                endIndex = pageSizeProduct + size,
                listedPlaylists = [];

            for (var i = startIndex; i < endIndex; i += 1) {
                listedPlaylists.push(sortedPlaylists[i]);
            }

            return listedPlaylists;
        }

        contains(playable, playlist) {
            let contains = false,
                playlistToSearchIn = this.playlists.filter(x => x.name === playlist)[0].playables;

            playlistToSearchIn.filter((p) => {
                if (p.name === playable) {
                    contains = true;
                    return;
                }
            });

            return contains;
        }

        search(pattern) {
            let playlists = this.playlists.filter((p) => {
                return p.playables.some(x => x.title.includes(pattern));
            });

            return playlists;
        }
    }

    class PlayList {
        constructor(name) {
            this.name = name;
            this._playables = [];
            this._id = ++validator.uniquePlaylistID;
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
            validator.validateString(value);
            this._name = value;
        }

        addPlayable(playable) {
            this.playables.push(playable);
            return this;
        }

        getPlayableById(id) {
            let foundPlayable = this.playables.filter(x => x.id === id)[0] || null;
            return foundPlayable;
        }

        removePlayable(obj) {
            if (typeof obj === 'object') {
                this.removePlayable(obj.id);
                return;
            }

            let playableToRemove = this.playables.filter(x => x.id === obj)[0],
                removeIndex = this.playables.indexOf(playableToRemove);

            if (removeIndex !== 0 && (!playableToRemove || !removeIndex)) {
                throw new Error('Item to remove not found!');
            }

            this.playables.splice(removeIndex, 1);

            return this;
        }

        listPlayables(page, size) {
            let playableCount = this.playables.length,
                pageSizeProduct = page * size;

            if (pageSizeProduct > playableCount || page < 0 || size <= 0) {
                throw new Error('Invalid input ( page/size )!');
            }

            size = pageSizeProduct + size > playableCount ? playableCount - pageSizeProduct : size;

            let sortedPlayables = this.playables
                .sort((a, b) => a.title - b.title)
                .sort((a, b) => a.id - b.id);

            let startIndex = pageSizeProduct,
                endIndex = pageSizeProduct + size,
                listedPlayables = [];

            for (var i = startIndex; i < endIndex; i += 1) {
                listedPlayables.push(sortedPlayables[i]);
            }

            return listedPlayables;
        }
    }

    class Playable {
        constructor(title, author) {
            this.title = title;
            this.author = author;
            this._id = ++validator.uniquePlayableID;
        }

        get id() {
            return this._id;
        }

        get title() {
            return this._title;
        }
        set title(value) {
            validator.validateString(value);
            this._title = value;
        }

        get author() {
            return this._author;
        }
        set author(value) {
            validator.validateString(value);
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
            if (value < 1) {
                throw new Error('Length must be greater than 0!');
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
                throw new Error('IMDB rating should be between 1 and 5!');
            }
            this._imdbRating = value;
        }

        play() {
            let playString = super.play() + `- [${this.imdbRating}]`;
            return playString;
        }
    }

    return {
        getPlayer(name) {
            let player = new Player(name);
            return player;
        },
        getPlaylist(name) {
            let playlist = new PlayList(name);
            return playlist;
        },
        getAudio(title, author, length) {
            let audio = new Audio(title, author, length);
            return audio;
        },
        getVideo(title, author, imdbRating) {
            let video = new Video(title, author, imdbRating);
            return video;
        }
    }
}

module.exports = solve;