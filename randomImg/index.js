const BASE_URL = 'https://dog.ceo/api/breeds/image/random';

const btn = document.querySelector('button');
const img = document.querySelector('img');

async function getImg() {
    try {
        const res = await fetch(BASE_URL);

        if(!res.ok) {
            throw new Error(`Coult not fetch ${BASE_URL}, status ${res.status}`)
        }

        return await res.json();
    } catch (e) {
        console.log(e);
    }
}

getImg().then(data => img.src = data.message)

btn.addEventListener('click', () => {
    btn.disabled = true;
    getImg()
        .then(data => {
            img.src = data.message;
            btn.disabled = false;
        });
})