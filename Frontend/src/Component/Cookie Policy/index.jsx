import "../Cookie Policy/cookie-policy.scss"

import React from 'react'
import { Outlet } from "react-router-dom"


export const CookiePolicy = () => {
  return (
    <div className="main-page"> 
       <h1>Cookie Policy</h1>
       <section>
        <h1>General Information</h1>
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
        <h1>Use of cookies by the Administrator</h1>
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
      <h1> Third party Cookies</h1>
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
       <h1>Cancellation of cookies</h1>
  <p>The user may at any time opt out of cookies by selecting the appropriate settings in the browser you are using. 
    However, the website may not function properly without cookies being enabled. Switching cookies off will usually result in limiting or
     blocking some functionalities of the Website.</p>
       </section>
    <Outlet />
    </div>
  )
}
