import { Link } from "react-router-dom";

export function NavBar(){
    return(
        <nav className="flex items-center justify-between shadow-xs bg-black text-violet-500 py-3 px-4" >
            <div className="text-2xl font-bold">
                <Link to="/">Movie App</Link>
            </div>
            <div className="flex gap-x-2 ">
                <Link to="/">Home</Link>
                <Link to="/favorites">Favorites</Link>
            </div>
        </nav>
    )
}