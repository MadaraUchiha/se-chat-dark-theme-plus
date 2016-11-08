// const defaults = {

// 	base_css: true,						// the base dark theme css

// 	inline_youtube: true,				// makes youtube videos play inline the chat

// 	collapse_onebox: true, 				// can collapse

// 	collapse_onebox_default: true, 		// default option for collapse

// 	user_color_bars: true,				// show colored bars above users message blocks

// 	fish_spinner: true,					// fish spinner is best spinner

// 	inline_imgur: true,					// inlines webm,gifv,mp4 content from imgur

// 	visualize_hex: true,				// underlines hex codes with their colour values

// 	syntax_highlight_code: true,		// guess at language and highlight the code blocks

// 	emoji_translator: true,				// emoji translator for INPUT area

// 	code_mode_editor: true				// uses CodeMirror for your code inputs


// };


// const fileLocations = {
// 	base_css: 'css/style.css',
// 	inline_youtube: 'js/inline_youtube.js',
// 	collapse_onebox: 'js/collapse_onebox.js',
// 	user_color_bars: 'js/user_color_bars.js',
// 	fish_spinner: 'js/fish_spinner.js',
// 	inline_imgur: 'js/inline_imgur.js',
// 	visualize_hex: 'js/visualize_hex.js',
// 	syntax_highlight_code: 'js/syntax_highlight_code.js',
// 	emoji_translator: 'js/emoji_translator.js',
// 	code_mode_editor: 'js/code_mode_editor.js'
// };
// chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
// 	console.log('here');
// 	const filename = chrome.extension.getURL('css/style.css');
// 	console.log(filename);
// 	chrome.tabs.insertCSS(tabId, {file: 'css/style.css'}, _ => {
// 		chrome.tabs.executeScript( tabId, { code: 'document.body.style.opacity = 1' });
// 	});
// });

// // chrome.storage.sync.get(defaults, loadExtension);

// // function loadExtension(options) {
// // 	const loading = [];
// // 	for( const key of Object.keys(options) ) {
// // 		if( !options[key] || !( key in fileLocations)) continue;
// // 		const [type, file] = fileLocations[key].split('/');
// // 		loading.push({file, type});
// // 	}
// // 	injector(loading, _ => {
// // 		chrome.tabs.executeScript({
// // 			code: '(typeof DOMObserver !== "undefined") && DOMObserver.drain() && alert(1)'
// // 		});
// // 	});
// // }

// // function injector([first, ...rest], cb) {
// // 	if( !first ) return cb();
// // 	const file = first.type + '/' + first.file;
// // 	if( first.type === 'js' ) {
// // 		chrome.tabs.executeScript(null, {file}, _ => injector(rest, cb));
// // 	} else {
// // 		chrome.tabs.insertCSS(null, {file}, _ => injector(rest, cb));
// // 	}
// // }