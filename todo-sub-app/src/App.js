//import logo from './logo.svg';
import React, { useRef } from "react";
import { useState, useEffect } from "react";
import "./App.css";

import { useQuery, gql, useLazyQuery } from "@apollo/client";
import { LOAD_USERS, DEL_USERS } from "./GraphQl/Queries";

import { useMutation } from '@apollo/client'
import { CREATE_USER_MUTATION, UPDATE_USER_MUTATION } from './GraphQl/Mutations'

import { useSubscription } from '@apollo/client'
import { SUBSCRIBE_USER_ADDED, SUBSCRIBE_USER_DELETED, SUBSCRIBE_USER_UPDATED } from './GraphQl/Subscriptions'

function App() {
  const [users, setUsers] = useState()
  const [value, setValue] = useState("");
  const [deleteUserId, setDelUserId] = useState()
  const [editUser, setEditUser] = useState("")
  const [addData, { error: mutationErr }] = useMutation(CREATE_USER_MUTATION)
  const [delUsers,{ error:delErr, loading:delLoading, data:remainingData }] = useLazyQuery(DEL_USERS);
  const [editData, { error: mutationError }] = useMutation(UPDATE_USER_MUTATION)
  const { data: userSubsDasta, error: subscriptionError, loading: subscriptionLoader } = useSubscription(SUBSCRIBE_USER_ADDED)
  const { data: userDelData, error: delError, loading: delLoader } = useSubscription(SUBSCRIBE_USER_DELETED)
  const { data: updateData, error: updateError, loading: updateLoader } = useSubscription(SUBSCRIBE_USER_UPDATED)
  const { error, loading, data } = useQuery(LOAD_USERS);

  //  const ref = useRef()
  //  console.log(value);
  const handleSubmit = () => {
    console.log(value && value);
    addData({
      variables: {
       name:value
      }
    })
  };
  const handleDelete = async(id) =>{  
   delUsers({variables:{deletedDataId:id}})
      
  }

  //console.log(userData)
const handleEdit = (id) =>{
console.log(`${editUser} ${id}`);
editData({
  variables:{name:editUser,editDataId:id}
})
}

useEffect(() => {
  userDelData && console.log('userDelData: ', userDelData)
  if (userDelData) {
    const deletedUser = userDelData['delData']
    //const allusers = [...users]     // old users
    console.log(deletedUser)
   const allUsers = users.filter((user)=>user.id !== deletedUser.id)
   console.log(allUsers)
   setUsers(allUsers)
   // re-render
  }
  // logic (todo)
}, [userDelData])
useEffect(() => {
  userSubsDasta && console.log('userSubsDasta: ', userSubsDasta)
  if (userSubsDasta) {
    const newAddedUser = userSubsDasta['newData']
    const allusers = [...users]     // old users
    allusers.unshift(newAddedUser); // push
    setUsers(allusers)      // re-render
  }
  // logic (todo)
}, [userSubsDasta])
  useEffect(() => {
    if (data) {
      setUsers([...data["allData"]]);
      console.log("dataaaa", data);

    }
  }, [data]);
  useEffect(() => {
    updateData && console.log('userSubsDasta: ', updateData)
   if(updateData){
    // logic (todo)
    const updatedData = updateData["updateData"];
    console.log(updatedData);
    const allUsers = users.filter((user)=>user.id !== updatedData.id)
    //updatedList.name = updateData["updateData"].name;
    //console.log(updatedList);
    
    console.log(allUsers);
    setUsers(allUsers)
    users.unshift(updatedData);
    console.log(users);
  }
   // state.data = diariesUpdatedList;
  }, [updateData]);
  if (loading) {
    return <h1>Loading......</h1>;
  }
  return (
    <div className="App">
      Hello World
      <h3>
        Group Name:
        <input type="text" onChange={(e) => setValue(e.target.value)} />
        <input type="button" value={"submit"} onClick={() => handleSubmit()} />
      </h3>
      <br />
      <ul>
        {users && users.map((data)=>{
        
       return <li key={data.id}>
                
        <input type={"text"}defaultValue={data.name}
         onChange={(e)=>setEditUser(e.target.value)}/>
        <input type={"button"} value={"Edit"} onClick={()=>handleEdit(data.id)}/>
         <input type={"button"} value="Delete"onClick={()=>handleDelete(data.id)}/>
         
         </li>
        
        })}
      </ul>
    </div>
  );
}

export default App;
