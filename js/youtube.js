/* Lightweight YouTube Embed Script
   Based on https://www.labnol.org/internet/light-youtube-embeds/27941/ */

(function() {
    // Load the YouTube API script
    var tag = document.createElement('script');
    tag.src = "https://www.youtube.com/iframe_api";
    var firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    
    // Initialize YouTube players when API is ready
    window.onYouTubeIframeAPIReady = function() {
        var players = document.querySelectorAll('.youtube-player');
        players.forEach(function(player) {
            createYouTubePlayer(player);
        });
    };
    
    // Create thumbnail and setup click functionality
    function createYouTubePlayer(playerDiv) {
        var videoId = playerDiv.dataset.id;
        
        var link = document.createElement('a');
        link.href = '#';
        link.setAttribute('data-youtube-id', videoId);
        
        var thumbnail = new Image();
        thumbnail.src = 'https://img.youtube.com/vi/' + videoId + '/maxresdefault.jpg';
        thumbnail.alt = 'YouTube Video Thumbnail';
        
        // Use hqdefault if maxresdefault is not available
        thumbnail.onerror = function() {
            thumbnail.src = 'https://img.youtube.com/vi/' + videoId + '/hqdefault.jpg';
        };
        
        link.appendChild(thumbnail);
        
        var playButton = document.createElement('div');
        playButton.className = 'play';
        link.appendChild(playButton);
        
        // Set up click event to replace thumbnail with iframe
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            var iframe = document.createElement('iframe');
            iframe.src = 'https://www.youtube.com/embed/' + this.getAttribute('data-youtube-id') + '?autoplay=1&rel=0';
            iframe.setAttribute('frameborder', '0');
            iframe.setAttribute('allowfullscreen', '1');
            iframe.setAttribute('allow', 'accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture');
            
            this.parentNode.replaceChild(iframe, this);
        });
        
        playerDiv.appendChild(link);
    }
    
    // Initialize all players on page load
    document.addEventListener('DOMContentLoaded', function() {
        var players = document.querySelectorAll('.youtube-player');
        players.forEach(function(player) {
            createYouTubePlayer(player);
        });
    });
})();
