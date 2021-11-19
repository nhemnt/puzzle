import React from "react";
import Img from "next/image";
import useViewport from "hooks/useViewport";

const getImage = ({ isSmall, isMedium }, urls) => {
  if (isSmall) {
    return urls.small;
  } else if (isMedium) {
    return urls.medium;
  } else {
    return urls.large;
  }
};

const Image = (props) => {
  const { urls, type, ...rest } = props;
  const viewport = useViewport();
  const url = getImage(viewport, urls);

  return (
     <Img src={url} {...rest} />     
);
};

export default Image;
