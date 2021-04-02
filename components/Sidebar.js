import styled from "styled-components";
import { Avatar, IconButton, Button } from "@material-ui/core";
import ChatIcon from "@material-ui/icons/Chat";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import SearchIcon from "@material-ui/icons/Search";
import * as EmailValidator from "email-validator";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollection } from "react-firebase-hooks/firestore";
import Chat from './Chat'

import { auth, db } from "../firebase";

function Sidebar() {
  const [user] = useAuthState(auth);
  console.log("user==>",user)
  /// checking if chats already exist
  const userChatRef = db
    .collection("chats")
    .where("users", "array-contains", user.email);
  const [chatsSnapshot] = useCollection(userChatRef);

  const createChat = () => {
    const input = prompt(
      "Please enter an email address for the user you want to chat"
    );
    if (!input) return null;

    console.log("already", chatAlreadyexist(input));

    if (
      EmailValidator.validate(input) &&
      !chatAlreadyexist(input) &&
      input !== user.email
    ) {
      // add chat in db
      console.log("adding in db");
      console.log("already", chatAlreadyexist(input));
      db.collection("chats").add({
        users: [user.email, input],
      });
    }
  };

  const chatAlreadyexist = (recipientemail) =>
    // !!chatsSnapshot?.docs.find((chat) =>
    //   chat.data().users.find((user) => user === recipientemail)?.length > 0
    // );

    !!chatsSnapshot?.docs.find(
      (chat) =>
        chat.data().users.find((user) => user === recipientemail)?.length > 0
    );

  return (
    <Container>
      <Header>
        <UserAvatar src =  {user.photoURL} onClick={() => auth.signOut()} />
        <IconContainer>
          <IconButton>
            <ChatIcon />
          </IconButton>
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        </IconContainer>
      </Header>
      <Search>
        <SearchIcon />
        <SearchInput placeholder="search in chats" />
      </Search>
      <SidebarButton onClick={createChat}>Start a new chat</SidebarButton>
      {chatsSnapshot?.docs.map((chat) => (
        <Chat key={chat.id} id={chat.id} users={chat.data().users} />
      ))}
    </Container>
  );
}

export default Sidebar;

const Header = styled.div`
  display: flex;
  flex-direction: row;
  background-color: white;
  position: sticky;
  top: 0;
  z-index: 1;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
  height: 80px;
  border-bottom: 1px solid whitesmoke;
`;

const SidebarButton = styled(Button)`
  width: 100%;

  ///// for styling a material UI components
  &&& {
    border-bottom: 1px solid whitesmoke;
    border-top: 1px solid whitesmoke;
  }
`;
const Container = styled.div`
flex:0.45;
border-right:1px solid whitesmoke;
height:100vh;
min-width:300px;
max-width:350px;
overflow-y:scroll;

::-webkit-scrollbar {
display:none

}
`;
const SearchInput = styled.input`
  outline-width: 0px;
  border: none;
  flex: 1;
`;

const UserAvatar = styled(Avatar)`
  cursor: pointer;
  :hover {
    opacity: 0.8;
  }
`;

const Search = styled.div`
  display: flex;
  align-items: center;
  padding: 20px;
  border-radius: 2px;
`;
const IconContainer = styled.div``;
