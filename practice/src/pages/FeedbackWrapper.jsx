import { useParams } from "react-router-dom";
import Feedback from "./Feedback";

function FeedbackWrapper() {
  const { bookingId } = useParams();
  return <Feedback bookingId={bookingId} />;
}

export default FeedbackWrapper;