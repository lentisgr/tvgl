if (new URLSearchParams(window.location.search).has('tvg_name')) {
  const m3uUrl = 'https://raw.githubusercontent.com/free-greek-iptv/greek-iptv/master/android.m3u';
  const tvgName = new URLSearchParams(window.location.search).get('tvg_name');
  
  fetch(m3uUrl)
    .then(response => response.text())
    .then(m3uFile => {
      // Find the position of the tvg-name tag
      const tvgNamePos = m3uFile.indexOf('tvg-name="' + tvgName + '"');
      
      if (tvgNamePos !== -1) {
        // Find the next m3u8 link after the tvg-name tag
        const m3u8Pos = m3uFile.indexOf('.m3u8', tvgNamePos);
        
        if (m3u8Pos !== -1) {
          // Find the start of the m3u8 link
          const m3u8StartPos = m3uFile.lastIndexOf('\n', m3u8Pos) + 1;
          
          // Extract the m3u8 link and display it
          const m3u8Link = m3uFile.substring(m3u8StartPos, m3u8Pos + 5);
          const videoElem = document.createElement('video');
          videoElem.src = m3u8Link;
          videoElem.controls = true;
          document.body.appendChild(videoElem);
          const resultElem = document.createElement('div');
          resultElem.innerHTML = `<strong>tvg-name=${tvgName}</strong>: ${m3u8Link}`;
          document.body.appendChild(resultElem);
        } else {
          console.log('No m3u8 link found after the specified tvg-name value in the given URL.');
        }
      } else {
        console.log('No tvg-name tag found with the specified value in the given URL.');
      }
    })
    .catch(error => console.log(error));
}
