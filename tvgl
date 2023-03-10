if (window.location.search.includes('m3u_url') && window.location.search.includes('tvg_id')) {
  const params = new URLSearchParams(window.location.search);
  const m3u_url = params.get('m3u_url');
  const tvg_id = params.get('tvg_id');

  fetch(m3u_url)
    .then(response => response.text())
    .then(m3u_file => {
      // Find the position of the tvg-id tag
      const tvg_id_pos = m3u_file.indexOf(`tvg-id="${tvg_id}"`);
  
      if (tvg_id_pos !== -1) {
        // Find the next m3u8 link after the tvg-id tag
        const m3u8_pos = m3u_file.indexOf('.m3u8', tvg_id_pos);
      
        if (m3u8_pos !== -1) {
          // Find the start of the m3u8 link
          const m3u8_start_pos = m3u_file.lastIndexOf('\n', m3u8_pos) + 1;
        
          // Extract the m3u8 link and display it
          const m3u8_link = m3u_file.substring(m3u8_start_pos, m3u8_pos + 5);
          const video = document.createElement('video');
          video.src = m3u8_link;
          video.controls = true;
          document.body.appendChild(video);
          const message = document.createElement('strong');
          message.innerHTML = `tvg-id=${tvg_id}: ${m3u8_link}`;
          document.body.appendChild(message);
        } else {
          console.log('No m3u8 link found after the specified tvg-id value in the given URL.');
        }
      } else {
        console.log('No tvg-id tag found with the specified value in the given URL.');
      }
    })
    .catch(error => console.log(error));
} else {
  console.log('Please provide an m3u URL parameter and a tvg-id value parameter.');
}
