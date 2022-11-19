import React from 'react'
import './term.style.scss'
import { generalProvisions, services, useOfService, technicalRequirements, payments, unauthorizedPractices, customerServices, otherUseOfService } from '../../Data/TermsOfService'

const Terms = () => {
    const indexlist = [{name: 'General Provisions', link: '#general'}, {name: 'Services', link: '#services'}, {name: 'Technical Requirements', link: '#technical'}, {name: 'Use Of The Service', link: '#use_of_service'}, {name: 'Payments ', link: '#payments'}, {name: 'Unauthorised Practices', link: '#unauthorised_practices'}, {name: 'Customer Service And Complaints', link: '#customer_service'}]
  return (
    <div id='terms'>

        {/* Header */}
        <div className='header'>
            <h1>Certawi Terms of Service</h1>
            <p>Last updated: November 17, 2022</p>
        </div>

        {/* Table Of Content */}
        <div className='tableOfContent'>
            <h2>Index:</h2>
            <ol>
               {indexlist.map(({name, link}) => 
                <li key={name}><a href={link}>{name}</a></li>
               )}
            </ol>
        </div>

        {/*  */}
        <div className='List'>
            <ol>
                <li id='general'>   
                    General Provisions
                    <ul>
                       {generalProvisions.map(({name}) => 
                        <li key={name}>{name}</li>
                        )}
                    </ul>
                </li>
                <li id='services'>   
                    Services
                    <ul className='noStyle'>
                       {services.map(({name}) => 
                        <li key={name}>{name}</li>
                        )}
                    </ul>
                </li>
                <li id='technical'>   
                    Technical Requirements
                    <ul className='noStyle'>
                       {technicalRequirements.map(({name}) => 
                        <li key={name}>{name}</li>
                        )}
                        <li style={{listStyleType: 'disc', margin: 0, marginTop: -20}}>at least one active e-mail account;</li>
                        <li> It is also necessary to enable cookies and JavaScript in the browser.</li>
                    </ul>
                </li>
                <li id='use_of_service'>    
                    Use Of The Service
                    <ul className='noStyle'>
                       {useOfService.map(({name}) => 
                        <li key={name}>{name}</li>
                        )}
                        <li style={{margin: 0, marginLeft: -20, marginBottom: -10}}>Furthermore, the Customer agrees:</li>
                        {otherUseOfService.map(({name}) => 
                        <li style={{listStyleType: 'disc', margin: 0}}>{name}</li>
                        )}
                        <li>He also declares that he uses the Service directly for purposes related to his professional or business activity.</li>
                    </ul>
                </li>
                <li id='payments'>   
                    Payments
                    <ul>
                       {payments.map(({name}) => 
                        <li key={name}>{name}</li>
                        )}
                    </ul>
                </li>
                <li id='unauthorised_practices'>   
                    Unauthorized Practices
                    <ul className='noStyle'>
                       {unauthorizedPractices.map(({name}) => 
                        <li key={name}>{name}</li>
                        )}
                    </ul>
                </li>
                <li id='customer_service'>   
                    Customer Services And Complaints
                    <ul className='noStyle'>
                       {customerServices.map(({name}) => 
                        <li key={name}>{name}</li>
                        )}
                    </ul>
                </li>
            </ol>
        </div>
    </div>
  )
}

export default Terms