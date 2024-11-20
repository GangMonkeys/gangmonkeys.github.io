document.addEventListener("DOMContentLoaded", function () {
    const gangListContainer = document.getElementById('gangList');
    const userListContainer = document.getElementById('userList');
    const backgroundAudio = document.getElementById('backgroundAudio');
    const clockElement = document.getElementById('clock');
    const timeCheckPopup = document.getElementById('timeCheckPopup');

    backgroundAudio.volume = 0.4;
    backgroundAudio.play().catch((error) => {
        console.error('Audio autoplay failed:', error);
    });

    window.loadContent = function (contentType) {
        if (contentType.toLowerCase() === 'users') {
            loadUsers();
            gangListContainer.innerHTML = '';
        } else if (contentType.toLowerCase() === 'gangs') {
            loadGangs();
            userListContainer.innerHTML = '';
        }
    };

    function loadUsers() {
        fetch('Users.wtf')
            .then(response => response.text())
            .then(data => {
                const usernames = data.split("\n").map(username => username.trim()).filter(Boolean);

                userListContainer.innerHTML = '';
                userListContainer.classList.add('card-container');

                usernames.forEach((username, index) => {
                    const userCard = document.createElement('div');
                    userCard.classList.add('kcard');
                    userCard.style.animationDelay = `${index * 0.01}s`;

                    if (username.toLowerCase().includes('(rainbow)')) {
                        const cleanUsername = username.replace('(Rainbow)', '').trim();
                        userCard.innerHTML = `<div class="kcard-body"><p class="rgb-effect">${cleanUsername}</p></div>`;
                    } else {
                        userCard.innerHTML = `<div class="kcard-body"><p>${username}</p></div>`;
                    }

                    userListContainer.appendChild(userCard);
                });

                userListContainer.scrollTop = 0;
            })
            .catch(error => console.error('Error loading Users.wtf:', error));
    }

    function loadGangs() {
        fetch('Gangs.wtf')
            .then(response => response.text())
            .then(data => {
                const gangNames = data.split("\n").map(gang => gang.trim()).filter(Boolean);

                gangListContainer.innerHTML = '';
                gangListContainer.classList.add('card-container');

                gangNames.forEach((gang, index) => {
                    const gangCard = document.createElement('div');
                    gangCard.classList.add('kcard');
                    gangCard.style.animationDelay = `${index * 0.01}s`;
                    gangCard.innerHTML = `<div class="kcard-body"><p>${gang}</p></div>`;

                    gangListContainer.appendChild(gangCard);
                });

                gangListContainer.scrollTop = 0;
            })
            .catch(error => console.error('Error loading Gangs.wtf:', error));
    }

    function updateClock() {
        const now = new Date();
        const hours = now.getHours();
        const minutes = now.getMinutes();
        const timeString = `${hours}:${minutes < 10 ? '0' : ''}${minutes}`;
        clockElement.textContent = timeString;

        if (hours === 1 || hours === 2) {
            timeCheckPopup.style.display = 'block';
        } else {
            timeCheckPopup.style.display = 'none';
        }
    }

    setInterval(updateClock, 1000);
    updateClock();
});
