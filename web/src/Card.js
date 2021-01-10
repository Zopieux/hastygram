import React from "react"
import {humanCount} from "./const";

export default function Card({card, onClick, ...props}) {
  const {id, caption, date, src, thumb, dimensions, comment_count, like_count, type} = card;

  // const preloadContent = ({
  //   "image": <img src={src} width={dimensions.width} height={dimensions.height} alt=""/>,
  //   "video": null,
  // })[type];

  const resolution = (() => {
    const e = Math.max(dimensions.width, dimensions.height);
    return e >= 2000 ? "2k" : e > 1080 ? "1k" : null
  })();

  return (<>
    <figure {...props} style={{backgroundImage: `url(${thumb})`}} onClick={() => onClick(card)}>
      {resolution && <span className="card-resolution">{resolution}</span>}
      <span className={`card-type-${type}`}/>
      <div className="card-counters">
        <span className="like-count">{humanCount(like_count)}</span>
        <span className="comment-count">{humanCount(comment_count)}</span>
      </div>
      <figcaption>{caption.substr(0, 64)}</figcaption>
      {/*<template>{preloadContent}</template>*/}
    </figure>
  </>);
}
