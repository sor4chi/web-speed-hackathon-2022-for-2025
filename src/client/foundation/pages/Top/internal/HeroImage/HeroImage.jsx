import React from "react";
import styled from "styled-components";

const Image = styled.img`
  display: block;
  margin: 0 auto;
  width: 100%;
  height: auto;
  aspect-ratio: 1024 / 735;
`;

const ASSETS = [
  { url: "/assets/images/hero-1024.webp", width: 1024 },
  { url: "/assets/images/hero-640.webp", width: 640 },
  { url: "/assets/images/hero-480.webp", width: 480 },
  { url: "/assets/images/hero-320.webp", width: 320 },
];

/** @type {React.VFC<Props>} */
export const HeroImage = () => {
  return (
    <Image
      alt=""
      height={735}
      src={ASSETS[0].url}
      srcSet={ASSETS.map(({ url, width }) => `${url} ${width}w`).join(", ")}
      width={1024}
    />
  );
};
