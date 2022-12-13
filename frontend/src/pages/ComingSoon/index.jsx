import React, {useState} from "react";
import "./Comingsoon.scss";
import axios from 'axios'
import { Link } from "react-router-dom";
import under_construction from "./images/under_construction.png";
import { AiOutlineArrowLeft } from "react-icons/ai";
import Input from "../../Component/Input";
import Button from "../../Component/button";
import {Toast} from '../../Component/ToastAlert'
import Loader from "../../Component/ButtonLoader";

function Comingsoon () {
  const [email, setEmail] = useState()
  const [loading, setLoading] = useState(false)
  const handleSubmit = async e => {
      e.preventDefault();
     setLoading(true)
    try {
      const res = await axios.post("https://certgo.hng.tech/api/mailinglists", {email});
      Toast.fire({
        icon: "success",
        title: "Success! You will be mailed once we're done"
      })
      setEmail("")
      setLoading(false)
    } catch (error) {
       Toast.fire({
        icon: "error",
        title: "Error joining the waitlist"
      })
      setLoading(false)
    }
  };

  return (
    <section id="comingsoon">
      <article className="welcomeHead">
        <Link to="/" className="back">
          <AiOutlineArrowLeft className="arrow" />
          <span>Back to Home</span>
        </Link>

        <div className="f1">Coming Soon!</div>

        <div className="p">
          We are currently working hard to build this page but you can submit
          your email for update once the page is up.
        </div>

        <div className="formdat">
          <div className="fx">
            <form className="emyform" onSubmit={handleSubmit}>
              <Input
                type="email"
                id={"email"}
                value={email}
                callback={e => setEmail(e.target.value)}
                placeholder="Your email"
                className={"email"}
                style={{ width: "20rem" }}
              /> 
               <Button type="submit">{loading ? <Loader /> : <span>Notify me</span>}</Button>
            </form>


          </div>

          <div className="spam">~Don't worry we will not spam you~</div>
        </div>
      </article>

      <article className="construction">
        <img src={under_construction} alt="" />
      </article>
    </section>
  );
}
export default Comingsoon;
