import { useState, useEffect } from "react";
import Wrapper from "../assets/wrappers/RegisterPage";
import { Alert, FormRow } from "../components";
import { useAppContext } from "../context/appContext";
import {useHistory} from "react-router-dom"

const initialState = {
  name: "",
  email: "",
  password: "",
  isMember: true,
};
const Register = () => {
  const [values, setValues] = useState(initialState);
  const history=useHistory()
  const {user,isLoading,showAlert,displayAlert,registerUser,loginUser}=useAppContext()
  console.log(user)

  const toggleMember = () => {
    setValues({ ...values, isMember: !values.isMember });
  };
  const handleChange = (e) => {
   setValues({...values,[e.target.name]:e.target.value})
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const {name,email,password,isMember,location}=values

    if(!password || !email || (!isMember && !name)){
      displayAlert()
      return
    }

    const currentUser={name,email,password,location}
    if(isMember){
     loginUser(currentUser)
    }else{
      registerUser(currentUser)
    }
    
  };
useEffect(()=>{
if(user){
  setTimeout(()=>{
    history.push("/")
  },3000)
 
}
},[user,history])

  return (
    <Wrapper className="full-page">
      <form className="form" onSubmit={onSubmit}>
        <h3>{values.isMember ? "Login" : "Register"}</h3>
        {showAlert && <Alert />}
        {!values.isMember && (
          <FormRow
            type="text"
            name="name"
            value={values.name}
            handleChange={handleChange}
          />
        )}

        <FormRow
          type="email"
          name="email"
          value={values.email}
          handleChange={handleChange}
        />
        <FormRow
          type="password"
          name="password"
          value={values.password}
          handleChange={handleChange}
        />
        <button type="submit" className="btn btn-block" disabled={isLoading}>
          Submit
        </button>
        <p>
            {values.isMember ? "not yet Registerd?" : "Already An member"}
          <button type="button" onClick={toggleMember} className="member-btn">
            {values.isMember ? "Register" : "Login"}
          </button>
        </p>
      </form>
    </Wrapper>
  );
};

export default Register;
