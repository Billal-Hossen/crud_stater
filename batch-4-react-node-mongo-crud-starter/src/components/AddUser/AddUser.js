import React,{ useRef } from 'react';


const AddUser = () => {
    const nameRef= useRef();
    const emailRef= useRef();
    const phoneRef= useRef();

    const handleSubmit=(e)=>{
        const name= nameRef.current.value;
        const email= emailRef.current.value;
        const phone= phoneRef.current.value;
        const newInfo={name, email,phone}
        console.log(newInfo);

        fetch("http://localhost:8081/users",{
            method:"POST",
            headers:{
                'Content-Type': 'application/json',
            },
            body:JSON.stringify(newInfo)
           
        })
        .then(res=>res.json())
        .then(result=>{
            if(result.insertedId){
                alert("successfully inserted user");
                e.target.reset()
            }
        })


        e.preventDefault();
    }
    return (
        <div>
            <h2>This is Add User</h2>
            <form onSubmit={handleSubmit}>
                <input type="text" ref={nameRef} placeholder="name"></input>
                <input type="text" ref={emailRef} placeholder="email"></input>
                <input type="text"ref={phoneRef} placeholder="phone"></input>
                <input type='submit' ></input>

            </form>
        </div>
    );
};

export default AddUser;