import React from 'react'
import Button from '../../Component/button';
import ApplicationModal from './ApplicationModal';

const PositionCard = ({position, setOpenApplyMoodal, openApplyModal}) => {
  return (
    <div className="job__cont">
      <ApplicationModal openApplyModal={openApplyModal} position={position} setOpenApplyModal={ setOpenApplyMoodal} />
      <div className="job__desc">
        <div>
          <h3>{position.role}</h3>
          <h4>
            {position.type} <p>|</p> <b>{position.location}</b>
          </h4>
        </div>
        <Button
          name="Apply"
          onClick={() => setOpenApplyMoodal(!openApplyModal)}
        />
      </div>
      <hr />
    </div>
  );
}

export default PositionCard