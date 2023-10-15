import { useState } from "react";
import { icon } from "../constants";
import { Input } from "../ui";
const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  return (
    <div className="text-center mt-5">
      <main className="form-signin w-25 m-auto">
        <form>
          <img className="mb-2" src={icon} alt="" width="72" height="60" />
          <h1 className="h3 mb-3 fw-normal">Please register</h1>

          <Input label={"Username"} state={username} id={'username'} setState={setUsername} />
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

          <button className="w-100 btn btn-lg btn-primary" type="submit">
            Sign up
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
