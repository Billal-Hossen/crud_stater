import React,{useState,useEffect} from 'react';
import { Link } from 'react-router-dom';



const Users = () => {
    const [users,setUsers] = useState([])
  useEffect(()=>{
    fetch("http://localhost:8081/users")
    .then(res=>res.json())
    .then(data=>setUsers(data))
  },[])
 /// delete user
 const handleDelete= id=>{
     console.log(id);
const url= `http://localhost:8081/users/${id}`
fetch(url,{
    method:"DELETE",
    
})
.then(res=>res.json())
.then(data=>{
    if(data.deletedCount>0){
        alert(`Delete user id ${id}`)
        const afterDeleteUer= users.filter(user=>user._id !==id);
        setUsers(afterDeleteUer)
    }

})
 }
     return (
        <div>
            <h2>This is Users</h2>
            {
                users.map(user=><li key={user._id}> {user.name} {user.email} <Link to={`/users/update/${user._id}`}>update</Link> <button onClick={()=>handleDelete(user._id)}>delete</button></li>)
            }
        </div>
    );
};

export default Users;