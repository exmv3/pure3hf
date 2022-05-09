// let _toBestView = true
// let noFixed = true
// let no302 = true
let _unbookmarkTabs = []
let _UnBookmarkChecked
// let refresh_PINCODE_TabID
let backgroundPINCODE = '333'
let _resentTabs = ['default', 'default']
//http?http -> http ,直接访问网址中的http网址
chrome.webRequest.onBeforeRequest.addListener(
    LiteBeforeRequest,
    { urls: ["<all_urls>"], types: ["main_frame", "image", "media"] },
    ["blocking"]
);
let _RegExp = /^file:\/\/\/|login|github\.com|youtube\.com|taobao\.com|jd\.com|qq\.com|weibo\.com|douyu\.com|huya\.com|namethatpornstar\.com|facebook\.com|115\.com|anxia\.com|rarbg|21sextury\.com|tiktok\.com/i;//不屏蔽的规则   .replace(/html\?\d+x\d+.*/,'html')
let _Reg_t_http = /\=http|\.html\?(?:\d|utm|spm\=|nats\=|trace\=)|^https?:\/\/m\.|(?<!:)\/\//i
let _Reg_r_utm = /\.html\?(?:\d|utm|spm\=|nats\=|trace\=).*/i
let _Reg_jj = /(?<!:)\/\//i
let _Reg_pixivusers = /^https:\/\/\w+\.pixiv\.net\/users\/\d+$/i
let _Reg_iooi = /^https:\/\/(?:io-oi\.xyz|i8i8\.org)\/\d+\//i
let _Reg_iooi_pincode = /(?<=https:\/\/(?:io-oi\.xyz|i8i8\.org)\/)\d+(?=\/)/i
let _Reg_t_iwara = /^https:\/\/i\.iwara\.tv\/sites\/default\/files\/styles\/\w+\/public\/.+/
let _Reg_r_iwara = /\/styles\/\w+\/public\//
let _Reg_rr_iwara = /\?itok\=.+$/
let _Reg_t_indexxx = /^https:\/\/img\.indexxx\.com\/images\/thumbs\/\d+x\d+\//
let _Reg_r_indexxx = /\/thumbs\/\d+x\d+\//
let _Reg_t_amourangels = /^http:\/\/www\.amourangels\.com\/cm_cvl\/.+(?:video|photo)_2\.jpg$/
let _Reg_r_amourangels = /_2\.jpg$/
let _Reg_tt_amourangels = /^http:\/\/www\.amourangels\.com\/cm_models\/\d+_(?:thumb|big)_z\.jpg$/
let _Reg_rr_amourangels = /_(?:thumb|big)_z\.jpg$/
let _Reg_t_redgifs = /^https:\/\/thumbs2\.redgifs\.com\/.+-mobile\.mp4$/
let _Reg_r_redgifs = /-mobile\.mp4$/
function LiteBeforeRequest() {
    let _details = arguments[0]
    if (!_RegExp.test(_details.url) && _Reg_t_http.test(_details.url)) {
        let _httpIndex = _details.url.lastIndexOf('http');
        let _andIndex = _details.url.indexOf('&', _httpIndex);
        let _redirectUrl
        if (_andIndex > -1)
            _redirectUrl = _details.url.substring(_httpIndex, _andIndex);
        else
            _redirectUrl = _details.url.substring(_httpIndex);
        _redirectUrl = decodeURIComponent(_redirectUrl)
        while (_redirectUrl != decodeURIComponent(_redirectUrl)) {
            alert(_redirectUrl)
            _redirectUrl = decodeURIComponent(_redirectUrl)
        }
        let zURL = _redirectUrl.replace(_Reg_r_utm, '.html').replace("://m.", "://www.").replace(_Reg_jj, '/')
        // console.log(zURL, _details.url)
        if (zURL != _details.url)
            return { redirectUrl: zURL };
    }
    else if (_Reg_pixivusers.test(_details.url)) {
        return { redirectUrl: _details.url + '/artworks' };
    }
    else if (/* backgroundPINCODE != '333' &&  */_Reg_iooi.test(_details.url) && _details.url.match(_Reg_iooi_pincode)[0] != backgroundPINCODE) {
        return { redirectUrl: _details.url.replace(_Reg_iooi_pincode, backgroundPINCODE) };
    }
    // else if (backgroundPINCODE != '333' && /^https:\/\/zyx\.io-oi\.xyz(\/nudecollect-\d+\/(image\d+)-\d+-\d+-\d+\/([^\/]+)\/\d+\/)[^\/]+\.jpg/i.test(_details.url)) {
    //     return { redirectUrl: `https://io-oi.xyz/${backgroundPINCODE}/showimage${RegExp.$1}leg.xyz-${RegExp.$3}-${RegExp.$2}.jpg` };
    // }
    // else if (backgroundPINCODE != '333' && /^https:\/\/io-oi\.xyz\/(\d+)\/showimage\/.+\.jpg$/.test(_details.url) && RegExp.$1 != backgroundPINCODE) {
    //     return { redirectUrl: _details.url.replace(/(?<=^https:\/\/io-oi\.xyz\/)\d+(?=\/showimage\/)/, backgroundPINCODE) };
    // }
    // else if (/^https:\/\/ecchi\.iwara\.tv\/users\/\w+$/.test(_details.url)) {
    //     return { redirectUrl: _details.url + '/videos' };
    // }
    else if (_Reg_t_iwara.test(_details.url)) {
        return { redirectUrl: _details.url.replace(_Reg_r_iwara, '/').replace(_Reg_rr_iwara, '') };
    }
    else if (_Reg_t_indexxx.test(_details.url)) {
        return { redirectUrl: _details.url.replace(_Reg_r_indexxx, '/') };
    }
    else if (_Reg_t_amourangels.test(_details.url)) {
        return { redirectUrl: _details.url.replace(_Reg_r_amourangels, '.jpg') };
    }
    else if (_Reg_tt_amourangels.test(_details.url)) {
        return { redirectUrl: _details.url.replace(_Reg_rr_amourangels, '.jpg') };
    }
    else if (_Reg_t_redgifs.test(_details.url)) {
        return { redirectUrl: _details.url.replace(_Reg_r_redgifs, '.mp4') };
    }
}
// chrome.webRequest.onBeforeRequest.addListener(
//     function (_details) {
//         if (/https:\/\/thumbs2\.redgifs\.com\/.+-mobile\.mp4$/.test(_details.url)) {
//             return { redirectUrl: _details.url.replace(/-mobile\.mp4$/, '.mp4') };
//         }
//     },
//     { urls: ['https://thumbs2.redgifs.com/*'], types: ["media"] },
//     ["blocking"]
// );
// chrome.webRequest.onBeforeRequest.addListener(
//     function (_details) {
//         if (/^https:\/\/img\.indexxx\.com\/images\/thumbs\/\d+x\d+\//.test(_details.url)) {
//             return { redirectUrl: _details.url.replace(/\/thumbs\/\d+x\d+\//, '/') };
//         }
//     },
//     { urls: ["https://img.indexxx.com/*"], types: ["image"] },
//     ["blocking"]
// );
// chrome.webRequest.onBeforeRequest.addListener(
//     function (_details) {
//         if (/^https:\/\/img\.indexxx\.com\/images\/thumbs\/\d+x\d+\//.test(_details.url)) {
//             return { redirectUrl: _details.url.replace(/\/thumbs\/\d+x\d+\//, '/') };
//         }
//         else if (/^http:\/\/www\.amourangels\.com\/cm_cvl\/.+(?:video|photo)_2\.jpg$/.test(_details.url)) {
//             return { redirectUrl: _details.url.replace(/_2\.jpg$/, '.jpg') };
//         }
//         else if (/^http:\/\/www\.amourangels\.com\/cm_models\/\d+_(?:thumb|big)_z\.jpg$/.test(_details.url)) {
//             return { redirectUrl: _details.url.replace(/_(?:thumb|big)_z\.jpg$/, '.jpg') };
//         }
//         else if (/https:\/\/thumbs2\.redgifs\.com\/.+-mobile\.mp4$/.test(_details.url)) {
//             return { redirectUrl: _details.url.replace(/-mobile\.mp4$/, '.mp4') };
//         }
//     },
//     { urls: ["https://img.indexxx.com/*", "http://www.amourangels.com/cm_cvl/*", 'http://www.amourangels.com/cm_models/*', 'https://thumbs2.redgifs.com/*'], types: ["image", "media"] },
//     ["blocking"]
// );
// //Re302/307/303,只处理http开头的网址
// chrome.webRequest.onHeadersReceived.addListener(
//     function (_details) {
//         if (no302 && !_RegExp.test(_details.url) && (_details.statusCode == 302 || _details.statusCode == 307 || _details.statusCode == 303)) {/* return { redirectUrl: "https://developer.chrome.com/extensions/webRequest#type-BlockingResponse" }; */
//             for (let i = _details.responseHeaders.length - 1; i >= 0; --i) {
//                 if (_details.responseHeaders[i].name === "Location" && getHostName(_details.responseHeaders[i].value) != getHostName(_details.url) && _details.responseHeaders[i].value.indexOf("http") == 0) {
//                     // if (confirm("不要重定向到:\n" + _details.responseHeaders[i].value + '\n' + getHostName(_details.responseHeaders[i].value) + "\n" + getHostName(_details.url) + "\n" + _details.url))
//                     return { redirectUrl: _details.url };
//                     // break;
//                 }
//             }
//         }
//     },
//     { urls: ["<all_urls>"], types: ["main_frame"/* ,"image" */] },
//     ["blocking", "responseHeaders", "extraHeaders"]
// );
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (request.deltaY) {
        chrome.tabs.query({ currentWindow: true }, function (tabs) {
            var finalIndex = sender.tab.index + Math.sign(request.deltaY)
            if (finalIndex > -1 && finalIndex < tabs.length) {
                chrome.tabs.update(tabs[finalIndex].id, { active: true });
            }
            if (finalIndex == -1) {
                chrome.tabs.update(tabs[tabs.length - 1].id, { active: true });
            }
            if (finalIndex == tabs.length) {
                chrome.tabs.update(tabs[0].id, { active: true });
            }
        });
    }
    // if (request._KeepWheelswitch === true || request._KeepWheelswitch === false) {
    //     for (let tab of tabs) {
    //         chrome.tabs.sendMessage(tab.id, { _KeepWheelswitch: request._KeepWheelswitch });
    //     }
    // }
    if (request.bkmk) {
        chrome.bookmarks.search({ url: request.bkmk[1] }, function (results) {
            // console.log(results)
            if (results.length == 0) {
                chrome.bookmarks.create({ title: '-bookmark_cover-' + request.bkmk[0], url: request.bkmk[1] }, function (node) {
                    chrome.bookmarks.move(node.id, { parentId: 'kBLMxGY93XKE'/* , index: 0 */ })
                })
            }
            else if (results[0].title.indexOf('-bookmark_cover-') == -1) {
                chrome.bookmarks.update(results[0].id, { title: results[0].title + '-bookmark_cover-' + request.bkmk[0] })
            }
        })
    }
    if (request.url /* && request.active === false */) {
        chrome.tabs.create({
            /* index: 1, */
            url: request.url,
            active: false
        })
    }
    if (request.refresh_PINCODE) {
        // refresh_PINCODE_TabID = sender.tab.id
        // alert(refresh_PINCODE_TabID)
        // chrome.tabs.create({
        //     active: false,
        //     pinned: true,
        //     url: 'https://leg.xyz/index.php'
        // })
        xqlegxyz(sender.tab.id)
    }
    // if (request._PIN_CODE_found) {
    //     backgroundPINCODE = request._PIN_CODE_found
    //     chrome.tabs.sendMessage(refresh_PINCODE_TabID, { backgroundPINCODE: backgroundPINCODE });
    //     sendResponse('Got___PIN_CODE')
    // }
    // if (request.noFixed) {
    //     sendResponse(noFixed)
    // }
    // if (request._toBestView) {
    //     sendResponse(_toBestView)
    // }
});
// let arr_imagedata = new Uint8ClampedArray(1024)
//整块半透明紫
// for (var index = 0; index < arr_imagedata.length; index += 4) {
//     arr_imagedata[index] = 255    //表示该点的红色色值
//     arr_imagedata[index + 1] = 0//表示该点的绿色色值
//     arr_imagedata[index + 2] = 255 //表示该点的蓝色色值
//     arr_imagedata[index + 3] = 255 //表示该点的不透明度值,255完全不透明
// }
// //上半块透明
// for (var index = 0; index < arr_imagedata.length / 2; index += 4) {
//     arr_imagedata[index] = 255    //表示该点的红色色值
//     arr_imagedata[index + 1] = 0//表示该点的绿色色值
//     arr_imagedata[index + 2] = 255 //表示该点的蓝色色值
//     arr_imagedata[index + 3] = 0 //表示该点的不透明度值
// }
// //下半块紫
// for (var index = arr_imagedata.length / 2; index < arr_imagedata.length; index += 4) {
//     arr_imagedata[index] = 255    //表示该点的红色色值
//     arr_imagedata[index + 1] = 0//表示该点的绿色色值
//     arr_imagedata[index + 2] = 255 //表示该点的蓝色色值
//     arr_imagedata[index + 3] = 255 //表示该点的不透明度值
// }
// let imagedata = new ImageData(arr_imagedata, 16, 16)
// chrome.browserAction.setIcon({ imageData: imagedata })
// chrome.tabs.onCreated.addListener(function(tab){
//     if(tab.title=="新标签页"&&!tab.favIconUrl){
//         // console.log(tab.url)
//         chrome.tabs.query({title:"新tab"},function (tabs) {console.log(tabs)
//             // for (let t of tabs) {
//             //     console.log(t.favIconUrl)
//             // }
//             // console.log(tabs)
//             if(tabs.length==1){
//                 chrome.tabs.update(tabs[0].id, { active: true });
//                 chrome.tabs.remove(tab.id);
//             }
//         })
//     }
// })
chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
    if (changeInfo.url) {
        _UnBookmarkChecked = false
    }
    // if (tab.pinned && !tab.active && changeInfo.status == "complete" && tab.url == 'https://leg.xyz/index.php') {
    //     chrome.tabs.remove(tabId)
    // }
    // if (noFixed && changeInfo.status == "loading" && tab.url.indexOf('chrome') != 0) {
    //     chrome.tabs.insertCSS(tabId, { file: 'all.css', "runAt": "document_start" })//: Promise<object>
    // }
})
// function toggle_no302() {
//     no302 = !no302;
//     if (no302) {
//         for (var index = imagedata.data.length / 2; index < imagedata.data.length; index += 4) {
//             imagedata.data[index + 3] = 255 //表示该点的不透明度值
//         }
//         chrome.browserAction.setIcon({ imageData: imagedata })
//     }
//     else {
//         for (var index = imagedata.data.length / 2; index < imagedata.data.length; index += 4) {
//             imagedata.data[index + 3] = 100 //表示该点的不透明度值
//         }
//         chrome.browserAction.setIcon({ imageData: imagedata })
//     }
//     chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
//         chrome.tabs.reload(tabs[0].id)
//     })
// }
// function toggle_noFixed() {
//     noFixed = !noFixed
//     if (noFixed) {
//         for (var index = 0; index < imagedata.data.length / 2; index += 4) {
//             imagedata.data[index + 3] = 255 //表示该点的不透明度值
//         }
//         chrome.browserAction.setIcon({ imageData: imagedata })
//     }
//     else {
//         for (var index = 0; index < imagedata.data.length / 2; index += 4) {
//             imagedata.data[index + 3] = 100 //表示该点的不透明度值
//         }
//         chrome.browserAction.setIcon({ imageData: imagedata })
//     }
//     chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
//         chrome.tabs.sendMessage(tabs[0].id, { noFixed: noFixed });
//         // chrome.tabs.reload(tabs[0].id/* , function (){
//         // } */)
//         console.log(tabs[0].url.indexOf('chrome'));
//         if (tabs[0].url.indexOf('chrome') != 0) {
//             if (noFixed) {
//                 chrome.tabs.insertCSS(tabs[0].id, { file: 'all.css', "runAt": "document_start" })//: Promise<object>
//             }
//             else {
//                 chrome.tabs.removeCSS(tabs[0].id, { file: 'all.css' })//: Promise<object>
//             }
//         }
//     })
// }
// function toggle_toBestView() {
//     _toBestView = !_toBestView
//     if (_toBestView) {
//         for (var index = 0; index < imagedata.data.length; index += 4) {
//             imagedata.data[index] = 255    //表示该点的红色色值
//             imagedata.data[index + 1] = 0//表示该点的绿色色值
//             imagedata.data[index + 2] = 255 //表示该点的蓝色色值
//         }
//         chrome.browserAction.setIcon({ imageData: imagedata })
//     }
//     else {
//         for (var index = 0; index < imagedata.data.length; index += 4) {
//             imagedata.data[index] = 0    //表示该点的红色色值
//             imagedata.data[index + 1] = 0//表示该点的绿色色值
//             imagedata.data[index + 2] = 0 //表示该点的蓝色色值
//         }
//         chrome.browserAction.setIcon({ imageData: imagedata })
//     }
//     // chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
//     //     chrome.tabs.sendMessage(tabs[0].id, { _toBestView: _toBestView });
//     // })
//     chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
//         chrome.tabs.reload(tabs[0].id)
//     })
// }
// function toggle_disableAll() {
//     toggle_no302()
//     toggle_noFixed()
//     toggle_toBestView()
// }
let toolbarBookmarkFolder
chrome.bookmarks.getTree(
    function (results) {
        toolbarBookmarkFolder = results[0].children[1]
    }
);
chrome.commands.onCommand.addListener(function (command) {
    if (command == 'lastTab') {
        switch_to_lastTab()
    }
    // else if (command == 'toggle_toBestView') {
    //     toggle_toBestView()
    // }
    // else if (command == 'toggle_no302') {
    //     toggle_no302()
    // }
    // else if (command == 'toggle_noFixed') {
    //     toggle_noFixed()
    // }
    // else if (command == 'toggle_disableAll') {
    //     toggle_disableAll()
    // }
    else if (command == 'pixiv_like_all') {
        chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
            chrome.tabs.sendMessage(tabs[0].id, { _command: 'pixiv_like_all' });
        })
    }
    else if (command == 'CheckUnBookmark') {
        if (!_UnBookmarkChecked) {
            _unbookmarkTabs = []
            chrome.tabs.query({ currentWindow: true }, function (tabs) {
                for (let tab of tabs) {
                    chrome.bookmarks.search({ url: tab.url }, function (results) {
                        if (results.length == 0) { // alert('存在未收藏url:'+tab.url)
                            _unbookmarkTabs.push(tab.index)
                            if (tab.index == tabs.length - 1) {
                                chrome.tabs.query({ currentWindow: true, active: true }, function (ts) {
                                    if (_unbookmarkTabs.indexOf(ts[0].index) < _unbookmarkTabs.length - 1) {
                                        chrome.tabs.query({ currentWindow: true, index: _unbookmarkTabs[_unbookmarkTabs.indexOf(ts[0].index) + 1] }, function (tabs) {
                                            if (tabs.length > 0)
                                                chrome.tabs.update(tabs[0].id, { active: true });
                                        })
                                    }
                                    else if (_unbookmarkTabs.indexOf(ts[0].index) == _unbookmarkTabs.length - 1) {
                                        chrome.tabs.query({ currentWindow: true, index: _unbookmarkTabs[0] }, function (tabs) {
                                            if (tabs.length > 0)
                                                chrome.tabs.update(tabs[0].id, { active: true });
                                        })
                                    }
                                })
                                _UnBookmarkChecked = true
                            }
                        }
                    })
                }
            })
        } else {
            chrome.tabs.query({ currentWindow: true, active: true }, function (ts) {
                if (_unbookmarkTabs.indexOf(ts[0].index) < _unbookmarkTabs.length - 1) {
                    chrome.tabs.query({ currentWindow: true, index: _unbookmarkTabs[_unbookmarkTabs.indexOf(ts[0].index) + 1] }, function (tabs) {
                        if (tabs.length > 0)
                            chrome.tabs.update(tabs[0].id, { active: true });
                    })
                }
                else if (_unbookmarkTabs.indexOf(ts[0].index) == _unbookmarkTabs.length - 1) {
                    chrome.tabs.query({ currentWindow: true, index: _unbookmarkTabs[0] }, function (tabs) {
                        if (tabs.length > 0)
                            chrome.tabs.update(tabs[0].id, { active: true });
                    })
                }
            })
        }
        // if (tab.index > ts[0].index) {
        // }
        // chrome.tabs.query({ currentWindow: true, active: true }, function (ts) {
        // })
    }
    // else if(command == 'r1'){
    //     if (!no302) {
    //         no302 = true
    //         noFixed = true
    //         for (var index = 0; index < imagedata.data.length; index += 4) {
    //             imagedata.data[index + 3] = 255 //表示该点的不透明度值
    //         }
    //         chrome.browserAction.setIcon({ imageData: imagedata })
    //     }
    //     chrome.bookmarks.getTree(
    //         function (results) {
    //             let folderChildrens = results[0].children[0].children[0] ? results[0].children[0].children[0].children : results[0].children[1].children[0].children;
    //             let rBookMark = folderChildrens[Random(1, folderChildrens.length) - 1];
    //             chrome.tabs.create({
    //                 'url': rBookMark.url/* ,
    //                 'active':false */
    //             });
    //         }
    //     );
    // }
    else if (command.match(/^\d+$/i)) {
        // if (!no302) {
        //     no302 = true
        //     noFixed = true
        //     for (var index = 0; index < imagedata.data.length; index += 4) {
        //         imagedata.data[index + 3] = 255 //表示该点的不透明度值
        //     }
        //     chrome.browserAction.setIcon({ imageData: imagedata })
        // }
        let folderChildrens = toolbarBookmarkFolder.children[parseInt(command) - 1].children;
        chrome.tabs.create({ 'url': folderChildrens[Math.ceil(Math.random() * folderChildrens.length)].url });
    }
});
chrome.browserAction.onClicked.addListener(switch_to_lastTab);
//Context--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// chrome.contextMenus.create({
//     title: "百度:  %s",
//     contexts: ["selection"],
//     onclick: function (info, tab) {
//         // window.open("http://www.baidu.com/s?wd=" + encodeURIComponent(info.selectionText));
//         chrome.tabs.create({
//             'url': "http://www.baidu.com/s?wd=" + encodeURIComponent(info.selectionText)
//         });
//     }
// });
// chrome.contextMenus.create({
// 	title: "RARBG    %s",
// 	// contexts:["all"],
// 	contexts: ["selection"],
// 	onclick: function (info, tab) {
// 		// window.open("https://rarbgp2p.org/torrents.php?search=" + encodeURIComponent(info.selectionText));
// 		chrome.tabs.create({
// 			'url': "https://rarbgp2p.org/torrents.php?search=" + encodeURIComponent(info.selectionText)
// 		});
// 	}
// });
// chrome.contextMenus.create({
//     title: 'toggle_noFixed',//"🌟 "+
//     contexts: ["browser_action"],
//     onclick: toggle_noFixed
// });
// chrome.contextMenus.create({
//     title: 'toggle_no302',//"🌟 "+
//     contexts: ["browser_action"],
//     onclick: toggle_no302
// });
// chrome.contextMenus.create({
//     title: 'toggle_toBestView',//"🌟 "+
//     contexts: ["browser_action"],
//     onclick: toggle_toBestView
// });
// chrome.contextMenus.create({
//     title: 'toggle_disableAll',//"🌟 "+
//     contexts: ["browser_action"],
//     onclick: toggle_disableAll
// });
// chrome.contextMenus.create({
//     title: 'delete_local',//"🌟 "+
//     contexts: ["browser_action"],
//     onclick: delete_local
// });
// function delete_local() {
//     chrome.storage.local.getBytesInUse((bytesInUse) => console.log(bytesInUse))
//     chrome.storage.local.clear(() => { chrome.storage.local.getBytesInUse((bytesInUse) => console.log(bytesInUse)) })
// }

function ff(id) {
    clearInterval(id)
    let intevID = setInterval(() => {
        console.log('intevID: ', intevID)
        ff(intevID)
    }, 1000);
}
ff()
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
    }
});
// chrome.contextMenus.create({
//     title: 'tab',//"🌟 "+
//     type: 'checkbox',
//     checked: true,
//     contexts: ["tab"],
//     onclick: function (info,tab) {
//         console.log(info)
//         console.log(tab)
//     }
// });
chrome.contextMenus.create({
    title: '左键添加书签 🌟 右键随机打开5个书签',//"🌟 "+
    contexts: ["bookmark"],
    onclick: function (info) {
        if (info.button == 0)
            chrome.bookmarks.get(info.bookmarkId, function (ar) {//添加书签到指定文件夹
                if (!ar[0].url) {
                    chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
                        chrome.bookmarks.search({ url: tabs[0].url }, function (results) {
                            if (results.length > 0)
                                chrome.bookmarks.move(results[0].id, { parentId: info.bookmarkId/* , index: 0 */ })
                            else
                                chrome.bookmarks.create({ title: tabs[0].title, url: tabs[0].url }, function (node) {
                                    chrome.bookmarks.move(node.id, { parentId: info.bookmarkId/* , index: 0 */ })
                                })
                        })
                    })
                }
            })
        else if (info.button == 2)
            chrome.bookmarks.getChildren(info.bookmarkId, function (bookmarks) {//指定文件夹随机书签
                for (let i = 0; i < 5; i++)
                    chrome.tabs.create({ 'url': bookmarks[Math.ceil(Math.random() * bookmarks.length)].url });
            })
    }
});
// chrome.contextMenus.create({
//     title: 'RandomBookmark',//"🌟 "+
//     contexts: ["bookmark"],
//     onclick: function (info) {
//     }
// });
// browser.menus.onShown.addListener(info => {
//     if (info.bookmarkId) {
//         console.log('info.bookmarkId:')
//         console.log(info.bookmarkId)
//         // chrome.bookmarks.getChildren(info.bookmarkId, function (bookmarks) {//指定文件夹随机书签
//         //     chrome.tabs.create({ 'url': bookmarks[Math.ceil(Math.random() * bookmarks.length)].url });
//         // })
//     }
// });
// chrome.contextMenus.create({
//     title: 'all',//"🌟 "+
//     type: 'checkbox',
//     checked: true,
//     contexts: ["all"],
//     onclick: function (info,tab) {
//         console.log(info)
//         console.log(tab)
//     }
// });
chrome.contextMenus.create({
    title: '🌟设为书签封面',//"🌟 "+
    contexts: ["image"],
    onclick: function (info) {
        chrome.bookmarks.search({ url: info.pageUrl }, function (results) {
            if (results.length == 1)
                chrome.bookmarks.update(results[0].id, { title: results[0].title.replace(/-bookmark_cover-.*|$/, '-bookmark_cover-' + info.srcUrl) })
            else if (results.length == 0) {
                chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
                    chrome.bookmarks.create({ title: tabs[0].title + '-bookmark_cover-' + info.srcUrl, url: tabs[0].url }, function (node) {
                        chrome.bookmarks.move(node.id, { parentId: 'kBLMxGY93XKE'/* , index: 0 */ })
                    })
                })
            }
            else if (results.length > 1) {
                for (let b of results) {
                    chrome.bookmarks.update(b.id, { title: b.title.replace(/-bookmark_cover-.*|$/, '-bookmark_cover-' + info.srcUrl) })
                }
                alert('重复书签!!!')
            }
        })
    }
});
// chrome.contextMenus.create({
//     title: 'page',//"🌟 "+
//     type: 'checkbox',
//     checked: true,
//     contexts: ["page"],
//     onclick: function (info,tab) {
//         console.log(info)
//         console.log(tab)
//     }
// });
// chrome.contextMenus.create({
//     title: 'page_action',//"🌟 "+
//     type: 'checkbox',
//     checked: true,
//     contexts: ["page_action"],
//     onclick: function (info,tab) {
//         console.log(info)
//         console.log(tab)
//     }
// });
// chrome.contextMenus.create({
//     title: 'tools_menu',//"🌟 "+
//     type: 'checkbox',
//     checked: true,
//     contexts: ["tools_menu"],
//     onclick: function (info,tab) {
//         console.log(info)
//         console.log(tab)
//     }
// });
// chrome.contextMenus.create({
//     title: 'link',//"🌟 "+
//     type: 'checkbox',
//     checked: true,
//     contexts: ["link"],
//     onclick: function (info,tab) {
//         console.log(info)
//         console.log(tab)
//     }
// });
// chrome.tabs.query({ active: false }, function (tabs) {
//     for (let t of tabs) {
//         chrome.tabs.update(t.id, { muted: true })
//     }
// })
// chrome.tabs.onActivated.addListener(function (activeInfo) {
//     chrome.tabs.update(activeInfo.tabId, { muted: false }, function () {
//         chrome.tabs.query({ active: false }, function (tabs) {
//             for (let t of tabs) {
//                 chrome.tabs.update(t.id, { muted: true })
//             }
//         })
//     });
// })
// //自动启动汇总页
// chrome.tabs.create({
//     index: 0,
//     url: "/iii.html",
//     active: false
// })
// chrome.tabs.onCreated.addListener(
//     function (tab) {
//         console.log(tab)
//     }
// )
// chrome.tabs.query({ active: false }, function (tabs) {//插件启动,发送命令暂停全部tab视频
//     for (let t of tabs) {
//         chrome.tabs.sendMessage(t.id, { _pause: true });
//     }
// })
chrome.tabs.onActivated.addListener(function (activeInfo) {
    // chrome.tabs.sendMessage(activeInfo.tabId, { _play: true });//激活tab,发送命令自动播放激活的tab视频
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
//批量修改书签临时命令
// chrome.bookmarks.search('lanvshen.com', function (rs) {
//     // console.log(rs)
//     for (const i of rs) {
//         console.log(i)
//         chrome.bookmarks.update(i.id, {url:i.url.replace('lanvshen.com','tujigu.com')}, function (){console.log(1111)})
//     }
// })
// //2021年12月16日
// chrome.bookmarks.search('/image-1-pics-', function (r) {
//     for (let b of r) {
//         // console.log(b.url.replace(/\/image-1-pics-(\d+)-mirror-(\d+).html/,'/index-mirror-$2-$1.html'))
//         chrome.bookmarks.update(b.id, { url: b.url.replace(/\/image-1-pics-(\d+)-mirror-(\d+).html/,'/index-mirror-$2-$1.html') })
//         console.log(505)
//     }
// })
// //2021年12月19日
// chrome.bookmarks.search('-bookmark_cover-https://zyx.io-oi.xyz/nudecollect-', function (r) {
//     console.log(r.length)
//     let _reg_imgsrc = /https:\/\/zyx\.io-oi\.xyz(\/nudecollect-\d+\/(image\d+)-\d+-\d+-\d+\/([^\/]+)\/\d+\/)[^\/]+\.jpg/i
//     for (let b of r) {
//         if (_reg_imgsrc.test(b.title)) {
//             chrome.bookmarks.update(b.id, { title: `-bookmark_cover-https://io-oi.xyz/3/showimage${RegExp.$1}leg.xyz-${RegExp.$3}-${RegExp.$2}.jpg` })
//             console.log(`-bookmark_cover-https://io-oi.xyz/3/showimage${RegExp.$1}leg.xyz-${RegExp.$3}-${RegExp.$2}.jpg`)
//         }
//     }
// })
// //2022年1月29日
// chrome.bookmarks.search('-bookmark_cover-', function (r) {
//     console.log(r.length)
//     for (let b of r) {
//         // chrome.bookmarks.update(b.id, { title: b.title.replace('-bookmark_cover-','-BkmkC0ver-') })
//         console.log(b.title.replace('-bookmark_cover-','-BkmkC0ver-'))
//     }
// })
// //2022年1月30日
// chrome.bookmarks.search('-BkmkC0ver-', function (r) {
//     console.log(r.length)
//     for (let b of r) {
//         // chrome.bookmarks.update(b.id, { title: b.title.replace('-bookmark_cover-','-BkmkC0ver-') })
//         if (b.title.match(/.+-BkmkC0ver-/i)) {

//             console.log(b.title.length)
//         }
//     }
// })
// //2022年1月30日1
// chrome.bookmarks.search('-BkmkC0ver-', function (r) {
//     console.log(r.length)
//     for (let b of r) {
//         console.log('ooo',b.title)
//         console.log('rrr',b.title.replace(/(.*)-BkmkC0ver-(.*)/,'$2-BkmkC0ver-$1'))
//     }
// })
// //2022年1月30日2
// chrome.bookmarks.search('http', function (r) {
//     console.log(r.length)
//     let ii = 0
//     for (let b of r) {
//         if (b.title.includes('-BkmkC0ver-')) ii++
//     }
//     console.log(ii)
// })
//2022年1月30日2
chrome.bookmarks.search('http', function (r) {
    console.log(r.length)
    for (let b of r) {
        if (!b.url) {console.log(b)}
    }
})
chrome.bookmarks.search(':', function (r) {
    console.log(r.length)
})
chrome.bookmarks.search({}, function (r) {
    console.log(r.length)
    let ii = 0
    for (let b of r) {
        if (b.url&&!b.url.includes('http')) {ii++;console.log(b)}
    }
    console.log(ii)
})
function switch_to_lastTab() {
    if (_resentTabs[0] != 'default')
        chrome.tabs.update(_resentTabs[0], { active: true })
}
function xqlegxyz(tabID) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            try {
                backgroundPINCODE = this.responseText.match(/https:\/\/io-oi\.xyz\/(\d+)\/index\.html/)[1]
                if (tabID) chrome.tabs.sendMessage(tabID, { backgroundPINCODE: backgroundPINCODE });
                // console.log(backgroundPINCODE)
            } catch (error) {
                console.log(666, error)
                xhttp.onreadystatechange = function () {
                    if (this.readyState == 4 && this.status == 200) {
                        try {
                            xhttp.onreadystatechange = function () {
                                if (this.readyState == 4 && this.status == 200) {
                                    backgroundPINCODE = this.responseText.match(/https:\/\/io-oi\.xyz\/(\d+)\/index\.html/)[1]
                                    if (tabID) chrome.tabs.sendMessage(tabID, { backgroundPINCODE: backgroundPINCODE });
                                    // console.log(backgroundPINCODE)
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
