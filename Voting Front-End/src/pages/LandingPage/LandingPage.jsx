import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import VotingStatus from "./VotingStatus";
import DisplayWinner from "./DisplayWinner";

const LandingPage = () => {
  const token = localStorage.getItem("token");
  const navigateTo = useNavigate();
  useEffect(() => {
    if (!token) {
      navigateTo("/");
    }
  }, [navigateTo, token]);

  return (
    <>
      <br />
      <VotingStatus />
      <br></br>
      <DisplayWinner />
      <br></br>
    </>
  );
};

export default LandingPage;
