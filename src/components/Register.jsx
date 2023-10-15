import { useState } from "react";
import { icon } from "../constants";
import { Input } from "../ui";
import { useDispatch, useSelector } from "react-redux";
import { signUserStart, signUserSuccess, signUserFailure } from "../slice/auth";
import AuthService from "../service/auth";
const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.auth);

  const registerHandler = async (e) => {
    e.preventDefault();
    dispatch(signUserStart());
    const user = { username, email, password };
    try {
      const response = await AuthService.userRegister(user);
      console.log(response);
      dispatch(signUserSuccess(response.user));
    } catch (error) {
      console.log(error.response.data);
      dispatch(signUserFailure(error.response.data));
    }
  };

  return (
    <div className="text-center mt-5">
      <main className="form-signin w-25 m-auto">
        <form>
          <img className="mb-2" src={icon} alt="" width="72" height="60" />
          <h1 className="h3 mb-3 fw-normal">Please register</h1>

          <Input
            label={"Username"}
            state={username}
            id={"username"}
            setState={setUsername}
          />
          <Input
            label={"Email address"}
            id={"email"}
            type={"email"}
            state={email}
            setState={setEmail}
          />
          <Input
            label={"Password"}
            id={"password"}
            type={"password"}
            state={password}
            setState={setPassword}
          />

          <button
            className="w-100 btn btn-lg btn-primary"
            onClick={registerHandler}
            disabled={isLoading}
            type="submit"
          >
            {isLoading ? "loading..." : "Sign up"}
          </button>
          <p className="mt-5 mb-3 text-muted">
            © 2017–{new Date().getFullYear()}
          </p>
        </form>
      </main>
    </div>
  );
};

export default Register;
