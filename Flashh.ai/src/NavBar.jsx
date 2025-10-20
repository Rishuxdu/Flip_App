  
  import { useState ,useEffect} from "react"
  import { useNavigate, useLocation } from "react-router-dom"
import Mylogo from"./assets/react.svg"

  
  
  
  
  export default function NavBar({onsignup}){
    const[isSignup,setIsSignup]=useState(false)

    const handleSignup=()=>{
      setIsSignup(!isSignup)
    }
      const navigate = useNavigate();
  const location = useLocation();
  const [showConnect, setShowConnect] = useState(false);

  const handleConnectClick = () => {
          
    setShowConnect((prev) => !prev); 
  };

  


  
  const openEmail = () => {
    window.open("mailto:your-email@example.com", "_blank");
  };

return (
   <>
  <div
    className="fixed top-0 left-0 w-full flex items-center justify-between px-6 py-3 shadow bg-white z-50"
  >
    <div className="flex items-center gap-2">
      <img src={Mylogo} alt="" />
    </div>

    <div className="flex items-center gap-6">
      <p 
        className="cursor-pointer relative text-neutral-500 hover:text-violet-700"
        onClick={handleConnectClick}
        
      >
        connect with us
       { showConnect &&( <div
            className="absolute top-full mt-2 right-0  p-2 shadow rounded cursor-pointer  bg-violet-100"
            onClick={openEmail}
          >
            <p className="text-blue-600 ">
            rishuagnihotri42@gmail.com
            </p>
          </div>)}
         
        
      </p>

      <img src="" alt="" />
      <button
        className="px-4 py-2 bg-violet-500 text-white rounded-lg hover:bg-violet-600 transition"
        onClick={()=>{navigate("/signup")}}
      >
        sign up/login
      </button>
    </div>
  </div>
</>

)

}