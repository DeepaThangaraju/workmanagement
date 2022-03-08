import { Fragment } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Error, Register, Landing } from "./pages";
import {
  AddWork,
  AllWork,
  Profile,
  Stats,
  SharedLayout,
} from "./pages/Dashboardpages";
import React from "react";

function App() {
  return (
    // <Router>
    //   <Switch>
    //     <Route
    //       exact
    //       path="/"
    //       render={() => {
    //         <React.Fragment>
    //           <AllWork />
    //           <Profile />
    //           <Stats />
    //           <AddWork />
    //         </React.Fragment>;
    //       }}
    //     />
    //     <Route path="/sharedlayout" component={SharedLayout} />
    //     <Route path="/register" component={Register} />
    //     <Route path="/landing" component={Landing} />
    //     <Route path="*" component={Error} />
    //   </Switch>
    // </Router>

   
    <Router >
     <div>
       <Switch> 
       <Route path="/landing" component={Landing} exact />
       <Route path="/register" component={Register} exact/>
         <Route path="/" component={SharedLayout} render={() =>{
           return <Fragment>
            <AllWork/>
            <AddWork/>
            <Profile/>
            <Stats/>
            <Route path="/allwork" component={AllWork}/>
            </Fragment>
          }} />  
          <Route path="/sharedlayout" component={SharedLayout} />
          
        
         
         <Route path="*" component={Error} exact/>
       </Switch>
     </div>
</Router>

  );
}

export default App;
