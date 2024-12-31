import { glob } from "fast-glob";
import sharp from "sharp";

await Promise.all(
  [1024, 640, 480, 320].map(async (w) => {
    const path = "./public/assets/images/hero.jpg";
    await sharp(path)
      .resize({
        width: w,
      })
      .webp({ quality: 75 })
      .toFile(path.replace(".jpg", `-${w}.webp`));
  }),
  (
    await glob("./public/assets/images/players/*.jpg")
  ).map(async (path) => {
    await sharp(path)
      .resize({
        fit: "cover",
        height: 100,
        width: 100,
      })
      .webp({ quality: 75 })
      .toFile(path.replace(".jpg", ".webp"));
  }),
  (
    await glob("./public/assets/images/races/*.jpg")
  ).map(async (path) => {
    await sharp(path)
      .resize({
        fit: "cover",
        height: 225,
        width: 400,
      })
      .webp({ quality: 75 })
      .toFile(path.replace(".jpg", "-400x225.webp"));
  }),
  (
    await glob("./public/assets/images/races/*.jpg")
  ).map(async (path) => {
    await sharp(path)
      .resize({
        fit: "cover",
        height: 100,
        width: 100,
      })
      .webp({ quality: 75 })
      .toFile(path.replace(".jpg", "-100x100.webp"));
  }),
);
