import React from 'react';
import Card from './Card';
import {CurrentUserContext} from '../contexts/CurrentUserContext';

function  Main(props){
  const currentUser = React.useContext(CurrentUserContext);
    return(
      <main className="content">
        <section className="profile profile_page_size">
          <div className="profile__items">
            <div className="profile__avatar-container">
              <div className="profile__overlay" onClick={props.onEditAvatar}></div>
              <img className="profile__avatar" src={currentUser.data.avatar} alt="Аватар"/>
            </div>
            <div className="profile__info">
              <div className="profile__fullname">
                <h1 className="profile__name">{currentUser.data.name}</h1>
                <button className="profile__edit-button" type="button" aria-label="кнопка изменения профиля" onClick={props.onEditProfile}></button>
              </div>
              <p className="profile__description">{currentUser.data.about}</p>
            </div>
          </div>
          <button className="profile__button" type="button" aria-label="добавить фото" onClick={props.onAddPlace}></button>
        </section>
        <section className="elements elements_page_size">
          {props.cards.map((card) =>{
            return (
              <Card card={card} key={card._id} onCardClick={props.onCardClick} onCardLike={props.onCardLike} onCardDeleteClick={props.onCardDeleteClick}/>
            )
          })}
        </section>
      </main>
    )
};
export default Main;
