import React, { useState, useEffect } from 'react';
import { Alert } from 'reactstrap';
import flashObj from '../services/FlashService';

const Flash = (props) => {
  const [visible, setVisible] = useState(true);
  const onDismiss = () => { setVisible(false); flashObj.set(null, null); }

  // useEffect(() => {
  //   if (props.message) {
  //     setVisible(true);
  //     window.setTimeout(() => {
  //       setVisible(false);
  //     }, 10000);
  //   }
  // }, [props.message]);

  return (
    <div className="flash-message">
      <Alert color={props.type} isOpen={visible} toggle={onDismiss}>
        <span className="flash-icon"></span>
        { props.message }
      </Alert>
    </div>
  );
};

export default Flash;
