let v0
let toPreview = false
let saqui_BIG_img_DIV = document.querySelector('#saqui_BIG_img_DIV')
if (!saqui_BIG_img_DIV) {
    saqui_BIG_img_DIV = document.createElement('div')
    saqui_BIG_img_DIV.id = "saqui_BIG_img_DIV"
}
let _zoomImg = document.createElement('img')
_zoomImg.className = 'saquizoomImg'
let _zoom
let _ztop
let _zleft
let _info
let HTMLDOM
// let fullscreenratio
let RegExpStorage = /\.youtube\.com|instagram\.com|\.bilibili\.com|\.google\.com|\.baidu\.com|\.aliexpress\.com|\.taobao\.com|\.jd\.com|pinterest\.com|\.qq\.com|\.weibo\.com|\.douyu\.com|\.huya\.com|\.namethatpornstar\.com|\.facebook\.com|\.115\.com|\.rarbg|\.pixiv\.net|pornstarsnaked\.com/i;//不记录点击图片链接的规则^file:\/\/\/|

chrome.runtime.onMessage.addListener(function (message) {
    if (message._pause === true) {
        for (let v of document.querySelectorAll('video')) {
            v.pause()
        }
    }
})
document.addEventListener('DOMContentLoaded', function () {
    let vds = document.querySelectorAll("video")
    if (vds.length == 1)
        v0 = vds[0]
    if (document.querySelector('title') && document.querySelector('title').innerText.length > 215) {
        document.querySelector('title').setAttribute('o_title_text', document.querySelector('title').innerText)
        document.querySelector('title').innerText = document.querySelector('title').innerText.substr(0, 215)
    }
    if (!(saqui_BIG_img_DIV.querySelector('img') || /iwara.tv|wikipedia\.org|pinterest\.com|mydrivers\.com|baidu\.com|cnbeta\.com|github\.com/.test(location.href))) {
        if (/https:\/\/www\.pixiv\.net/.test(location.href)) {//https://www.pixiv.net/artworks/74299132  //https://www.pixiv.net/users/7243485/artworks 	
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
            let body = document.querySelector('body')
            saqui_BIG_img_DIV = document.querySelector('#saqui_BIG_img_DIV,#saquiimg')
            document.documentElement.insertBefore(saqui_BIG_img_DIV, body)//saquiimg是兼容以前保存的网页
            body.remove()
        }
        else if (/^https:\/\/(?:io-oi\.xyz|i8i8\.org)\/(\d+)\//i.test(location.href)) {//https://(?:io-oi\.xyz|i8i8\.org)/319672137410692/index.html
            let _tab_PIN_CODE = RegExp.$1
            let _reg_imgsrc = /^https:\/\/zyx\.io-oi\.xyz(\/nudecollect-\d+\/(image\d+)-\d+-\d+-\d+\/([^\/]+)\/\d+\/)[^\/]+\.jpg/i
            for (let img of document.querySelectorAll('img')) {
                if (_reg_imgsrc.test(img.src)) {
                    img.src = `https://io-oi.xyz/${_tab_PIN_CODE}/showimage${RegExp.$1}leg.xyz-${RegExp.$3}-${RegExp.$2}.jpg`
                }
            }
            if (document.documentElement.innerText.match('404 Not Found')) {
                chrome.runtime.sendMessage({
                    refresh_PINCODE: 1
                });
            }
        }
        else if (/http:\/\/www\.amourangels\.com\/z_model_\d+\.html/.test(location.href)) {//http://www.amourangels.com/z_model_1204.html
            document.querySelector("title").innerText = document.querySelector("#CenterBlock > table > tbody > tr:nth-child(2) > td > table > tbody > tr > td:nth-child(2) > p:nth-child(2)").innerText.match(/(?<=Name: )\w+/) + '---' + document.querySelector("title").innerText
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
                    _new_img.className = 'saqui_BIG_img'
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
                        _new_img.className = 'saqui_BIG_img'
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
                        img.className = 'saqui_BIG_img'
                        saqui_BIG_img_DIV.appendChild(img)
                        img.src = 'https:' + mat[0].replace(/tn_(?=\d+.jpg$)/, '')
                        console.log('span backgroundImage')
                    }
                }
            }
        }
    }

    if (saqui_BIG_img_DIV.querySelector('img')) {
        let _vimg
        let e_title = document.createElement('title')
        e_title.innerText = document.title
        HTMLDOM = document.lastChild
        while (document.lastChild) document.lastChild.remove()
        document.appendChild(document.implementation.createDocumentType('html', '', ''))
        document.appendChild(document.createElement('html')).appendChild(e_title)
        document.documentElement.appendChild(saqui_BIG_img_DIV)//默认只留saqui_BIG_img_DIV
        document.documentElement.appendChild(_zoomImg)
        saqui_BIG_img_DIV.addEventListener('mouseup', function (e) {
            if (e.button == 1) {
                if (HTMLDOM) {//中键回归原网页
                    HTMLDOM.insertBefore(saqui_BIG_img_DIV, HTMLDOM.querySelector('body'))
                    document.lastChild.remove()
                    document.appendChild(HTMLDOM)
                    HTMLDOM = null//原网页回归后 置为null
                }
                else {//HTMLDOM 为 null时,此时有原始网页//再次只留saqui_BIG_img_DIV
                    HTMLDOM = document.lastChild
                    document.lastChild.remove()
                    document.appendChild(document.createElement('html')).appendChild(e_title)
                    document.documentElement.appendChild(saqui_BIG_img_DIV)
                }
            }
        })
        addEventListener('mouseover', function (e) {
            if (e.target.className == 'saqui_BIG_img') {
                _vimg = e.target
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
                    _info.style.setProperty('display', 'none')
                e.target.title = `     ${e.target.naturalWidth} x ${e.target.naturalHeight}`
            }
            else if (e.target.tagName == 'IMG') {
                e.target.title = `     ${e.target.naturalWidth} x ${e.target.naturalHeight}`
            }
        })
        addEventListener('mousemove', function (e) {
            if (e.target.className == 'saqui_BIG_img') {
                if (toPreview) {
                    _zleft = window.innerWidth / 2 - e.offsetX * _zoom
                    _ztop = innerHeight / 2 - e.offsetY * _zoom
                    _zoomImg.style.setProperty('left', _zleft + 'px')
                    _zoomImg.style.setProperty('top', _ztop + 'px')
                }

            }
        },
            { passive: false })
        addEventListener('mouseout', function (e) {
            if (e.target.className == 'saqui_BIG_img') {
                document.documentElement.style.setProperty('cursor', 'auto')
                _zoomImg.style.setProperty('visibility', 'hidden')
                e.target.style.setProperty('opacity', '1')
                if (_info && (e.x <= e.target.offsetLeft)) {
                    _info.style.setProperty('display', 'block')
                }

            }
        })
        addEventListener('wheel', function (e) {
            if (e.target.className == 'saqui_BIG_img') {
                e.preventDefault()
                e.stopPropagation()
                if (e.deltaY > 0) {//往下滚动
                    if (e.target.offsetTop + e.target.height - (scrollY || (document.documentElement.scrollTop || (document.body ? document.body.scrollTop : 0))) - window.innerHeight > 1) {
                        if (toPreview) {
                            e.target.style.setProperty('opacity', '0')
                        }
                        _vimg = e.target
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
                    while (_vimg && (_vimg.naturalWidth == 0 && _vimg.naturalHeight == 0 || (_vimg.id != '_toEnd_DIV' && _vimg.offsetTop >= (scrollY || (document.documentElement.scrollTop || (document.body ? document.body.scrollTop : 0)))))) {
                        _vimg = _vimg.previousElementSibling
                    }
                    if (_vimg) {
                        if (toPreview && e.clientX > _vimg.offsetLeft && e.clientX < _vimg.offsetLeft + _vimg.width) {
                            _vimg.style.setProperty('opacity', '0')
                        }
                        _vimg.scrollIntoView()
                    }
                }
            }
            else if (e.clientX < 10 || e.altKey || e.ctrlKey) {
                e.preventDefault();
                e.stopPropagation()
                chrome.runtime.sendMessage({ deltaY: e.deltaY });
            }
            else {
                e.preventDefault(); scrollBy(0, innerHeight * Math.sign(e.deltaY))
            }

        },
            { capture: true, passive: false }
        );
        addEventListener('mousedown', function (e) {
            if (e.button == 0 && e.target.className == 'saqui_BIG_img') {
                _vimg = e.target
                _zoomImg.src = e.target.src
                _zoom = e.target.naturalWidth / e.target.width//getComputedStyle(e.target).width.substring(0, getComputedStyle(e.target).width.indexOf('px'))
                e.preventDefault()
                toPreview = !toPreview
                if (toPreview) {
                    e.target.style.setProperty('opacity', '0')
                    _zleft = window.innerWidth / 2 - e.offsetX * _zoom
                    _ztop = innerHeight / 2 - e.offsetY * _zoom
                    _zoomImg.style.setProperty('left', _zleft + 'px')
                    _zoomImg.style.setProperty('top', _ztop + 'px')
                    _zoomImg.style.setProperty('visibility', 'visible')
                    document.documentElement.style.setProperty('cursor', 'url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABAQMAAAAl21bKAAAAAXNSR0IB2cksfwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAANQTFRF////p8QbyAAAAApJREFUeJxjYAAAAAIAAUivpHEAAAAASUVORK5CYII=),text')
                }
                else {
                    document.documentElement.style.setProperty('cursor', 'auto')
                    _zoomImg.style.setProperty('visibility', 'hidden')
                    e.target.style.setProperty('opacity', '1')
                }
                toggleFullScreen()
                return
            }
            if (e.button == 1) {//video倍速
                if (e.target.tagName == 'VIDEO')
                    e.target.playbackRate = e.target.playbackRate == 1 ? 2 : 1
                else if (e.target.className == 'bilibili-player-dm-tip-wrap') {
                    if (!v0) v0 = document.querySelector('video')
                    v0.playbackRate = v0.playbackRate == 1 ? 2 : 1
                }
                else if (e.target.className == 'mgp_eventCatcher') {
                    v0 = document.querySelector('.mgp_videoWrapper>video')
                    v0.playbackRate = v0.playbackRate == 1 ? 2 : 1
                }
            }
            if (e.button != 2 && !RegExpStorage.test(location.href)) {
                let _target = e.target
                while (_target.parentElement && _target.parentElement.tagName != 'A') {
                    _target = _target.parentElement
                }
                if (_target.parentElement) {
                    let _img = _target.parentElement.querySelector('img')
                    if (_img) {
                        let _httpIndex = _target.parentElement.href.lastIndexOf('http');
                        let _andIndex = _target.parentElement.href.indexOf('&', _httpIndex);
                        let _redirectUrl
                        if (_andIndex > -1)
                            _redirectUrl = _target.parentElement.href.substring(_httpIndex, _andIndex);
                        else
                            _redirectUrl = _target.parentElement.href.substring(_httpIndex);
                        _redirectUrl = decodeURIComponent(_redirectUrl)
                        while (_redirectUrl != decodeURIComponent(_redirectUrl)) {
                            alert(_redirectUrl)
                            _redirectUrl = decodeURIComponent(_redirectUrl)
                        }
                        let zURL = _redirectUrl.replace(/\.html\?(?:\d|utm|spm\=|nats\=|trace\=).*/i, '.html').replace("://m.", "://www.").replace(/(?<!:)\/\//i, '/')
                        chrome.runtime.sendMessage({ bkmk: [_img.src, zURL] })
                    }
                }
                // else if (e.altKey && e.target.tagName == 'IMG' && _target.tagName == 'HTML') {
                //     chrome.runtime.sendMessage({ bkmk: [e.target.src, location.href] })
                // }
            }
            else if (e.altKey && e.button == 2) {//alt右键删除元素
                e.target.remove()
            }
        })
        // addEventListener(
        //     'scroll',
        //     function () {
        //         fullscreenratio = scrollY / document.documentElement.scrollHeight
        //     },
        //     { passive: false }
        // );
        addEventListener('resize', function () {
            // if (fullscreenratio) {
            //     scrollTo(0, document.documentElement.scrollHeight * fullscreenratio)
            // }
            if (_vimg)
                _vimg.scrollIntoView()
        })

    }
    else {
        addEventListener('mouseover', function (e) {
            if (e.target.tagName == 'IMG') {
                e.target.title = `     ${e.target.naturalWidth} x ${e.target.naturalHeight}`
            }
        })
        addEventListener('wheel', function (e) {
            if (e.clientX < 10 || e.altKey || e.ctrlKey) {
                e.preventDefault();
                e.stopPropagation()
                chrome.runtime.sendMessage({ deltaY: e.deltaY });
            }
        },
            { capture: true, passive: false }
        );
        addEventListener('mousedown', function (e) {
            if (e.button == 1) {//video倍速
                if (e.target.tagName == 'VIDEO')
                    e.target.playbackRate = e.target.playbackRate == 1 ? 2 : 1
                else if (e.target.className == 'bilibili-player-dm-tip-wrap') {
                    if (!v0) v0 = document.querySelector('video')
                    v0.playbackRate = v0.playbackRate == 1 ? 2 : 1
                }
                else if (e.target.className == 'mgp_eventCatcher') {
                    v0 = document.querySelector('.mgp_videoWrapper>video')
                    v0.playbackRate = v0.playbackRate == 1 ? 2 : 1
                }
            }
            if (e.button != 2 && !RegExpStorage.test(location.href)) {
                let _target = e.target
                while (_target.parentElement && _target.parentElement.tagName != 'A') {
                    _target = _target.parentElement
                }
                if (_target.parentElement) {
                    let _img = _target.parentElement.querySelector('img')
                    if (_img) {
                        let _httpIndex = _target.parentElement.href.lastIndexOf('http');
                        let _andIndex = _target.parentElement.href.indexOf('&', _httpIndex);
                        let _redirectUrl
                        if (_andIndex > -1)
                            _redirectUrl = _target.parentElement.href.substring(_httpIndex, _andIndex);
                        else
                            _redirectUrl = _target.parentElement.href.substring(_httpIndex);
                        _redirectUrl = decodeURIComponent(_redirectUrl)
                        while (_redirectUrl != decodeURIComponent(_redirectUrl)) {
                            alert(_redirectUrl)
                            _redirectUrl = decodeURIComponent(_redirectUrl)
                        }
                        let zURL = _redirectUrl.replace(/\.html\?(?:\d|utm|spm\=|nats\=|trace\=).*/i, '.html').replace("://m.", "://www.").replace(/(?<!:)\/\//i, '/')
                        chrome.runtime.sendMessage({ bkmk: [_img.src, zURL] })
                    }
                }
                // else if (e.altKey && e.target.tagName == 'IMG' && _target.tagName == 'HTML') {
                //     chrome.runtime.sendMessage({ bkmk: [e.target.src, location.href] })
                // }
            }
            else if (e.altKey && e.button == 2) {//alt右键删除元素
                e.target.remove()
            }
        })
    }
    // addEventListener('keydown', function (e) {
    //     if (e.key == 'F11') {
    //         e.preventDefault()
    //         toggleFullScreen();
    //     }
    //     if (e.target.tagName != 'INPUT') {//播放速度
    //         if (document.querySelector("video")) {
    //             if (e.key.toLowerCase() == 'x') {
    //                 let _playbackRate
    //                 let _videos = document.querySelectorAll("video")
    //                 if (_videos.length > 0) {
    //                     for (_video of _videos) {
    //                         if (!_video.paused) {
    //                             _playbackRate = _video.playbackRate
    //                             if (_playbackRate < 2) {
    //                                 _video.playbackRate = 2
    //                             }
    //                             else if (_playbackRate > 1) {
    //                                 _video.playbackRate = 1
    //                             }
    //                             break
    //                         }
    //                     }
    //                 }
    //             }
    //             if (e.key == 'ArrowRight' && e.ctrlKey) {
    //                 let _videos = document.querySelectorAll("video")
    //                 if (_videos.length > 0) {
    //                     for (_video of _videos) {
    //                         if (!_video.paused) {
    //                             _video.playbackRate = _video.playbackRate + 0.1 < 16 ? _video.playbackRate + 0.1 : 16
    //                             break
    //                         }
    //                     }
    //                 }
    //             }
    //             if (e.key == 'ArrowLeft' && e.ctrlKey) {
    //                 let _videos = document.querySelectorAll("video")
    //                 if (_videos.length > 0) {
    //                     for (_video of _videos) {
    //                         if (!_video.paused) {
    //                             _video.playbackRate = _video.playbackRate - 0.1 > 0 ? _video.playbackRate - 0.1 : 0.0625
    //                             break
    //                         }
    //                     }
    //                 }
    //             }
    //             if ((e.key == 'ArrowDown' || e.key == 'ArrowUp') && (e.ctrlKey || e.altKey)) {
    //                 let _videos = document.querySelectorAll("video")
    //                 if (_videos.length > 0) {
    //                     for (_video of _videos) {
    //                         if (!_video.paused) {
    //                             _video.playbackRate = 1
    //                             break
    //                         }
    //                     }
    //                 }
    //             }
    //         }
    //     }
    // })
})

function imgSrc1(gallerySelector, thumb, origin) {
    for (let img of document.querySelectorAll(gallerySelector)) {
        let _new_img = document.createElement('img')
        _new_img.className = 'saqui_BIG_img'
        _new_img.src = img.src.replace(thumb, origin)
        img.removeAttribute('src')//可能省网速
        saqui_BIG_img_DIV.appendChild(_new_img)
    }
    console.log('imgSrc1')
}
function toggleFullScreen() {
    if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen();
    } else {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        }
    }
}
function nv(_existed_imgs_selector, _info_selector, _title_selector) {
    let _existed_imgs = document.querySelectorAll(_existed_imgs_selector)
    _info = document.querySelector(_info_selector)
    let _title = document.querySelector(_title_selector)
    if (!(_info && _title)) {
        return
    }
    while (document.lastChild) document.lastChild.remove()
    document.appendChild(document.implementation.createDocumentType('html', '', ''))
    saqui_BIG_img_DIV = document.appendChild(document.createElement('html')).appendChild(document.createElement('div'))
    saqui_BIG_img_DIV.style.setProperty('position', 'relative', 'important')
    saqui_BIG_img_DIV.id = 'saqui_BIG_img_DIV'
    let _toEnd_DIV = saqui_BIG_img_DIV.appendChild(document.createElement('div'))
    _toEnd_DIV.id = '_toEnd_DIV'
    _toEnd_DIV.style.setProperty('position', 'absolute', 'important')
    _toEnd_DIV.style.setProperty('bottom', '0px', 'important')
    for (let img of _existed_imgs) {
        img.style = null
        img.className = 'saqui_BIG_img'
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
    _info.id = 'tujiinfo4646'
    saqui_BIG_img_DIV.appendChild(_info)
}
addEventListener('blur', function () {
    for (let v of document.querySelectorAll('video')) {
        v.pause()
    }
})
if (/https:\/\/.+\.pornhub\.com\//.test(location.href))
    addEventListener('focus', function () {
        document.querySelector('.mgp_videoWrapper>video').play()
    })
else
    addEventListener('focus', function () {
        if (!v0) v0 = document.querySelector('video')
        if (v0) {
            v0.play()
        }
    })
addEventListener('load', function () {
    if (/https?:\/\/www\.pornstarsnaked\.com\/.+\/.+\/$/.test(location.href)) {
        imgSrc1('div.masonry:nth-child(1) > div:nth-child(1) img', /\/t_(?=\d+\.jpg$)/, '/')
    }
    if (saqui_BIG_img_DIV.querySelector('img')) {
        let saveRef = saqui_BIG_img_DIV.appendChild(document.createElement('a'))
        saveRef.innerText = '源网址'
        saveRef.href = location.href
        saveRef.id = 'originURL4646'
    }
})
if (/https:\/\/(?:io-oi\.xyz|i8i8\.org)\/\d+\//i.test(location.href)) {//https://(?:io-oi\.xyz|i8i8\.org)/319672137410692/index.html
    let _PIN_CODE_REG = /(?<=^https:\/\/(?:io-oi\.xyz|i8i8\.org)\/)\d+(?=\/)/i
    chrome.runtime.onMessage.addListener(function (message) {
        if (message.backgroundPINCODE && message.backgroundPINCODE != location.href.match(_PIN_CODE_REG)[0]) {
            location.replace(location.href.replace(_PIN_CODE_REG, message.backgroundPINCODE))
        }
    })
    if ("complete" != document.readyState && /^(https:\/\/io-oi\.xyz\/\d+\/)content\/([^\/]+)\/index-mirror-(\d+)-(\d+)\.html/.test(location.href)) {//相册封面链接
        let img1Src = `${RegExp.$1}showimage/nudecollect-1/image00001-1-${RegExp.$3}-1/${RegExp.$2}/1/leg.xyz-${RegExp.$2}-image00001.jpg`
        let s2 = RegExp.$2
        let _amount_of_img = RegExp.$4
        let _amount_of_loaded_img = saqui_BIG_img_DIV.querySelectorAll('img').length
        if (_amount_of_loaded_img < _amount_of_img) {
            let ii = _amount_of_loaded_img ? _amount_of_loaded_img : 1
            let e_title = document.createElement('title')
            e_title.innerText = s2
            while (document.lastChild) {
                document.lastChild.remove()
            }
            document.appendChild(document.implementation.createDocumentType('html', '', ''))
            document.appendChild(document.createElement('html')).appendChild(e_title)
            document.documentElement.appendChild(saqui_BIG_img_DIV)
            function loadNextIMG() {
                if (ii <= _amount_of_img) {
                    let img = document.createElement('img')
                    img.className = 'saqui_BIG_img'
                    saqui_BIG_img_DIV.appendChild(img)
                    img.onload = function () {
                        if (this.naturalWidth == 802 && this.naturalHeight == 474) {
                            var canvas = document.createElement("canvas");
                            canvas.width = 802
                            canvas.height = 474
                            canvas.getContext("2d").drawImage(img, 0, 0);
                            if (canvas.toDataURL().length == 70754) {
                                chrome.runtime.sendMessage({ refresh_PINCODE: 1 });
                            }
                        }
                        else {
                            ii++
                            loadNextIMG()
                        }
                    }
                    img.onerror = function () {
                        console.log('eee')
                        console.log(img.src)
                        alert(img.src)
                        setTimeout(() => {
                            loadNextIMG()
                        }, 100);
                    }
                    img.src = img1Src.replace(/image00001/g, 'image' + '0'.repeat(5 - String(ii).length) + ii)
                    // fullscreenratio = scrollY / document.documentElement.scrollHeight
                }
            }
            loadNextIMG()
        }
    }
}
if ("loading" != document.readyState)
    document.dispatchEvent(new Event("DOMContentLoaded", {
        bubbles: true,
        cancelable: true
    }));
