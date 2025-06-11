const targetId = "metapanel";

// Function to hide the element
const hideElement = (element) => {
  if (element) {
    element.style.opacity = "0";
  }
};

// Check if the element already exists when the script is injected
const initialElement = document.getElementById(targetId);
if (initialElement) {
  hideElement(initialElement);
} else {
  // If not, use a MutationObserver to wait for it to be added to the DOM
  const observer = new MutationObserver((mutationsList, observer) => {
    for (const mutation of mutationsList) {
      if (mutation.type === "childList") {
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
          hideElement(targetElement);
          observer.disconnect(); // Stop observing once the element is found
          return;
        }
      }
    }
  });

  // Start observing the document body for changes
  observer.observe(document.body, { childList: true, subtree: true });
}
