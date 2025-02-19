const iconHome = document.getElementsByClassName('icon-home')[0];
const iconUser = document.getElementsByClassName('icon-user')[0];
const iconLogout = document.getElementsByClassName('icon-logout')[0];
const editName = document.getElementsByClassName('edit-button')[0];

iconHome.addEventListener('click', () => {
    window.location.href = '../home.html';
});

iconUser.addEventListener('click', () => {
    window.location.href = '../profile.html';
});

iconLogout.addEventListener('click', logout);

editName.addEventListener('click', editProfileName);

//profile name szerkesztése
async function editProfileName() {
    const name = document.getElementById('name').value;
    //console.log(name);
    
    const res = await fetch('https://nodejs103.dszcbaross.edu.hu/api/profile/editProfileName', {
        method: 'PUT',
        headers: {
            'content-type': 'application/json'
        }, 
        body: JSON.stringify({ name }),
        credentials: 'include'
    });

    const data = await res.json();
    console.log(data);
    
    if (res.ok) {
        alert(data.message);
        window.location.href = '../profile.html';
    } else {
        alert(data.error);
    }
}

//logout
async function logout() {
    const res = await fetch('https://nodejs103.dszcbaross.edu.hu/api/auth/logout', {
        method: 'POST',
        credentials: 'include'
    });

    const data = await res.json();

    if (res.ok) {
        alert(data.message);
        window.location.href = '../index.html';
    } else {
        alert('Hiba a kijelentkezéskor');
    }
}