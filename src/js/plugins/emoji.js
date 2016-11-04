(function() {
    "use strict";
    const input = document.getElementById('input');
    input.addEventListener('keyup', event => {
        if( event.which !== 32 ) return;
        input.value = input.value.split(' ').map(word => {
        	const found = emojiData.find(item => item.triggers.includes(word));
        	if( found ) {
        		return found.emoji;
        	}
        	return word;
        }).join(' ');
    });
}())