const output = document.getElementById("output");
const loadingDiv = document.getElementById("loading");
const errorDiv = document.getElementById("error");
const btn = document.getElementById("download-images-button");

const imageUrls = [
  "https://picsum.photos/id/237/200/300",
  "https://picsum.photos/id/238/200/300",
  "https://picsum.photos/id/239/200/300",
];

function downloadImage(url) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.src = url;

    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error(`Failed to load image: ${url}`));
  });
}

function downloadImages(urls) {
  output.innerHTML = "";      // Clear previous images
  errorDiv.textContent = "";  // Clear previous error
  loadingDiv.style.display = "block"; // Show loading spinner

  const promises = urls.map(downloadImage);

  Promise.all(promises)
    .then(images => {
      loadingDiv.style.display = "none"; // Hide loading spinner
      images.forEach(img => {
        output.appendChild(img);          // Append each image to output div
      });
    })
    .catch(error => {
      loadingDiv.style.display = "none"; // Hide loading spinner
      errorDiv.textContent = error.message; // Show error message
    });
}

btn.addEventListener("click", () => {
  downloadImages(imageUrls);
});
