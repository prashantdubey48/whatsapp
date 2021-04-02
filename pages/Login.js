import styled from "styled-components";
import Head from "next/head";
import { Button } from "@material-ui/core";
import { auth,provider } from "../firebase";

function Login() {
    const signIn =()=>{

        auth.signInWithPopup(provider).catch(alert)
    }
  return (
    <Container>
      <Head>
        <title>Login</title>
      </Head>
      <LoginContainer>
        <Logo src="https://i.ibb.co/N9P0K9H/239px-Whats-App-svg.png" />
        <Button onClick={signIn} variant="outlined">Sign in with Google</Button>
      </LoginContainer>
    </Container>
  );
}

export default Login;

const Container = styled.div`
  display: grid;
  place-items: center;
  background-color: whitesmoke;
  

  height: 100vh;
`;
const LoginContainer = styled.div`
  display: flex;
  padding: 100px;
  align-items: center;
  background-color: white;
  border-radius: 20px;
  box-shadow: 0px 4px 14px -3px rgba(0, 0, 0, 0.75);
  flex-direction: column;
`;
const Logo = styled.img`
  height: 200px;
  width: 200px;
  margin-bottom: 50px;
`;
