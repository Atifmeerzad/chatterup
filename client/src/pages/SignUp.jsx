import { useState } from "react";
import axios from "axios";

const SignUp = (props) => {
  const [username, setUsername] = useState();
  const [secret, setSecret] = useState();
  const [email, setEmail] = useState();

  const onSignup = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:3001/signup", {
        username,
        secret,
        email,
      })
      .then((r) => props.onAuth({ ...r.data, secret })) // NOTE: over-ride secret
      .catch((e) => console.log(JSON.stringify(e.response.data)));
  };
  return (
    <form onSubmit={onSignup}>
      <div className="title">or Sign Up</div>
      <input
        type="text"
        name="username"
        placeholder="Username"
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        name="secret"
        placeholder="Password"
        onChange={(e) => setSecret(e.target.value)}
      />
      <input
        type="text"
        name="email"
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
      />
      <button type="submit">SIGN UP</button>
    </form>
  );
};

export default SignUp;
