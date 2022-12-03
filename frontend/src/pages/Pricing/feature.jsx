import React from "react";
import "./pricing.style.scss";
// import Table from "react-bootstrap/Table";

function Feature() {
  return (
    <section className="feature">
      <article>
        <h3>Feature Comparison</h3>
      </article>

      <article className="tableContainer">
        <table>
          <thead>
            <tr>
              <th>Overview</th>
              <th>Basic</th>
              <th>Standard</th>
              <th>Premium</th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td>Price (monthly billing)</td>
              <td>₦0/month</td>
              <td>₦2,000/month</td>
              <td>₦5,000/month</td>
            </tr>
            <tr>
              <td>Price (annual billing)</td>
              <td>₦0/year</td>
              <td>₦12,000/year</td>
              <td>₦55,000/year</td>
            </tr>
            <tr>
              <td>Monthly Active Users</td>
              <td>12,784</td>
              <td>5,941</td>
              <td>2,891</td>
            </tr>
            <tr>
              <td>Certificates per month</td>
              <td>100</td>
              <td>500</td>
              <td>Unlimited</td>
            </tr>
            <tr>
              <td>Integrations</td>
              <td>None</td>
              <td>Basic</td>
              <td>Advanced</td>
            </tr>
            <tr>
              <td>Templates library</td>
              <td>Generic</td>
              <td>5</td>
              <td>7</td>
            </tr>
            <tr>
              <td>Collaborative tools</td>
              <td>
                <img src="/assets/cancel.svg" alt="cancel" />
              </td>
              <td>
                <img src="/assets/cancel.svg" alt="cancel" />
              </td>
              <td>
                <img src="/assets/good.svg" alt="good" />
              </td>
            </tr>
            <tr>
              <td>Dashboard interface</td>
              <td>
                <img src="/assets/cancel.svg" alt="cancel" />
              </td>
              <td>
                <img src="/assets/good.svg" alt="good" />
              </td>
              <td>
                <img src="/assets/good.svg" alt="good" />
              </td>
            </tr>
            <tr>
              <td>Customer support</td>
              <td>Regular</td>
              <td>Regular</td>
              <td>Priority</td>
            </tr>
            <tr>
              <td>Dedicated assistant</td>
              <td>
                <img src="/assets/cancel.svg" alt="cancel" />
              </td>
              <td>
                <img src="/assets/cancel.svg" alt="cancel" />
              </td>
              <td>
                <img src="/assets/good.svg" alt="good" />
              </td>
            </tr>
            <tr>
              <td>Mail delivery</td>
              <td>
                <img src="/assets/cancel.svg" alt="cancel" />
              </td>
              <td>
                <img src="/assets/good.svg" alt="good" />
              </td>
              <td>
                <img src="/assets/good.svg" alt="good" />
              </td>
            </tr>
            <tr>
              <td>Add-on professional services</td>
              <td>-</td>
              <td>-</td>
              <td>Yes</td>
            </tr>
            <tr>
              <td>Certificate download formats</td>
              <td>zip</td>
              <td>zip, png</td>
              <td>zip, png, pdf</td>
            </tr>
          </tbody>
        </table>
      </article>

      <article className="featureEnd">
        <h2>Trusted by 500+ high performing businesses and startups</h2>
        <div>
          <img src="/assets/ebay.svg" alt="ebay" />
          <img src="/assets/cnn.svg" alt="cnn" />
          <img src="/assets/google.svg" alt="google" />
          <img src="/assets/cisco.svg" alt="cisco" />
          <img src="/assets/airbnb.svg" alt="airbnb" />
          <img src="/assets/uber.svg" alt="uber" />
        </div>
      </article>
    </section>
  );
}

export default Feature;
