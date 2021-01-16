import React from "react";
import {useParams} from "react-router-dom";

import {useTitle} from "./hooks";
import {API_BASE, apiFetch, humanCount} from "./const";
import Card from "./Card";

const BATCH_SIZE = 12;
const PROFILE_PICTURE_DIMENSIONS = {width: 320, height: 320};

const flattenGroup = group =>
  group.medias.map(media => ({
    caption: group.caption,
    date: group.date,
    like_count: group.like_count,
    comment_count: group.comment_count,
    id: media.id,
    type: media.type,
    src: media.src,
    thumb: media.thumb,
    dimensions: media.dimensions,
  }));

const flatten = cards =>
  cards.flatMap(card => card.type === "group" ? flattenGroup(card) : [card]);

export default function Feed() {
  const {username} = useParams();
  const initialFeedState = {path: `${API_BASE}/${username}`, search: new URLSearchParams({limit: `${BATCH_SIZE}`})};

  const [profile, setProfile] = React.useState(null);
  const [cards, setCards] = React.useState([]);
  const [cardCount, setCardCount] = React.useState(0);
  const [loading, setLoading] = React.useState(false);
  const [feedUrl, setFeedUrl] = React.useState(initialFeedState);
  const [afterToken, setAfterToken] = React.useState(null);
  const [page, setPage] = React.useState(0);
  const loaderRef = React.useRef(null);
  const [modalCard, setModalCard] = React.useState(null);
  const modalRef = React.useRef(null);

  const hasMore = afterToken !== null;

  useTitle(`${username} – hastygram`, [username]);

  const handleObserver = (entities) => {
    if (entities[0].isIntersecting) {
      setPage(page => page + 1);
    }
  }

  const observer = new IntersectionObserver(handleObserver, {
    rootMargin: "200px",
    threshold: 0.2,
  });

  React.useEffect(() => {
    setCards([]);
    setProfile(null);
    setCardCount(0);
    setAfterToken(null);
    setFeedUrl(initialFeedState);
    setPage(page => page + 1);
    setLoading(false);
  }, [username]);

  React.useEffect(() => {
    if (loaderRef.current) {
      observer.observe(loaderRef.current)
    }
  }, [loaderRef]);

  const responseSetUrl = response => {
    const url = new URL(response.url);
    setFeedUrl({path: url.pathname, search: new URLSearchParams(url.search)});
    return response.json();
  };

  const responseSetData = data => {
    setLoading(false);
    setProfile(data.profile);
    setCards(cards => [...cards, ...flatten(data.feed.data)]);
    setAfterToken(data.feed.after);
    setCardCount(data.feed.total);
    // Retrigger just once.
    if (loaderRef.current) {
      observer.disconnect();
      observer.observe(loaderRef.current);
    }
  };

  React.useEffect(() => {
    if (loading) return;
    setLoading(true);
    const params = feedUrl.search;
    if (!!afterToken) params.set("after", afterToken);
    const path = `${feedUrl.path}?${params.toString()}`;
    apiFetch({path})
      .then(responseSetUrl)
      .then(responseSetData);
  }, [page]);

  const onCardClick = (card) => {
    setModalCard(card);
  };

  const modalContent = (card => {
    if (card === null) return null;
    const {type, src, dimensions} = card;
    return {
      "image": <img src={src} width={dimensions.width} height={dimensions.height} alt=""/>,
      "video": <video controls={true} autoPlay={true} loop={true}>
        <source src={src}/>
      </video>
    }[type];
  })(modalCard);

  const closeModal = () => setModalCard(null);

  React.useEffect(() => {
    const modalOpen = modalCard !== null;
    if (modalOpen && modalRef.current !== null) {
      modalRef.current.focus();
    }
    document.body.classList.toggle("modalized", modalOpen);
  }, [modalCard]);

  return (<>
      <section className="user-info">
        {!!profile && <div className="user-pic" style={{backgroundImage: `url(${profile.thumb})`}}
                           onClick={(e) => setModalCard({
                             type: "image",
                             src: profile.thumb,
                             dimensions: PROFILE_PICTURE_DIMENSIONS,
                           })}/>}
        <div className="user-username">
          <h3>{username}</h3>
          {!!profile && <span className="user-fullname">{profile.fullname}</span>}
        </div>
        {!!profile && <>
          <ul className="user-counters">
            <li><strong title={`${cardCount}`}>{humanCount(cardCount)}</strong> posts</li>
            <li><strong title={`${profile.follower_count}`}>{humanCount(profile.follower_count)}</strong> followers</li>
          </ul>
          {profile.biography.length && <details className="user-bio">
            <summary>Bio</summary>
            {profile.biography}</details>}
        </>}
      </section>
      <section className="feed-grid">
        {cards.map(card => <Card key={card.id} card={card} onClick={onCardClick}/>)}
        {hasMore ? <div ref={loaderRef} className="loading">Loading more...</div> :
          <span className="end">You've reached the end.</span>}
      </section>
      <div className="modal" style={{display: modalCard === null ? "none" : null}}
           tabIndex={0} onKeyDown={e => e.key === "Escape" && closeModal()} ref={modalRef}>
        <div className="cancel" onClick={(e) => {
          e.stopPropagation();
          closeModal();
        }}/>
        {modalContent}
      </div>
    </>
  );
};
