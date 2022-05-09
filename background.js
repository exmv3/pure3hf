// chrome.storage.local.clear()
chrome.storage.local.remove('backgroundPINCODE')
let _Reg_iooi = /^https:\/\/io-oi\.xyz\/\d+\/(.*)/i
let liveBkmkC0verFolderID
chrome.bookmarks.onCreated.addListener(bookmarksFolderChangeF)
chrome.bookmarks.onMoved.addListener(bookmarksFolderChangeF)
function bookmarksFolderChangeF(id, info) {
    if (info.parentId == '1') {
        chrome.bookmarks.getChildren('1', (bks) => {
            chrome.storage.local.set({ bkmkC0verFolderID: bks[0].id }, () => liveBkmkC0verFolderID = bks[0].id)
            chrome.storage.local.set({ dialBookmarkFolderID: bks[1].id })
        })
    }
}
chrome.storage.local.get('bkmkC0verFolderID', function (o) {
    if (o.bkmkC0verFolderID) bkmkC0verFolderIDGot(o.bkmkC0verFolderID)
    else chrome.bookmarks.getTree(
        function (results) {
            let newBkmkC0verFolderID
            if (navigator.userAgent.includes('Firefox')) newBkmkC0verFolderID = results[0].children[1].children[0].id
            else if (navigator.userAgent.includes('Chrome')) newBkmkC0verFolderID = results[0].children[0].children[0].id
            chrome.storage.local.set({ bkmkC0verFolderID: newBkmkC0verFolderID })
            bkmkC0verFolderIDGot(newBkmkC0verFolderID)
        }
    );
})
function bkmkC0verFolderIDGot(bkmkC0verFolderID) {
    liveBkmkC0verFolderID = bkmkC0verFolderID
    chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
        if (request.deltaY) {
            chrome.tabs.query({ currentWindow: true }, function (tabs) {
                let finalIndex = sender.tab.index + Math.sign(request.deltaY)
                if (finalIndex > -1 && finalIndex < tabs.length) {
                    chrome.tabs.update(tabs[finalIndex].id, { active: true });
                }
                else if (finalIndex == -1) {
                    chrome.tabs.update(tabs[tabs.length - 1].id, { active: true });
                }
                else if (finalIndex == tabs.length) {
                    chrome.tabs.update(tabs[0].id, { active: true });
                }
            });
        }
        if (request.bkmk) {
            function bkmkf(results) {
                // let reg_iooiTitle = /^https:\/\/io-oi\.xyz\/\d+\/content\/([^\/]+)\/index-mirror-\d+-\d+\.html/
                if (results.length == 0) {
                    chrome.bookmarks.create({ title: '-titl-' + request.bkmk.titl + '-BkmkC0ver-' + request.bkmk.BkmkC0ver + '-PgT-' + request.bkmk.PgT + '-Pg0k-' + request.bkmk.Pg0k, url: request.bkmk.zURL }, function (node) {
                        chrome.bookmarks.move(node.id, { parentId: liveBkmkC0verFolderID/* , index: 0 */ }, function () {
                            sendResponse('新书签加封面')
                        })
                    })
                }
                // else if (results.length == 1) {
                //     if (!results[0].title.includes('-BkmkC0ver-')) {
                //         chrome.bookmarks.update(results[0].id, { title: '-titl-' + results[0].title.trim() + request.bkmk.titl + '-BkmkC0ver-' + request.bkmk.BkmkC0ver + '-PgT-' + request.bkmk.PgT + '-Pg0k-' + request.bkmk.Pg0k }, function () {
                //             sendResponse('加封面')
                //         })
                //     }
                //     else sendResponse('不改封面')
                // }
                else if (results.length == 1) {
                    if (results[0].parentId == liveBkmkC0verFolderID) {
                        if (results[0].title.includes('-BkmkC0ver-'))
                            sendResponse('不改封面')
                        else alert('BkmkC0ver文件夹混入无封面书签\n' + results[0].url)
                    } else {
                        if (results[0].title.includes('-BkmkC0ver-')) alert('封面书签不在BkmkC0ver文件夹\n' + results[0].url)
                        else
                            chrome.bookmarks.create({ title: '-titl-' + request.bkmk.titl + '-BkmkC0ver-' + request.bkmk.BkmkC0ver + '-PgT-' + request.bkmk.PgT + '-Pg0k-' + request.bkmk.Pg0k, url: request.bkmk.zURL }, function (node) {
                                chrome.bookmarks.move(node.id, { parentId: liveBkmkC0verFolderID/* , index: 0 */ }, function () {
                                    sendResponse('加封面备份书签')
                                })
                            })
                    }
                }
                else if (results.length == 2) {
                    if (results[0].parentId == liveBkmkC0verFolderID && results[1].parentId != liveBkmkC0verFolderID) {
                        if (results[0].title.includes('-BkmkC0ver-'))
                            sendResponse('不改封面')
                        else alert('BkmkC0ver文件夹混入无封面书签\n' + results[0].url)
                    } else if (results[0].parentId != liveBkmkC0verFolderID && results[1].parentId == liveBkmkC0verFolderID) {
                        if (results[1].title.includes('-BkmkC0ver-'))
                            sendResponse('不改封面')
                        else alert('BkmkC0ver文件夹混入无封面书签\n' + results[1].url)
                    } else {
                        alert('xxx2个非备份cover重复书签!未更改书签封面!')
                    }
                }
                else { sendResponse('不敢处理重复书签') }
            }
            if (_Reg_iooi.test(request.bkmk.zURL)) {
                let noNumberURL = RegExp.$1
                chrome.bookmarks.search(noNumberURL, function (results) {
                    bkmkf(results)
                })
            } else
                chrome.bookmarks.search({ url: request.bkmk.zURL }, function (results) {
                    bkmkf(results)
                })
            return true
        }
    })
    chrome.contextMenus.create({
        title: '🌟设为书签封面',//"🌟 "+
        contexts: ["image"],
        onclick: function (info, tab) {
            function imgctxcovf(results) {
                if (results.length == 0) {
                    chrome.bookmarks.create({ title: '-titl-' + (tab.url.match(/^https:\/\/io-oi\.xyz\/\d+\/content\/([^\/]+)\/index-mirror-\d+-\d+\.html/) && RegExp.$1 || tab.title.trim()) + '-BkmkC0ver-' + info.srcUrl, url: tab.url }, function (node) {
                        chrome.bookmarks.move(node.id, { parentId: liveBkmkC0verFolderID/* , index: 0 */ })
                    })
                }
                else if (results.length == 1) {
                    if (results[0].parentId == liveBkmkC0verFolderID) {
                        if (results[0].title.includes('-BkmkC0ver-'))
                            chrome.bookmarks.update(results[0].id, {
                                title: results[0].title.replace(/-BkmkC0ver-.*?(?=-PgT-.*|$)|$/, '-BkmkC0ver-' + info.srcUrl)
                            })
                        else alert('BkmkC0ver文件夹混入无封面书签\n' + results[0].url)
                    } else {
                        if (results[0].title.includes('-BkmkC0ver-')) alert('封面书签不在BkmkC0ver文件夹\n' + results[0].url)
                        else
                            chrome.bookmarks.create({ title: '-titl-' + (tab.url.match(/^https:\/\/io-oi\.xyz\/\d+\/content\/([^\/]+)\/index-mirror-\d+-\d+\.html/) && RegExp.$1 || tab.title.trim()) + '-BkmkC0ver-' + info.srcUrl, url: tab.url }, function (node) {
                                chrome.bookmarks.move(node.id, { parentId: liveBkmkC0verFolderID/* , index: 0 */ })
                            })
                    }
                }
                else if (results.length == 2) {
                    if (results[0].parentId == liveBkmkC0verFolderID && results[1].parentId != liveBkmkC0verFolderID) {
                        chrome.bookmarks.update(results[0].id, {
                            title: results[0].title.replace(/-BkmkC0ver-.*?(?=-PgT-.*|$)|$/, '-BkmkC0ver-' + info.srcUrl)
                        })
                    } else if (results[0].parentId != liveBkmkC0verFolderID && results[1].parentId == liveBkmkC0verFolderID) {
                        chrome.bookmarks.update(results[1].id, {
                            title: results[1].title.replace(/-BkmkC0ver-.*?(?=-PgT-.*|$)|$/, '-BkmkC0ver-' + info.srcUrl)
                        })
                    } else {
                        alert('xxx2个非备份cover重复书签!未更改书签封面!')
                    }
                }
                else {//alert message content script alert
                    alert("xxx有重复书签!未更改书签封面!")
                    alert(`xxxurl: ${info.pageUrl}`)
                    chrome.notifications.create({
                        "type": "basic",
                        "iconUrl": chrome.runtime.getURL("icon32.png"),
                        "title": "有重复书签!未更改书签封面!",
                        "message": `url: ${info.pageUrl}`
                    });
                }
            }
            if (_Reg_iooi.test(info.pageUrl)) {
                let noNumberURL = RegExp.$1
                chrome.bookmarks.search(noNumberURL, function (results) {
                    imgctxcovf(results)
                })

            }
            else
                chrome.bookmarks.search({ url: info.pageUrl }, function (results) {
                    imgctxcovf(results)
                })
        }
    })
}
chrome.webRequest.onBeforeRequest.addListener(
    LiteBeforeRequest,
    { urls: ["<all_urls>"], types: ["main_frame", "image", "media"] },
    ["blocking"]
);
let _RegExp = /^file:\/\/\/|login|github\.com|youtube\.com|taobao\.com|jd\.com|qq\.com|weibo\.com|douyu\.com|huya\.com|namethatpornstar\.com|facebook\.com|115\.com|anxia\.com|rarbg|21sextury\.com|tiktok\.com/i;//不屏蔽的规则   .replace(/html\?\d+x\d+.*/,'html')
function LiteBeforeRequest(_details) {
    if (!_RegExp.test(_details.url) && /\=http|(?:(?<=\.html)\?\d|\??utm|\??spm\=|\??nats\=|\??trace\=|\??ref\=)|^https?:\/\/m\.|(?<!:)\/\//i.test(_details.url)) {
        let _httpIndex = _details.url.lastIndexOf('http');
        let _andIndex = _details.url.indexOf('&', _httpIndex);
        let _redirectUrl
        if (_andIndex > -1)
            _redirectUrl = _details.url.substring(_httpIndex, _andIndex);
        else
            _redirectUrl = _details.url.substring(_httpIndex);
        let zURL = decodeURIComponent(_redirectUrl).replace(/(?:(?<=\.html)\?\d|\??utm|\??spm\=|\??nats\=|\??trace\=|\??ref\=).*/i, '').replace("://m.", "://www.").replace(/(?<!:)\/\//i, '/')
        if (zURL != _details.url)
            return { redirectUrl: zURL };
    }
    else if (/https\:\/\/i\.ytimg\.com\/vi\/.+(\/hqdefault\.jpg)/.test(_details.url)) {
        return { redirectUrl: _details.url.replace(RegExp.$1, '/maxresdefault.jpg') };
    }
    else if (/^https:\/\/\w+\.pixiv\.net\/users\/\d+$/i.test(_details.url)) {
        return { redirectUrl: _details.url + '/artworks' };
    }
    else if (/^https:\/\/i\.iwara\.tv\/sites\/default\/files\/styles\/\w+\/public\/.+/.test(_details.url)) {
        return { redirectUrl: _details.url.replace(/\/styles\/\w+\/public\//, '/').replace(/\?itok\=.+$/, '') };
    }
    else if (/^https:\/\/img\.indexxx\.com\/images\/thumbs\/\d+x\d+\//.test(_details.url)) {
        return { redirectUrl: _details.url.replace(/\/thumbs\/\d+x\d+\//, '/') };
    }
    else if (/^http:\/\/www\.(?:amourangels|showybeauty)\.com\/cm_cvl\/.+(?:video|photo)_2\.jpg$/.test(_details.url)) {
        return { redirectUrl: _details.url.replace(/_2\.jpg$/, '.jpg') };
    }
    else if (/^http:\/\/www\.(?:amourangels|showybeauty)\.com\/cm_models\/\d+_(?:thumb|big)_z\.jpg$/.test(_details.url)) {
        return { redirectUrl: _details.url.replace(/_(?:thumb|big)_z\.jpg$/, '.jpg') };
    }
    else if (/^https:\/\/thumbs2\.redgifs\.com\/.+-mobile\.mp4$/.test(_details.url)) {
        return { redirectUrl: _details.url.replace(/-mobile\.mp4$/, '.mp4') };
    }
}
chrome.contextMenus.create({
    title: '1 http',//"🌟 "+
    type: 'checkbox',
    checked: true,
    contexts: ["browser_action"],
    onclick: function (info) {
        if (info.checked) {
            chrome.webRequest.onBeforeRequest.addListener(
                LiteBeforeRequest,
                { urls: ["<all_urls>"], types: ["main_frame"] },
                ["blocking"]
            );
        }
        else {
            chrome.webRequest.onBeforeRequest.removeListener(LiteBeforeRequest)
        }
        chrome.tabs.reload()
    }
});


let iiiurl = chrome.runtime.getURL('iii.html')
if (navigator.userAgent.includes('Firefox')) {
    chrome.contextMenus.create({
        title: '左键添加书签 🌟 右键随机打开5个书签',//"🌟 "+
        contexts: ["bookmark"],
        onclick: function (info) {
            if (info.button == 0)
                chrome.bookmarks.get(info.bookmarkId, function (ar) {//添加书签到指定文件夹
                    if (!ar[0].url) {
                        chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
                            chrome.bookmarks.search({ url: tabs[0].url }, function (results) {
                                if (results.length == 0)
                                    chrome.bookmarks.create({ title: tabs[0].title, url: tabs[0].url }, function (node) {
                                        chrome.bookmarks.move(node.id, { parentId: info.bookmarkId/* , index: 0 */ })
                                    })
                                else if (results.length == 1)
                                    chrome.bookmarks.move(results[0].id, { parentId: info.bookmarkId/* , index: 0 */ })
                                else
                                    chrome.notifications.create({
                                        "type": "basic",
                                        "iconUrl": chrome.runtime.getURL("icon32.png"),
                                        "title": "有重复书签!未移动书签",
                                        "message": `url: ${tabs[0].url}`
                                    });
                            })
                        })
                    }
                })
            else if (info.button == 1)
                chrome.bookmarks.getChildren(info.bookmarkId, function (bookmarks) {//指定文件夹随机书签
                    for (let i = 0; i < 5; i++)
                        chrome.tabs.create({ 'url': bookmarks[Math.ceil(Math.random() * bookmarks.length)].url });
                })
            else if (info.button == 2)
                chrome.tabs.query({ url: iiiurl }, function (tabs) {
                    if (tabs.length == 0) {
                        chrome.tabs.create({ pinned: true, url: iiiurl }, function (tab) {
                            chrome.tabs.sendMessage(tab.id, { bookmarkFolderId: info.bookmarkId })
                        })
                    }
                    else {
                        chrome.tabs.update(tabs[0].id, { active: true })
                        chrome.tabs.sendMessage(tabs[0].id, { bookmarkFolderId: info.bookmarkId })
                    }
                })
        }
    });
}
let _resentTabs = ['default', 'default']
chrome.tabs.onActivated.addListener(function (activeInfo) {
    chrome.tabs.query({ active: false/* , audible: true */ }, function (tabs) {//激活tab,发送命令暂停其它tab视频
        for (let t of tabs) {
            chrome.tabs.sendMessage(t.id, { _pause: true })
        }
    })
    _resentTabs.push(activeInfo.tabId)
    _resentTabs.shift()
})
chrome.tabs.onRemoved.addListener(function (tabId) {
    if (_resentTabs[0] == tabId) _resentTabs[0] = 'default'
    if (_resentTabs[1] == tabId) _resentTabs[1] = 'default'
})
function switch_to_lastTab() {
    if (_resentTabs[0] != 'default')
        chrome.tabs.update(_resentTabs[0], { active: true })
}
chrome.browserAction.onClicked.addListener(switch_to_lastTab);
chrome.commands.onCommand.addListener(function (command) {
    if (command == 'lastTab') {
        switch_to_lastTab()
    }
});
let renewT
function xqlegxyz(intevID0) {
    clearInterval(intevID0)
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            try {
                chrome.storage.local.set({ backgroundPINCODE: this.responseText.match(/https:\/\/io-oi\.xyz\/(\d+)\/index\.html/)[1] }, () => {
                    renewT = Date.now() + 60000 * parseInt(this.responseText.match(/Next renew remaining.+?(\d+)/)[1])
                    let intevID = setInterval(() => {
                        if (Date.now() > renewT) {
                            console.log('bbbbrunning intevID: ', intevID, ';  minn: ', this.responseText.match(/Next renew remaining.+?(\d+)/)[1])
                            xqlegxyz(intevID)
                        }
                    }, 1000);
                })
            } catch (error) {
                console.log(666, error)
                xhttp.onreadystatechange = function () {
                    if (this.readyState == 4 && this.status == 200) {
                        try {
                            xhttp.onreadystatechange = function () {
                                if (this.readyState == 4 && this.status == 200) {
                                    chrome.storage.local.set({ backgroundPINCODE: this.responseText.match(/https:\/\/io-oi\.xyz\/(\d+)\/index\.html/)[1] }, () => {
                                        renewT = Date.now() + 60000 * parseInt(this.responseText.match(/Next renew remaining.+?(\d+)/)[1])
                                        let intevID = setInterval(() => {
                                            if (Date.now() > renewT) {
                                                console.log('bbbbindex.php!!! running intevID: ', intevID)
                                                xqlegxyz(intevID)
                                            }
                                        }, 1000);
                                    })
                                }
                            };
                            xhttp.open("GET", "https://leg.xyz/" + this.responseText.match(/\/showcode\.php\?check\=\d+/)[0], true);
                            xhttp.send();
                        } catch (error) {
                            console.log('要登录', error)
                            chrome.tabs.create({ url: 'https://leg.xyz/index.php' })
                        }
                    }
                };
                xhttp.open("GET", "https://leg.xyz/index.php", true);
                xhttp.send();
            }
        }
    };
    xhttp.open("GET", "https://leg.xyz/showcode.php?check=185482727812550", true);
    xhttp.send();
}
xqlegxyz()
