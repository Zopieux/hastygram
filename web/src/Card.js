import React from "react"
import {humanCount, timeAgo} from "./const";

function formatDate(date) {
  const pad = (x) => `${x}`.padStart(2, "0");
  const d = new Date(date);
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}

function formatTimeAgo(date) {
  return timeAgo.format(new Date(date), "mini");
}

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
    <div className="card-wrap" {...props} onClick={() => onClick(card)}>
      <div className="card-inner">
        <div className="card-overflow">
          <img src={thumb} alt=""/>
        </div>
      </div>
      {resolution && <span className="card-resolution">{resolution}</span>}
      <span className={`card-type-${type}`}/>
      <div className="card-counters">
        <span className="date" title={formatDate(date)}>{formatTimeAgo(date)}</span>
        <span className="like-count">{humanCount(like_count)}</span>
        <span className="comment-count">{humanCount(comment_count)}</span>
      </div>
      {/*TODO*/}{/*<div className="card-caption">{caption.substr(0, 64)}</div>*/}
    </div>
  </>);
}
