import React from "react";

import "./team.style.scss";
// pictures
import Joy from "../../assets/images/team/joy.svg";
import Zed from "../../assets/images/team/zed.svg";
import Ben from "../../assets/images/team/ben.svg";
import Moyo from "../../assets/images/team/moyo.svg";
import Ehis from "../../assets/images/team/ehis.svg";
import Anees from "../../assets/images/team/anees.svg";
import Ajayi from "../../assets/images/team/ajayi.svg";
import Rhoda from "../../assets/images/team/rhoda.svg";
import Samuel from "../../assets/images/team/samuel.svg";
import Abiola from "../../assets/images/team/abiola.svg";
import Joseph from "../../assets/images/team/joseph.svg";
import Luqman from "../../assets/images/team/luqman.svg";
import Asanze from "../../assets/images/team/asanze.svg";
import Andrew from "../../assets/images/team/andrew.svg";
import Prosper from "../../assets/images/team/prosper.svg";
import Muminat from "../../assets/images/team/muminat.svg";
// icons
import Web from "../../assets/images/team/web.svg";
import Github from "../../assets/images/team/github.svg";
import Twitter from "../../assets/images/team/twitter.svg";
import Behance from "../../assets/images/team/behance.svg";
import LinkedIn from "../../assets/images/team/linkedin.svg";
import Facebook from "../../assets/images/team/facebook.svg";
import Instagram from "../../assets/images/team/instagram.svg";
import ArrowDown from "../../assets/images/team/arrow_down.svg";
import Button from "../../Component/button";

// members data
const members = [
  {
    picture: Anees,
    name: "Anees Adeyinka",
    title: "Product designer",
    socialMediaIcon1: Web,
    socialMediaIcon2: LinkedIn,
    socialMediaIcon3: Twitter
  },
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
    picture: Prosper,
    name: "Prosper Gabriel",
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
    picture: Muminat,
    name: "Muminat",
    title: "Product designer",
    socialMediaIcon1: Web,
    socialMediaIcon2: Instagram,
    socialMediaIcon3: Twitter
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
    picture: Abiola,
    name: "Abiola Olanrewaju",
    title: "Product designer",
    socialMediaIcon1: Web,
    socialMediaIcon2: LinkedIn,
    socialMediaIcon3: Github
  },
  {
    picture: Rhoda,
    name: "Folayemi Rhoda",
    title: "Product designer",
    socialMediaIcon1: Web,
    socialMediaIcon2: Instagram,
    socialMediaIcon3: LinkedIn
  },
  {
    picture: Ehis,
    name: "Aigbiluese Ehidiamhen",
    title: "Product designer",
    socialMediaIcon1: LinkedIn,
    socialMediaIcon2: Twitter,
    socialMediaIcon3: Web
  },
  {
    picture: Zed,
    name: "Zedekiah Ambogo",
    title: "Product designer",
    socialMediaIcon1: Web,
    socialMediaIcon2: LinkedIn,
    socialMediaIcon3: Twitter
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
    picture: Asanze,
    name: "Asanze",
    title: "Product designer",
    socialMediaIcon1: LinkedIn,
    socialMediaIcon2: Twitter,
    socialMediaIcon3: Web
  },
  {
    picture: Andrew,
    name: "Andrew Alalibo",
    title: "Product designer",
    socialMediaIcon1: Web,
    socialMediaIcon2: LinkedIn,
    socialMediaIcon3: Twitter
  },
  {
    picture: Ben,
    name: "Bennett Ben",
    title: "Product designer",
    socialMediaIcon1: Web,
    socialMediaIcon2: LinkedIn,
    socialMediaIcon3: Twitter
  }
];

const Team = () => {
  return (
    <section className="teamContainer">
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
            <img src={member.picture} alt="A team member photograph" />
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
      {/* button */}
      <Button type="button" className="view">
        View more <img src={ArrowDown} alt="" />
      </Button>
    </section>
  );
};

export default Team;
