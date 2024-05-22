import React from 'react'


function Timer(props) {
    const [timerFinished, setTimerFinished] = React.useState(false);
    const [hours, setHours] = React.useState(0);
    const [minutes, setMinutes] = React.useState(0);
    const [seconds, setSeconds] = React.useState(0);
  
    // const deadline = "March, 31, 2024";
  
    const getTime = () => {
      const time = new Date(new Date(props.deliveryDate).getTime() + (120*60000))- Date.now();  
      if(time > 0) {
        setHours(Math.floor((time / (1000 * 60 * 60)) % 24));
        setMinutes(Math.floor((time / 1000 / 60) % 60));
        setSeconds(Math.floor((time / 1000) % 60));
      } else {
        setTimerFinished(true)
      }
    };
  
    React.useEffect(() => {
        if(!timerFinished) {
            const interval = setInterval(() => getTime(), 1000);
        
            return () => clearInterval(interval);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
  


    return (
        <span style={{color: "#373063", fontWeight: 900}}>&nbsp;&nbsp;{timerFinished ? "00" : `${hours < 10 ? "0" : ""}${hours}`} : {timerFinished ? "00" : `${minutes < 10 ? "0" : ""}${minutes}`} : {timerFinished ? "00" : `${seconds < 10 ? "0" : ""}${seconds}`}</span>

    )
}


export default Timer