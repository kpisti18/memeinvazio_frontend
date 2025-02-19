const iconHome = document.getElementsByClassName('icon-home')[0];
const iconUser = document.getElementsByClassName('icon-user')[0];
const iconLogout = document.getElementsByClassName('icon-logout')[0];
const editPsw = document.getElementsByClassName('edit-button')[0];

iconHome.addEventListener('click', () => {
    window.location.href = '../home.html';
});

iconUser.addEventListener('click', () => {
    window.location.href = '../profile.html';
});

iconLogout.addEventListener('click', logout);

editPsw.addEventListener('click', editProfilePsw);

//profil jelszó módosítása
async function editProfilePsw() {
    const psw = document.getElementById('psw').value;
    const psw2 = document.getElementById('psw2').value;

    //console.log(psw, psw2);
    if (psw !== psw2) {
        return alert('A két jelszó nem egyezik!');
    }

    const res = await fetch('https://nodejs103.dszcbaross.edu.hu/api/profile/editProfilePsw', {
        method: 'PUT',
        headers: {
            'content-type': 'application/json'
        }, 
        body: JSON.stringify({ psw }),
        credentials: 'include'
    });

    const data = await res.json();
    console.log(data);
    
    if (res.ok) {
        alert(data.message);
        logout();
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