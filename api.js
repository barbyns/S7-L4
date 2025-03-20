const API_KEY="78QvSMrfzwKoK83iv3oNY7FEndsJ0DJzJEs1XluPdw3hwTrfMUtd7zvA"
const BASE_URL = "https://api.pexels.com/v1/search?query=";
const imageContainer = document.getElementById("image-container");
const loadButton = document.getElementById("load-images");
const loadSecondaryButton = document.getElementById("load-secondary-images");
const searchButton = document.getElementById("search-images");
const searchInput = document.getElementById("search-input");
// imagini
function loadImages(query) {
    fetch(BASE_URL + query, {
        headers: {
            Authorization: API_KEY 
        }
    })
    .then(response => response.json())
    .then(data => {
        imageContainer.innerHTML = ""; 
        data.photos.forEach(photo => {
            const col = document.createElement("div");
            col.classList.add("col-md-4", "mb-4");

            col.innerHTML = `
                <div class="card">
                    <img src="${photo.src.medium}" class="card-img-top" alt="${photo.photographer}">
                    <div class="card-body">
                        <p class="card-text">Foto di <strong>${photo.photographer}</strong></p>
                        <p class="card-text">ID immagine: <strong>${photo.id}</strong></p>
                        <a href="${photo.url}" target="_blank" class="btn btn-success">Vedi su Pexels</a>
                        <button class="btn btn-danger hide-btn">Hide</button>
                        <small> 9 mins <small>
                    </div>
                </div>
            `;

            imageContainer.appendChild(col);

            // Aggiungere evento al pulsante "Hide"
            col.querySelector(".hide-btn").addEventListener("click", function () {
                col.remove(); // Rimuove la card dal DOM
            });
        });
    })
    .catch(error => console.error("Errore nel recupero delle immagini:", error));
}

// Event listeners per i pulsanti
loadButton.addEventListener("click", () => loadImages("mountains"));
loadSecondaryButton.addEventListener("click", () => loadImages("kittens"));
searchButton.addEventListener("click", () => {
    const query = searchInput.value.trim();
    if (query) {
        loadImages(query);
    }
});