import Moment from "react-moment";


const LocalTime = ({timestamp}: {timestamp: number}) => {
  var time = new Date();
  var offset = time.getTimezoneOffset();

  return (
    <Moment unix format="D MMM YYYY HH:mm:ss" >
      {timestamp - (offset * 60)}
    </Moment>
  )
}

export default LocalTime;
