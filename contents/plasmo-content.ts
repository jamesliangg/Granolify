import type { PlasmoCSConfig } from "plasmo"
const newImageUrl = "https://cdn.loveandlemons.com/wp-content/uploads/2020/05/granola-bars.jpg"
const apiEndpoint = "http://localhost:3002/?prompt=";

export const config: PlasmoCSConfig = {
    matches: ["*://*/*"]
}

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

async function replaceImage() {
    console.log('replacing image');
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

async function replaceText() {
    console.log("Replacing text...");

    const elements = document.querySelectorAll('h1, h2, h3, h4, h5, p, caption, span, a');

    for (const element of elements) {
        const content = element.innerHTML;

        if (content.includes("img")) {
            // Skip elements containing "img"
            continue;
        } else if (content.includes("href")) {
            // Handle elements containing "href"
            element.childNodes.forEach(node => {
                if (node.nodeType === Node.TEXT_NODE && node.nodeValue && !node.nodeValue.includes('http')) {
                    try {
                        node.nodeValue = "lmaoxd";
                    } catch (error) {
                        console.error(error);
                    }
                }
            });
        } else {
            // Default handling for other elements
            try {
                // element.innerText = "granolalalala";

                // try {
                //     const response = await fetch(`${apiEndpoint}${encodeURIComponent(element.innerText)}`);
                //     if (response.ok) {
                //         const newText = await response.text();
                //         element.innerText = newText;
                //     }
                // } catch (error) {
                //     console.error("Error replacing text:", error);
                // }

                // Original innerText of the element
                let originalText = element.innerText;

                // Granola-related metaphors to replace words
                const granolaMetaphors = [
                    "granola bar",
                    "oats",
                    "honey",
                    "nuts",
                    "crunchy",
                    "chewy",
                    "bar",
                    "ingredient",
                    "layer",
                    "pressing"
                ];

                // Split the original text into words
                const words = originalText.split(' ');

                // Calculate number of replacements based on the length of the text (more text = more replacements)
                const numReplacements = Math.floor(words.length * 0.2); // 20% of the words will be replaced

                // Perform the replacements
                for (let i = 0; i < numReplacements; i++) {
                    // Randomly select an index of the words array
                    const randomIndex = Math.floor(Math.random() * words.length);

                    // Replace the selected word with a random granola metaphor
                    const randomGranola = granolaMetaphors[Math.floor(Math.random() * granolaMetaphors.length)];
                    words[randomIndex] = randomGranola;
                }

                // Join the words back into a string
                const updatedText = words.join(' ');

                // Update the innerText of the element with the new text
                element.innerText = updatedText;
            } catch (error) {
                console.error(error);
            }
        }
    }
}



const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
        if (mutation.type === "childList") {
            // Replace images in newly added nodes
            replaceImage();
        }
    });
});

async function onPageLoad() {
    await replaceImage();
    await replaceText();
}

window.addEventListener("load", onPageLoad);
observer.observe(document.body, { childList: true, subtree: true });


