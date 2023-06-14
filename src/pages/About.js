import React, { Component } from 'react';
import './About.css';
import profile from '../assets/profile.png';
  
export default class About extends Component {
  render() {
    return (
      <div>
        <div className="split left">
          <div className="centered">
            <img className="profile_image" src={profile} alt="Profile Pic" />
          </div>
        </div>
        <div className="split right">
          <div className="centered">
            <div className="name_title">Lianna Poblete</div>
            <div className="brief_description">
            Hello, I'm a computer science student at New York University with a keen interest in software development and a passion for open-source projects.
            I pride myself on my problem-solving skills, my adaptability, and my ability to work effectively in a team.
            </div>
          </div>
        </div>
      </div>
    )
  }
}