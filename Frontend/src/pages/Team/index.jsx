import React from "react";

import "./team.style.scss";
// pictures
import Joy from "./images/joy.svg";
import Zed from "./images/zed.svg";
import Ben from "./images/ben.svg";
import Moyo from "./images/moyo.svg";
import Ehis from "./images/ehis.svg";
import Anees from "./images/anees.svg";
import Ajayi from "./images/ajayi.svg";
import Rhoda from "./images/rhoda.svg";
import Samuel from "./images/samuel.svg";
import Abiola from "./images/abiola.svg";
import Joseph from "./images/joseph.svg";
import Luqman from "./images/luqman.svg";
import Asanze from "./images/asanze.svg";
import Andrew from "./images/andrew.svg";
import Prosper from "./images/prosper.svg";
import Muminat from "./images/muminat.svg";
// icons
import Web from "./images/web.svg";
import Github from "./images/github.svg";
import Twitter from "./images/twitter.svg";
import Behance from "./images/behance.svg";
import LinkedIn from "./images/linkedin.svg";
import Facebook from "./images/facebook.svg";
import Instagram from "./images/instagram.svg";
import ArrowDown from "./images/arrow_down.svg";

// members data
const members = [
  {
    picture: Anees,
    name: "Anees Adeyinka",
    title: "Product designer",
    socialMediaIcon1: Web,
    socialMediaIcon2: LinkedIn,
    socialMediaIcon3: Twitter,
  },
  {
    picture: Ajayi,
    name: "Ajayi Abiola",
    title: "Product Manager",
    socialMediaIcon1: LinkedIn,
    socialMediaIcon2: Twitter,
    socialMediaIcon3: Facebook,
  },
  {
    picture: Joy,
    name: "Joy Ngozi Irabor",
    title: "Product designer",
    socialMediaIcon1: Web,
    socialMediaIcon2: LinkedIn,
    socialMediaIcon3: Twitter,
  },
  {
    picture: Prosper,
    name: "Prosper Gabriel",
    title: "Product designer",
    socialMediaIcon1: Web,
    socialMediaIcon2: LinkedIn,
    socialMediaIcon3: Twitter,
  },
  {
    picture: Moyo,
    name: "Moyo",
    title: "Product designer",
    socialMediaIcon1: LinkedIn,
    socialMediaIcon2: Twitter,
    socialMediaIcon3: Behance,
  },
  {
    picture: Muminat,
    name: "Muminat",
    title: "Product designer",
    socialMediaIcon1: Web,
    socialMediaIcon2: Instagram,
    socialMediaIcon3: Twitter,
  },
  {
    picture: Samuel,
    name: "Samuel Adeyemi",
    title: "Frontend developer",
    socialMediaIcon1: Web,
    socialMediaIcon2: Twitter,
    socialMediaIcon3: Github,
  },
  {
    picture: Abiola,
    name: "Abiola Olanrewaju",
    title: "Product designer",
    socialMediaIcon1: Web,
    socialMediaIcon2: LinkedIn,
    socialMediaIcon3: Github,
  },
  {
    picture: Rhoda,
    name: "Folayemi Rhoda",
    title: "Product designer",
    socialMediaIcon1: Web,
    socialMediaIcon2: Instagram,
    socialMediaIcon3: LinkedIn,
  },
  {
    picture: Ehis,
    name: "Aigbiluese Ehidiamhen",
    title: "Product designer",
    socialMediaIcon1: LinkedIn,
    socialMediaIcon2: Twitter,
    socialMediaIcon3: Web,
  },
  {
    picture: Zed,
    name: "Zedekiah Ambogo",
    title: "Product designer",
    socialMediaIcon1: Web,
    socialMediaIcon2: LinkedIn,
    socialMediaIcon3: Twitter,
  },
  {
    picture: Joseph,
    name: "Joseph Olukunle",
    title: "Frontend developer",
    socialMediaIcon1: Web,
    socialMediaIcon2: LinkedIn,
    socialMediaIcon3: Github,
  },
  {
    picture: Luqman,
    name: "Luqman Adeniyi",
    title: "Frontend developer",
    socialMediaIcon1: Web,
    socialMediaIcon2: LinkedIn,
    socialMediaIcon3: Github,
  },
  {
    picture: Asanze,
    name: "Asanze",
    title: "Product designer",
    socialMediaIcon1: LinkedIn,
    socialMediaIcon2: Twitter,
    socialMediaIcon3: Web,
  },
  {
    picture: Andrew,
    name: "Andrew Alalibo",
    title: "Product designer",
    socialMediaIcon1: Web,
    socialMediaIcon2: LinkedIn,
    socialMediaIcon3: Twitter,
  },
  {
    picture: Ben,
    name: "Bennett Ben",
    title: "Product designer",
    socialMediaIcon1: Web,
    socialMediaIcon2: LinkedIn,
    socialMediaIcon3: Twitter,
  }
];

const Team = () => {
  return (
    <section>
      {/* title */}
      <div className="team">Our Team</div>
      <div className="meet">Meet our innovative and creative team behind the vision of our software</div>
      {/* members */}
      <div className="containers">
        {members.map((member, id) =>
          <figure key={id}>
            <img src={member.picture} alt="A team member photograph" />
            <figcaption className="name">{member.name}</figcaption>
            <figcaption className="title">{member.title}</figcaption>
            <div className="icon">
              <img src={member.socialMediaIcon1} alt="Social media icon 1" height='19.94px' width='19.96px' className="right_margin" />
              <img src={member.socialMediaIcon2} alt="Social media icon 2" height='19.94px' width='19.96px' className="right_margin" />
              <img src={member.socialMediaIcon3} alt="Social media icon 3" height='19.94px' width='19.96px' />
            </div>
          </figure>
        )}
      </div>
      {/* button */}
      <button type="button" className="view">
        View more{" "}
        <img src={ArrowDown} alt="" />
      </button>
    </section>
  );
};

export default Team;
