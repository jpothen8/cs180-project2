const url = document.querySelector("#site-url");
if (location.protocol === "http:" || location.protocol === "https:") {
  const address = location.origin + location.pathname;
  url.textContent = address;
  url.href = address;
}

for (const group of document.querySelectorAll(".alpha-group")) {
  for (const button of group.querySelectorAll("button[data-alpha]")) {
    button.addEventListener("click", () => {
      const alpha = button.dataset.alpha;
      const image = group.querySelector(".alpha-result");
      image.src = group.dataset.prefix + alpha + ".png";
      image.alt = group.dataset.label + ", alpha = " + alpha;
      image.closest("a").href = image.src;
      image.closest("a").setAttribute("aria-label", "Enlarge: " + image.alt);
      group.querySelector(".alpha-caption").textContent = "α = " + alpha;
      for (const option of group.querySelectorAll("button[data-alpha]")) {
        option.setAttribute("aria-pressed", String(option === button));
      }
    });
  }
}

const viewer = document.querySelector("#image-viewer");
const viewerImage = viewer.querySelector("img");
for (const link of document.querySelectorAll("a.image-link")) {
  link.addEventListener("click", (event) => {
    event.preventDefault();
    const source = link.querySelector("img");
    viewerImage.src = source.src;
    viewerImage.alt = source.alt;
    viewer.querySelector("p").textContent = source.alt;
    viewer.showModal();
  });
}
viewer.querySelector("button").addEventListener("click", () => viewer.close());
viewer.addEventListener("click", (event) => {
  if (event.target === viewer) viewer.close();
});

const observer = new IntersectionObserver((entries) => {
  for (const entry of entries) {
    if (entry.isIntersecting) {
      for (const link of document.querySelectorAll("nav a")) {
        link.setAttribute("aria-current", String(link.hash === "#" + entry.target.id));
      }
    }
  }
}, { rootMargin: "-10% 0px -65% 0px", threshold: 0 });
for (const section of document.querySelectorAll("main section")) observer.observe(section);

let openDetails = [];
window.addEventListener("beforeprint", () => {
  openDetails = Array.from(document.querySelectorAll("details"), (detail) => detail.open);
  for (const detail of document.querySelectorAll("details")) detail.open = true;
});
window.addEventListener("afterprint", () => {
  document.querySelectorAll("details").forEach((detail, index) => { detail.open = openDetails[index]; });
});
