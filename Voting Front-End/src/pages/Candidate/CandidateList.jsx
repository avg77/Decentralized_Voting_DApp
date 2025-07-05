import React, { useEffect, useState, useContext } from 'react';
import { web3Context } from '../../context/web3Context';
import { useNavigate } from 'react-router-dom';
import './CandidateList.css';

const CandidateList = () => {
  const { web3State } = useContext(web3Context);
  const { contractInstance } = web3State;
  const [candidateList, setCandidateList] = useState([]);
  const navigateTo = useNavigate();

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) navigateTo("/");
  }, [navigateTo, token]);

  useEffect(() => {
    const displayCandidatesList = async () => {
      try {
        const candidates = await contractInstance.candidateList();
        setCandidateList(candidates);
      } catch (error) {
        console.error(error.message);
      }
    };
    contractInstance && displayCandidatesList();
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
    <div className="candidate-list-table-container">
      <br />
      {candidateList.length !== 0 ? (
        <table className="candidate-list-table">
          <thead>
            <tr>
              <th>Address</th>
              <th>Name</th>
              <th>Party</th>
              <th>Votes</th>
              <th>Photo</th>
            </tr>
          </thead>
          <tbody>
            {candidateList.map((c, index) => (
              <tr key={index}>
                <td>{c.candidateAddress}</td>
                <td>{c.name}</td>
                <td>{c.party}</td>
                <td>{String(c.votes)}</td>
                <td>
                  <img
                    width="70px"
                    height="70px"
                    src={getImageURL(c.imageCID)}
                    alt="candidate"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No Candidates Found!</p>
      )}
    </div>
  );
};

export default CandidateList;
