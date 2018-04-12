import React from 'react';
import logo from './logo.svg';
import style from './style.css';

const WelcomeToReact = props => (
    <div className={style.App}>
        <header className={style.Header} >
          <img src={logo} className={style.Logo}  alt="logo" />
          <h1 className={style.Title} >Welcome to React</h1>
        </header>
        <p className={style.Intro} >
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <p className={style.Intro} >
          Or click <button onClick={props.fetchServerSideTime}>this</button> to get Server side time: {props.serverSideTime}
        </p>
      </div>
)

export default WelcomeToReact;