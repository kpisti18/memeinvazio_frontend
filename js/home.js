const iconUser = document.getElementsByClassName('icon-user')[0];
const iconLogout = document.getElementsByClassName('icon-logout')[0];
const iconPlus = document.getElementsByClassName('fixed')[0];

window.addEventListener('DOMContentLoaded', getMemes);

iconUser.addEventListener('click', () => {
    window.location.href = '../profile.html';
});

iconLogout.addEventListener('click', logout);

iconPlus.addEventListener('click', () => {
    window.location.href = '../newMeme.html';
});

async function getMemes() {
    const res = await fetch('https://nodejs103.dszcbaross.edu.hu/api/memes/getMemes', {
        method: 'GET',
        credentials: 'include'
    });

    const memes = await res.json();
    console.log(memes);
    renderMemes(memes);
}

function renderMemes(memes) {
    const row = document.getElementsByClassName('row')[0];
    //console.log(row);
    row.innerHTML = '';

    for (const meme of memes) {
        // card div létrehozása
        const cardDiv = document.createElement('div');
        cardDiv.classList.add('card');

        // card header
        const cardHeaderDiv = document.createElement('div');
        cardHeaderDiv.classList.add('card-header');
        cardHeaderDiv.textContent = meme.name;

        // card header profilkép
        const cardImg = document.createElement('img');
        cardImg.src = `https://nodejs103.dszcbaross.edu.hu/uploads/${meme.profile_pic}`;
        cardImg.alt = meme.name;
        cardHeaderDiv.append(cardImg);

        // card body
        const cardBodyDiv = document.createElement('div');
        cardBodyDiv.classList.add('card-body');

        const picDiv = document.createElement('div');
        picDiv.classList.add('pic-div');

        const picDivImg = document.createElement('img');
        picDivImg.src = `https://nodejs103.dszcbaross.edu.hu/uploads/${meme.meme}`;
        picDivImg.alt = meme.meme;

        picDiv.append(picDivImg);
        cardBodyDiv.append(picDiv);

        // card-footer
        const cardFooterDiv = document.createElement('div');
        cardFooterDiv.classList.add('card-footer');
        // lájkok száma
        const footerSpan = document.createElement('span');
        footerSpan.textContent = `${meme.like}`;
        // lájk gomb
        const likeIcon = document.createElement('i');
        if (meme.alreadyLiked == 0) {
            likeIcon.classList.add('fa-regular', 'fa-thumbs-up');
            likeIcon.addEventListener('click', () => vote(meme.upload_id));
        } else {
            likeIcon.classList.add('fa-regular', 'fa-thumbs-up', 'like');
            likeIcon.addEventListener('click', () => devote(meme.upload_id));
        }

        cardFooterDiv.append(footerSpan, likeIcon);

        // a cardDiv-be belefűzzük a card-header-t, a card-body-t
        cardDiv.append(cardHeaderDiv, cardBodyDiv, cardFooterDiv);        
        console.log(cardDiv);

        // a cardDiv-et belefűzzük a row osztállyal ellátott div-be
        row.append(cardDiv);
    }
}

// lájkolás funkció
async function vote(upload_id) {
    const res = await fetch(`https://nodejs103.dszcbaross.edu.h/api/likes/like/${upload_id}`, {
        method: 'POST',
        credentials: 'include'
    });

    const data = await res.json();
    if (res.ok) {
        getMemes();
    } else {
        alert(data.error);
    }
}

// unlikeolás funkció
async function devote(upload_id) {
    const res = await fetch(`https://nodejs103.dszcbaross.edu.h/api/likes/unlike/${upload_id}`, {
        method: 'DELETE',
        credentials: 'include'
    });

    if (res.ok) {
        getMemes();
    } else {
        const data = await res.json();
        alert(data.error);
    }
}

// logout
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