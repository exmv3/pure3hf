var playerv = document.querySelector('#movie_player'),
    // qualityv = 'highres';
    // qualityv = 'hd2880';
    qualityv = 'hd2160';

function changeQualityf() {
    var qualityvs = playerv.getAvailableQualityLevels();
    if (qualityvs.includes(qualityv)) {
        if (qualityvs.indexOf(playerv.getPlaybackQuality()) >= qualityvs.indexOf(qualityv)) {
            playerv.setPlaybackQualityRange(qualityv);
            playerv.setPlaybackQuality(qualityv);
        }
    }
    else /* if (playerv.getPlaybackQuality() != qualityvs[0]) */ {
        playerv.setPlaybackQualityRange(qualityvs[0]);
        playerv.setPlaybackQuality(qualityvs[0]);
    }
}

function onStateChangef(e) { if (e == -1) changeQualityf() }

function onPlaybackQualityChangef(e) { changeQualityf() }

changeQualityf()
playerv.addEventListener('onStateChange', 'onStateChangef')
playerv.addEventListener('onPlaybackQualityChange', 'onPlaybackQualityChangef')


playerv.children[0].children[0].addEventListener('mousedown', function (e) {
    if (e.button == 1) {
        if (playerv.getPlayerState() == 1) {
            movie_player.setPlaybackRate(movie_player.getPlaybackRate() == 1 ? 2 : 1)
        } else if (playerv.getPlayerState() == 2) {
            playerv.playVideo()
        }
    }

})
