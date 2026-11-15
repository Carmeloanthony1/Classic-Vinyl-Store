import React, {useState, useEffect} from "react";
import { Link, useNavigate } from "react-router-dom";
export default function Nav(){
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const stored_user = localStorage.getItem("user");
    if(stored_user){
      setUser(JSON.parse(stored_user));
    }
  }, []);

  const handle_logout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("user");

    navigate("/login");
    window.location.reload();
  };

  const firstname = user ? user.name.split(" ")[0] : "";

  return (
    <nav className="w-full flex justify-between items-center px-4 py-3 bg-[#ffffe6] border-b border-[#CBA052]/20 text-[#F5F1E1] font-cinzel select-none">
      <a href = "/home" className="flex flex-col justify-center items-center gap-1 cursor-pointer">
        <img className = "w-12 h-12 object-cover border-2 border-[#a58141] rounded-full" src="/logo.png" alt="logo"/>
        <span className="text-[#a58141] font-bold">Classic Vinyl Store</span>
      </a>
      <ol className="flex flex-row items-center space-x-46 text-xl">
        <li className="text-[#a58141] font-bold cursor-pointer">Product</li>
        <li className="text-[#a58141] font-bold cursor-pointer">About</li>
        <li className="text-[#a58141] font-bold cursor-pointer">Order</li>
      </ol>
      <div>
          {user ? (
              <div className="flex items-center gap-4">
                  <span className="font-bold text-[#a58141] text-lg">
                      Hi, {firstname}!
                  </span>
              </div>
          ) : (
              <Link 
                  to="/Login"
                  className="border-2 border-[#a58141] text-[#a58141] px-8 py-2 rounded-full font-bold hover:bg-[#a58141] hover:text-white transition"
              >
                  LOGIN
              </Link>
          )}
      </div>
    </nav>
  );
}

