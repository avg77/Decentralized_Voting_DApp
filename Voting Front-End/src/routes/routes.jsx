import { createBrowserRouter } from "react-router-dom";
import Wallet from "../pages/Wallet/Wallet";
import CandidateRegistration from "../pages/Candidate/CandidateRegistration";
import VoterRegistration from "../pages/Voter/VoterRegistration";
import CandidateList from "../pages/Candidate/CandidateList";
import VoterList from "../pages/Voter/VoterList";
import NavigationBar from "../components/NavigationBar/NavigationBar";
import ElectionCommission from "../pages/ElectionCommission/ElectionCommission";
import TokenExchange from "../pages/TokenExchange/TokenExchange";
import VoterProfile from "../pages/Voter/VoterProfile";
import LandingPage from "../pages/LandingPage/LandingPage";

export const routes = createBrowserRouter([
  { path: "/", element: <Wallet /> },
  {
    path: "/landing-page",
    element: (
      <div>
        <NavigationBar/>
        <LandingPage/>
      </div>
    )
  },
  {
    path: "/candidate-registration",
    element: (
      <div>
        <NavigationBar />
        <CandidateRegistration />
      </div>
    )
  },
  {
    path: "/voter-registration",
    element: (
      <div>
        <NavigationBar />
        <VoterRegistration />
      </div>
    )
  },
  {
    path: "/candidate-list",
    element: (
      <div>
        <NavigationBar />
        <CandidateList />
      </div>
    )
  },
  {
    path: "/voter-list",
    element: (
      <div>
        <NavigationBar />
        <VoterList />
      </div>
    )
  },
  {path:"/election-commission",
    element: (
    <div>
        <NavigationBar/>
        <ElectionCommission/>
    </div>
    )
  },
  {path:"/token-exchange",
    element: (
    <div>
        <NavigationBar/>
        <TokenExchange/>
    </div>
    )
  },
  {path:"/voter-profile",
    element:(
    <div>
        <NavigationBar/>
        <VoterProfile/>
    </div>
)}
]);
