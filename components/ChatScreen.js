import styled from "styled-components";
import { useState } from "react";
import {useRouter} from 'next/router'
import { Avatar, IconButton } from "@material-ui/core";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../firebase";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import AttachFileIcon from "@material-ui/icons/AttachFile";
import { useCollection } from "react-firebase-hooks/firestore";
import InsertEmoticonIcon from "@material-ui/icons/InsertEmoticon";
import MicIcon from "@material-ui/icons/Mic";
import firebase from "firebase";
import Message from "./Message";

function ChatScreen({ chat, messages }) {
  const router = useRouter();
  const [input, setInput] = useState("");
  const [user] = useAuthState(auth);
  const [messagesSnapshot] = useCollection(
    db
      .collection("chats")
      .doc(router.query.uid)
      .collection("messages")
      .orderBy("timestamp", "asc")
  );

  // console.log("messagesnapshot",messagesSnapshot)

  const sendMessage = (e) => {
    e.preventDefault();

    /// updating the last seen
    db.collection("users").doc(user.uid).set(
      {
        lastSeen: firebase.firestore.FieldValue.serverTimestamp(),
      },
      { merge: true }
    );

    db.collection("chats").doc(router.query.id).collection("messages").add({
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      message: input,
      user: user.email,
      photoURL: user.photoURL,
    });
    setInput("");
  };

  const showMessage = () => {
    console.log("calling");

    if (messagesSnapshot) {
      console.log("calling1", messagesSnapshot);

      return messagesSnapshot.docs.map((message) => {
        <Message
          key={message.id}
          user={message.data().user}
          message={{
            ...message.data(),
            timestamp: message.data().timestamp?.toDate().getTime(),
          }}
        />;
      });
    } else {
      console.log("calling2",messages);

      return JSON.parse(messages).map((message) => (
        <Message
          key={message.id}
          user={message.user}
          message={message}
        />
      ));
    }
  };

  return (
    <Container>
      <Header>
        <Avatar />
        <HeaderInformation>
          <h3>email</h3>
          <p>last seen</p>
        </HeaderInformation>
        <HeaderIcon>
          <IconButton>
            <AttachFileIcon />
          </IconButton>
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        </HeaderIcon>
      </Header>
      <MessageContainer>
        {showMessage()}
        <EndofMessage />
      </MessageContainer>
      <InputContainer>
        <InsertEmoticonIcon />
        <Input value={input} onChange={(e) => setInput(e.target.value)} />
        <button hidden disabled = {!input} type="submit" onClick={sendMessage}>
          Send Message
        </button>
        <MicIcon />
      </InputContainer>
    </Container>
  );
}

export default ChatScreen;

const Container = styled.div``;
const Header = styled.div`
  position: sticky;
  background-color: white;
  display: flex;
  top: 0;
  padding: 10px;
  z-index: 100;
  align-items: center;
  height: 80px;
  border-bottom: 1px solid whitesmoke;
`;
const HeaderInformation = styled.div`
  flex: 1;
  margin-left: 15px;
  align-items: center;
  > h3 {
    margin-bottom: 3px;
  }

  > p {
    font-size: 14px;
    color: gray;
  }
`;
const HeaderIcon = styled.div``;
const MessageContainer = styled.div`
  padding: 30px;
  background-color: #e5ded8;
  min-height: 90vh;
`;
const EndofMessage = styled.div``;
const InputContainer = styled.form`
  display: flex;
  align-items: center;
  position: sticky;
  z-index: 100;
  padding: 10px;
  bottom: 0;
  background-color: white;
`;
const Input = styled.input`
  flex: 1;
  outline: 0;
  border: none;
  border-radius: 10px;
  background-color: whitesmoke;
  padding: 20px;
  margin-left: 15px;
  margin-right: 15px;
`;
