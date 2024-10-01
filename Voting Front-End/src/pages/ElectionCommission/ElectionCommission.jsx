import AnnounceResult from "../../components/ElectionCommission/AnnounceResult";
import VotingStartForm from "../../components/ElectionCommission/VotingStartForm";
import DeclareEmergency from "../../components/ElectionCommission/DeclareEmergency";
import RemoveEmergency from "../../components/ElectionCommission/RemoveEmergency";
import ResetElection from "../../components/ElectionCommission/ResetElection";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ElectionCommission = () => {
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
      <VotingStartForm />
      <br></br>
      <AnnounceResult />
      <br></br>
      <DeclareEmergency />
      <br />
      <RemoveEmergency />
      <br />
      <ResetElection />
    </>
  );
};

export default ElectionCommission;
