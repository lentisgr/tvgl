let m3u_url = "https://raw.githubusercontent.com/free-greek-iptv/greek-iptv/master/android.m3u";
let tvg_id = "ERT 2";

fetch(m3u_url)
  .then(response => response.text())
  .then(m3u_file => {
    // Find the position of the tvg-name tag
    let tvg_id_pos = m3u_file.indexOf('tvg-name="' + tvg_id + '"');

    if (tvg_id_pos !== -1) {
      // Find the next m3u8 link after the tvg-name tag
      let m3u8_pos = m3u_file.indexOf('.m3u8', tvg_id_pos);

      if (m3u8_pos !== -1) {
        // Find the start of the m3u8 link
        let m3u8_start_pos = m3u_file.lastIndexOf("\n", m3u8_pos) + 1;

        // Extract the m3u8 link and display it
        let m3u8_link = m3u_file.substring(m3u8_start_pos, m3u8_pos + 5);
        document.write("<video src='" + m3u8_link + "' controls></video><br>");
        document.write("<strong>tvg-id=" + tvg_id + "</strong>: " + m3u8_link);
      } else {
        document.write("No m3u8 link found after the specified tvg-id value in the given URL.");
      }
    } else {
      document.write("No tvg-id tag found with the specified value in the given URL.");
    }
  })
  .catch(error => console.log(error));
