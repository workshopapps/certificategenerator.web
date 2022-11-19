import React from "react";
import "./modal.style.scss";

export default function Filter({
  modalClose,
  open,
  selectedCategory,
  applyCategories,
  setCategory,
}) {
  if (!open) return null;
  return (
    <div>
      <div className="modal-card">
        <div className="modal-card__type">
          <h2>Certificate Type</h2>
          <div className="filter-btn-wrappermodal">
            <button
              onClick={() => selectedCategory("completion")}
              className="sort-btnmodal"
            >
              Completion
            </button>
            <button
              onClick={() => selectedCategory("participation")}
              className="sort-btnmodal"
            >
              Participation
            </button>
            <button
              onClick={() => selectedCategory("appreciation")}
              className="sort-btnmodal"
            >
              Appreciation
            </button>
            <button
              onClick={() => selectedCategory("recognition")}
              className="sort-btnmodal"
            >
              Recognition
            </button>
            <button
              onClick={() => selectedCategory("attendance")}
              className="sort-btnmodal"
            >
              Attendance
            </button>
            <button
              onClick={() => selectedCategory("excellence")}
              className="sort-btnmodal"
            >
              Excellence
            </button>
            <button
              onClick={() => selectedCategory("achievement")}
              className="sort-btnmodal"
            >
              Achievement
            </button>
          </div>
        </div>

        <div className="modal-card__submit">
          <button
            onClick={() => {
              applyCategories();
              modalClose();
            }}
            className="btn-submit btn-submit--apply"
          >
            Apply
          </button>
          <button
            onClick={() => {
              setCategory("");
              modalClose();
            }}
            className="btn-submit btn-submit--cancel"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
