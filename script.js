document.addEventListener("DOMContentLoaded", () => {
  // Select all overlay elements, p elements (heroText), and images
  const overlays = document.querySelectorAll(
    ".overlay1, .overlay2, .overlay3, .overlay4"
  );
  const heroText = document.querySelectorAll("p");
  const images = document.querySelectorAll(
    ".image1, .image2, .image3, .image4"
  );

  // Initial animation for heroText
  heroText.forEach((text, index) => {
    gsap.fromTo(
      text,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power2.out",
        delay: index * 0.3,
        clearProps: "all",
      }
    );
  });

  // Initial pop-up effect for images with clearProps
  images.forEach((image, index) => {
    gsap.fromTo(
      image,
      { scale: 0.1, opacity: 0 },
      {
        scale: 1,
        opacity: 1,
        duration: 2.5,
        delay: index * 0.15,
        ease: "back.out(1.4)",
        clearProps: "all",
      }
    );
  });

  // Add hover and mousemove event listeners to each overlay
  overlays.forEach((overlay, index) => {
    const correspondingImage = images[index];

    overlay.addEventListener("mouseover", () => {
      // Style heroText on hover
      heroText.forEach((text) => {
        text.style.color = "transparent";
        text.style.webkitTextStroke = "1px grey";
      });

      // Track cursor movement and move the image to follow the cursor
      overlay.addEventListener("mousemove", (e) => {
        const rect = overlay.getBoundingClientRect();
        const x = (e.clientX - rect.left - rect.width / 2) * 1.5; // Adjust 0.1 for more or less movement
        const y = (e.clientY - rect.top - rect.height / 2) * 1.5;

        correspondingImage.style.transform = `translate(${x}px, ${y}px)`;
        correspondingImage.style.transition = "transform 0.6s ease-out"; // Smooth and responsive follow effect
      });
    });

    overlay.addEventListener("mouseout", () => {
      // Reset heroText styling on mouseout
      heroText.forEach((text) => {
        text.style.color = "";
        text.style.webkitTextStroke = "";
      });

      // Remove cursor tracking effect and reset the image position
      correspondingImage.style.transform = "";
    });
  });
});
