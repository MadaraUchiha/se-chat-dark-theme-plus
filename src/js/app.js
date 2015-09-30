// this is an ugly fix to a race condition on chat load. 
// a proper solution is to re-work the watcher class so I can use MutationObserver to do this. 
// but I'm fucking lazy right now. Maybe tomorrow. 
(function fuckthisisugly() { 
	if( document.querySelector('#loading') ) {
		return setTimeout(fuckthisisugly, 10);
	}
	watcher.drain();
}());