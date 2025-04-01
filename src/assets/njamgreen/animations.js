// Espera a que el DOM cargue completamente
document.addEventListener("DOMContentLoaded", function () {
    // Animaciones de fade-in para cada sección
    const sections = document.querySelectorAll(".fade-in");

    function checkScroll() {
        sections.forEach((section) => {
            const sectionTop = section.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            if (sectionTop < windowHeight * 0.85) {
                section.classList.add("visible");
            }
        });
    }

    // Ejecuta la animación cuando se carga la página y al hacer scroll
    checkScroll();
    window.addEventListener("scroll", checkScroll);

    // Animación de hover en los cuadros de "Acerca de Nosotros"
    const acercaBoxes = document.querySelectorAll(".acerca-box");

    acercaBoxes.forEach((box) => {
        box.addEventListener("mouseenter", () => {
            box.style.transform = "scale(1.05)";
        });

        box.addEventListener("mouseleave", () => {
            box.style.transform = "scale(1)";
        });
    });

    // Efecto en los botones de descarga (vibración al hacer clic)
    const botones = document.querySelectorAll(".boton");

    botones.forEach((boton) => {
        boton.addEventListener("click", () => {
            boton.style.animation = "shake 0.4s";
            setTimeout(() => {
                boton.style.animation = "";
            }, 400);
        });
    });
});

// Agregamos la animación de "shake" para los botones
const style = document.createElement("style");
style.innerHTML = `
    @keyframes shake {
        0% { transform: translateX(0); }
        25% { transform: translateX(-5px); }
        50% { transform: translateX(5px); }
        75% { transform: translateX(-5px); }
        100% { transform: translateX(0); }
    }

    .fade-in {
        opacity: 0;
        transform: translateY(20px);
        transition: opacity 1s ease-out, transform 1s ease-out;
    }

    .fade-in.visible {
        opacity: 1;
        transform: translateY(0);
    }
`;
document.head.appendChild(style);
