const output = document.getElementById("output");
    const btn = document.getElementById("download-images-button");
    const loadingDiv = document.getElementById("loading");
    const errorDiv = document.getElementById("error");

    const images = [
      { url: "https://picsum.photos/id/237/200/300" },
      { url: "https://picsum.photos/id/238/200/300" },
      { url: "https://picsum.photos/id/239/200/300" },
    ];

    function downloadImage(url) {
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.src = url;
        img.onload = () => resolve(img);
        img.onerror = () => reject(new Error(`Failed to download image: ${url}`));
      });
    }

    function downloadImages(imageArray) {
      output.innerHTML = "";
      errorDiv.textContent = "";
      loadingDiv.style.display = "block";

      const downloadPromises = imageArray.map(({ url }) => downloadImage(url));

      Promise.all(downloadPromises)
        .then(images => {
			
          loadingDiv.style.display = "none";
          images.forEach(img => output.appendChild(img));
        })
        .catch(error => {
          loadingDiv.style.display = "none";
          errorDiv.textContent = error.message;
        });
    }

    btn.addEventListener("click", () => downloadImages(images));