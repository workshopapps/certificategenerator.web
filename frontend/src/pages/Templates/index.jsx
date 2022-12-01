import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./template.style.scss";

import Filter from "./modal";

// template card images
import cardimg from "./assets/Rectangle1.webp";
import cardimg2 from "./assets/Rectangle2.webp";
import cardimg3 from "./assets/Rectangle3.webp";
import cardimg4 from "./assets/Rectangle4.webp";
import cardimg5 from "./assets/Rectangle5.webp";
import cardimg6 from "./assets/Rectangle6.webp";
import cardimg7 from "./assets/Rectangle7.webp";
import cardimg8 from "./assets/Rectangle8.webp";
import cardimg9 from "./assets/Rectangle9.webp";
import cardimg10 from "./assets/Rectangle10.webp";
import cardimg11 from "./assets/Rectangle11.webp";
import premiumicon from "./assets/Vector.svg";
import filtericon from "./assets/setting.svg";
import addicon from "./assets/add-square.svg";
import closeicon from "./assets/close.png";

export default function Template() {
  const [modalState, setModalState] = useState(false);

  const [category, setCategory] = useState([]);

  const cardImages = [
    {
      id: 1,
      url: cardimg,
      type: "recognition",  
      layout: "landscape",
      color: "red"
    
    },
    {
      id: 2,
      url: cardimg2,
      type: "recognition",
      layout: "landscape",
      
    },
    {
      id: 3,
      url: cardimg3,
      type: "completion",
      layout: "landscape",
      color: "red"
    },
    {
      id: 4,
      url: cardimg4,
      type: "completion",
      layout: "landscape",

    },
    {
      id: 5,
      url: cardimg5,
      type: "appreciation",
      layout: "landscape",
    },
    {
      id: 6,
      url: cardimg6,
      type: "appreciation",
      layout: "landscape",
      color: "red"
    },
    {
      id: 7,
      url: cardimg7,
      type: "completion",
      layout: "landscape",
    },
    {
      id: 8,
      url: cardimg8,
      type: "completion",
      layout: "landscape",
      color: "red"
    },
    {
      id: 9,
      url: cardimg9,
      type: "appreciation",
      layout: "landscape",
    },
    {
      id: 10,
      url: cardimg10,
      type: "completion",
      layout: "landscape",
    },
    {
      id: 11,
      url: cardimg11,
      type: "completion",
      layout: "landscape",
    },
    {
      id: 12,
      url: cardimg,
      type: "red",
      layout: "landscape",
    },
    {
      id: 13,
      url: cardimg3,
      type: "red",
      layout: "landscape",
    },
    {
      id: 14,
      url: cardimg6,
      type: "red",
      layout: "landscape",
    },
    {
      id: 15,
      url: cardimg8,
      type: "red",
      layout: "landscape",
    },
    {
      id: 16,
      url: cardimg2,
      type: "blue",
      layout: "landscape",
    },
    {
      id: 17,
      url: cardimg4,
      type: "blue",
      layout: "landscape",
    },
    {
      id: 18,
      url: cardimg9,
      type: "blue",
      layout: "landscape",
    },
    {
      id: 19,
      url: cardimg10,
      type: "blue",
      layout: "landscape",
    },
    {
      id: 20,
      url: cardimg5,
      type: "green",
      layout: "landscape",
    },
    {
      id: 21,
      url: cardimg7,
      type: "green",
      layout: "landscape",
    },
    {
      id: 22,
      url: cardimg11,
      type: "green",
      layout: "landscape",
    },
    


  ];

  let categories = category;

  const closeModal = () => {
    setModalState(false);
  };

  const childToParent = (clickedCategory) => {
    categories.push(clickedCategory);
  };

  const errorMsg = document.querySelector('.error-wrapper');

  const applySelectCategories = () => {
    setCategory(categories);

    if (categories.length === 0) {
      showErrorMsg();
    } else {
      return hideErrorMsg();
    }
  };

  const hideErrorMsg = () => {
    errorMsg.classList.add('hideerrorMsg');
  }

  const showErrorMsg = () => {
    errorMsg.classList.remove('hideerrorMsg');
  }

  return (
    <div className="template-wrapper">
      <header>       
        
        <div className="templates-title">Templates</div>
        <div className="error-wrapper hideerrorMsg">
          <div className="error-container">
            <p className="error-container__message">Oops! It seems like none of the templates match the filters you selected. Please modify your filters or browse the templates manually.</p>
            <img onClick={hideErrorMsg} src={closeicon} alt="close icon" className="closeicon" />
        </div>
        </div>
        <div className="top-container-div">
          <p>All results</p>

          {/* hide clear button if no filter is selected */}
          {categories.length === 0 ? null : (
            <button onClick={() => setCategory([])} className="clear-btn">
              Clear All Filters
            </button>
          )}
        </div>

        
        <button
          className="filter-btn"
          onClick={() => setModalState(!modalState)}
        >
          Filters{" "}
          <span>
            <img src={filtericon} alt="" />
          </span>
        </button>
        {/* modal popup */}
        <Filter
          modalClose={closeModal}
          open={modalState}
          selectedCategory={childToParent}
          applyCategories={applySelectCategories}
          setCategory={setCategory}
        />
        
        
      </header>
      <div className="cards-container">
        {/* cards start */}
        <div className="template-card">
          <div className="template-card__header">
            <h2 className="canvas-title">Blank Canvas</h2>
            <button className="btn-premium">
              Premium
              <img src={premiumicon} alt="" />
            </button>
          </div>
          <div className="template-card__icon">
            <Link to="/pricing">
              <img src={addicon} alt="card" />
            </Link>
          </div>
        </div>

        {cardImages
          .filter((item) => {
            return category.length === 0 ? item : category.includes(item.type);
          })
          .map((item) => {
            return (
              <div key={item.id} className="template-card">
                <div className="template-card__img">
                  <a href="#">
                    <img src={item.url} alt="card" />
                  </a>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
}
