import React from 'react';

import './PersonCard.scss';

export function PersonCard({ photo, name, position, mentorText }) {
  return <div className="person-card">
    <div className="person-card__photo-wrapper">
      <img className="person-card__photo" src={photo} />
    </div>
    <div className="person-card__info">
      <h2 className="person-card__name">{name}</h2>
      <p className="person-card__position">{position}</p>
      {mentorText
        ? <p className="person-card__mentorship">{mentorText}</p>
        : null
      }
    </div>
  </div>
}