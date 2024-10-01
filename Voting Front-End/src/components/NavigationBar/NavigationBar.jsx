import {Link} from "react-router-dom";
import { useContext } from "react";
import { web3Context } from "../../context/web3Context";
import './NavigationBar.css';

const NavigationBar = () => {
    const {web3State} = useContext(web3Context)
    const {ifElectionCommission} = web3State;
    return (
        <div>
            <nav>
            <ul>
                <li>
                    <Link to="/landing-page">
                        Election Status
                    </Link>
                </li>
                
                {!ifElectionCommission?(<li><Link to="/candidate-registration">
                        Candidate Register
                    </Link>
                    </li>):(<div></div>)}
                
                <li>
                    <Link to="/candidate-list">
                        Candidate List
                    </Link>
                </li>
                
                {!ifElectionCommission?(<li><Link to="/voter-registration">
                        Voter Register
                    </Link>
                    </li>):(<div></div>)}
                
                
                {ifElectionCommission?(<li><Link to="/voter-list">
                    Voter List
                    </Link>
                </li>):(<div></div>)}
                    
                
                {ifElectionCommission?(<li><Link to="/election-commission">
                        Election Commission
                    </Link>
                    </li>):(<div></div>)}
                
                <li>
                    <Link to="/token-exchange">
                        Token Exchange
                    </Link>
                </li>
                
                {!ifElectionCommission?(<li><Link to="/voter-profile">
                        Voter Profile
                    </Link>
                    </li>):(<div></div>)}
               
            </ul>
            </nav>
        </div>
    );
}

export default NavigationBar;