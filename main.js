document.addEventListener('DOMContentLoaded', function() {
    let timerInterval;
    let totalTime;
    const sound = new Audio('yt1s_ro643q7.mp3'); 

    window.onload = function() {
        const savedBackground = localStorage.getItem('backgroundImage');
        if (savedBackground) {
            document.body.style.backgroundImage = `url(${savedBackground})`;
            document.body.style.backgroundSize = 'cover';
            document.body.style.backgroundPosition = 'center';
        } else {
            document.body.style.backgroundColor = 'black'; 
        }
    };

    document.getElementById('start').addEventListener('click', startTimer);
    document.getElementById('stop').addEventListener('click', stopTimer);
    document.getElementById('reset').addEventListener('click', resetTimer);
    document.getElementById('background').addEventListener('change', changeBackground);
    document.getElementById('remove-background').addEventListener('click', removeBackground);
    document.getElementById('close-settings').addEventListener('click', closeSettings);
    document.getElementById('settings-button').addEventListener('click', openSettings);

    document.addEventListener('keydown', function(event) {
        if (event.key === 'Enter' || event.key === ' ') { 
            event.preventDefault(); 
            stopTimer(); 
        }
    });

    function startTimer() {
        const minutes = parseInt(document.getElementById('minutes').value) || 0;
        const seconds = parseInt(document.getElementById('seconds').value) || 0;
        totalTime = minutes * 60 + seconds;

        if (totalTime > 0) {
            stopTimer(); 
            timerInterval = setInterval(updateTimer, 1000);
            

            document.getElementById('start').style.display = 'none';
            document.getElementById('reset').style.display = 'none';
            document.getElementById('minutes').style.display = 'none';
            document.getElementById('seconds').style.display = 'none';
        }
    }

    function updateTimer() {
        if (totalTime <= 0) {
            clearInterval(timerInterval);

            sound.play();

            document.getElementById('message').textContent = "Время вышло!"; 
            document.getElementById('message').style.display = 'block'; 
            
            resetTimer(); 
            return;
        }
    
        totalTime--;
        const minutes = Math.floor(totalTime / 60);
        const seconds = totalTime % 60;
        document.getElementById('timer').textContent = 
            `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    }

    function stopTimer() {
        clearInterval(timerInterval);
        sound.pause(); 
        sound.currentTime = 0; 

        document.getElementById('start').style.display = 'inline-block';
        document.getElementById('reset').style.display = 'inline-block';
        document.getElementById('minutes').style.display = 'inline-block';
        document.getElementById('seconds').style.display = 'inline-block';
    }

    function resetTimer() {
        stopTimer();
        document.getElementById('timer').textContent = "00:00";
        document.getElementById('minutes').value = '';
        document.getElementById('seconds').value = '';
    }

    function changeBackground(event) {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                document.body.style.backgroundImage = `url(${e.target.result})`;
                document.body.style.backgroundSize = 'cover';
                document.body.style.backgroundPosition = 'center';

                localStorage.setItem('backgroundImage', e.target.result);
            }
            reader.readAsDataURL(file);
        } else {
            alert("Не удалось загрузить изображение.");
        }
    }

    function removeBackground() {
        document.body.style.backgroundImage = 'none'; 
        document.body.style.backgroundColor = 'black'; 
        localStorage.removeItem('backgroundImage'); 
    }

    function openSettings() {
        document.getElementById('settings-panel').style.display = 'block';
    }

    function closeSettings() {
        document.getElementById('settings-panel').style.display = 'none';
    }
});