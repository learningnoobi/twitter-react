import { useDispatch, useSelector } from "react-redux";
import HomeTweets from "../components/HomeTweets";
import { removeMesage } from "../redux/slices/tweetSlice";
import AlertMessage from "../components/alertMessage";

const Home = () => {

  const message = useSelector((state) => state.tweetReducer.message);
  const dispatch = useDispatch();
  message &&
    setTimeout(() => {
      dispatch(removeMesage());
    }, 3000);


 

  return (
    <div>
      <HomeTweets />
      {message && (
        <AlertMessage
          removeMesage={removeMesage}
          dispatch={dispatch}
          message={message}
        />
      )}
    </div>
  );
};

export default Home;
