const iconHome = document.getElementsByClassName('icon-home')[0];
const iconUser = document.getElementsByClassName('icon-user')[0];
const iconLogout = document.getElementsByClassName('icon-logout')[0];
const btnPic = document.getElementsByClassName('edit-pic')[0];
const fileUpload = document.getElementById('fileUpload');
let meme = null;
const btnUpload = document.getElementsByClassName('edit-button')[0];

iconHome.addEventListener('click', () => {
    window.location.href = '../home.html';
});

iconUser.addEventListener('click', () => {
    window.location.href = '../profile.html';
});

iconLogout.addEventListener('click', logout);

fileUpload.addEventListener('change', selectPic);
btnUpload.addEventListener('click', newMeme);

function selectPic() {
    const file = fileUpload.files[0];
    console.log(file);
    
    if (file) {
        meme = file;
        const reader = new FileReader();
        reader.onload = function(e) {
            btnPic.style.backgroundImage = `url('${e.target.result}')`;
        }
        reader.readAsDataURL(file);
    }
}

async function newMeme() {
    if (meme) {
        const formData = new FormData();
        formData.append('meme', meme);

        const res = await fetch('https://nodejs103.dszcbaross.edu.hu/api/memes/uploadMeme', {
            method: 'POST',
            body: formData,
            credentials: 'include'
        });

        const data = await res.json();
        if (res.ok) {
            alert(data.message);
        } else {
            alert(data.error);
        }
    } else {
        alert('Válassz ki egy képet!');
    }
}

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