import type { PlasmoCSConfig } from "plasmo"
const newImageUrl = "https://cdn.loveandlemons.com/wp-content/uploads/2020/05/granola-bars.jpg"

export const config: PlasmoCSConfig = {
    matches: ["*://*/*"]
}

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

async function replaceImage() {
    console.log('replacing text');
    const images = document.querySelectorAll('img');
    let image_list = [];
    images.forEach((img) => {
        if (img.src !== newImageUrl) {
            // Replace both src and srcset attributes
            img.src = newImageUrl;
            img.srcset = ""; // Clear srcset to prevent responsive loading
            img.sizes = "";  // Clear sizes to prevent any size-specific logic
        }
    });
}

const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
        if (mutation.type === "childList") {
            // Replace images in newly added nodes
            replaceImages();
        }
    });
});

window.addEventListener("load", replaceImage);
observer.observe(document.body, { childList: true, subtree: true });
