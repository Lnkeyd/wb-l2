import { uniqueId } from "./uniqueId.js";

const imageFileInput = document.querySelector("#image-file-input");
const canvas = document.querySelector("#canvas");
const scale = window.devicePixelRatio;

const topText = document.querySelector("#image-top-text");
const bottomText = document.querySelector("#image-bottom-text");

const elTopTextOffsetY = document.querySelector("#top-text-offset-y");
const elTopTextOffsetX = document.querySelector("#top-text-offset-x");
const elTopTextFontFamily = document.querySelector("#top-font-family");
const elTopTextFontWeight = document.querySelector("#top-font-weight");
const elTopTextFontSize = document.querySelector("#top-font-size");
const elTopTextFontColor = document.querySelector("#top-font-color");

const elBottomTextOffsetY = document.querySelector("#bottom-text-offset-y");
const elBottomTextOffsetX = document.querySelector("#bottom-text-offset-x");
const elBottomTextFontFamily = document.querySelector("#bottom-font-family");
const elBottomTextFontWeight = document.querySelector("#bottom-font-weight");
const elBottomTextFontSize = document.querySelector("#bottom-font-size");
const elBottomTextFontColor = document.querySelector("#bottom-font-color");

let image;

[
  topText,
  elTopTextOffsetX,
  elTopTextOffsetY,
  elTopTextFontFamily,
  elTopTextFontWeight,
  elTopTextFontSize,
  elTopTextFontColor,
].forEach((item) =>
  item.addEventListener("input", (e) => {
    TOP_TEXT[`${item.classList[0]}`] = e.target.value;
    console.log(e.target.value)
    updateText(canvas);
  })
);

[
  bottomText,
  elBottomTextOffsetX,
  elBottomTextOffsetY,
  elBottomTextFontFamily,
  elBottomTextFontWeight,
  elBottomTextFontSize,
  elBottomTextFontColor,
].forEach((item) =>
  item.addEventListener("input", (e) => {
    BOTTOM_TEXT[`${item.classList[0]}`] = e.target.value;
    updateText(canvas);
  })
);

imageFileInput.addEventListener("change", () => {
  const imageDataUrl = URL.createObjectURL(imageFileInput.files[0]);

  image = new Image();
  image.src = imageDataUrl;

  image.addEventListener(
    "load",
    () => {
      updateImage(canvas, image);
      updateText(canvas);
    },
    { once: true }
  );
});

function updateImage(canvas, image) {
  const ctx = canvas.getContext("2d");
  const width = image.width;
  const height = image.height;

  canvas.width = width;
  canvas.height = height;

  elTopTextOffsetY.max = height;
  elBottomTextOffsetY.max = height;

  elBottomTextOffsetX.max = width;
  elBottomTextOffsetX.max = width;
}

function updateText(canvas) {
  const ctx = canvas.getContext("2d");
  // Очищать контекст после предыдущего вызова
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  if (image) {
    ctx.drawImage(
      image,
      0,
      0,
      image.width,
      image.height,
      0,
      0,
      canvas.width,
      canvas.height
    );
  }

  ctx.lineJoin = "round";

  // Верхний текст
  ctx.font = `${TOP_TEXT.fontWeight} ${TOP_TEXT.fontSize}px ${TOP_TEXT.fontFamily}`;
  ctx.strokeStyle = "black";
  ctx.lineWidth = Math.floor(TOP_TEXT.fontSize / 4);
  ctx.fillStyle = `${TOP_TEXT.fontColor}`;

  ctx.textBasline = top;
  ctx.strokeText(TOP_TEXT.textValue, TOP_TEXT.xOffset, TOP_TEXT.yOffset);
  ctx.fillText(TOP_TEXT.textValue, TOP_TEXT.xOffset, TOP_TEXT.yOffset);

  // Нижний текст
  ctx.font = `${BOTTOM_TEXT.fontWeight} ${BOTTOM_TEXT.fontSize}px ${BOTTOM_TEXT.fontFamily}`;
  ctx.strokeStyle = "black";
  ctx.lineWidth = Math.floor(BOTTOM_TEXT.fontSize / 4);
  ctx.fillStyle = `${BOTTOM_TEXT.fontColor}`;

  ctx.textBasline = top;
  ctx.strokeText(
    BOTTOM_TEXT.textValue,
    BOTTOM_TEXT.xOffset,
    BOTTOM_TEXT.yOffset
  );
  ctx.fillText(BOTTOM_TEXT.textValue, BOTTOM_TEXT.xOffset, BOTTOM_TEXT.yOffset);
}

// Конвертируем канвас в изображение
document.getElementById("btn-download").addEventListener("click", function (e) {
  // Если нечего сохранять выходим
  if (!image) return;
  const canvas = document.querySelector("#canvas");
  const dataURL = canvas.toDataURL("image/jpeg", 1.0);

  downloadImage(dataURL, `${uniqueId()}.jpeg`);
});

// Локально сохраняем изображение
function downloadImage(data, filename = "untitled.jpeg") {
  const a = document.createElement("a");
  a.href = data;
  a.download = filename;
  // document.body.appendChild(a);
  a.click();
}
