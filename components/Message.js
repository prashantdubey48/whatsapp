import styled from 'styled-components'

const Message=({user,message})=> {
    console.log("aaaaaaaa=>",message)
    return (
        <Container>
        <p>{message.message}</p>    
        </Container>
    )
}

export default Message

const Container = styled.div``;
