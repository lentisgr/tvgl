// Load the m3u file
fetch('https://raw.githubusercontent.com/free-greek-iptv/greek-iptv/master/android.m3u')
  .then((response) => response.text())
  .then((m3uFile) => {
    // Get the tvg-name value from the div element
    const tvgName = document.getElementById('tvg-name').textContent.trim();
    
    // Find the position of the tvg-name tag
    const tvgNamePos = m3uFile.indexOf('tvg-name="' + tvgName + '"');

    if (tvgNamePos !== -1) {
      // Find the next m3u8 link after the tvg-name tag
      const m3u8Pos = m3uFile.indexOf('.m3u8', tvgNamePos);

      if (m3u8Pos !== -1) {
        // Find the start of the m3u8 link
        const m3u8StartPos = m3uFile.lastIndexOf('\n', m3u8Pos) + 1;

        // Extract the m3u8 link and force HTTPS protocol
        let m3u8Link = m3uFile.substring(m3u8StartPos, m3u8Pos + 5);
        m3u8Link = m3u8Link.replace('http://', 'https://');

        // Initialize JWPlayer with the extracted M3U8 link
        const playerElement = document.getElementById('jwplayer');
        const player = jwplayer(playerElement);
        player.setup({
          file: m3u8Link,
          title: tvgName,
          width: '100%',
          aspectratio: '16:9',
          autostart: true,
          controls: true,
          displaytitle: true,
          displaydescription: false,
          stretching: 'uniform',
        });
      } else {
        console.log('No m3u8 link found after the specified tvg-name value in the given URL.');
      }
    } else {
      console.log('No tvg-name tag found with the specified value in the given URL.');
    }
  })
  .catch((error) => console.log(error));
