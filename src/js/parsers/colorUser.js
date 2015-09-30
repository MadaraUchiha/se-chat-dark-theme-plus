const userColorSheet = document.createElement('style');
const foundColorUsers = [];
document.head.appendChild(userColorSheet);
const hashCode = str => {
    let hash = 0;
    str += '!salty';
    for (var i = 0; i < str.length; i++) {
        hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    return hash;
};
const colorCode = i => {
	let val = Math.abs(i) % 360;
	return `hsl(${val}, 50%, 50%)`;
};
const writeToSheet = obj => {
    userColorSheet.textContent += `.user-${obj.key} .messages { border-top: solid .25em ${obj.color} !important; } `;
};
const colorUserParser = node => {
    if (node.classList.contains('user-container')) {
    	let sig = node.querySelector('a.signature');
    	if( !sig ) return; // not all user-container nodes are in the chat view. 
        let user = sig.getAttribute('href').split('/')[2];
        if (foundColorUsers.indexOf(user) === -1) { // Array.includes polyfill breaks the chat. Thanks Balpha! 
            foundColorUsers.push(user);
            writeToSheet({
                key: user,
                color: colorCode(hashCode(user))
            });
        }
    }
};
watcher.addParser(colorUserParser, '.user-container');