document.addEventListener('mousemove', (e) => {
    let trail = document.createElement('div');
    trail.classList.add('trail');
    trail.style.left = `${e.pageX}px`;
    trail.style.top = `${e.pageY}px`;
    document.body.appendChild(trail);

    setTimeout(() => {
        trail.remove();
    }, 500);
});

document.addEventListener("DOMContentLoaded", function() {
    // Function to shuffle an array
    function shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

    // Get the user list element
    const userList = document.getElementById("user-list");

    // Get all the list items (li elements) and convert to an array
    const items = Array.from(userList.children);

    // Shuffle the items array
    shuffle(items);

    // Remove all current items from the list
    while (userList.firstChild) {
        userList.removeChild(userList.firstChild);
    }

    // Append the shuffled items back to the list
    items.forEach(item => userList.appendChild(item));
});
