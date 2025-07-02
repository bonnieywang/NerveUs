// Example script to highlight the svg elements by changing their opacity
// For this to work, the opacity of your SVG IDs should be set to 0.0
// Copy and paste this into the <script> element in your course log HTML file

// Wait for the DOM to be fully loaded
document.addEventListener("DOMContentLoaded", function () {
  // Select all *original* SVG elements with an ID (excluding Full_Scene)
  const svgElements = document.querySelectorAll("svg [id]:not(#Full_Scene)");

  // NEW: Select all the dot elements
  const dotElements = document.querySelectorAll(".anatomy-dot");

  // Create a div element for the pop-up
  const popup = document.createElement("div");
  popup.style.position = "absolute";
  popup.style.backgroundColor = "white";
  popup.style.border = "1px solid black";
  popup.style.borderRadius = "10px";
  popup.style.padding = "10px";
  popup.style.display = "none";
  popup.style.width = "200px"; // Adjust this value as needed (e.g., "150px", "auto", "max-content")

  document.body.appendChild(popup);

  const labelNames = {
    Axon: "Axon: Carries signals away from the cell body to the axon terminal.",
    Cell_Body:
      "Cell body: Contains genetic information and other structures and proteins that help the cell survive.",
    Dendrites:
      "Dendrites: Special projections from the cell body that receive signals from other neurons.",
    Axon_Terminal:
      "Axon terminal: The end part of a neuron that sends signals to skin or muscle in the limbs.",
    Myelin_Sheath:
      "Myelin sheath (mai-uh-luhn sheeth): A layer of fat and protein that wrap around the axons to help electrical signals travel faster.",
  };

  // Helper function to handle hover effects for an anatomical part
  function handleAnatomyHover(targetElement, event) {
    targetElement.style.stroke = "#FFF"; // Gold outline on hover
    targetElement.style.strokeWidth = "10px"; // Thicker outline on hover

    popup.innerText = labelNames[targetElement.id] || targetElement.id;

    // Get the dot element that was hovered
    const hoveredDot = event.currentTarget; // This will be the circle element

    // Retrieve custom offsets from data attributes, or use defaults
    const offsetX = parseFloat(hoveredDot.dataset.offsetX) || 15; // Default to 15 if not set
    const offsetY = parseFloat(hoveredDot.dataset.offsetY) || 15; // Default to 15 if not set

    // Calculate new position for the tooltip
    let popupX = event.clientX + offsetX + window.scrollX;
    let popupY = event.clientY + offsetY + window.scrollY;

    // Optional: Adjust position if tooltip goes off-screen
    // ... (rest of your edge detection logic) ...

    popup.style.left = popupX + "px";
    popup.style.top = popupY + "px";
    popup.style.display = "block";
  }

  // Helper function to handle mouseout effects for an anatomical part
  function handleAnatomyMouseout(targetElement) {
    targetElement.style.stroke = "none"; // Hide outline
    popup.style.display = "none";
  }

  // Add event listeners to each SVG element (your original shapes)
  // svgElements.forEach((element) => {
  //   element.addEventListener("mouseover", function (event) {
  //     handleAnatomyHover(element, event);
  //   });

  //   element.addEventListener("mouseout", function () {
  //     handleAnatomyMouseout(element);
  //   });
  // });

  // NEW: Add event listeners to each dot element
  dotElements.forEach((dot) => {
    dot.addEventListener("mouseover", function (event) {
      const targetId = dot.dataset.targetId; // Get the ID from the data attribute
      const targetElement = document.getElementById(targetId);
      if (targetElement) {
        handleAnatomyHover(targetElement, event);
      }
    });

    dot.addEventListener("mouseout", function () {
      const targetId = dot.dataset.targetId;
      const targetElement = document.getElementById(targetId);
      if (targetElement) {
        handleAnatomyMouseout(targetElement);
      }
    });
  });
});
