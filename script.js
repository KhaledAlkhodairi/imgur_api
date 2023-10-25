//const clientId = "ca6139e49c5bf36";
//my id 
const clientId = "501ba6fa2d5936a"; 
const defaultAlbumId = 'Jfni3';

function fetchWithPromises() {
    const albumId = document.getElementById("albumIdField").value || defaultAlbumId;
    fetchImages(`https://api.imgur.com/3/album/${albumId}/images`)
        .then(images => displayImages(images))
        .catch(error => console.error('Error fetching images:', error));
}

async function fetchWithAsyncAwait() {
    const albumId = document.getElementById("albumIdField").value || defaultAlbumId;
    try {
        const images = await fetchImages(`https://api.imgur.com/3/album/${albumId}/images`);
        displayImages(images);
    } catch (error) {
        console.error('Error in fetching images is:', error);
    }
}

function fetchImages(url) {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', url);
        xhr.setRequestHeader('Authorization', 'Client-ID ' + clientId);
        xhr.onload = function () {
            if (xhr.status >= 200 && xhr.status < 300) {
                const response = JSON.parse(xhr.responseText);
                resolve(response.data);
            } else {
                reject(xhr.statusText);
            }
        };
        xhr.onerror = function () {
            reject(xhr.statusText);
        };
        xhr.send();
    });
}

function displayImages(images) {
    const container = document.getElementById("imageContainer");
    container.innerHTML = "";
    images.forEach(image => {
        const imgElem = document.createElement("img");
        imgElem.src = image.link;
        container.appendChild(imgElem);
    });
}