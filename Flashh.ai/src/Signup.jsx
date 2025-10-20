import { useState } from "react"
import { useNavigate } from "react-router-dom"
export default  function Signup({onSignSuccess, onLogin,onClose}){

const navigate=useNavigate()

    const[username,setUsername]=useState("")
    const[password,setPassword]=useState("")
const[email,setEmail]=useState("")
const [message,setMessage]=useState("")

    
const handleSignup= async ()=>{
    
    const response= await fetch("https://flip-app.onrender.com/signup",{
method:"POST",
headers: { "Content-Type": "application/json"
    
 },
body:JSON.stringify({username,password,email})
    })
const data= await response.json()
if(data.token){
   localStorage.setItem("token", data.token);
   setPassword("");
   setUsername("");
   setEmail("");
   onSignSuccess("Signup successful!"); 
} else {
   setMessage(data.message || "Signup failed"); 
}

console.log("User created:", data)



    

}

    return(
        <>
        <div className="flex justify-center items-center h-screen bg-gray-100">

            
            <div className="relative bg-white p-6 rounded shadow-lg flex flex-col gap-4 w-[600px] h-[400px] ">
<button onClick={()=>{navigate("/app")}}  className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"> <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
  </svg></button>
                <input type="text" name="username" placeholder="Enter Your Username" value={username}
                  onChange={(e)=>{setUsername(e.target.value)}}

                 id="" className="border border-gray-400 p-3 rounded w-full mt-6 "/>
            <div className="flex flex justify-evenly mt-4">
                  <input type="text" name="email" placeholder="abc@gmail.com" value={email}
                  onChange={(e)=>{setEmail(e.target.value)}}

                 id="" className="border border-gray-400 p-3 rounded w-65 mr-5"/>
            <input type="text" name="password" placeholder="Password here" value={password}
                  onChange={(e)=>{setPassword(e.target.value)}}

                 id="" className="border border-gray-400 p-3 rounded w-65 ml-5"/>
</div>
                 <button className="text-sm text-gray-600 hover:text-blue-600 underline-offset-2 hover:underline bg-transparent border-none focus:outline-none mt-4" onClick={() => navigate("/login")}>Login instead</button>
               
                 <button onClick={handleSignup} className="bg-violet-500 text-white py-2 rounded hover:bg-violet-600 mt-20" > create account</button>
            </div>

        </div>
        </>
    )
}