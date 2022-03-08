import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Wrapper from "../../assets/wrappers/SharedLayout";
import AddWork from "./AddWork";
import AllWork from "./AllWork";
import Stats from "./Stats";
import Profile from "./Profile";
import { Navbar, SmallSidebar, BigSidebar } from "../../components";
import { useHistory } from "react-router-dom";

const SharedLayout = () => {
  const user = localStorage.getItem("user");
  const history = useHistory();

  return (
    <>
      {user ? (
        <Wrapper>
          
          <main className="dashboard">
            <SmallSidebar />
            <BigSidebar />
            <div>
              <Navbar />
              <div className="dashboard-page">
                <Router>
                  {/* <nav>
                    <Link to="/stats"></Link>
                    <Link to="/allwork"></Link>
                    <Link to="/addwork"></Link>
                    <Link to="/profile"></Link>
                  </nav> */}
                  <Switch>
                 <Route exact path="/allwork" component={AllWork}/>
                 <Route path="/addwork" component={AddWork}/>
                 <Route path="/profile" component={Profile}/>
                 <Route index component={Stats}/>
                
                  </Switch>
                </Router>
                
              </div>
            </div>
          </main>
        </Wrapper>
      ) : (
        history.push("/landing")
      )}
    </>
  );
};

export default SharedLayout;
