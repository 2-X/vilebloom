import PlayerAgent from "./PlayerAgent.js"


export default class HuluPlayerAgent extends PlayerAgent {
    constructor() {
        super("hulu", "Hulu", "https://www.hulu.com/");
    }

    isShow () {
        return window.location.href.includes("hulu.com/watch")
    }

    readyToAutoFullscreen () {
        // sometimes there is a warning or ad beforehand
        let videoWarningPlayer = document.getElementsByClassName("video-player intro-video-player")[0]
        if (videoWarningPlayer && videoWarningPlayer.readyState) {
            return videoWarningPlayer.readyState
        }

        // else it's just the normal player
        let player = this.getPlayer();
        return player && player.readyState;
    }

    // get rid of all existing UI elements
    hideExistingUI () {
        // hide main controls
        this.hideElementWhenItExists(() => { return document.getElementsByClassName("metadata-area__text keep-mouse-active")[0]; });
        this.hideElementWhenItExists(() => { return document.getElementsByClassName("controls-wrap")[0]; });
        this.hideElementWhenItExists(() => { return document.getElementsByClassName("up-next-wrap")[0]; });
        this.hideElementWhenItExists(() => { return document.getElementsByClassName("widgets-container")[0]; });
        this.hideElementWhenItExists(() => { let node = document.getElementsByClassName("content-container")[0]; if (node) {return node.parentNode}; });
    }

    // intercept the mouse clicks and keyboard events and CRUSH THEM
    disableInput () {
        
    }

    renderPyreUI () {
        this._renderPyreUI(() => {return document.getElementsByClassName("hulu-player-app")[0]});
    }

    disableAutoPlay () {
        // TODO doesn't stop autoplay :(
        // check every 50ms if the player is there until
        // it is and then disable autoplay
        // let checkingInterval = setInterval(() => {
        //     let player = this.getPlayer()
        //     if (player) {
        //         player._config.autoplay = false;
        //         player._autoplay = false;
        //         player._autoplaying = false;
        //         clearInterval(checkingInterval);
        //     }
        // }, 50);
    }

    bufferStart () {
        return this.getPlayer()._player.buffered.start(0);
    }

    bufferEnd () {
        return this.getPlayer()._player.buffered.end(0);
    }
    
    getPlayer () {
        if (!this.isShow()) {
            return undefined
        }

        let videoNode = document.getElementsByTagName("video")[0]
        if (videoNode) { return videoNode.__HuluDashPlayer__; }

        // Potential alternative: 
        // ReactInternal(document.getElementById("dash-player-container")).return.stateNode.props
    }
    
    getMilliseconds () {
        let player = this.getPlayer()
        if (!player) { return undefined }
    
        return player.currentTime * 1000
    }

    setPlaybackRate (value) {
        let player = this.getPlayer()
        if (!player) { return undefined }
    
        player.playbackRate = value
    }

    play () {
        let player = this.getPlayer()
        if (!player) { return undefined }

        player.play()
    }

    pause () {
        let player = this.getPlayer()
        if (!player) { return undefined }

        player.pause()
    }

    isPaused () {
        let player = this.getPlayer()
        if (!player) { return undefined }

        return player.paused
    }
    
    mute () {
        let player = this.getPlayer()
        if (!player) { return undefined }
    
        player.muted = true
    }
    
    unmute () {
        let player = this.getPlayer()
        if (!player) { return undefined }
    
        player.muted = false
    }

    isMuted () {
        let player = this.getPlayer()
        if (!player) { return undefined }
    
        return player.muted
    }

    // set the playback using ms
    setMilliseconds (value) {
        let player = this.getPlayer()
        if (!player) { return undefined }
    
        player.currentTime = value / 1000
    }

    getDurationMilliseconds () {
        let player = this.getPlayer()
        if (!player) { return undefined }
    
        return player.duration * 1000
    }

    getVolume () {
        let player = this.getPlayer()
        if (!player) { return undefined }

        return player.volume
    }

    setVolume (volume) {
        let player = this.getPlayer()
        if (!player) { return undefined }

        player.volume = volume
    }

    close () {
        document.getElementsByClassName("minimize-button")[0].click()
    }

    getFullscreenNode () {
        return this.ReactEvents(document.getElementsByClassName("hulu-player-app")[0]).children[10].props.jqueryView.props;
        // children[12] is for styling the captions
        // children[14] is for the loading bar
    }

    enterFullscreen () {
        this.getFullscreenNode().setViewModeToFullScreen();
    }

    exitFullscreen () {
        this.getFullscreenNode().setViewModeToNormal();
    }

    // TODO i'm getting closer...
    // let node = Array.from(document.getElementsByClassName("Hub__collection")).find(e => {
    //     return e.querySelector("[id='keep-watching']")
    // }).getElementsByClassName("GenericTile cu-generictile")[2]
    // ReactInternal(node).return.return.stateNode.props.asset.entity_metadata

    getEpisodeNum () {
        let rawTitle = document.getElementsByClassName("metadata-area__third-line")[0]
        if (rawTitle) {
            return rawTitle.innerText.split("  •  ")[1].split(" ")[1].slice(1)
        }
    }

    getSeasonNum () {
        let rawTitle = document.getElementsByClassName("metadata-area__third-line")[0]
        if (rawTitle) {
            // console.log(rawTitle.innerText)
            return rawTitle.innerText.split("\n  •  ")[1].split(" ")[0].slice(1)
        }
    }

    getTitle () {
        let rawTitle = document.getElementsByClassName("metadata-area__second-line")[0].innerText;
        return rawTitle.replace(/\([^\)]*\)/gi, "").trim()
    }

    getEpisodeTitle () {
        let rawTitle =  document.getElementsByClassName("metadata-area__third-line")[0].innerText.split("  •  ")[0];

        // remove all occurances of things between parentheses
        return rawTitle.replace(/\([^\)]*\)/gi, "").trim();
    }

}
