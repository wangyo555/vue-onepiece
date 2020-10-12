// addLoadEvent函数
function addLoadEvent(func) {
    var oldonload = window.onload;
    if (typeof window.onload != 'function') {
        window.onload = func;
    } else {
        window.onload = function() {
            oldonload();
            func();
        }
    }

}

// 自定义getElementByClassName()函数
function getElementsByClassName(node, classname) {
    if (node.getElementByClassName) {
        return node.getElementByClassName(classname);
    } else {
        var results = new Array();
        var elems = node.getElementsByTagName('*');
        for (var i = 0; i < elems.length; i++) {
            if (elems[i].className.indexOf(classname) != -1) {
                // 写法一
                results.push(elems[i]);
                // 写法二
                // results[results.length] = elems[i];            
            }
        }
        return results;
    }
}

// 自定义insertAfter函数
function insertAfter(newElement, targetElement) {
    var parent = targetElement.parentNode;
    if (targetElement == parent.lastChild) {
        parent.appendChild(newElement);
    } else {
        parent.insertBefore(newElement, targetElement.nextSibling);
    }
}

// 自定义addClass函数
function addClass(element, classname) {
    if (!element.className) {
        element.className = classname;
    } else {
        element.className += ' ' + classname;
    }
}

/* 
 * 4.4 图片库示例
 */
// 显示图片
function showPic(whichpic) {
    var src = whichpic.getAttribute('href');
    var title = whichpic.getAttribute('title') ? whichpic.getAttribute('title') : '';
    var placeholder = document.getElementById('placeholder');
    if (!placeholder) return false;
    var desc = document.getElementById('description');
    if (!desc) return false;
    placeholder.setAttribute('src', src);
    if (desc.firstChild.nodeType == '3') {
        desc.firstChild.nodeValue = title;
    }
    return true; // 用于检测函数是否执行成功
}

// 准备工作
function prepareGallery() {
    // 兼容性检测
    if (!document.getElementById) return false;
    if (!document.getElementsByTagName) return false;

    var gallery = document.getElementById('imagegallery');
    if (!gallery) return false; // 检测该元素时否存在，不存在则退出执行

    var links = gallery.getElementsByTagName('a');
    for (var i = 0; i < links.length; i++) {
        links[i].onclick = function() {
            // 如果showPic()执行不成功，就允许a链接的默认行为
            // 下列语句函数同样会执行
            return !showPic(this);

            // 第二种写法
            // return showPic(this) ? false : true;
        }
    }
}
// 准备占位图
function preparePlaceholder() {
    if (!document.createElement) return false;
    if (!document.createTextNode) return false;
    var placeholder = document.createElement('img');
    placeholder.setAttribute('id', 'placeholder');
    placeholder.setAttribute('class', 'placeholder');
    placeholder.setAttribute('src', 'img/placeholder.jpg');
    placeholder.setAttribute('alt', 'my image gallery');
    var description = document.createElement('p');
    description.setAttribute('id', 'description');
    description.setAttribute('class', 'description');
    var desctext = document.createTextNode('Choose an image.');
    description.appendChild(desctext);
    var gallery = document.getElementById('imagegallery');
    insertAfter(placeholder, gallery);
    insertAfter(description, placeholder);
}

/**
 * 8.3 缩略语列表
 */
// 缩略语列表
function displayAbbreviations() {
    // 取得所有缩略语
    var abbrs = document.getElementsByTagName('abbr');
    if (abbrs.length < 1) return false;
    var defs = new Array();
    // 遍历这些缩略语
    for (var i = 0; i < abbrs.length; i++) {
        var cur_abbr = abbrs[i];
        var definition = cur_abbr.getAttribute('title');
        var key = cur_abbr.lastChild.nodeValue;
        defs[key] = definition;
    }
    // 创建缩略语列表
    var dlist = document.createElement('dl');
    for (key in defs) {
        var definition = defs[key];
        // 创建标题
        var dtitle = document.createElement('dt');
        var dtitle_text = document.createTextNode(key);
        dtitle.appendChild(dtitle_text);
        // 创建描述
        var ddesc = document.createElement('dd');
        var ddesc_text = document.createTextNode(definition);
        ddesc.appendChild(ddesc_text);
        dlist.appendChild(dtitle);
        dlist.appendChild(ddesc);
    }
    if (dlist.childNodes.length < 1) return false;
    var header = document.createElement('h2');
    header.style.marginTop = '15px';
    var header_text = document.createTextNode('Abbreviations:');
    header.appendChild(header_text);
    document.body.appendChild(header);
    document.body.appendChild(dlist);
}

// 文献来源链接表
function displayCitations() {
    var quotes = document.getElementsByTagName('blockquote');
    for (var i = 0; i < quotes.length; i++) {
        // 获取标记
        var cur_quote = quotes[i];
        var src = cur_quote.getAttribute('cite');
        // 如果没有引用链接就继续下次循环
        if (!src) continue;
        // 创建标记
        var link = document.createElement('a');
        link.setAttribute('href', src);
        var link_text = document.createTextNode('[Source]');
        link.appendChild(link_text);
        var superscript = document.createElement('sup');
        superscript.appendChild(link);
        // 获取最后一个元素，将source添加进去
        var quote_children = cur_quote.getElementsByTagName('*');
        if (quote_children.length < 1) continue;
        var last_elem = quote_children[quote_children.length - 1];
        last_elem.appendChild(superscript);
    }
}

// 显示快捷键列表
function displayAccesskeys() {
    var links = document.getElementsByTagName('a');
    //    创建保存快捷键的数组
    var akeys = new Array();
    for (var i = 0; i < links.length; i++) {
        var cur_link = links[i];
        var key = cur_link.getAttribute('accesskey');
        if (!key) continue;
        var link_text = cur_link.lastChild.nodeValue;
        akeys[key] = link_text;
    }
    var keylist = document.createElement('ul');
    for (key in akeys) {
        var list_item = document.createElement('li');
        var item_text = document.createTextNode(key + ': ' + akeys[key]);
        list_item.appendChild(item_text);
        keylist.appendChild(list_item);
    }
    var header = document.createElement('h2');
    var header_text = document.createTextNode('Accesskeys:');
    header.appendChild(header_text);
    document.body.appendChild(header);
    document.body.appendChild(keylist);
}

// 表格隔行换色
function stripeTables() {
    var tables = document.getElementsByTagName('table');
    var rows;
    for (var i = 0; i < tables.length; i++) {
        rows = tables[i].getElementsByTagName('tr');
        for (var j = 0; j < rows.length; j++) {
            if (j % 2 == 1) {
                // rows[j].style.backgroundColor = '#fcc';
                addClass(rows[j], 'strip');
            }
        }
    }
}

function highlightRows() {
    var rows = document.getElementsByTagName('tr');
    for (var i = 0; i < rows.length; i++) {
        var cur_row = rows[i];
        cur_row.onmouseover = function() {
            this.style.fontWeight = 'bold';
        }
        cur_row.onmouseout = function() {
            this.style.fontWeight = 'normal';
        }
    }
}

/**
 * 动画基础
 */
function positionMessage() {
    var msg = document.getElementById('message');
    if (!msg) return false;
    msg.style.position = 'absolute';
    msg.style.left = '100px';
    msg.style.top = '50px';
    moveElement(msg, 300, 500, 300);

}
// 运动函数
// 参数：
// @element 目标元素
// @final_x 目的水平坐标
// @final_y 目标垂直坐标
// @interval 运动速度
function moveElement(element, final_x, final_y, interval) {
    var x = parseInt(element.style.left);
    var y = parseInt(element.style.top);
    if (!x) x = 0;
    if (!y) y = 0;
    if (element.movement) {
        clearTimeout(element.movement);
    }
    var final_x, final_y, interval, step;
    if (x == final_x && y == final_y) {
        return false;
    }
    if (x < final_x) {
        step = Math.ceil((final_x - x) / 10);
        x += step;
    } else if (x > final_x) {
        step = Math.ceil((x - final_x) / 10);
        x -= step;
    }
    if (y < final_y) {
        step = Math.ceil((final_y - y) / 10);
        y += step;
    } else if (y > final_y) {
        step = Math.ceil((y - final_y) / 10);
        y -= step;
    }

    element.style.left = x + 'px';
    element.style.top = y + 'px';

    // var repeat = 'moveElement(' + element + ',' + final_x + ',' + final_y + ',' + interval + ')';
    element.movement = setTimeout(function() { moveElement(element, final_x, final_y, interval); }, interval);
    console.log(x, y);
}

// 准备幻灯片
function prepareSlider() {
    var links = document.getElementsByTagName('a');
    var slide_box = document.getElementById('preview');
    if (!slide_box) return false;
    var slide = slide_box.getElementsByTagName('img')[0];
    for (var i = 0; i < links.length; i++) {
        (function() {
            var cur_link = links[i];
            var index = i + 1;
            var pos_x = -320 * index;
            cur_link.onmouseover = function() {
                moveElement(slide, pos_x, 0, 30);
            };
        })(i);
    }
}