const getReciepientEmail = (users,userLoggedIn)=>

   
    users?.filter((userToFilter) => userToFilter !== userLoggedIn?.email)[0];




export default getReciepientEmail