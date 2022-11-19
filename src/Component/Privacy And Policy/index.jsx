import "../Privacy And Policy/privacy-policy.css"

import React from 'react'
import { Outlet } from "react-router-dom"


export const PrivacyPolicy = () => {
  return (
    <div className="main-page">
        <section>
       <h2>Privacy Policy</h2>
        <p>Shall apply from November 23, 2022.</p>   
<p>Certawi is a certificate generator  committed to protecting the privacy and accuracy of your confidential information to the extent 
possible, subject to provisions of state and federal law. Other than as required by laws that guarantee public access to certain types of 
information, or in response to subpoenas or other legal instruments that authorize access, personally-identifiable information is not 
actively shared. In particular, we do not re-distribute or sell personal information collected on our web servers.</p>
       </section>
        <h2>Information Collected</h2>
        <h3 id="green">Types of data collected</h3>
        <p className="green">Personal Data</p>
        <p>While using Our Service, We may ask you to provide  us with certain personally identifiable information that can be used to contact or 
identify you. Personally identifiable information may include, but is not limited to:</p>
        <ul>
            <li>Email Address</li>
            <li>First name and last name</li>
            <li>Phone number</li>
            <li>Address,State,Province,Zip/Postal Code, City</li>
            <li>Usage Data</li>
        </ul>
        <p>Certawi websites may collect personal information such as name, address, e-mail address, telephone number(s), and/or educational
             interests, IP Addresses. Such personal information may be requested by us for registration purposes and also for the use of
              creating certificates. Additional personal information, such as credit card account information, may be requested for purchases
               or enrollment purposes.
            </p>
        <p>Web servers typically collect, at least temporarily, the following information: Internet Protocol (IP) address of computer being 
            used; web pages requested; referring web page; browser used; date and time. Certawi may collect statistics identifying particular
             IP addresses from which our websites are accessed.
        </p>
        <p className="green">cookies</p>
        <p>
        Certawi website may use "cookies" in order to deliver web content specific to individual users' interests or to keep track of online
         purchasing transactions.
        </p>

        <p className="green">Webforms</p>
        <p>
        Certawi uses webforms forms on this site. These forms require users to give contact information [name, address,    e-mail address, telephone number(s)].
        Contact information from the registration form is used only to send material relating to the [event/course/purpose]  for which it
         was collected and will not be sold to another party. 
         </p>
       <section>
      <h2>Use of collected information</h2>
      <ul>
        <li>Certawi may use personal information collected from websites for the purpose of future communication back to  users, in order to 
        keep you informed of such activities as keeping you up to date on newly added feature that you might find beneficial, but only if you 
        are provided the opportunity to opt out of that type of use.</li>
        <li>Certawi may use browser IP address information and anonymous browser history to report information about site accesses and for 
        profiling purposes. %his information is generally used to improve Web presentation and utilization. Certawi also may use IP address 
        information for troubleshooting purposes</li>
        <li>Some Certawi activity may use  cookies  in order to deliver web content specific to individual users' interests or to keep track of 
        online purchasing transactions. Sensitive personal information is not stored within cookies.</li>
        <li>Collected information will be stored as long as users have an account registered with Certawi. Prior to account closure we store data 
        for not more than 24 hours after account has been deleted.</li>
        <li>Users have option to prohibit collection and use of their personal data by not choosing to any pricing plan.</li>
      </ul>
       </section>
       <section>
       <h2>Distribution of collected information</h2>
       <ul>
        <li>Certawi will not disclose, without your consent, personal information collected about you, except for certain explicit circumstances 
        in which disclosure is required by law.</li>
        <li>Certawi will not distribute or sell personal information to third-party organizations.</li>
       </ul>
       </section>
       <section> 
        <h2>Access to own information</h2>
        <p>Questions regarding users' rights to review, modify or delete their previously provided personal information should be directed to the 
        Certawi customer service to which they provided the information. Any disputes will be resolved under existing records regulations 
        applicable to Certawi.</p>
       </section>
       <section>
        <h2> Responsibility for external sites</h2>
        <p>Certawi does not control the content or information practices of external organizations. We recommend you review the privacy 
        statements of these organizations.</p>
       </section>
       <section>
        <h2>Privacy statements and revisions</h2>
        <p>This Privacy Statement was last revised on  [15 November 2022]. We may change this Privacy Statement at any time and for any reason. 
        We encourage you to review this Privacy Statement each time you visit the web site.
        If we make a significant change to our Privacy Statement, we will post a notice on the homepage of our web site for a period of time after 
        the change is made.</p>
       </section>
    <Outlet />
    </div>
  )
}
