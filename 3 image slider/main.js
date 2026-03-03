let slideBtns = document.querySelectorAll(".btn");
let dotBtns = document.querySelectorAll(".dot");
let sliderContent = document.querySelector(".content");
let firstColorPanel = sliderContent.querySelectorAll(".color")[0];
let colorPanelWidth = firstColorPanel.clientWidth;
let isScrolling = false;
let index = 0;

slideBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    if (isScrolling) return;
    isScrolling = true;
    const direction = btn.id === "left" ? -1 : 1;
    sliderContent.scrollBy({
      left: direction * colorPanelWidth,
      behavior: "smooth",
    });

    index += direction;
    const currentSelected = document.querySelector(".dot.selected");
    if (currentSelected) {
      currentSelected.classList.remove("selected");
    }
    dotBtns[index].classList.add("selected")
  });
});

dotBtns.forEach((dot, index) => {
  dot.addEventListener("click", () => {
    const currentSelected = document.querySelector(".dot.selected");
    if (currentSelected) {
      currentSelected.classList.remove("selected");
    }
    dot.classList.add("selected");
    if (isScrolling) return;
    isScrolling = true;
    sliderContent.scrollTo({
      left: index * colorPanelWidth,
      behavior: "smooth",
    });
  });
});

const showHideIcons = (currentScrollLeft) => {
  let scrollWidth = sliderContent.scrollWidth - colorPanelWidth;
  if (currentScrollLeft >= scrollWidth) {
    slideBtns[1].style.visibility = "hidden";
  } else {
    slideBtns[1].style.visibility = "visible";
  }

  if (currentScrollLeft <= 0) {
    slideBtns[0].style.visibility = "hidden";
  } else {
    slideBtns[0].style.visibility = "visible";
  }
};

sliderContent.addEventListener("scroll", () => {
  showHideIcons(sliderContent.scrollLeft);
});
sliderContent.addEventListener("scrollend", () => {
  isScrolling = false;
  showHideIcons(sliderContent.scrollLeft);
});
document.addEventListener("DOMContentLoaded", () => {
  showHideIcons(sliderContent.scrollLeft);
});
