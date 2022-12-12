export const data = [
  {
    id: 1,
    plan: "Monthly",
    subscription: [
      {
        id: 1,
        sub: {
          subType: "Basic",
          header: "Get started for free",
          amount: "$0",
          text: "Key Features",
          linkTo: "/signup",
          AfterLogin: "/",
          linkText: "Get started",
          subText: [
            {
              id: 1,
              img: "/assets/good.svg",
              txt: "Access to multiple templates"
            },
            {
              id: 2,
              img: "/assets/good.svg",
              txt: "Generates 100 certificates per month"
            },
            {
              id: 3,
              img: "/assets/good.svg",
              txt: "Ability to edit templates"
            },
            {
              id: 4,
              img: "/assets/good.svg",
              txt: "24/7 customer support"
            }
          ]
        }
      },
      {
        id: 2,
        sub: {
          subType: "Standard",
          header: "More features customised for you",
          amount: "$2.99",
          text: "Everything in Basic +",
          linkTo: "/signup",
          AfterLogin: "/payment",
          linkText: "Choose plan",
          subText: [
            {
              id: 1,
              img: "/assets/tick.svg",
              txt: "Templates library"
            },
            {
              id: 2,
              img: "/assets/tick.svg",
              txt: "Create custom template"
            },
            {
              id: 3,
              img: "/assets/tick.svg",
              txt: "Generate 500 certificates per month"
            },
            {
              id: 4,
              img: "/assets/tick.svg",
              txt: "Send to specified mails in CSV"
            },
            {
              id: 5,
              img: "/assets/tick.svg",
              txt: "Access to dashboard interface"
            },
            {
              id: 6,
              img: "/assets/tick.svg",
              txt: "Basic integrations"
            }
          ]
        }
      },
      {
        id: 3,
        sub: {
          subType: "Premium",
          header: "Best for professionals",
          amount: "$6.99",
          text: "Everything in Standard +",
          AfterLogin: "/payment",
          linkTo: "/signup",
          linkText: "Choose plan",
          subText: [
            {
              id: 1,
              img: "/assets/good.svg",
              txt: "Dedicated assistant"
            },
            {
              id: 2,
              img: "/assets/good.svg",
              txt: "No limit on certificate generation"
            },
            {
              id: 3,
              img: "/assets/good.svg",
              txt: "Exclusive share widgets"
            },
            {
              id: 4,
              img: "/assets/good.svg",
              txt: "Collaborative tools"
            },
            {
              id: 5,
              img: "/assets/good.svg",
              txt: "Priority support"
            },
            {
              id: 6,
              img: "/assets/good.svg",
              txt: "In-website CSV customisation"
            },
            {
              id: 7,
              img: "/assets/good.svg",
              txt: "Advanced integrations"
            }
          ]
        }
      }
    ],
    per: "/month"
  },
  {
    id: 2,
    plan: "Annually",
    subscription: [
      {
        id: 1,
        sub: {
          subType: "Basic",
          header: "Get started for free",
          amount: "$0",
          text: "Key Features",
          linkTo: "/signup",
          AfterLogin: "/",
          linkText: "Get started",
          subText: [
            {
              id: 1,
              img: "/assets/good.svg",
              txt: "Access to multiple templates"
            },
            {
              id: 2,
              img: "/assets/good.svg",
              txt: "Generates 100 certificates per month"
            },
            {
              id: 3,
              img: "/assets/good.svg",
              txt: "Ability to edit templates"
            },
            {
              id: 4,
              img: "/assets/good.svg",
              txt: "24/7 customer support"
            }
          ]
        }
      },
      {
        id: 2,
        sub: {
          subType: "Standard",
          header: "More features customised for you",
          amount: "$14.99",
          text: "Everything in Basic +",
          linkTo: "/payment",
          AfterLogin: "/payment",
          linkText: "Choose plan",
          subText: [
            {
              id: 1,
              img: "/assets/tick.svg",
              txt: "Templates library"
            },
            {
              id: 2,
              img: "/assets/tick.svg",
              txt: "Create custom template"
            },
            {
              id: 3,
              img: "/assets/tick.svg",
              txt: "Generate 500 certificates per month"
            },
            {
              id: 4,
              img: "/assets/tick.svg",
              txt: "Send to specified mails in CSV"
            },
            {
              id: 5,
              img: "/assets/tick.svg",
              txt: "Access to dashboard interface"
            },
            {
              id: 6,
              img: "/assets/tick.svg",
              txt: "Basic integrations"
            }
          ]
        }
      },
      {
        id: 3,
        sub: {
          subType: "Premium",
          header: "Best for professionals",
          amount: "$74.99",
          text: "Everything in Standard +",
          linkTo: "/payment",
          AfterLogin: "/payment",
          linkText: "Choose plan",
          subText: [
            {
              id: 1,
              img: "/assets/good.svg",
              txt: "Dedicated assistant"
            },
            {
              id: 2,
              img: "/assets/good.svg",
              txt: "No limit on certificate generation"
            },
            {
              id: 3,
              img: "/assets/good.svg",
              txt: "Exclusive share widgets"
            },
            {
              id: 4,
              img: "/assets/good.svg",
              txt: "Collaborative tools"
            },
            {
              id: 5,
              img: "/assets/good.svg",
              txt: "Priority support"
            },
            {
              id: 6,
              img: "/assets/good.svg",
              txt: "In-website CSV customisation"
            },
            {
              id: 7,
              img: "/assets/good.svg",
              txt: "Advanced integrations"
            }
          ]
        }
      }
    ],
    per: "/year"
  }
];

export const testimonials = [
  {
    id: 1,
    text: "Easy, simple, and fast. The ease of use is really commendable. Setup and configuration is quite fast and simple. I found it really handy in sending out digital certificates for our bootcamp. The certification process has become seamless with only 3 steps to take in order to issue the credentials.",
    img: "/assets/jessica.svg",
    name: "Jessica Hendrix",
    position: "Chief Product Officer"
  },
  {
    id: 2,
    text: "I came across this website when I needed a bulk certificate generator for my course. It is straightforward and I like the frames as they look very professional. It is quite affordable.",
    img: "/assets/todd.svg",
    name: "Todd Holgate",
    position: "Moderator, Actvance"
  },
  {
    id: 3,
    text: "Certgo is a fantastic piece of software! It saves us a lot of time, as we were able to generate bulk certificates for our students automatically. The customer support is also excellent and helps us navigate the software and recommend a solution for the changes we need.",
    img: "/assets/raul.svg",
    name: "Raul Gonzalez",
    position: "Chief Mentor, UI Academy"
  },
  {
    id: 4,
    text: "Certgo is an incredible website for designing certificates! A huge selection of templates, fonts, and colors; endless choices at the tip of your fingers; easy editing and sending/sharing. Best certificate generator I've used for a long time. If you haven't tried it... try it!",
    img: "/assets/emily.svg",
    name: "Emily Rowe",
    position: "Principal, Grange High School"
  },
  {
    id: 5,
    text: "Certgo is a fantastic option for anyone looking to automate their certification processes! The user experience is very clean and easy to use. I was able to learn how to use the tool seamlessly within 30 minutes. The customer service team is also very responsive and helpful! Recommended for EVERYONE.",
    img: "/assets/raheem.svg",
    name: "Raheem Pound",
    position: "Business Analyst"
  },
  {
    id: 6,
    text: "The best platform for anyone needing to generate bulk certificates. Amazing! I love how easy it is for us.",
    img: "/assets/gloria.svg",
    name: "Gloria Higgins",
    position: "Moderator, SkillUp Africa"
  }
];
