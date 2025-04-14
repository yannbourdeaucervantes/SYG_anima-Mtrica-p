const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");



// Desactiva el suavizado de imágenes
context.imageSmoothingEnabled = false;

const frameCount = 516; // Total number of frames in the animation
const images = [];
let imagesLoaded = 0;
let currentFrameIndex = 0;

const currentFrame = index => `./SecComprC1/${String(index).padStart(4, '0')}.jpg`;

const preloadImages = () => {
    for (let i = 1; i <= frameCount; i++) {
        const img = new Image();
        img.src = currentFrame(i);
        img.onload = () => {
            imagesLoaded++;
            if (imagesLoaded === 1) {
                canvas.width = img.width;
                canvas.height = img.height;
                scaleCanvasForHighDPI(); // Escala el canvas para pantallas de alta densidad
                drawImage(0);
            }
        };
        images.push(img);
    }
};

const drawImage = index => {
    const img = images[index];
    if (img && img.complete) {
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.drawImage(img, 0, 0, canvas.width, canvas.height);
    }
};

// Escala el canvas para pantallas de alta densidad
const scaleCanvasForHighDPI = () => {
    const dpr = window.devicePixelRatio || 1; // Obtén la densidad de píxeles del dispositivo
    canvas.width = canvas.width * dpr;
    canvas.height = canvas.height * dpr;
    context.scale(dpr, dpr); // Escala el contexto del canvas
};

window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;

    // Define el rango de scroll en píxeles
    const startScroll = 0;
    const endScroll = window.innerHeight * 12;

    // Asegúrate de que el scroll esté dentro del rango
    const clampedScrollTop = Math.max(startScroll, Math.min(scrollTop, endScroll));

    // Calcula la fracción del scroll dentro del rango
    const scrollFraction = (clampedScrollTop - startScroll) / (endScroll - startScroll);

    // Calcula el índice del frame actual
    currentFrameIndex = Math.min(
        frameCount - 1,
        Math.floor(scrollFraction * frameCount)
    );

    // Dibuja el frame correspondiente si la imagen está cargada
    if (images[currentFrameIndex] && images[currentFrameIndex].complete) {
        drawImage(currentFrameIndex);
    }

    // Aplica el fade out al canvas cuando el frame sea 520 o mayor
    if (currentFrameIndex >= 510) {
        canvas.classList.add("fade-out");
    } else {
        canvas.classList.remove("fade-out");
    }

    toggleTextVisibility(); // Llama a esta función cada vez que el usuario haga scroll
});

preloadImages();

//Info Aparece y desaparece

const textFrames = [
    { id: "#info-1", start: 90, end: 140 },
    { id: "#info-2", start: 150, end: 200 },
    { id: "#info-3", start: 230, end: 250 },
    { id: "#DIV_espacio-1", start: 300, end: 375 },
    { id: "#DIV_espacio-2", start: 400, end: 475 },
];

const toggleTextVisibility = () => {
    textFrames.forEach(({ id, start, end }) => {
        const el = document.querySelector(id);
        if (!el) return;
        const isVisible = currentFrameIndex >= start && currentFrameIndex <= end;
        el.style.opacity = isVisible ? 1 : 0;
        el.style.visibility = isVisible ? 'visible' : 'hidden';
    });
};


// Animacion explotada //



// Función para obtener la ruta de cada frame
const explosionCurrentFramePath = index => `./imagenes_explosion/${String(index).padStart(4, '0')}.png`;

// Preload de las imágenes
const preloadExplosionImages = () => {
    for (let i = 1; i <= explosionFrameCount; i++) {
        const img = new Image();
        img.src = explosionCurrentFramePath(i);
        img.onload = () => {
            if (i === 1) {
                // Configura el tamaño del canvas según la resolución de la primera imagen
                explosionCanvas.width = img.width;
                explosionCanvas.height = img.height;
            }
        };
        explosionImages.push(img);
    }
};

// Función para dibujar un frame en el canvas
const drawExplosionFrame = () => {
    const img = explosionImages[explosionCurrentFrame];
    if (img && img.complete) {
        explosionContext.clearRect(0, 0, explosionCanvas.width, explosionCanvas.height);
        explosionContext.drawImage(img, 0, 0, explosionCanvas.width, explosionCanvas.height);
    }
};


//img y texto aparecen//

document.addEventListener("DOMContentLoaded", () => {
    const fondoExpo = document.getElementById("Fondo-expo");

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        fondoExpo.classList.add("visible");
                        fondoExpo.style.transform = "scale(1)"; // Regresa las transformaciones a la base 1
                    }, 100); // Delay de 1 segundo
                }
            });
        },
        {
            threshold: 0.1 // Detecta cuando al menos el 10% del div es visible
        }
    );

    observer.observe(fondoExpo);
});

document.addEventListener("DOMContentLoaded", () => {
    const fondoExpo = document.getElementById("Fondo-expo2");

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        fondoExpo.classList.add("visible");
                        fondoExpo.style.transform = "scale(1)"; // Regresa las transformaciones a la base 1
                    }, 100); // Delay de 1 segundo
                }
            });
        },
        {
            threshold: 0.4 // Detecta cuando al menos el 10% del div es visible
        }
    );

    observer.observe(fondoExpo);
});

//Footer---------------------------------------------------//

