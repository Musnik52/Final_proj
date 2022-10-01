import SignupForm from "./SignupForm";
import Card from "../UI/Card/Card";
import axios from "axios";
import "./Signup.css";
const uuid = require("uuid");

const Signup = (props) => {
  const saveCustomerDataHandler = async (enteredCustomerData) => {
    const dataCustomer = {
      ...enteredCustomerData,
      publivId: uuid.v4(),
      user_role: "customer",
    };
    axios
      .post("http://localhost:8080/", dataCustomer)
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="container__im2">
      <h3 className="center__headline">Signup</h3>
      <Card className="signup">
        <SignupForm onSaveCustomerData={saveCustomerDataHandler} />
      </Card>
    </div>
  );
};

export default Signup;
