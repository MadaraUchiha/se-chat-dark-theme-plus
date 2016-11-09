function youtubeInliner(node) {
    const inlineYoutube = options.inline_youtube;
    if( !inlineYoutube ) return;
    if( !node.classList || !node.classList.contains('message') || node.classList.contains('pending') ) return; // if not message node, exit
    const yt = node.querySelector('.onebox.ob-youtube'); // grab youtube onebox
    if( !yt ) return; // exit if not found
    const link = yt.querySelector('a'); // youtube link address
    let videoHref;
    if( /(youtu\.?be)\/.+$/.test(link.href) ) { // youtu.be links need to get extracted differently.
        videoHref = link.href.split('/').pop();
    } else {
        videoHref = link.href.match(/v\=(.*)&?/).pop().replace(/&/, '/?'); // ^  
    } 
    const vid = document.createElement('iframe'); // new vidja element
    vid.setAttribute('height', 240); // setting attributes ... properties would also work.
    vid.setAttribute('width', 320);
    vid.setAttribute('frameborder', 0);
    vid.setAttribute('allowfullscreen', 'true');
    vid.classList.add('youtube-onebox');
    const jsapi = videoHref.includes('?') ? '&enablejsapi=1' : '?enablejsapi=1';
    vid.src = '//youtube.com/embed/' + videoHref + jsapi; // new href
    vid.hidden = yt.hidden;
    yt.parentNode.replaceChild(vid, yt); // replace old link with iframe
}

DOMObserver.addParser(youtubeInliner, '.user-container .message');