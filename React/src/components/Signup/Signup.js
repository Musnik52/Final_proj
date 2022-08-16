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
    console.log(dataCustomer);
    axios
      .post("http://localhost:8080/", dataCustomer)
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="mb-3">
      <br />
      <h3>Signup</h3>
      <Card className="signup">
        <SignupForm onSaveCustomerData={saveCustomerDataHandler} />
      </Card>
    </div>
  );
};

export default Signup;
