const form = document.getElementById('optForm');
const message = document.getElementById('message');
form.onsubmit = save;
load();
function save(e) {
	e.preventDefault();
	let data = {};
	Array.from(form.elements).forEach( element => {
	if( element.type === 'submit' || element.type === 'button' ) return;
		data[element.id] = getValue(element); // only works for checkboxes obviously. 
	});
	chrome.storage.sync.set(data, report('settings saved'));
}
function load() {
	let data = {};
	Array.from(form.elements).forEach( element => {
		if( element.type === 'submit' || element.type === 'button' ) return;
		data[element.id] = true;
	})
	chrome.storage.sync.get(data, items => {
		Object.keys(items).forEach(key => setValue(form.elements[key], items[key]));
	});
}
function report(text, delay = 5000) {
	return function() {
		message.textContent = text;
		setTimeout(_ => message.textContent = '', delay);
	}
}
function setValue(element, value) {
	element[isCheckbox(element) ? 'checked' : 'value'] = value;
}
function getValue(element) {
	return element[isCheckbox(element) ? 'checked' : 'value'];
}

function isCheckbox(element) {
	return element.type.toLowerCase() === 'checkbox';
}