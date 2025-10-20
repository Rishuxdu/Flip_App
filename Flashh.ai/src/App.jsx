// App.jsx
import { useState,useEffect } from "react";
import { Routes, Route , useNavigate} from "react-router-dom"
import SideBar from './SideBar';
import CardCom from "./CardCom";
import NavBar from './NavBar';
import Signup from "./Signup";
import Login from "./Login";
import './index.css';
import GetStarted from "./GetStarted";






export default function App() {
  const [SelectedSubject, setSelectedSubject] = useState("");
  const [showSignup, setShowSignup] = useState(false);
  const [isLogin,setIsLogin]=useState(false)
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [message, setMessage] = useState("")
  const [showGetStarted,setShowGetStarted]=useState(true)
  const navigate = useNavigate();


  useEffect(() => {
  if (message) {
    const timer = setTimeout(() => {
      setMessage(""); 
    }, 2000); 

    return () => clearTimeout(timer); 
  }


}, [message])

const closeLogin = () => {setIsLogin(false)}




  return (
  <Routes>
   
    <Route
      path="/"
      element={<GetStarted toVanish={() => navigate("/signup")} />}
    />

    
    <Route
      path="/signup"
      element={
        <Signup
          onSignSuccess={(msg) => {
            setIsAuthenticated(true);
            setMessage(msg);
            navigate("/app");
          }}
          onLogin={() => navigate("/login")}
        />
      }
    />

    
    <Route
      path="/login"
      element={
        <Login
          onLoginSuccess={(msg) => {
            setIsAuthenticated(true);
            setMessage(msg);
            navigate("/app");
          }}
        />
      }
    />

   
    <Route
      path="/app"
      element={
        <div className="flex h-screen pt-[64px]">
          <NavBar onLogout={() => navigate("/login")} />
          <SideBar onselectSubject={(id) => setSelectedSubject(id)} />
          <div className="flex-1">
            {message && (
              <p className="text-center text-green-600 font-medium my-2">
                {message}
              </p>
            )}
            <CardCom subjectId={SelectedSubject || ""} />

          </div>
        </div>
      }
    />
  </Routes>
);

}

