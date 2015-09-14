const userColorSheet = document.createElement('style');
const foundColorUsers = [];
document.head.appendChild(userColorSheet);
const hashCode = str => {
    let hash = 0;
    str += '!';
    for (var i = 0; i < str.length; i++) {
        hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    return -hash;
};
const colorCode = i => {
    return '#' + (Math.min((i >> 24) & 0xFF, 175).toString(16) + 
    	Math.min((i >> 16) & 0xFF, 175).toString(16) + 
    	Math.min((i >> 8) & 0xFF, 175).toString(16) + 
    	Math.min(i & 0xFF, 175).toString(16)).slice(0, 6);
};
const writeToSheet = obj => {
    userColorSheet.textContent += `.${obj.key} .messages { border-top: solid .25em ${obj.color} !important; } `;
};
const colorUserParser = node => {
    if (node.classList && node.classList.contains('user-container')) {
        let user = node.querySelector('a.signature').getAttribute('href').split('/')[2];
        if (!foundColorUsers.includes(user)) {
            foundColorUsers.push(user);
            writeToSheet({
                key: user,
                color: colorCode(hashCode(user))
            });
        }
    }
};
watcher.addParser(colorUserParser);