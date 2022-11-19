import React from 'react'
import { ContactChatIcon } from '../../assests'

const ContactUs = () => {
  return (
      <div className="contact">
          <div className="contact__content">
              {/* Contact Info */}
              
              <div className="contact__info">
                  <div className="contact__info--item">
                      <ContactChatIcon/>
                  </div>  
              </div>
          </div>
    </div>
  )
}

export default ContactUs