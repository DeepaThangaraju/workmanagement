import { Link } from "react-router-dom"
import img from "../assets/images/not-found.svg"
import Wrapper from "../assets/wrappers/ErrorPage"

const Error = () => {
  return (
    <Wrapper className="full-page">
        <div>
            <img src={img} alt="Not-Found"></img>
            <h3>Oops!! Page Not Found</h3>
            <p>Page you are looking for is not found for some reason</p>
            <Link to="/landing">Back Home</Link>
        </div>
    </Wrapper>
  )
}

export default Error