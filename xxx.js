let v0
let toPreview = false
// let _DOMContentLoaded_exed = false
let saqui_BIG_img_DIV = document.querySelector('#saqui_BIG_img_DIV')
if (!saqui_BIG_img_DIV) {
    saqui_BIG_img_DIV = document.createElement('div')
    saqui_BIG_img_DIV.id = "saqui_BIG_img_DIV"
}
let _zoomImg = document.querySelector('#saquizoomImg')
if (!_zoomImg) {
    _zoomImg = document.createElement('img')
    _zoomImg.id = 'saquizoomImg'
}
let _vimg
let _zoom
let _ztop
let _zleft
let _info = document.querySelector('#info_saqui_BIG_img')
// let HTMLDOM
let saquTopHead = document.createElement('div')
saquTopHead.id = 'saquTopHead'
let saveRef = document.createElement('a')
saveRef.innerText = '源网址'
saveRef.href = location.href
saveRef.id = 'originURL4646'
let RegExpStorage = /iwara|\.youtube\.com|instagram\.com|\.bilibili\.com|\.google\.com|\.baidu\.com|\.aliexpress\.com|\.taobao\.com|\.jd\.com|pinterest\.com|\.qq\.com|\.weibo\.com|\.douyu\.com|\.huya\.com|\.namethatpornstar\.com|\.facebook\.com|\.115\.com|\.rarbg|\.pixiv\.net|pornstarsnaked\.com/i;//不记录点击图片链接的规则^file:\/\/\/|
// let blurDiv = document.querySelector('#saquiblurDiv')
// if (!blurDiv) {
//     blurDiv = document.createElement('div')
//     blurDiv.id = 'saquiblurDiv'
// }
let saquiTranslateDiv = document.querySelector('#saquiTranslateDiv')
let mousedowna, mousedownX, mousedownY
chrome.runtime.onMessage.addListener(function (message) {
    if (message._pause === true) {
        for (let v of document.querySelectorAll('video')) {
            v.pause()
        }
    }
})
// if (saqui_BIG_img_DIV.querySelector('img')) {
//     HTMLDOM = document.lastChild
// }

function f_mouseover(e) {
    if (e.target.parentElement == saqui_BIG_img_DIV) {
        _zoomImg.src = e.target.src
        _zoom = e.target.naturalWidth / e.target.width//getComputedStyle(e.target).width.substring(0, getComputedStyle(e.target).width.indexOf('px'))
        if (toPreview) {
            e.target.style.setProperty('opacity', '0')
            _zleft = window.innerWidth / 2 - e.offsetX * _zoom
            _ztop = innerHeight / 2 - e.offsetY * _zoom
            _zoomImg.style.setProperty('left', _zleft + 'px')
            _zoomImg.style.setProperty('top', _ztop + 'px')
            _zoomImg.style.setProperty('visibility', 'visible')
            document.documentElement.style.setProperty('cursor', 'url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABAQMAAAAl21bKAAAAAXNSR0IB2cksfwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAANQTFRF////p8QbyAAAAApJREFUeJxjYAAAAAIAAUivpHEAAAAASUVORK5CYII=),text')
        }
        if (_info)
            _info.style.setProperty('visibility', 'hidden')
    }
}
function f_mousemove(e) {
    if (e.target.parentElement == saqui_BIG_img_DIV) {
        if (toPreview) {
            _zleft = window.innerWidth / 2 - e.offsetX * _zoom
            _ztop = innerHeight / 2 - e.offsetY * _zoom
            _zoomImg.style.setProperty('left', _zleft + 'px')
            _zoomImg.style.setProperty('top', _ztop + 'px')
        }
    }
}
function f_mouseout(e) {
    if (e.target.parentElement == saqui_BIG_img_DIV) {
        document.documentElement.style.setProperty('cursor', 'auto')
        _zoomImg.style.setProperty('visibility', 'hidden')
        e.target.style.setProperty('opacity', '1')
        if (_info && (e.x <= e.target.offsetLeft)) {
            _info.style.setProperty('visibility', 'visible')
        }
    }
}
function f_resize() {
    if (_vimg) _vimg.scrollIntoView()
}
addEventListener('wheel', function (e) {
    if (saquiTranslateDiv && saquiTranslateDiv.style.visibility != "hidden")
        saquiTranslateDiv.style.setProperty('visibility', 'hidden')
    if (e.target.parentElement == saqui_BIG_img_DIV) {
        e.preventDefault()
        e.stopPropagation()
        if (e.deltaY > 0) {//往下滚动
            if (e.target.offsetTop + e.target.height == saqui_BIG_img_DIV.scrollHeight) {
                window.scrollTo({
                    top: 0,
                    behavior: "instant"
                });
            }
            else if (e.target.offsetTop + e.target.height - (scrollY || (document.documentElement.scrollTop || (document.body ? document.body.scrollTop : 0))) - window.innerHeight > 1) {
                if (toPreview) {
                    e.target.style.setProperty('opacity', '0')
                }
                _vimg = e.target//获取被浏览器下边界压住的图片
                _vimg.scrollIntoView()
            } else {
                _vimg = e.target.nextElementSibling
                while (_vimg && (_vimg.naturalWidth == 0 && _vimg.naturalHeight == 0 || _vimg.offsetTop + _vimg.height - (scrollY || (document.documentElement.scrollTop || (document.body ? document.body.scrollTop : 0))) - window.innerHeight < 1)) {
                    _vimg = _vimg.nextElementSibling
                }
                if (_vimg) {
                    if (toPreview && e.clientX > _vimg.offsetLeft && e.clientX < _vimg.offsetLeft + _vimg.width) {
                        _vimg.style.setProperty('opacity', '0')
                    }
                    _vimg.scrollIntoView()
                }
            }
        }
        else if (e.deltaY < 0) {//往上滚动
            _vimg = e.target
            if (_vimg.offsetTop == 0 && scrollY == 0) {//从顶部往上滚到底部
                _vimg = saqui_BIG_img_DIV.lastElementChild
            } else
                while (_vimg && (_vimg.naturalWidth == 0 && _vimg.naturalHeight == 0 || (_vimg.offsetTop >= (scrollY || (document.documentElement.scrollTop || (document.body ? document.body.scrollTop : 0)))))) {//scrollY滚动条已滚动的距离,offsetTop元素顶部到文档顶部的距离
                    _vimg = _vimg.previousElementSibling//获取上半部分在窗口顶部以上的的图片,即 被浏览器上边界压住的图片
                }
            if (_vimg) {
                if (toPreview && e.clientX > _vimg.offsetLeft && e.clientX < _vimg.offsetLeft + _vimg.width) {
                    _vimg.style.setProperty('opacity', '0')
                }
                _vimg.scrollIntoView()
            }
        }
    }
    else if (e.clientX < 10 || e.altKey) {
        e.preventDefault();
        e.stopPropagation()
        chrome.runtime.sendMessage({ deltaY: e.deltaY });
    }
    else if (e.target == saqui_BIG_img_DIV) {
        e.preventDefault(); scrollBy(0, innerHeight * Math.sign(e.deltaY))
    }

},
    { passive: false }
);
addEventListener('mousedown', function (e) {
    mousedownX = e.clientX
    mousedownY = e.clientY
    if (e.button != 2) {
        if (e.button == 0) {
            if (saquiTranslateDiv && saquiTranslateDiv.style.visibility != "hidden")
                saquiTranslateDiv.style.setProperty('visibility', 'hidden')
            if (e.target.parentElement && e.target.parentElement == saqui_BIG_img_DIV) {
                _vimg = e.target
                _zoomImg.src = e.target.src
                _zoom = e.target.naturalWidth / e.target.width//getComputedStyle(e.target).width.substring(0, getComputedStyle(e.target).width.indexOf('px'))
                e.preventDefault()
                toPreview = !toPreview
                if (toPreview) {
                    document.documentElement.requestFullscreen()
                    e.target.style.setProperty('opacity', '0')
                    _zleft = window.innerWidth / 2 - e.offsetX * _zoom
                    _ztop = innerHeight / 2 - e.offsetY * _zoom
                    _zoomImg.style.setProperty('left', _zleft + 'px')
                    _zoomImg.style.setProperty('top', _ztop + 'px')
                    _zoomImg.style.setProperty('visibility', 'visible')
                    document.documentElement.style.setProperty('cursor', 'url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABAQMAAAAl21bKAAAAAXNSR0IB2cksfwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAANQTFRF////p8QbyAAAAApJREFUeJxjYAAAAAIAAUivpHEAAAAASUVORK5CYII=),text')
                }
                else {
                    document.exitFullscreen()
                    document.documentElement.style.setProperty('cursor', 'auto')
                    _zoomImg.style.setProperty('visibility', 'hidden')
                    e.target.style.setProperty('opacity', '1')
                }
                return
            }

        }
        else if (e.button == 1) {//video倍速
            if (e.target.tagName == 'VIDEO') {
                e.preventDefault()
                // if (e.target.parentElement.parentElement.id != 'movie_player') e.target.playbackRate = e.target.playbackRate == 1 ? 2 : 1
                if (location.hostname.includes('iwara')) {
                    if (e.target.paused) {
                        e.target.playbackRate = e.target.playbackRate == 1 ? 2 : 1
                    }
                    e.target.play()
                }
                else if (location.hostname != "www.youtube.com") {
                    if (e.target.paused) {
                        e.target.play()
                    }
                    else {
                        e.target.playbackRate = e.target.playbackRate == 1 ? 2 : 1
                    }
                }
            }
            else if (e.target.className == 'bilibili-player-dm-tip-wrap') {
                e.preventDefault()
                if (!v0) v0 = document.querySelector('video')
                if (v0.paused) v0.play()
                else v0.playbackRate = v0.playbackRate == 1 ? 2 : 1
            }
            else if (e.target.className == 'mgp_eventCatcher') {
                e.preventDefault()
                v0 = document.querySelector('.mgp_videoWrapper>video')
                if (v0.paused) v0.play()
                else v0.playbackRate = v0.playbackRate == 1 ? 2 : 1
            }
            // else if (!toPreview && !_info && (e.target == saqui_BIG_img_DIV || e.target.parentElement == saqui_BIG_img_DIV) && saqui_BIG_img_DIV.querySelector('img')) {
            //     // if (HTMLDOM) {//中键回归原网页
            //     //     let bd = HTMLDOM.querySelector('body')
            //     //     HTMLDOM.insertBefore(saqui_BIG_img_DIV, bd)
            //     //     HTMLDOM.insertBefore(_zoomImg, bd)
            //     //     document.lastChild.remove()
            //     //     document.appendChild(HTMLDOM)
            //     //     HTMLDOM = null//原网页回归后 置为null
            //     // }
            //     // else {//HTMLDOM 为 null时,此时有原始网页//再次只留saqui_BIG_img_DIV
            //     //     HTMLDOM = document.lastChild
            //     //     document.lastChild.remove()
            //     //     document.appendChild(document.createElement('html')).appendChild(e_title)
            //     //     document.documentElement.appendChild(saqui_BIG_img_DIV)
            //     //     document.documentElement.appendChild(_zoomImg)
            //     // }
            // }
        }
        if (e.target.tagName == 'A') {
            // if (e.target.querySelector('img'))
            //     alert('a img pointer-events: none  ;')
            mousedowna = e.target
            mousedowna.draggable = false
        } else {
            let _target = e.target
            while (_target.parentElement && _target.parentElement.tagName != 'A') {
                _target = _target.parentElement
            }
            if (_target.parentElement) {
                mousedowna = _target.parentElement
                mousedowna.draggable = false
                let _img = _target.parentElement.querySelector('img')
                if (_img && (_img.naturalHeight >= 100 && !_img.src.match(/\.svg(?:$|\?)/i))) {
                    if (!RegExpStorage.test(location.href)) {
                        let _httpIndex = _target.parentElement.href.lastIndexOf('http');
                        let _andIndex = _target.parentElement.href.indexOf('&', _httpIndex);
                        let _redirectUrl
                        if (_andIndex > -1)
                            _redirectUrl = _target.parentElement.href.substring(_httpIndex, _andIndex);
                        else
                            _redirectUrl = _target.parentElement.href.substring(_httpIndex);
                        let zURL = decodeURIComponent(_redirectUrl).replace(/\.html\?(?:\d|utm|spm\=|nats\=|trace\=).*/i, '.html').replace("://m.", "://www.").replace(/(?<!:)\/\//i, '/')
                        if (_img.src && zURL)
                            chrome.runtime.sendMessage(undefined, {
                                bkmk: {
                                    titl: _img.title.trim() || mousedowna.title.trim(),
                                    BkmkC0ver: _img.src,
                                    PgT: document.title,
                                    Pg0k: location.href,
                                    zURL: zURL
                                }
                            }, undefined, function (r) {
                                if (r == '新书签加封面') {
                                    _img.className = _img.className.replace(/ saquiRotateYAnimation| saquiBrightness051Animation| saquiBrightness01Animation|$/, ' saquiRotateYAnimation')
                                }
                                else if (r == '不改封面') {
                                    _img.className = _img.className.replace(/ saquiRotateYAnimation| saquiBrightness051Animation| saquiBrightness01Animation|$/, ' saquiBrightness051Animation')
                                }
                                else if (r == '加封面备份书签') {
                                    _img.className = _img.className.replace(/ saquiRotateYAnimation| saquiBrightness051Animation| saquiBrightness01Animation|$/, ' saquiBrightness01Animation')
                                }
                                else if (r == '不敢处理重复书签') {
                                    alert(r)
                                }
                            })
                    }
                }
            }

        }
    }
    else if (e.altKey && e.button == 2) {//alt右键删除元素
        e.target.remove()
    }
})
addEventListener('mouseup', function (e) {
    if (e.button == 0) {

        //翻译
        let selection = window.getSelection()
        let selectionString = selection.toString()
        if (selectionString && document.body /* && mousedownX != e.clientX */) {
            if (!saquiTranslateDiv) {
                saquiTranslateDiv = document.body.appendChild(document.createElement('div'))
                saquiTranslateDiv.id = 'saquiTranslateDiv'
            }
            let selectionWidth
            let selectionFontSize
            if (selection.focusNode && selection.focusNode.parentElement) {
                selectionWidth = window.getComputedStyle(selection.focusNode.parentElement).width//bug===   TypeError: Window.getComputedStyle: Argument 1 is not an object.
                selectionFontSize = window.getComputedStyle(selection.focusNode.parentElement).fontSize//bug===   TypeError: Window.getComputedStyle: Argument 1 is not an object.
            }
            let tt = ''
            var xh = new XMLHttpRequest();
            // xh.responseType = 'document';
            xh.responseType = 'json';
            xh.onreadystatechange = function () {
                if (this.readyState == 4 && this.status == 200) {
                    let sts = this.response.sentences
                    if (sts)
                        for (let st of sts) {
                            if (st.trans) tt = tt + st.trans
                        }
                    let left
                    let top
                    let bottom
                    if (e.clientY < mousedownY) {
                        left = e.clientX - 10
                        saquiTranslateDiv.style.setProperty('left', left + 'px')
                        if (e.clientY > window.innerHeight - mousedownY) {
                            bottom = window.innerHeight - e.clientY
                            saquiTranslateDiv.style.setProperty('bottom', bottom + 20 + 'px')
                            saquiTranslateDiv.style.setProperty('top', 'auto')
                        }
                        else {
                            top = mousedownY
                            saquiTranslateDiv.style.setProperty('top', top + 20 + 'px')
                            saquiTranslateDiv.style.setProperty('bottom', 'auto')
                        }
                    }
                    else {
                        left = mousedownX - 10
                        saquiTranslateDiv.style.setProperty('left', left + 'px')
                        if (mousedownY > window.innerHeight - e.clientY) {
                            bottom = window.innerHeight - mousedownY
                            saquiTranslateDiv.style.setProperty('bottom', bottom + 20 + 'px')
                            saquiTranslateDiv.style.setProperty('top', 'auto')
                        }
                        else {
                            top = e.clientY
                            saquiTranslateDiv.style.setProperty('top', top + 20 + 'px')
                            saquiTranslateDiv.style.setProperty('bottom', 'auto')
                        }
                    }
                    saquiTranslateDiv.style.setProperty('visibility', 'visible')
                    saquiTranslateDiv.style.setProperty('position', 'fixed')
                    saquiTranslateDiv.style.setProperty('z-index', '9999')
                    saquiTranslateDiv.style.setProperty('background-color', '#fff')
                    saquiTranslateDiv.style.setProperty('border', '8px solid')
                    saquiTranslateDiv.style.setProperty('padding', '16px')
                    saquiTranslateDiv.style.setProperty('width', selectionWidth || '30vw')
                    saquiTranslateDiv.style.setProperty('font-size', selectionFontSize || '1em')
                    saquiTranslateDiv.innerText = tt
                }
            }
            // xh.open("GET", 'https://translate.googleapis.com/translate_a/single?dt=t&dt=bd&dt=ex&dt=ld&dt=md&dt=qca&dt=rw&dt=rm&dt=ss&dt=t&dt=at&client=gtx&q=Free&sl=auto&tl=zh-CN&dj=1&source=bubble', true);
            xh.open("GET", 'https://translate.googleapis.com/translate_a/single?format=text&dt=t&client=gtx&q=' + encodeURIComponent(selectionString) + '&sl=auto&tl=zh-CN&dj=1', true);
            xh.send();
        }
    }

})
// addEventListener('click',function (e) {
//     if(e.target.href){
//         e.preventDefault()
//         chrome.runtime.sendMessage(undefined, { click: e.target.href }, undefined, function (r) {alert(r)
//             if (r == -11) {
//                 e.target.click()
//             }
//         })
//     }
// })
addEventListener('click', function (e) {
    // console.log(window.getSelection().toString())
    // if (e.target.tagName == 'A') {
    //     if (e.target == mousedowna && (mousedownX != e.clientX || mousedownY != e.clientY))
    //         e.preventDefault()
    // } else {
    //     let _target = e.target
    //     while (_target.parentElement && _target.parentElement.tagName != 'A') {
    //         _target = _target.parentElement
    //     }
    //     if (_target.parentElement && _target.parentElement == mousedowna && (mousedownX != e.clientX || mousedownY != e.clientY))
    //         e.preventDefault()
    // }

    if (window.getSelection().toString()) { e.preventDefault() }
}, { capture: true })
addEventListener('click', function (e) {
    // console.log(window.getSelection().toString())
    // if (e.target.tagName == 'A') {
    //     if (e.target == mousedowna && (mousedownX != e.clientX || mousedownY != e.clientY))
    //         e.preventDefault()
    // } else {
    //     let _target = e.target
    //     while (_target.parentElement && _target.parentElement.tagName != 'A') {
    //         _target = _target.parentElement
    //     }
    //     if (_target.parentElement && _target.parentElement == mousedowna && (mousedownX != e.clientX || mousedownY != e.clientY))
    //         e.preventDefault()
    // }

    if (window.getSelection().toString()) { e.preventDefault() }
}, { capture: false })
//dblclick//contextmenu
if (location.hostname.includes('iwara')) {
    addEventListener('contextmenu', function (e) {

        if (!document.fullscreenElement) {
            // if (e.target.className.includes('video-js')){this.alert('video-js')
            //     e.preventDefault()
            //     e.target.querySelector('video').play()
            //     e.target.requestFullscreen()
            // }
            // else
            if (e.target.tagName == 'VIDEO') {
                e.preventDefault()
                // e.target.play()
                e.target.parentElement.requestFullscreen()
            }
            else if (e.target.className == 'vjs-poster' || e.target.className == 'vjs-big-play-button') {
                // this.alert('vjs-poster   vjs-big-play-button')
                e.preventDefault()
                e.target.parentElement.querySelector('video').play()
                e.target.parentElement.requestFullscreen()
            }
        } else {
            e.preventDefault()
            document.exitFullscreen()
        }
    })
}

addEventListener('keydown', function (e) {
    if (e.target.tagName != 'INPUT') {//播放速度
        if (!v0) v0 = document.querySelector('video')
        if (v0) {
            if (e.key == 'Enter') {
                e.preventDefault()
                if (v0.paused) v0.play()
                else v0.pause()
            }
            else if (e.key.toLowerCase() == 'x') {
                let _playbackRate
                let _videos = document.querySelectorAll("video")
                if (_videos.length > 0) {
                    for (_video of _videos) {
                        if (!_video.paused) {
                            _playbackRate = _video.playbackRate
                            if (_playbackRate < 2) {
                                _video.playbackRate = 2
                            }
                            else if (_playbackRate > 1) {
                                _video.playbackRate = 1
                            }
                            break
                        }
                    }
                }
            }
            else if (e.key == 'ArrowRight' && e.ctrlKey) {
                let _videos = document.querySelectorAll("video")
                if (_videos.length > 0) {
                    for (_video of _videos) {
                        if (!_video.paused) {
                            _video.playbackRate = _video.playbackRate + 0.1 < 16 ? _video.playbackRate + 0.1 : 16
                            break
                        }
                    }
                }
            }
            else if (e.key == 'ArrowLeft' && e.ctrlKey) {
                let _videos = document.querySelectorAll("video")
                if (_videos.length > 0) {
                    for (_video of _videos) {
                        if (!_video.paused) {
                            _video.playbackRate = _video.playbackRate - 0.1 > 0 ? _video.playbackRate - 0.1 : 0.0625
                            break
                        }
                    }
                }
            }
            else if ((e.key == 'ArrowDown' || e.key == 'ArrowUp') && (e.ctrlKey || e.altKey)) {
                let _videos = document.querySelectorAll("video")
                if (_videos.length > 0) {
                    for (_video of _videos) {
                        if (!_video.paused) {
                            _video.playbackRate = 1
                            break
                        }
                    }
                }
            }
        }
    }
})

document.addEventListener('DOMContentLoaded', function () {
    // _DOMContentLoaded_exed = true

    let vds = document.querySelectorAll("video")
    if (vds.length == 1)
        v0 = vds[0]
    if (document.querySelector('title') && document.querySelector('title').innerText.length > 215) {
        document.querySelector('title').setAttribute('o_title_text', document.querySelector('title').innerText)
        document.querySelector('title').innerText = document.querySelector('title').innerText.substr(0, 215)
    }
    if (!(saqui_BIG_img_DIV.querySelector('img') || /iwara.tv|wikipedia\.org|pinterest\.com|mydrivers\.com|baidu\.com|cnbeta\.com|github\.com/.test(location.href))) {
        if (/^https:\/\/io-oi\.xyz\/(\d+)\/content\/([^\/]+)\/index-mirror-(\d+)-(\d+)\.html/.test(location.href)) {//相册封面链接
            let _tab_PIN_CODE = RegExp.$1
            chrome.storage.local.get('backgroundPINCODE', function (result) {
                let img1Src = `https://io-oi.xyz/${result.backgroundPINCODE || _tab_PIN_CODE || 404}/showimage/nudecollect-1/image00001-1-${RegExp.$3}-1/${RegExp.$2}/1/leg.xyz-${RegExp.$2}-image00001.jpg` // 211
                document.title = RegExp.$2//1
                let _amount_of_img = RegExp.$4//3
                let ii = 1
                insertSaquTopHead()
                function loadNextIMG() {
                    if (ii <= _amount_of_img) {
                        let img = document.createElement('img')
                        saqui_BIG_img_DIV.appendChild(img)
                        img.onload = () => { ii++; loadNextIMG() }
                        img.onerror = () => img.src = img.src.replace(/\/image0+/, '/image')
                        img.src = img1Src.replace(/image00001/g, 'image' + '0'.repeat(5 - String(ii).length) + ii)
                    }
                }
                loadNextIMG()
            });
        }
        else if (/^https:\/\/io-oi\.xyz\/(\d+)\/(?:search\.html\?q\=(.+)|search\/(.+)\/)*/i.test(location.href)) {//https://io-oi\.xyz/319672137410692/index.html
            let _tab_PIN_CODE = RegExp.$1
            let s1
            if (RegExp.$2 || RegExp.$3) s1 = (RegExp.$2 || RegExp.$3) + ' xyz'
            if (_tab_PIN_CODE)
                chrome.storage.local.get('backgroundPINCODE', function (result) {
                    if (result.backgroundPINCODE == _tab_PIN_CODE) {
                        let maindiv = document.querySelector('body > div.main')
                        document.documentElement.remove()
                        document.appendChild(document.createElement('html')).appendChild(document.createElement('title'))
                        if (s1) document.title = s1
                        document.documentElement.appendChild(maindiv)
                        ioloadf(_tab_PIN_CODE || 404)
                    }
                    else {
                        var xhq = new XMLHttpRequest();
                        xhq.responseType = 'document';
                        xhq.onreadystatechange = function () {
                            if (this.readyState == 4 && this.status == 200) {
                                if (this.responseXML.documentElement.innerText.includes('404 Not Found')) alert(404404)
                                document.documentElement.remove()
                                document.appendChild(document.createElement('html')).appendChild(document.createElement('title'))
                                if (s1) document.title = s1
                                document.documentElement.appendChild(this.responseXML.querySelector('body > div.main'))
                                ioloadf(result.backgroundPINCODE || 404)
                            }
                        }
                        xhq.open("GET", location.href.replace(/(?<=^https:\/\/io-oi\.xyz\/)\d+(?=\/)/i, result.backgroundPINCODE), true);
                        xhq.send();
                    }

                });
            function ioloadf(pinCode) {
                let _reg_imgsrc = /(\/nudecollect-\d+\/(image\d+)-\d+-\d+-\d+\/([^\/]+)\/\d+\/)[^\/]+\.jpg/i
                for (let img of document.querySelectorAll('.content img')) {
                    if (_reg_imgsrc.test(img.src))
                        img.src = `https://io-oi.xyz/${pinCode}/showimage${RegExp.$1}leg.xyz-${RegExp.$3}-${RegExp.$2}.jpg`
                }
            }
        }
        else if (/https:\/\/www\.pixiv\.net/.test(location.href)) {//https://www.pixiv.net/artworks/74299132  //https://www.pixiv.net/users/7243485/artworks 	
            addEventListener('wheel', function (e) {
                if (e.target.tagName == 'IMG' && /_p\d+(?:_master1200)*\.jpg$/.test(e.target.src) || e.target.tagName == 'BUTTON' && /sc-691snt-\d/.test(e.target.className)) {
                    e.preventDefault()
                    if (e.deltaY > 0) {
                        let bs = document.querySelectorAll('.sc-691snt-3')
                        bs[bs.length - 1].click()
                    }
                    else if (e.deltaY < 0) {
                        let bs = document.querySelectorAll('.sc-691snt-2')
                        bs[bs.length - 1].click()
                    }
                }
                else {
                    let t = e.target
                    while (t.parentElement && (t.parentElement.tagName != 'ASIDE' && !t.parentElement.className)) {
                        t = t.parentElement
                    }
                    if (t.tagName == 'ASIDE') {
                        e.preventDefault()
                        if (e.deltaY < 0) document.querySelector('aside nav div:nth-child(1) a').click()
                        else if (e.deltaY > 0) document.querySelector('aside nav div:nth-child(3) a').click()
                    }
                }
            }, { passive: false })
            let oldHref = document.location.href;
            let bodyList = document.querySelector("body")
            let observer = new MutationObserver(function (mutations) {
                mutations.forEach(function (mutation) {
                    for (let addNode of mutation.addedNodes) {
                        if (addNode.innerText.indexOf('查看全部') != -1) {
                            if (addNode.tagName == 'BUTTON' && addNode.innerText == '查看全部') {
                                addNode.click()
                                break
                            } else {
                                let buttons = addNode.querySelectorAll('button')
                                for (let button of buttons) {
                                    if (button.innerText == '查看全部') {
                                        button.click()
                                    }
                                }
                            }
                        }
                    }
                    if (oldHref != document.location.href) {
                        oldHref = document.location.href;
                        if (/^https:\/\/\w+\.pixiv\.net\/users\/\d+$/i.test(location.href)) {
                            location.replace(location.href + '/artworks')
                        }
                    }
                });
            });
            observer.observe(bodyList, { childList: true, subtree: true });
        }
        else if (/https:\/\/www\.youtube\.com/i.test(location.href)) {
            if (document.body) {
                let observer = new MutationObserver(function () {
                    if (document.querySelector('#movie_player')) {
                        var temp = document.createElement('script');
                        temp.setAttribute('type', 'text/javascript');
                        temp.src = chrome.runtime.getURL('yt.js');
                        temp.onload = function () { this.remove(); };
                        document.body.appendChild(temp);
                        observer.disconnect()
                    }
                });
                observer.observe(document.body, { childList: true, subtree: true });
            }
            document.addEventListener('load', function (e) {
                if (e.target.naturalWidth == 120 && e.target.naturalHeight == 90) {
                    e.target.src = e.target.src.replace('https://i.ytimg', 'https://img.youtube').replace('/maxresdefault.jpg', '/hqdefault.jpg')
                }
            }, { capture: true })
        }
        // else if (/https:\/\/www\.youtube\.com/i.test(location.href)) {
        //     let bodyList = document.querySelector("#contents #contents #contents")
        //     let observer = new MutationObserver(function (mutations) {
        //         for (let m of mutations) {
        //             if (/https\:\/\/i\.ytimg\.com\/vi\/.+(\/hqdefault\.jpg.*)/.test(m.target.src)) {
        //                 let s1 = RegExp.$1
        //                 m.target.addEventListener('load', function () {
        //                     if (this.naturalWidth == 120 && this.naturalHeight == 90) {
        //                         this.src = this.src.replace('https://i.ytimg','https://img.youtube').replace('/maxresdefault.jpg', '/hqdefault.jpg')
        //                     }
        //                 })
        //                 m.target.src = m.target.src.replace(s1, '/maxresdefault.jpg')
        //             }
        //         }
        //     });
        //     observer.observe(bodyList, { attributes: true,attributeFilter:['src'], subtree: true });
        // }
        // else if (/https:\/\/www\.youtube\.com/i.test(location.href)) {
        //     let bodyList = document.querySelector("#contents #contents #contents")
        //     let len = bodyList.children.length
        //     let observer = new MutationObserver(function (mutations) {
        //         console.log((len < bodyList.children.length))
        //         if (len < bodyList.children.length) {
        //             for (let ii = len + 1; ii < bodyList.children.length; ii++) {
        //                 let imgs = bodyList.children[ii].querySelectorAll('img')
        //                 console.log(imgs)
        //                 if (imgs.length == 1) {
        //                     if (/https\:\/\/i\.ytimg\.com\/vi\/.+(\/hqdefault\.jpg.*)/.test(imgs[0].src)) {
        //                         let s1 = RegExp.$1
        //                         imgs[0].addEventListener('load', function () {
        //                             if (this.naturalWidth == 120 && this.naturalHeight == 90) {
        //                                 alert('th')
        //                             }
        //                         })
        //                         console.log(s1 == RegExp.$1)
        //                         imgs[0].src = imgs[0].src.replace(s1, '/maxresdefault.jpg')
        //                     }
        //                 }
        //             }
        //             len = bodyList.children.length
        //             console.log(len)
        //             // mutations.forEach(function (mutation) {
        //             //     for (let addNode of mutation.addedNodes) {
        //             //         if (addNode.querySelector('img')) {
        //             //             console.log(addNode)
        //             //         }
        //             //     }
        //             // });
        //         }
        //     });
        //     observer.observe(bodyList, { childList: true, subtree: true });
        // }
        else if (/https:\/\/www\.instagram\.com/i.test(location.href)) {
            addEventListener('wheel', function (e) {
                if (/_9AhH0|fXIG0/.test(e.target.className)) {
                    let t = e.target
                    while (t.parentElement && t.parentElement.className.indexOf('EcJQs') == -1) {
                        t = t.parentElement
                    }
                    if (t.tagName == 'HTML') {
                        if (e.deltaY > 0) {
                            let b2 = document.querySelector('div.l8mY4.feth3>button.wpO6b')
                            if (b2) {
                                e.preventDefault()
                                b2.click()
                            }
                        }
                        else if (e.deltaY < 0) {
                            let b1 = document.querySelector('div._6Eych.feth3>button.wpO6b')
                            if (b1) {
                                e.preventDefault()
                                b1.click()
                            }
                        }
                    }
                    else if (t.parentElement.className.indexOf('EcJQs') != -1) {
                        e.preventDefault()
                        if (e.deltaY > 0) {
                            let b2 = t.parentElement.querySelector('._6CZji')
                            if (b2) b2.click()
                            else {
                                b2 = document.querySelector('div.l8mY4.feth3>button.wpO6b')
                                if (b2) b2.click()
                            }
                        }
                        else if (e.deltaY < 0) {
                            let b1 = t.parentElement.querySelector('.POSa_')
                            if (b1) b1.click()
                            else {
                                b1 = document.querySelector('div._6Eych.feth3>button.wpO6b')
                                if (b1) b1.click()
                            }
                        }
                    }
                }
                else if (e.target.className.indexOf('_32yJO') != -1) {
                    e.preventDefault()
                    if (e.deltaY > 0) {
                        let b2 = document.querySelector('div.l8mY4.feth3>button.wpO6b')
                        if (b2) b2.click()
                    }
                    else if (e.deltaY < 0) {
                        let b1 = document.querySelector('div._6Eych.feth3>button.wpO6b')
                        if (b1) b1.click()
                    }
                }
            },
                { passive: false })
        }
        else if (/^https:\/\/www\.redgifs\.com/.test(location.href)) {
            let observer = new MutationObserver(function (mutations) {
                mutations.forEach(function (mutation) {
                    for (let addNode of mutation.addedNodes) {
                        let source = addNode.querySelector(':scope>video>source')
                        if (source) {
                            source.src = source.src.replace('-mobile.mp4', '.mp4')
                        }
                    }
                });
            });
            observer.observe(document.querySelector("body"), { childList: true, subtree: true });
        }
        else if (/https:\/\/www\.indexxx\.com\/m\/.+/.test(location.href)) {
            for (let a of document.querySelectorAll('.websiteLink,.psWebsite>a')) {
                a.href = 'http://www.' + a.innerText
            }
            for (let a of document.querySelectorAll('.internalWebsiteLink')) {
                a.remove()
            }
            for (let a of document.querySelectorAll('.alias')) {
                if (a.innerText != '') {
                    a.addEventListener('click', function () {
                        window.open('https://www.google.com/search?q=' + a.parentElement.previousElementSibling.innerText + '+' + a.innerText)
                    })
                }
            }
        }
        else if (/^https:\/\/www\.tuji001\.com\/a\/\d+\/$/.test(location.href)) {//lanvshen
            nv('body > div.content > img', 'body > div.tuji', 'head > title'/* , 'favicon_lanvshen.ico' */)
            document.querySelector('HR').remove();
            _info = document.querySelector('body > div.tuji')
            if (_info) {

            }
        }
        else if (/fnvshen\.com\/g\/.+/.test(location.href)) {//.*nvshens\.org
            nv("#hgallery > img", "body > div.albumTitle", "head > title"/* , "favicon_nvshens.png" */)
        }
        else if (/fnvshen\.com\/.*/.test(location.href)) { //https://www.nvshens.net/girl/26038/  -->  https://www.nvshens.net/girl/26038/album/
            let _album = document.querySelector('#post > div:nth-child(8) > div > div.post_entry > div > span > a')
            if (_album && /共\d*册/i.test(_album.innerText)) {
                location.replace(_album.href)
            }
            for (let img of document.querySelectorAll('img')) {//img.src=img.getAttribute('data-original')//禁用JS也能正常加载图片
                let newsrc = img.getAttribute('data-original');
                if (!img.getAttribute('src') && newsrc)
                    img.setAttribute('src', newsrc);
            }
        }
        else if (/^file:\/\/\/\w:\/.+\.html/i.test(location.href)) {
            saqui_BIG_img_DIV = document.querySelector('#saqui_BIG_img_DIV,#saquiimg')
            if (saqui_BIG_img_DIV) {
                let body = document.querySelector('body')
                document.documentElement.insertBefore(saqui_BIG_img_DIV, body)//saquiimg是兼容以前保存的网页
                body.remove()
            }
        }
        // else if (/^https:\/\/io-oi\.xyz\/(\d+)\//i.test(location.href)) {//https://io-oi\.xyz/319672137410692/index.html
        //     let _tab_PIN_CODE = RegExp.$1
        //     let _reg_imgsrc = /(\/nudecollect-\d+\/(image\d+)-\d+-\d+-\d+\/([^\/]+)\/\d+\/)[^\/]+\.jpg/i
        //     for (let img of document.querySelectorAll('img')) {
        //         if (_reg_imgsrc.test(img.src)) {
        //             img.src = `https://io-oi.xyz/${_tab_PIN_CODE}/showimage${RegExp.$1}leg.xyz-${RegExp.$3}-${RegExp.$2}.jpg`
        //         }
        //     }
        //     if (document.documentElement.innerText.match('404 Not Found')) {
        //         chrome.runtime.sendMessage({
        //             refresh_PINCODE: 1
        //         });
        //     }
        // }
        else if (/http:\/\/www\.amourangels\.com\/z_model_\d+\.html/.test(location.href)) {//http://www.amourangels.com/z_model_1204.html
            document.title = document.querySelector("#CenterBlock > table > tbody > tr:nth-child(2) > td > table > tbody > tr > td:nth-child(2) > p:nth-child(2)").innerText.match(/(?<=Name: )\w+/) + '---' + document.querySelector("title").innerText
        }
        else if (/sensualgirls\.org\/galleries\/.+/.test(location.href)) {
            imgSrc1('#box_289 > div.cbox_cont img', '_thumb.jpg', '.jpg')
        }
        else if (/girlsofdesire\.org\/galleries\/.+/.test(location.href)) {
            imgSrc1('#gal_10 > table > tbody img', '_thumb.jpg', '.jpg')
        }
        else if (/deliciousbabes\.org\/galleries\/.+/.test(location.href)) {
            imgSrc1('#box_289 > div > div.ibox2_cont img', '_thumb.jpg', '.jpg')
        }
        else if (/yourdailygirls\.com\/galleries\/.+/.test(location.href)) {
            imgSrc1('.bigRightItem img', '-tn.jpg', '.jpg')
        }
        else if (/(babeimpact|decorativemodels|sexykittenporn)\.com\/galleries\/.+\//.test(location.href)) {
            imgSrc1('.list.gallery img', /_tn_/, '_')
        }
        else if (/^https:\/\/www.join2babes.com\/.+/.test(location.href)) {
            imgSrc1('div.gthumbs img', /\/tn_/, '/')
        }
        else if (/boobieblog\.com\/.+/.test(location.href)) {//https://www.boobieblog.com/outtakes-of-alejandra-guilmant-nude-for-treats/
            for (let img of document.querySelectorAll('article img')) {
                img.src = img.getAttribute('data-lazy-src').replace(/_small\.jpg$/, '.jpg')
                saqui_BIG_img_DIV.appendChild(img)
            }
            console.log('noscript')
        }
        else if (/eroluv\.com\/g-.+\/.+\/index\.php/.test(location.href)) {//http://www.eroluv.com/g-allsites/16ekj0l4391e/index.php
            let n = 1
            let _imgSrc_top = location.href.replace(/index\.php$/, '')
            let imgs = document.querySelectorAll("#content img")
            for (const img of imgs) {
                saqui_BIG_img_DIV.appendChild(img)
                img.src = _imgSrc_top + 'pics/' + '0'.repeat(3 - String(n).length) + n + '.jpg'
                n++
            }
        }
        else if (/nightdreambabe\.com\/.+/i.test(location.href)) {//https://www.nightdreambabe.com/elle-and-malena   //https://babesrater.com/infinite-scroll/67142/ilvy-kokomo ||babesrater\.com\/infinite-scroll\/\d+\/.+
            for (let img of document.querySelectorAll('div.gwrapper img')) {
                // img.className = 'saqui_BIG_img'
                saqui_BIG_img_DIV.appendChild(img)
            }
        }
        // else if (/babesrater\.com\/infinite-scroll\/\d+\/.+/i.test(location.href)) {//https://babesrater.com/infinite-scroll/67142/ilvy-kokomo
        //     for (let img of document.querySelectorAll("img")) {
        //         if (img.attributes["data-src"] && !img.src && img.height > 500) {
        //             img.src = img.attributes["data-src"]
        //             saqui_BIG_img_DIV.appendChild(img)
        //             img_count++
        //         }
        //     }
        // }
        else if (/rarbg.*\.org\/torrents\.php\?search\=.+/.test(location.href)) {
            function cp() {
                var aa = Array.from(document.querySelectorAll('.lista2t>tbody>tr.lista2>td:nth-child(2).lista>a:nth-child(1)[href*="/torrent/"]'))
                var lowq = new Set()
                var mgnt = ''
                for (let i = 0; i < aa.length; i++) {
                    if (aa[i].parentElement.parentElement.lastElementChild.innerText != "p33Rn3t") {
                        lowq.add(aa[i])
                    }
                    else if (!lowq.has(aa[i])) {
                        var txtm = aa[i].innerText.match(/(.+\.XXX\.(?:.*?))(\d+)p/i)
                        if (txtm) {
                            var tx = RegExp.$1
                            var qu = RegExp.$2
                            for (let ii = i + 1; ii < aa.length; ii++) {
                                if (!lowq.has(aa[ii]) && aa[i] != aa[ii]) {
                                    if (aa[ii].innerText.includes(tx) && aa[ii].innerText.match(/.+\.XXX\.(?:.*?)(\d+)p/i)) {
                                        if (parseInt(RegExp.$1) > parseInt(qu)) {
                                            lowq.add(aa[i])
                                            break
                                        }
                                        else {
                                            lowq.add(aa[ii])
                                            // if (parseInt(RegExp.$1) == parseInt(qu)) console.log('parseInt=======')
                                        }
                                    }
                                }
                            }
                        }
                        else if (!aa[i].innerText.match(/\.IMAGESET|\.DVDRip\./i)) {
                            lowq.add(aa[i])
                        }
                    }
                }
                for (let a of lowq) {
                    aa.splice(aa.indexOf(a), 1)
                }
                var ashift = aa.shift()
                if (ashift) {
                    var xhttp = new XMLHttpRequest();
                    xhttp.onreadystatechange = xreq
                    function xreq() {
                        if (this.readyState == 4 && this.status == 200) {
                            ashift.parentElement.parentElement.style.setProperty('background', 'pink')
                            var m = this.responseText.match(/"(magnet\:\?xt\=urn\:btih\:.+?)"/)
                            if (m) {
                                let s1 = RegExp.$1
                                mgnt = mgnt + s1 + '\n'
                                ashift.parentElement.parentElement.lastElementChild.innerText = ''
                                let mlink = ashift.parentElement.parentElement.lastElementChild.appendChild(document.createElement('a'))
                                mlink.href = s1
                                mlink.innerText = 'p33Rn3t'
                            }
                            ashift = aa.shift()
                            if (ashift) {
                                xhttp.open("GET", ashift.href, true);
                                xhttp.send();
                            }
                            else {
                                navigator.clipboard.writeText(mgnt)
                                var sizs = Array.from(document.querySelectorAll('.lista2t>tbody>tr.lista2>td:nth-child(4).lista'))
                                var sizsf = sizs.map(c => {
                                    var intxt = c.innerText
                                    if (/ GB$/.test(intxt)) {
                                        return parseFloat(intxt) * 1024
                                    }
                                    else if (/ TB$/.test(intxt)) {
                                        return parseFloat(intxt) * 1024 * 1024
                                    }
                                    else return parseFloat(intxt)
                                })
                                sizs[sizsf.indexOf(Math.max(...sizsf))].style.setProperty('background', 'yellow')
                                sizs[sizsf.indexOf(Math.max(...sizsf))].scrollIntoView()
                                console.log(mgnt)
                            }
                        }
                        else if (this.readyState == 4 && this.status == 429) {
                            setTimeout(() => {
                                xhttp.open("GET", ashift.href, true);
                                xhttp.send();
                            }, 1000);
                        }
                    }
                    xhttp.open("GET", ashift.href, true);
                    xhttp.send();
                }
            }
            var pages0
            if (document.querySelector('#pager_links b'))
                pages0 = document.querySelector('#pager_links').querySelectorAll('b~a')
            else
                pages0 = document.querySelector('#pager_links').querySelectorAll('a')
            if (pages0.length == 0) {
                cp()
            }
            else {
                var pages = Array.from(pages0)
                var pageShift = pages.shift()
                if (pageShift && pageShift.title.match(/page \d+/)) {
                    var xh = new XMLHttpRequest();
                    xh.responseType = 'document';
                    xh.onreadystatechange = xq
                    function xq() {
                        if (this.readyState == 4 && this.status == 200) {
                            var tb = document.querySelector('.lista2t>tbody')
                            for (let tr of this.responseXML.querySelectorAll('.lista2t>tbody>tr.lista2')) {
                                tb.appendChild(tr)
                            }
                            pageShift = pages.shift()
                            if (pageShift && pageShift.title.match(/page \d+/)) {
                                xh.open("GET", pageShift.href, true);
                                xh.send();
                            }
                            else {
                                cp()
                                console.log('all pages loaded!')
                            }
                        }
                        else if (this.readyState == 4 && this.status == 429) {
                            setTimeout(() => {
                                xh.open("GET", pageShift.href, true);
                                xh.send();
                            }, 1000);
                        }
                    }
                    xh.open("GET", pageShift.href, true);
                    xh.send();
                }
            }
        }
        else if (/rarbg.*\.org\/torrent\/.+/.test(location.href)) {
            for (let img of document.querySelectorAll("img")) {
                let src1 = img.src
                img.removeAttribute('src')
                img.src = src1.replace('//imagecurl', '//cdn.imagecurl').replace('_thumb.jpg', '.jpg').replace('_thumb.png', '.png')
                img.style = "max-width:none !important"
            }
        }
        else if (/modelmanagement.*\.com\/model\/.+/.test(location.href)) {//https://www.modelmanagement.com/model/laura-conchuela-castellot/
            let observer = new MutationObserver(function (mutations) {
                mutations.forEach(function (/* mutation */) {
                    for (let img of document.querySelectorAll("img")) {
                        if (/\.(?:jpg|png)(?=(?:$|(?:\?[^\/]+$)))/i.test(img.parentElement.href)) {
                            img.src = img.parentElement.href
                            saqui_BIG_img_DIV.appendChild(img)
                            console.log('原img的hrefjpg')
                        }
                    }
                });
            });
            observer.observe(document.querySelector("body"), { childList: true, subtree: true });
        }
        else {
            let goOnOriginIMG = true
            let thumb = /(?<=[_\/])(?:th_|tn_)(?=[^\/]*\.(?:jpg|png)$)/
            let allImgs = document.querySelectorAll('img')
            for (let img of allImgs) {
                if (thumb.test(img.src)) {
                    let _new_img = document.createElement('img')
                    // _new_img.className = 'saqui_BIG_img'
                    _new_img.src = img.src.replace(thumb, '')
                    img.removeAttribute('src')
                    saqui_BIG_img_DIV.appendChild(_new_img)
                    goOnOriginIMG = false
                    console.log('img_src_modified')
                }
            }
            if (goOnOriginIMG) {
                for (let img of allImgs) {
                    let hrefImg = img
                    while (hrefImg.parentElement && hrefImg.parentElement.tagName != 'A') {
                        hrefImg = hrefImg.parentElement
                    }
                    if (hrefImg.parentElement && /\.(?:jpg|png|webp)(?=(?:$|(?:\?[^\/]*$)))/i.test(hrefImg.parentElement.href)) {
                        img.removeAttribute('src')
                        img.removeAttribute('data-src')
                        img.removeAttribute('lsrc')
                        let _new_img = document.createElement('img')
                        // _new_img.className = 'saqui_BIG_img'
                        _new_img.src = hrefImg.parentElement.href
                        saqui_BIG_img_DIV.appendChild(_new_img)
                        goOnOriginIMG = false
                        console.log('hrefjpg')
                    }
                }
            }
            if (goOnOriginIMG) {
                for (let e of document.querySelectorAll("span[style]")) {
                    let mat = e.style.backgroundImage.match(/h*t*t*p*s*\/\/.*tn_\d+.jpg(?=.\)$)/)
                    if (mat) {
                        e.style = null
                        let img = document.createElement('img')
                        // img.className = 'saqui_BIG_img'
                        saqui_BIG_img_DIV.appendChild(img)
                        img.src = 'https:' + mat[0].replace(/tn_(?=\d+.jpg$)/, '')
                        console.log('span backgroundImage')
                    }
                }
            }
        }
    }
    if (saqui_BIG_img_DIV.querySelector('img')) {
        // HTMLDOM = document.lastChild
        // e_title.innerText = document.title
        // while (document.lastChild) document.lastChild.remove()
        // document.appendChild(document.implementation.createDocumentType('html', '', ''))
        // document.appendChild(document.createElement('html')).appendChild(e_title)
        // if (_info) document.documentElement.appendChild(_info)
        // document.documentElement.appendChild(saqui_BIG_img_DIV)//默认只留saqui_BIG_img_DIV
        // document.documentElement.appendChild(saveRef)
        // document.documentElement.appendChild(_zoomImg)

        insertSaquTopHead()



    }

})
function insertSaquTopHead() {
    if (!document.querySelector('#saquTopHead')) {
        let e_title = document.querySelector('title')
        if (e_title) saquTopHead.appendChild(e_title)
        if (_info) saquTopHead.appendChild(_info)
        saquTopHead.appendChild(saqui_BIG_img_DIV)//默认只留saqui_BIG_img_DIV
        saquTopHead.appendChild(saveRef)
        saquTopHead.appendChild(_zoomImg)
        document.documentElement.insertBefore(saquTopHead, document.documentElement.children[0])
    }
    addEventListener('resize', f_resize)
    addEventListener('mouseover', f_mouseover)
    addEventListener('mousemove', f_mousemove, { passive: false })
    addEventListener('mouseout', f_mouseout)
}
function imgSrc1(gallerySelector, thumb, origin) {
    for (let img of document.querySelectorAll(gallerySelector)) {
        let _new_img = document.createElement('img')
        // _new_img.className = 'saqui_BIG_img'
        _new_img.src = img.src.replace(thumb, origin)
        img.removeAttribute('src')//可能省网速
        saqui_BIG_img_DIV.appendChild(_new_img)
    }
    console.log('imgSrc1')
}
function nv(_existed_imgs_selector, _info_selector, _title_selector) {
    let _existed_imgs = document.querySelectorAll(_existed_imgs_selector)
    _info = document.querySelector(_info_selector)
    let _title = document.querySelector(_title_selector)
    if (!(_info && _title)) {
        return
    }
    for (let img of _existed_imgs) {
        img.style = null
        // img.className = 'saqui_BIG_img'
        saqui_BIG_img_DIV.appendChild(img)
    }
    let _nT = _info.innerText.match(/(?<=该图集包含)\d+(?=张照片)|(?<=图片数量：\s*)\d+(?=\s*张|P)/i)//numberText 以'图片数量：'开头的文本//图片数量： 84 张
    let _iN //imgNumber 图片数量
    if (_nT) {
        _iN = parseInt(_nT[0])
        let _iN1 = _existed_imgs.length//第一页的图片数量
        let _nth2c = _existed_imgs[1].cloneNode()//第二张图片的副本
        let _nth2T = _nth2c.src.match(/(?<=\/)\d+(?=\.jpg$)/i)[0]//第二张index的文本
        for (; _iN - _iN1 > 0; _iN1++) {
            let index = _iN1 + parseInt(_nth2T) - 1
            if (_nth2T.length > 1)
                _nth2c.src = _nth2c.src.replace(/\d+\.jpg/, "0".repeat(_nth2T.length - String(index).length) + index + '.jpg')
            else
                _nth2c.src = _nth2c.src.replace(/\d+\.jpg/, index + '.jpg')
            saqui_BIG_img_DIV.appendChild(_nth2c)
            _nth2c = _nth2c.cloneNode()
        }
    } else alert('获取图片数量失败!')
    let _head = document.documentElement.insertBefore(document.createElement('head'), document.documentElement.firstElementChild)
    _head.appendChild(_title)
    _info.id = 'info_saqui_BIG_img'
}
addEventListener('blur', function () {
    for (let v of document.querySelectorAll('video')) {
        v.pause()
        // document.body.appendChild(blurDiv)
    }
    // blurDiv.style.setProperty('visibility', 'visible')
})
if (/^https:\/\/.+\.youtube\.com/.test(location.href))
    addEventListener('focus', function () {
        let ytv = document.querySelector('#movie_player video')
        if (ytv)
            ytv.play()
        // blurDiv.style.setProperty('visibility', 'hidden')
    })
else if (/^https:\/\/.+\.pornhub\.com/.test(location.href))
    addEventListener('focus', function () {
        let porhv = document.querySelector('.mgp_videoWrapper>video')
        if (porhv)
            porhv.play()
        // blurDiv.style.setProperty('visibility', 'hidden')
    })
else
    addEventListener('focus', function () {
        if (!v0) v0 = document.querySelector('video')
        if (v0) {
            v0.play()
        }
        // blurDiv.style.setProperty('visibility', 'hidden')
    })
addEventListener('load', function () {

    // else 
    if (/https?:\/\/www\.pornstarsnaked\.com\/.+\/.+\/$/.test(location.href)) {
        imgSrc1('div.masonry:nth-child(1) > div:nth-child(1) img', /\/t_(?=\d+\.jpg$)/, '/')
    }
})

// if (!_DOMContentLoaded_exed && "loading" != document.readyState)
//     document.dispatchEvent(new Event("DOMContentLoaded", {
//         bubbles: true,
//         cancelable: true
//     }));
// function injectCustomJs(jsPath) {
//     if (jsPath.endsWith('.js')) {
//         var temp = document.createElement('script');
//         temp.setAttribute('type', 'text/javascript');
//         temp.src = chrome.runtime.getURL(jsPath);
//         temp.onload = function () {
//             this.remove();
//         };
//         if (document.body)
//             document.body.appendChild(temp);
//     }
// }
// function ioloadf(pinCode) {
//     if (/^https:\/\/io-oi\.xyz\/\d+\/content\/([^\/]+)\/index-mirror-(\d+)-(\d+)\.html/.test(location.href)) {//相册封面链接
//         let img1Src = `https://io-oi.xyz/${pinCode}/showimage/nudecollect-1/image00001-1-${RegExp.$2}-1/${RegExp.$1}/1/leg.xyz-${RegExp.$1}-image00001.jpg`
//         let s1 = RegExp.$1
//         let _amount_of_img = RegExp.$3
//         let ii = 1
//         e_title.innerText = s1
//         while (document.lastChild) { document.lastChild.remove() }
//         document.appendChild(document.implementation.createDocumentType('html', '', ''))
//         document.appendChild(document.createElement('html')).appendChild(e_title)
//         document.documentElement.appendChild(saqui_BIG_img_DIV)
//         function loadNextIMG() {
//             if (ii <= _amount_of_img) {
//                 let img = document.createElement('img')
//                 saqui_BIG_img_DIV.appendChild(img)
//                 img.onload = () => { ii++; loadNextIMG() }
//                 img.onerror = () => img.src = img.src.replace(/\/image0+/, '/image')
//                 img.src = img1Src.replace(/image00001/g, 'image' + '0'.repeat(5 - String(ii).length) + ii)
//             }
//         }
//         loadNextIMG()
//     }
//     else {
//         function loadf() {
//             let _reg_imgsrc = /(\/nudecollect-\d+\/(image\d+)-\d+-\d+-\d+\/([^\/]+)\/\d+\/)[^\/]+\.jpg/i
//             for (let img of document.querySelectorAll('.content img')) {
//                 if (_reg_imgsrc.test(img.src))
//                     img.src = `https://io-oi.xyz/${pinCode}/showimage${RegExp.$1}leg.xyz-${RegExp.$3}-${RegExp.$2}.jpg`
//             }
//         }
//         if (document.readyState == 'complete') loadf()
//         else addEventListener('load', loadf)
//     }
// }


