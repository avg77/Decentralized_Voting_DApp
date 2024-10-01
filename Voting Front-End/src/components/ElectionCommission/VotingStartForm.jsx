import { useContext } from "react";
import { useRef } from "react";
import { web3Context } from "../../context/web3Context";
import {toast} from "react-hot-toast"

const VotingStartForm = () => {

    const {web3State} = useContext(web3Context);
    const {contractInstance} = web3State;
    const startTimeRef = useRef();
    const endTimeRef = useRef();

    const timeInSeconds = (time) => {
        const date = new Date(time)
        return Math.floor(date.getTime()/1000)
    }

    const handleVotingTime = async(e)=>{
      e.preventDefault();
      const startTime = startTimeRef.current.value;
      const endTime = endTimeRef.current.value;

      const startTimeSec = timeInSeconds(startTime)
      const endTimeSec = timeInSeconds(endTime)

      try {
        const tx = await contractInstance.voteTime(startTimeSec,endTimeSec)  //using ethers.js
        const receipt = await tx.wait()
        toast.success("Voting Started!")
      } catch (error) {
        toast.error("Error starting voting!", error.message)
      }
      
    }

    return (
    <>
    <br />
    <br />
      <form className="election-form" onSubmit={handleVotingTime}>

        <label htmlFor="start" >Start Time</label>
        <input style={{marginTop: '-10px'}} type="datetime-local" id="start" ref={startTimeRef} required></input>

        <label htmlFor="end">End Time</label>
        <input style={{marginTop: '-10px'}} type="datetime-local" id="end" ref={endTimeRef} required></input>

        <button className="regBtn">Start Voting</button>
      </form>
    </>);
}
 
export default VotingStartForm;