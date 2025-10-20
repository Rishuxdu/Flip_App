import { useState } from "react"
import { useNavigate } from "react-router-dom"
export default  function Login({onLoginSuccess,onClose}){
const navigate=useNavigate()


    const[email,setEmail]=useState("")
    const[password,setPassword]=useState("")
const [message, setMessage] = useState("")
    
const handleLogin= async ()=>{
    
    const response= await fetch("http://localhost:3000/login",{
method:"POST",
headers: { "Content-Type": "application/json" 
    
},


body:JSON.stringify({email,password})
    })
const data= await response.json()

    if (data.token) {
  localStorage.setItem("token", data.token);
  setPassword("");
  setEmail("");
  onLoginSuccess("Login successful!"); 
} else {
  setMessage(data.message || "Login failed"); 
}

    
console.log("login successful")

 
    

}


    return(
        <>
        <div className="flex justify-center items-center h-screen bg-gray-100">
            
            <div className="relative bg-white p-6 rounded shadow-lg flex flex-col gap-4 w-[300px] h-[300px] ">
<button onClick={()=>{navigate("/app")}}
  className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"> <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
  </svg></button>
                <input type="text" name="email" placeholder="Enter Your Email" value={email}
                  onChange={(e)=>{setEmail(e.target.value)}}

                 id="" className="border border-gray-400 p-3 rounded w-full mt-6"/>
            
            <input type="text" name="password" placeholder="Password here" value={password}
                  onChange={(e)=>{setPassword(e.target.value)}}

                 id="" className="border border-gray-400 p-3 rounded w-full"/>
               
                 <button onClick={handleLogin} className="bg-violet-500 text-white py-2 rounded hover:bg-violet-600 mt-12" > Login</button>
            </div>

        </div>
        </>
    )
}