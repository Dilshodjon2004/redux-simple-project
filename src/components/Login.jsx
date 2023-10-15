import { useState } from "react";
import { icon } from "../constants";
import { Input } from "../ui";
import { useDispatch, useSelector } from "react-redux";
import { signUserStart, signUserSuccess, signUserFailure } from "../slice/auth";
import AuthService from "../service/auth";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.auth);

  const loginHandler = async (e) => {
    e.preventDefault();
    dispatch(signUserStart());
    const user = { email, password };
    try {
      const response = await AuthService.userLogin(user);
      // console.log(response);
      // console.log(user );
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
          <h1 className="h3 mb-3 fw-normal">Please login</h1>

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
            onClick={loginHandler}
            disabled={isLoading}
            type="submit"
          >
            {isLoading ? "loading..." : "Sign in"}
          </button>
          <p className="mt-5 mb-3 text-muted">
            © 2017–{new Date().getFullYear()}
          </p>
        </form>
      </main>
    </div>
  );
};

export default Login;
