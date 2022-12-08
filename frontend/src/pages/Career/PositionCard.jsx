import React, { useState } from 'react'
import Button from '../../Component/button';
import ApplicationModal from './ApplicationModal';

const PositionCard = ({ position }) => {
  const [openApplyModal, setOpenApplyModal] = useState(false);
  return (
    <div className="job__cont">
      <ApplicationModal
        openApplyModal={openApplyModal}
        position={position}
        setOpenApplyModal={setOpenApplyModal}
      />
      <div className="job__desc">
        <div>
          <h3>{position.role}</h3>
          <h4>
            {position.jobType} <p>|</p> <b>{position.location}</b>
          </h4>
        </div>
        <Button
          name="Apply"
          onClick={() => setOpenApplyModal(!openApplyModal)}
        />
      </div>
      <hr />
    </div>
  );
}

export default PositionCard