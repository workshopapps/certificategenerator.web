import React from "react";

import "./team.style.scss";
// pictures
import Joy from "../../assets/images/team/joy.svg";
import Ben from "../../assets/images/team/ben.svg";
import Ehis from "../../assets/images/team/ehis.svg";
import John from "../../assets/images/team/john.jpg";
import Moyo from "../../assets/images/team/moyo.svg";
import Ajayi from "../../assets/images/team/ajayi.svg";
import Henry from "../../assets/images/team/henry.jpg";
import Joseph from "../../assets/images/team/joseph.svg";
import Luqman from "../../assets/images/team/luqman.svg";
import Samuel from "../../assets/images/team/samuel.svg";
// icons
import Web from "../../assets/images/team/web.svg";
import Github from "../../assets/images/team/github.svg";
import Behance from "../../assets/images/team/behance.svg";
import Twitter from "../../assets/images/team/twitter.svg";
import Facebook from "../../assets/images/team/facebook.svg";
import LinkedIn from "../../assets/images/team/linkedin.svg";

// members data
const members = [
  {
    picture: Ajayi,
    name: "Ajayi Abiola",
    title: "Product Manager",
    socialMediaIcon1: LinkedIn,
    socialMediaIcon2: Twitter,
    socialMediaIcon3: Facebook
  },
  {
    picture: Joy,
    name: "Joy Ngozi Irabor",
    title: "Product designer",
    socialMediaIcon1: Web,
    socialMediaIcon2: LinkedIn,
    socialMediaIcon3: Twitter
  },
  {
    picture: Moyo,
    name: "Moyo",
    title: "Product designer",
    socialMediaIcon1: LinkedIn,
    socialMediaIcon2: Twitter,
    socialMediaIcon3: Behance
  },
  {
    picture: Samuel,
    name: "Samuel Adeyemi",
    title: "Frontend developer",
    socialMediaIcon1: Web,
    socialMediaIcon2: Twitter,
    socialMediaIcon3: Github
  },
  {
    picture: Ehis,
    name: "Aigbiluese Ehidiamhen",
    title: "Frontend developer",
    socialMediaIcon1: LinkedIn,
    socialMediaIcon2: Twitter,
    socialMediaIcon3: Web
  },
  {
    picture: Joseph,
    name: "Joseph Olukunle",
    title: "Frontend developer",
    socialMediaIcon1: Web,
    socialMediaIcon2: LinkedIn,
    socialMediaIcon3: Github
  },
  {
    picture: Luqman,
    name: "Luqman Adeniyi",
    title: "Frontend developer",
    socialMediaIcon1: Web,
    socialMediaIcon2: LinkedIn,
    socialMediaIcon3: Github
  },
  {
    picture: Ben,
    name: "Bennett Ben",
    title: "Product designer",
    socialMediaIcon1: Web,
    socialMediaIcon2: LinkedIn,
    socialMediaIcon3: Twitter
  },
  {
    picture: John,
    name: "John Alafitayo",
    title: "Backend developer",
    socialMediaIcon1: Github,
    socialMediaIcon2: LinkedIn,
    socialMediaIcon3: Twitter
  },
  {
    picture: Henry,
    name: "Uchechukwu Henry Anachuna",
    title: "Frontend developer",
    socialMediaIcon1: Github,
    socialMediaIcon2: LinkedIn,
    socialMediaIcon3: Web
  }
];

const Team = () => {
  return (
    <section className="teamContainer" style={{ marginBottom: "2rem" }}>
      {/* title */}
      <div className="team">Our Team</div>
      <div className="meet">
        Experience, skill and creativity all come together to build our software
        - one that's innovative, visionary, and inclusive. We are a team of
        talented and passionate designers, managers, developers and marketers
        dedicated to creating the best certificate generator on the planet.
      </div>
      {/* members */}
      <div className="containers">
        {members.map((member, id) => (
          <figure className="figures" key={id}>
            <img src={member.picture} alt="A team member photograph" width="82px" height="82px" style={{ borderRadius: "10px" }} />
            <figcaption className="name">{member.name}</figcaption>
            <figcaption className="title">{member.title}</figcaption>
            <div className="icon">
              <img
                src={member.socialMediaIcon1}
                alt="Social media icon 1"
                height="19.94px"
                width="19.96px"
                className="right_margin"
              />
              <img
                src={member.socialMediaIcon2}
                alt="Social media icon 2"
                height="19.94px"
                width="19.96px"
                className="right_margin"
              />
              <img
                src={member.socialMediaIcon3}
                alt="Social media icon 3"
                height="19.94px"
                width="19.96px"
              />
            </div>
          </figure>
        ))}
      </div>
    </section>
  );
};

export default Team;
