let isHudVisible = true;

window.addEventListener('message', function(event) {
    const data = event.data;

    switch (data.type) {
        case 'updateHUD':
            updateHUDInfo(data.data);
            break;
        case 'updateVoice':
            updateVoiceStatus(data.isTalking);
            break;
        case 'toggleHUD':
            toggleHUDVisibility();
            break;
    }
});

function updateHUDInfo(data) {
    if (data.money !== undefined) {
        document.getElementById('money').textContent = '$' + data.money;
    }
    if (data.bank !== undefined) {
        document.getElementById('bank').textContent = '$' + data.bank;
    }
    if (data.job !== undefined) {
        document.getElementById('job-name').textContent = data.job;
    }
}

function updateVoiceStatus(isTalking) {
    const voiceIcon = document.getElementById('voice-icon');
    
    if (isTalking) {
        voiceIcon.src = 'img/mic-active.png';
        voiceIcon.classList.add('active');
    } else {
        voiceIcon.src = 'img/mic-inactive.png';
        voiceIcon.classList.remove('active');
    }
}

function toggleHUDVisibility() {
    const hudContainer = document.getElementById('hud-container');
    isHudVisible = !isHudVisible;
    
    if (isHudVisible) {
        hudContainer.classList.remove('hidden');
    } else {
        hudContainer.classList.add('hidden');
    }
}

// Initialize HUD
document.addEventListener('DOMContentLoaded', function() {
    // Set initial positions for HUD sections
    const sections = document.querySelectorAll('.hud-section');
    sections.forEach(section => {
        section.style.opacity = '0';
        setTimeout(() => {
            section.style.opacity = '1';
            section.style.transition = 'opacity 0.5s ease';
        }, 100);
    });
});
