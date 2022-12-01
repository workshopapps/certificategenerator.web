import "../PrivacyPolicy/privacy-policy.scss"

import React from 'react'
import { useState } from "react"


export const Privacy = () => {

  const PrivacyPolicy = () => {
    return (
      <div className="main-page">
          <section>
         <h2>Privacy policy</h2>
          <p>Shall apply from November 23, 2022.</p>   
  <p>Certgo is a certificate generator  committed to protecting the privacy and accuracy of your confidential information to the extent 
  possible, subject to provisions of state and federal law. Other than as required by laws that guarantee public access to certain types of 
  information, or in response to subpoenas or other legal instruments that authorize access, personally-identifiable information is not 
  actively shared. In particular, we do not re-distribute or sell personal information collected on our web servers.</p>
         </section>
          <h2>Information collected</h2>
          <h3 id="green">Types of data collected</h3>
          <p className="green">Personal data</p>
          <p>While using Our Service, We may ask you to provide  us with certain personally identifiable information that can be used to contact or 
  identify you. Personally identifiable information may include, but is not limited to:</p>
          <ul>
              <li>Email Address</li>
              <li>First name and last name</li>
              <li>Phone number</li>
              <li>Address,State,Province,Zip/Postal Code, City</li>
              <li>Usage Data</li>
          </ul>
          <p>Certgo websites may collect personal information such as name, address, e-mail address, telephone number(s), and/or educational
               interests, IP Addresses. Such personal information may be requested by us for registration purposes and also for the use of
                creating certificates. Additional personal information, such as credit card account information, may be requested for purchases
                 or enrollment purposes.
              </p>
          <p>Web servers typically collect, at least temporarily, the following information: Internet Protocol (IP) address of computer being 
              used; web pages requested; referring web page; browser used; date and time. Certgo may collect statistics identifying particular
               IP addresses from which our websites are accessed.
          </p>
          <p className="green">cookies</p>
          <p>
          Certgo website may use "cookies" in order to deliver web content specific to individual users' interests or to keep track of online
           purchasing transactions.
          </p>
  
          <p className="green">Webforms</p>
          <p>
          Certgo uses webforms forms on this site. These forms require users to give contact information [name, address,    e-mail address, telephone number(s)].
          Contact information from the registration form is used only to send material relating to the [event/course/purpose]  for which it
           was collected and will not be sold to another party. 
           </p>
         <section>
        <h2>Use of collected information</h2>
        <ul>
          <li>Certgo may use personal information collected from websites for the purpose of future communication back to  users, in order to 
          keep you informed of such activities as keeping you up to date on newly added feature that you might find beneficial, but only if you 
          are provided the opportunity to opt out of that type of use.</li>
          <li>Certgo may use browser IP address information and anonymous browser history to report information about site accesses and for 
          profiling purposes. %his information is generally used to improve Web presentation and utilization. Certgo also may use IP address 
          information for troubleshooting purposes</li>
          <li>Some Certgo activity may use  cookies  in order to deliver web content specific to individual users' interests or to keep track of 
          online purchasing transactions. Sensitive personal information is not stored within cookies.</li>
          <li>Collected information will be stored as long as users have an account registered with Certgo. Prior to account closure we store data 
          for not more than 24 hours after account has been deleted.</li>
          <li>Users have option to prohibit collection and use of their personal data by not choosing to any pricing plan.</li>
        </ul>
         </section>
         <section>
         <h2>Distribution of collected information</h2>
         <ul>
          <li>Certgo will not disclose, without your consent, personal information collected about you, except for certain explicit circumstances 
          in which disclosure is required by law.</li>
          <li>Certgo will not distribute or sell personal information to third-party organizations.</li>
         </ul>
         </section>
         <section> 
          <h2>Access to own information</h2>
          <p>Questions regarding users' rights to review, modify or delete their previously provided personal information should be directed to the 
          Certgo customer service to which they provided the information. Any disputes will be resolved under existing records regulations 
          applicable to Certgo.</p>
         </section>
         <section>
          <h2> Responsibility for external sites</h2>
          <p>Certgo does not control the content or information practices of external organizations. We recommend you review the privacy 
          statements of these organizations.</p>
         </section>
         <section>
          <h2>Privacy statements and revisions</h2>
          <p>This Privacy Statement was last revised on  [15 November 2022]. We may change this Privacy Statement at any time and for any reason. 
          We encourage you to review this Privacy Statement each time you visit the web site.
          If we make a significant change to our Privacy Statement, we will post a notice on the homepage of our web site for a period of time after 
          the change is made.</p>
         </section>
     
      </div>
    )
  }
  

  const CookiePolicy = () => {
    return (
      <div className="main-page"> 
         <h2>Cookies policy</h2>
         <section>
          <h2>General information</h2>
          <p>Some areas and functions of the Website may use cookies, i.e. text files stored on the user’s computer, identifying him/her
             in a way that is necessary to enable certain operations. Cookies are used, among other things, to remember data necessary for
            the user’s login. Thanks to the use of cookies, the User is not obliged to re-enter the data previously entered in the Website,
           and the User’s device is recognised by the Website, thus its display is automatically adjusted to individual needs of the User
              and previously selected settings. The condition for cookies to work is their acceptance by the browser and not deleting them
               from the disk.</p>
               <p>As a rule, cookies are not personal data, however, some information stored in cookies, combined with other information about
               the User, may constitute personal data. Such data are not, however, disclosed to unauthorised entities, and their processing
                is carried out solely for the purpose of providing certain services to the User and generating statistics that help to administer
                 the Website. Summaries in the form of statistics do not contain any features identifying the Users.</p>
            <p>The Website uses "session" cookies (saved until you leave the Service, close the browser) and permanent
               (saved on your computer for a specified period of time in the parameters of cookie files or until they are deleted).
                Users can change their settings in this area, e.g. delete or block files. Detailed information on this subject is contained
                 in the help or documentation of the Internet browser.</p>
         </section>
         <section>
          <h2>Use of cookies by the administrator</h2>
          <p>
  Cookies are used to store information about the User’s session (i.e. the IP address from which the User connects to the Website, connection time
   and other technical parameters of the connection).</p>
  
  <p>The Website uses its own cookies and third party cookies in particular for the purpose:</p>
  <ul>
    <li>adjusting the content of the Website to individual preferences of a User;</li>
    <li>creating statistics that help to understand how Users use the Service, which allows to improve its content. The analysis of these statistics
       is anonymous and makes it possible to adjust the content and appearance of the Website; the statistics are also used to assess the popularity of the Website;</li>
    <li>maintaining the Service User’s session (after logging in to the user panel), so that the User does not have to re-enter his/her login and password on each subpage;</li>
    <li>determining the User’s profile in order to display matching advertising materials, in particular in the Google network. The Website uses, among other things, the 
      remarketing tool and lists of similar recipients made available by Google.</li>
  </ul>
         </section>
  
         <section>
        <h2> Third party cookies</h2>
    <p>The website o uses cookies of the following third parties:</p>
  <ul>
    <li>Google AdWords - a remarketing tool of Google LCC, which allows for displaying personalized advertisements
       of the Service (more information: http://ads.google.com);</li>
    <li>Google Analytics - a tool that collects information about visits to the Website, subpages displayed and time 
      spent by the User on the Website (more information: https://analytics.google.com);</li>
    <li>Facebook Pixel - a tool for directing personalized ads to Facebook users
       (more information: https://www.facebook.com/privacy/explanation).</li>
  </ul>
         </section>
  
         <section>
         <h2>Cancellation of cookies</h2>
    <p>The user may at any time opt out of cookies by selecting the appropriate settings in the browser you are using. 
      However, the website may not function properly without cookies being enabled. Switching cookies off will usually result in limiting or
       blocking some functionalities of the Website.</p>
         </section>
      </div>
    )
  }

  const [content, setContent] = useState(PrivacyPolicy)
  const [btnId, setbtnId] = useState("active-btn")
  const [btnId2, setbtnId2] = useState("inactive-btn")

  return (
    <div className="body">
       
       <div className="title">
       <h1>Legal Documents</h1> 
       <p>All documents were updated on November 15, 2022</p>
       </div>
    <div>
       <div className="legal-btns">
			<button className={btnId} onClick={() => {
         setbtnId("active-btn")
         setbtnId2("inactive-btn")
        setContent(PrivacyPolicy)}}>
        <div>Privacy Policy</div></button>
			<button className={btnId2} onClick={() => {
        setbtnId("inactive-btn")
        setbtnId2("active-btn")
        setContent(CookiePolicy)}}>
          <div>Cookies Policy</div></button>
			</div>
      <div className="content">
        {content}
      </div>
    </div>
    </div>
  )
}
