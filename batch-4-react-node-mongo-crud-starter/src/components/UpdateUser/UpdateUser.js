import React,{useState,useEffect,useRef} from 'react';
import { useParams } from 'react-router-dom';





const UpdateUser = () => {
    const [user,setUser] = useState({});
   
    const {id} = useParams();
    const url = `http://localhost:8081/singleUsers/${id}`;
    useEffect(()=>{
        fetch(url)
        .then(res=>res.json())
        .then(data=>setUser(data));

    },[])
    ////update...............
    const onChangeName= e=>{

        const updateName= e.target.value;
        const updateUser= {...user}
        updateUser.name= updateName;
        setUser(updateUser);
    
    }
    const onChangeEmail= e=>{
    
        const updateEmail= e.target.value;
        const updateUser= {...user}
        updateUser.email= updateEmail;
        setUser(updateUser);
    
    }
    const onChangePhone= e=>{
    
        const updatePhone= e.target.value;
        const updateUser= {...user}
        updateUser.phone= updatePhone;
        setUser(updateUser);
    
    }
   const handleUpdate = e=>{
   
       const url = `http://localhost:8081/updateUser/${id}`;
       fetch(url,{
           method:"PATCH",
           headers:{
            'Content-Type': 'application/json',
           },
           body:JSON.stringify(user)
       })
       .then(res=>res.json())
       .then(data=>{
        console.log(data);
        if(data.ok===1){
            alert("updated successfullay")
            e.target.reset()
        }
       })
       e.preventDefault();
     
   }
    return (
        <div>
            <h2>This is Update User {id} {user.email}</h2>
            <form onSubmit={handleUpdate}>
                <input type="text" onChange={ onChangeName} placeholder="name" value={user.name || ""}></input>
                <input type="email" onChange={ onChangeEmail} placeholder="email" value={user.email || ""} ></input>
                <input type="text" onChange={ onChangePhone} placeholder="phone" value={user.phone | ""}></input>
                <input type='submit' ></input>

            </form>
        </div>
    );
};

export default UpdateUser;