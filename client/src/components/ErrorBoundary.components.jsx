import React from 'react';
import ReplayIcon from '@mui/icons-material/Replay';
import { centerStyle } from '../utils/utils';


function ErrorBoundary({ isError, message, children, refetch }) {
  if (isError) {
    return (
      <div style={{...centerStyle, flexDirection: "column", width: "600px", margin: " 50px auto", }}>
        <h2 style={{textAlign: "center"}}>{message}</h2>
        <button onClick={refetch} style={{background: "#ffb11f"}} type="button" className="btn mb-3 btn-primary"><ReplayIcon />&nbsp;Retry</button>
    </div>
    )
  }
  return children;
}

export default ErrorBoundary
