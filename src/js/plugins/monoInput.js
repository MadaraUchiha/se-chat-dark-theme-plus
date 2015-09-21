(function() {
    "use strict";
    let input = document.getElementById('input');
    let monoFont = 'Hack';
    let defaultFont = window.getComputedStyle(input).fontFamily;
    input.addEventListener('keydown', e => {
        if (e.shiftKey && e.keyCode === 13) {
            e.preventDefault();
            let lastLine = input.value.split(/\r\n?|\n/).pop();
            input.value += '\r\n';
            let lastLineSpaces = lastLine.match(/^\s+/);
            lastLineSpaces = lastLineSpaces ? lastLineSpaces[0] : null;
            if (lastLineSpaces.length >= 4) {
                let block = !!lastLine.trim().match(/{$/);
                if (block) {
                    input.value += lastLineSpaces + '    ';
                } else {
                    input.value += lastLineSpaces;
                }
            }
        }
    });
    input.addEventListener('keyup', e => {
        let lines = input.value.split(/\r\n?|\n/);
        let isCode = lines.every(line => line.substr(0, 4) === '    ');
        if (isCode) {
            if (e.shiftKey && e.which === 221) {
                e.preventDefault();
                input.value = input.value.slice(0, -5) + '}';
            }
            input.style.fontFamily = monoFont;
        } else {
            input.style.fontFamily = defaultFont;
        }
    });
}())