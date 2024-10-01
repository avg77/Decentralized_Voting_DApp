import React, { useEffect, useState, useContext } from 'react'
import { web3Context } from '../../context/web3Context'
import "./CandidateList.css"
import { useNavigate } from 'react-router-dom'

const CandidatesList = () => {
    const {web3State} = useContext(web3Context);
    const {contractInstance}=web3State; 
    const [candidateList,setCandidateList]=useState([])

  const token = localStorage.getItem("token")
  const navigateTo = useNavigate()
  useEffect(() => {
     if(!token){
      navigateTo("/")
     }
  },[navigateTo, token])

    useEffect(()=>{
      const displayCandidatesList = async()=>{
        try {
            const candidateArray = await contractInstance.candidateList();
            setCandidateList(candidateArray)         
        } catch (error) {
           console.log(error.message) 
        }
      }
      contractInstance && displayCandidatesList()
    },[contractInstance])
    return ( 
    <div className="candidate-list-table-container">
      <br />
    {candidateList.length!==0?
    (<table className="candidate-list-table">
        <thead>
            <tr>
            <th className="candidate-list-table-header">Address</th>
                <th className="candidate-list-table-header">Name</th>
                <th className="candidate-list-table-header">Party</th>
                <th className="candidate-list-table-header">Candidate ID</th>
                <th className="candidate-list-table-header">Votes</th>
                <th className="candidate-list-table-header">Photo</th>
            </tr>
        </thead>
        <tbody>
            {candidateList.map((candidate, index) => (
                <tr key={index} className={index % 2 === 0 ? "even-row" : "odd-row"}>
                    <td className="candidate-list-table-data"><center>{candidate.candidateAddress}</center></td>
                    <td className="candidate-list-table-data"><center>{candidate.name}</center></td>
                    <td className="candidate-list-table-data"><center>{candidate.party}</center></td>
                    <td className="candidate-list-table-data"><center>{String(candidate.candidateID)}</center></td>
                    <td className="candidate-list-table-data"><center>{String(candidate.votes)}</center></td>
                    <td className="candidate-list-table-data">  
                      <center>
                      <img 
                       width={"70px"} 
                       height={"70px"} 
                       src={`http://localhost:3000/images/CandidateImages/${candidate.candidateAddress}.png`}
                      />  
                      </center>    
                    </td>
                </tr>
            ))}
        </tbody>
    </table>):(<p>No Candidates Found!</p>)}
</div>);
}
 
export default CandidatesList;

