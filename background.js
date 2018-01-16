function checkVersion() {
	const { version } = chrome.runtime.getManifest();
	chrome.storage.sync.get({version}, items => {
		if( items.version !== version ) {
			chrome.storage.sync.set({version}, () => {
				chrome.tabs.create({url: 'https://github.com/rlemon/se-chat-dark-theme-plus/blob/master/CHANGELOG.md'});
			});
		}
	});
}

checkVersion();