(async () => {

  const getRes = async (post) => {
    if (post.facebook) return 'Facebook';
    if (post.twitter) return 'Twitter';
    if (post.vk) return 'VK';
    if (post.linkedin) return 'LinkedIn';
    if (post.pinterest) return 'Pinterest';
  }
    chrome.storage.local.get(function(cfg) {
        if(typeof(cfg["posts"]) !== 'undefined' && cfg["posts"] instanceof Array) { 
          const table = document.querySelector('table');

          for (let i = 0; i < cfg["posts"].length; i++) {
            const tr = document.createElement('tr');
            const post = cfg["posts"][i];
            const val = getRes(post);
            tr.innerHTML = `
            <td><a href="${post.postUrl}">${post.postUrl}</a></td>
              <td>${val}</td>
              <td>${new Date(post.date)}</td>
            `;
            table.appendChild(tr);
          }

        } 
      });

      document.querySelector('#reset').addEventListener('click', function() {
        chrome.storage.local.set({
            posts: null
        });
        window.location.reload();
      })

      document.querySelector('#refresh').addEventListener('click', function() {
        window.location.reload();
      })
})();