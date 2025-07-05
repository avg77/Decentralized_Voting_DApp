import React, { useEffect, useState, useContext } from 'react';
import { web3Context } from '../../context/web3Context';
import { useNavigate } from 'react-router-dom';
import './VoterList.css';

const VoterList = () => {
  const { web3State } = useContext(web3Context);
  const { contractInstance } = web3State;
  const [voterList, setVoterList] = useState([]);
  const navigateTo = useNavigate();

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) navigateTo("/");
  }, [navigateTo, token]);

  useEffect(() => {
    const displayVoterList = async () => {
      try {
        const voterArray = await contractInstance.voterList();
        setVoterList(voterArray);
      } catch (error) {
        console.error(error.message);
      }
    };
    contractInstance && displayVoterList();
  }, [contractInstance]);

  const getImageURL = (imageCIDWithProvider) => {
    if (!imageCIDWithProvider || typeof imageCIDWithProvider !== 'string') return '';

    const [cid, provider = 'pinata'] = imageCIDWithProvider.split('|');
    const gatewayMap = {
      pinata: 'https://gateway.pinata.cloud/ipfs/',
      lighthouse: 'https://gateway.lighthouse.storage/ipfs/',
    };
    const gateway = gatewayMap[provider.toLowerCase()] || gatewayMap.pinata;
    return `${gateway}${cid}`;
  };

  return (
    <div className="voter-list-table-container">
      <br />
      {voterList.length !== 0 ? (
        <table className="voter-list-table">
          <thead>
            <tr>
              <th>Address</th>
              <th>Name</th>
              <th>Photo</th>
            </tr>
          </thead>
          <tbody>
            {voterList.map((voter, index) => (
              <tr key={index}>
                <td>{voter.voterAddress}</td>
                <td>{voter.name}</td>
                <td>
                  <img
                    width="70px"
                    height="70px"
                    src={getImageURL(voter.imageCID)}
                    alt="voter"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No Voters Found!</p>
      )}
    </div>
  );
};

export default VoterList;
