import React from 'react';
import './Card.css';

const Card = ({ id, title, tag, status }) => {
  const renderTags = () => {
    return tag?.map((elem, index) => (
      <div key={index} className="tags color-grey">
        <span>•</span> {elem}
      </div>
    ));
  };

  return (
    <div className="cardContainer flex-gap-10" style={{ gap: '5px' }}>
      <div className="cardHeading flex-sb">
        <span style={{ textTransform: 'uppercase' }} className="color-grey">
          {id}
        </span>
        <div className="imageContainer relative" style={{ width: '30px', height: '30px' }}>
          <img
            style={{ width: '100%', height: '100%', borderRadius: '50%' }}
            src="https://cdn.vectorstock.com/i/1000x1000/00/74/young-man-profile-vector-14770074.webp"
            alt="UserImage"
          />
          <div className="showStatus"></div>
        </div>
      </div>
      <div className="cardTitle" style={{ fontWeight: 200 }}>
        <p>{title}</p>
      </div>
      <div className="cardTags">
        <div className="tags color-grey"> ... </div>
        {renderTags()}
      </div>
    </div>
  );
};

export default Card;
