(function() {
    "use strict";
    let input = document.getElementById('input');
    let monoFont = 'Hack, monospace';
    let defaultFont = window.getComputedStyle(input).fontFamily;
    input.addEventListener('keyup', e => {
        let lines = input.value.split(/\r\n?|\n/);
        let isCode = lines.every(line => line.substr(0, 4) === '    ');
        if (isCode) {
            input.style.fontFamily = monoFont;
        } else {
            input.style.fontFamily = defaultFont;
        }
    });
}())