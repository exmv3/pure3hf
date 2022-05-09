let img_bookmark_DIV = document.querySelector('#img_bookmark_DIV')
let ibackground_PIN_CODE
chrome.storage.local.get('backgroundPINCODE', function (result) {
    ibackground_PIN_CODE = result.backgroundPINCODE
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
        chrome.bookmarks.getChildren(bkmkC0verFolderID, function (results) {
            let docFragment = new DocumentFragment()
            for (let b of results) {
                let btm = b.title.match(/(.*)-BkmkC0ver-(.*?)(?=-PgT-.*|$)/)
                if (!btm) continue
                let a = document.createElement('a')
                a.href = b.url
                let imgsrc = btm[2].replace(/(?<=^https:\/\/io-oi\.xyz\/)\d+(?=\/)/i, ibackground_PIN_CODE)
                a.title = btm[1].trim() || imgsrc
                let img = document.createElement('img')
                img.src = imgsrc
                a.appendChild(img)
                docFragment.insertBefore(a, docFragment.children[0])
            }
            img_bookmark_DIV.appendChild(docFragment)
            // img_bookmark_DIV.scrollIntoView()
            window.addEventListener(
                'dragstart',
                function (e) {
                    // e.preventDefault();
                    e.stopPropagation()
                    if (e.target.className != 'rr' && e.target.tagName == 'IMG' && /^\w+\:/.test(e.target.parentElement.href))
                        chrome.bookmarks.search({ url: e.target.parentElement.href }, function (results) {
                            if (results.length == 0) {
                                e.target.className = 'rr'
                                return
                            }
                            else if (results.length == 1) {
                                chrome.bookmarks.remove(results[0].id, function () { e.target.className = 'r' })
                            }
                            else if (results.length == 2) {
                                if (results[0].parentId == bkmkC0verFolderID)
                                    chrome.bookmarks.remove(results[0].id, function () { e.target.className = 'r' })
                                if (results[1].parentId == bkmkC0verFolderID)
                                    chrome.bookmarks.remove(results[1].id, function () { e.target.className = 'r' })
                            }
                            else if (results.length > 2) {
                                console.log('不删 > 2个书签')
                            }
                        })
                },
                { capture: true }
            );
        })
    }
});
chrome.storage.onChanged.addListener(function (changes, areaName) {
    if (changes.backgroundPINCODE && changes.backgroundPINCODE.newValue)
        ibackground_PIN_CODE = changes.backgroundPINCODE.newValue
})
chrome.bookmarks.onCreated.addListener(function (id, b) {
    if (ibackground_PIN_CODE && /(.*)-BkmkC0ver-(.*?)(?=-PgT-.*|$)/.test(b.title)) {
        let bkTitle = RegExp.$1
        let bkimgSrc = RegExp.$2.replace(/(?<=^https:\/\/io-oi\.xyz\/)\d+(?=\/)/i, ibackground_PIN_CODE)
        let a = document.createElement('a')
        a.href = b.url
        a.title = bkTitle && bkTitle.trim() ? bkTitle : bkimgSrc
        let img = document.createElement('img')
        img.src = bkimgSrc
        a.appendChild(img)
        img_bookmark_DIV.insertBefore(a, img_bookmark_DIV.children[0])
    }
})
chrome.bookmarks.onChanged.addListener(function (id, b) {//b : changeInfo只存有改变的属性
    chrome.bookmarks.get(id, function (bookmarksgot) {
        if (ibackground_PIN_CODE && b.title && /(.*)-BkmkC0ver-(.*?)(?=-PgT-.*|$)/.test(b.title)) {
            let bkTitle = RegExp.$1
            let bkimgSrc = RegExp.$2.replace(/(?<=^https:\/\/io-oi\.xyz\/)\d+(?=\/)/i, ibackground_PIN_CODE)
            let a = document.createElement('a')
            a.href = bookmarksgot[0].url
            a.title = bkTitle && bkTitle.trim() ? bkTitle : bkimgSrc
            let img = document.createElement('img')
            img.src = bkimgSrc
            a.appendChild(img)
            img_bookmark_DIV.insertBefore(a, img_bookmark_DIV.children[0])
        }
    })
})
let bookmark_table = document.querySelector('#bookmark_table')

function display_bookmark_table() {
    bookmark_table.innerHTML = ''
    chrome.bookmarks.search(this.value || 'zzzz', function (Items) {
        for (let item of Items) {
            let a = document.createElement('a')
            a.href = item.url
            a.innerText = item.title
            let tr = document.createElement('tr')
            let td_bookmarkId = document.createElement('td')
            td_bookmarkId.innerText = item.id
            tr.appendChild(td_bookmarkId)
            tr.appendChild(document.createElement('td')).appendChild(a)
            let td_dateAdded = document.createElement('td')
            td_dateAdded.innerText = new Date(item.dateAdded)
            tr.appendChild(td_dateAdded)
            bookmark_table.appendChild(tr)
        }
        bookmark_table.scrollIntoView()
    })
}
let input_bookmark = document.querySelector('#input_bookmark')
input_bookmark.addEventListener('input', display_bookmark_table)
input_bookmark.addEventListener('focus', display_bookmark_table)
input_bookmark.addEventListener('mousedown', function (e) {
    if (e.button == 1) {
        let tabactive = true
        for (let a of bookmark_table.querySelectorAll('a')) {
            chrome.tabs.create({
                url: a.href,
                active: tabactive
            })
            tabactive = false
        }
    }
})

chrome.storage.local.get('dialBookmarkFolderID', function (o) {
    if (o.dialBookmarkFolderID) displayDial(o.dialBookmarkFolderID)
    else chrome.bookmarks.getTree(
        function (results) {
            let newDialBookmarkFolderID
            if (navigator.userAgent.includes('Firefox')) newDialBookmarkFolderID = results[0].children[1].children[1].id
            else if (navigator.userAgent.includes('Chrome')) newDialBookmarkFolderID = results[0].children[0].children[1].id
            chrome.storage.local.set({ dialBookmarkFolderID: newDialBookmarkFolderID })
            displayDial(newDialBookmarkFolderID)
        }
    );
})
function displayDial(dialBookmarkFolderID) {
    chrome.bookmarks.getChildren(dialBookmarkFolderID, function (results) {//第二个书签文件夹
        let docFragment = new DocumentFragment()
        for (let b of results) {
            let a = document.createElement('a')
            a.href = b.url
            a.innerText = b.title
            docFragment.insertBefore(a, docFragment.children[0])
        }
        document.querySelector('#dial').appendChild(docFragment)
    })
}
let firefoxctxbookmarkfolder = document.querySelector('#firefoxctxbookmarkfolder')
if (navigator.userAgent.includes('Firefox'))
    chrome.runtime.onMessage.addListener(function (message) {
        if (message.bookmarkFolderId) {
            chrome.bookmarks.getChildren(message.bookmarkFolderId, function (results) {
                let docFragment = new DocumentFragment()
                for (let b of results) {
                    let a = document.createElement('a')
                    a.href = b.url
                    a.innerText = b.title
                    let tr = document.createElement('tr')
                    let tda = document.createElement('td')
                    tda.appendChild(a)
                    tr.appendChild(tda)
                    docFragment.insertBefore(tr, docFragment.children[0])
                }
                firefoxctxbookmarkfolder.innerHTML = ''
                firefoxctxbookmarkfolder.appendChild(docFragment)
                firefoxctxbookmarkfolder.scrollIntoView()
            })
        }
    })
addEventListener(
    'wheel',
    function (e) {
        if (e.clientX < 10 || e.altKey || e.ctrlKey) {
            e.preventDefault();
            chrome.runtime.sendMessage({ deltaY: e.deltaY });
        }
        else if (e.clientX < window.innerWidth / 4) {//document.documentElement.scrollTop + document.documentElement.clientHeight - document.documentElement.scrollHeight > -1//到底
            e.preventDefault();
            e.stopPropagation()
            if (e.deltaY > 0) {
                if (img_bookmark_DIV.querySelector('img'))
                    img_bookmark_DIV.scrollIntoView()
            } else
                scrollTo(0, 0)
        }
    },
    { capture: true, passive: false }
);

