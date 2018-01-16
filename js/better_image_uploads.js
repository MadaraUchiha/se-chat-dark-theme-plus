"use strict";
/*
	handles:
		dropping images on the page from your pc
		dragging images to the page from other websites
		pasting images from your clipboard
*/
const inputElement = document.querySelector('#input');

async function uploadImage(blob) {
	const formData = new FormData();
	formData.append('fkey', fkey().fkey);
	formData.append('source', 'computer');
	formData.append('filename', blob, 'image.png');
	const res = await fetch('/upload/image', {
		method: 'POST',
		body: formData
	});
	const text = await res.text();
	const re = /result = '([^']*)';/;
	const [,url] = text.match(re);
	if( url ) {
		postImage(url);
	} else {
		console.error('failed to upload image, probably too large');
		done();
	}
}

function done() {
	document.body.style.cursor = inputElement.style.cursor = 'unset';
}

function postImage(url) {
	const [roomid] = /\d+/.exec(location);
	fetch(`/chats/${roomid}/messages/new`, {
		credentials: 'same-origin',
		method: 'POST',
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8',
		},
		body: `fkey=${fkey().fkey}&text=${encodeURIComponent(url)}%23.png`
	}).then(done);
	// thankfully ben isn't stupid like me

}

function handlePaste(event) {
	const { clipboardData: { items: [item] = [] } } = event;
	processItem(item, true);
}

function processItem(item, fromPaste = false) {
	document.body.style.cursor = inputElement.style.cursor = 'wait';
	switch(item.kind) {
		case('file'): 
			processFile(item);
		break;
		case('string'):
			if( document.activeElement === inputElement && fromPaste && item.type === 'text/plain' ) return done(); // regular user text paste. images are text/html
			processString(item);
		break;
	}
}

function processString(item) {
	item.getAsString(string => {
		// if the user drags the image directly to the page you get a url
		try {
			const url = new URL(string);
			postImage(url);
		} catch( err ) {
			// otherwise, they have copied the image to their clipboard
			// and you get a partial document
			try {
				const parser = new DOMParser();
				const doc = parser.parseFromString(string, 'text/html');
				if( doc.images[0] ) {
					postImage(doc.images[0].src);
				} else {
					throw new Error();
				}
			} catch(e) {
				console.error('failed to parse clipboard data');
				done();
			}
		}
		// shut up
	});
}

function processFile(item) {
	if( !item || !item.type.includes('image') ) return;

	const file = item.getAsFile();
	const reader = new FileReader();
	reader.onload = readerEvent => {
		const img = new Image();
		img.onload = _ => {
			const canvas = document.createElement('canvas');
			const context = canvas.getContext('2d');
			canvas.height = img.height;
			canvas.width = img.width;
			context.drawImage(img, 0, 0);
			canvas.toBlob(uploadImage);
		};
		img.src = readerEvent.target.result;
	};
	reader.readAsDataURL(file);
}

function handleDrop(event) {
	if( event.target === inputElement ) return;
	event.preventDefault();
	const { dataTransfer: { items: [item] = [] } } = event;
	processItem(item);
}

window.addEventListener('paste', handlePaste);
window.addEventListener('dragover', event => event.target !== inputElement && event.preventDefault());
window.addEventListener('drop', handleDrop);