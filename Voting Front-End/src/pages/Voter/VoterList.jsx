import React, { useEffect, useState, useContext } from 'react'
import { web3Context } from '../../context/web3Context'
import { useNavigate } from 'react-router-dom'
import "./VoterList.css"

const VoterList = () => {
  const {web3State} = useContext(web3Context);
  const {contractInstance}=web3State; 
  const [voterList,setVoterList]=useState([])

  const token = localStorage.getItem("token")
  const navigateTo = useNavigate()
  useEffect(() => {
     if(!token){
      navigateTo("/")
     }
  },[navigateTo, token])
    
    useEffect(()=>{
      const displayVoterList = async()=>{
        try {
            const voterArray = await contractInstance.voterList();
            setVoterList(voterArray)         
        } catch (error) {
            console.log(error.message) 
        }
      }
      contractInstance && displayVoterList()
    },[contractInstance])
    return (  <div className="voter-list-table-container">
       <br />   
       {voterList.length!==0? (<table className="voter-list-table">
        <thead>
            <tr>
            <th className="voter-list-table-header">Address</th>
                <th className="voter-list-table-header">Name</th>
                <th className="voter-list-table-header">Photo</th>
            </tr>
        </thead>
        <tbody>
            {voterList.map((voter, index) => (
                <tr key={index} className={index % 2 === 0 ? "even-row" : "odd-row"}>
                    <td className="voter-list-table-data"><center>{voter.voterAddress}</center></td>
                    <td className="voter-list-table-data"><center>{voter.name}</center></td>
                    <td className="voter-list-table-data"><center><img width={"70px"} height={"70px"} src={`http://localhost:3000/images/VoterImages/${voter.voterAddress}.png`}></img></center></td>
                </tr>
            ))}
        </tbody>
    </table>):(<p>No Voters Found!</p>)}
    
</div>);
}
 
export default VoterList;