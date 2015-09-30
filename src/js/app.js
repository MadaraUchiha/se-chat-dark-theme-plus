// so I had to add 'watchers' so I could pick up the loading message being removed. 
// problems: I can't see the parent container, only the <i>loading...</i> node. 
// I also see this node 4 times :/ 
// solution was to look for the textContent and remove the watcher once it is hit
// watchers are confusing, I know. They are parsers but for removedNodes instead of addedNodes
// I should probably think of a new name for them. 
// Suggestions are welcome. 

// const loadingDelay = node => {
// 	if( node.textContent === 'loading…' ) {
// 		watcher.drain();
// 		watcher.removeWatcher(loadingDelay);
// 	}
// }
// let loaded = !document.querySelector('#loading');  // chat loads faster for some
// if( !loaded ) {
// 	console.log('not loaded, adding watcher');
// 	watcher.addWatcher(loadingDelay);
// } else {
// 	console.log('loaded, draining');
// 	watcher.drain();
// }

// fuck this shit ^ 
// I'm not pleased. 
(function fuckthisisugly() {
	if( document.querySelector('#loading') ) {
		return setTimeout(fuckthisisugly, 10);
	}
	watcher.drain();
}());