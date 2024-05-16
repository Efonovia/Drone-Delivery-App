import * as React from 'react';
import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';


export default function LeftPositionedTimeline(props) {

  const tlElementsHTML = props.elements.filter(ek => ek.index !== 5).map((el) => {
    return (
      <TimelineItem key={el.index} onClick={() => props.goToElement(el.index)}>
        <TimelineSeparator>
          <TimelineDot sx={{ background: el.index <= props.current ? "#ffb11f" : "inherit" }}/>
          <TimelineConnector sx={{ background: el.index <= props.current ? "#ffb11f" : "inherit" }}/>
        </TimelineSeparator>
        <TimelineContent>
          <div style={{ textDecoration: props.current===el.index && "underline", color: el.index<=props.current ? "#ffb11f" : "black" }} className='tl-button'>{el.description}</div>
        </TimelineContent>
      </TimelineItem>
    )
  })

  return (
    <Timeline position="left">

      {tlElementsHTML}

      <TimelineItem onClick={() => props.goToElement(5)}>
        <TimelineSeparator>
          <TimelineDot sx={{ background: 5 <= props.current ? "#ffb11f" : "inherit" }}/>
        </TimelineSeparator>
        <TimelineContent>
          <div style={{ textDecoration: props.current===5 && "underline", color: 5<=props.current ? "#ffb11f" : "black" }} className='tl-button'>Completed</div>
        </TimelineContent>
      </TimelineItem>

    </Timeline>
  );
}
