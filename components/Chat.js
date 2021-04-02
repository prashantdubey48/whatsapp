import styled from "styled-components";
import { Avatar } from "@material-ui/core";
import getReciepientEmail from "../Utils/getReciepientEmail";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../firebase";
import { useCollection } from "react-firebase-hooks/firestore";
import {useRouter} from 'next/router'

function Chat({ id, users }) {
    const router = useRouter();
  const [user] = useAuthState(auth);

  const [recipientSnapshot] = useCollection(
    db.collection("users").where("email", "==", getReciepientEmail(users, user))
  );
  const enterChat=()=>{
      router.push(`/chat/${id}`)
  }
  const receiptientemail = getReciepientEmail(users, user);
  const recipient = recipientSnapshot?.docs?.[0]?.data();

  return (
    <Container>
      {recipient ? (
        <UserAvatar src={recipient?.photoURL} />
      ) : (
        <UserAvatar>{receiptientemail[0]}</UserAvatar>
      )}
      <p onClick={enterChat}>{receiptientemail}</p>
    </Container>
  );
  
}

export default Chat;

const Container = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  padding: 15px;
  word-wrap: break-word;

  :hover {
    background-color: #e9ebeb;
  }
`;
const UserAvatar = styled(Avatar)`
  margin: 5px;
  margin-right: 15px;
`;
