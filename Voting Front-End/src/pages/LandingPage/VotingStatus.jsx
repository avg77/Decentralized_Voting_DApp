import { useContext, useEffect,useState } from "react";
import { web3Context } from "../../context/web3Context";
import toast from "react-hot-toast";

const VotingStatus = () => {
    const {web3State} = useContext(web3Context)
    const {contractInstance} = web3State;

    const [status,setStatus] = useState("Not started!")

    useEffect(()=>{
        const showVotingStatus = async()=>{
            try {
                const status = await contractInstance.votingStatus();   
                const statusInString = String(status);
                if(statusInString==="0"){
                    setStatus("Not started!")
                }
                else if(statusInString==="1"){
                    setStatus("In progress!")
                }
                else if(statusInString==="2"){
                    setStatus("Halted due to emergency!")
                }
                else{
                    setStatus("Ended!")
                }
            } catch (error) {
                toast.error("Error fetching the voting status!", error.message)
            }
        }
        contractInstance && showVotingStatus();
    },[contractInstance])

    return ( 
    <>
      <p><span style={{ fontSize: '1.5rem' }}>Voting Status:</span> <span style={{ color: 'yellow', fontSize: '1.5rem' }}>{status}</span></p>
      </> );
}
 
export default VotingStatus;