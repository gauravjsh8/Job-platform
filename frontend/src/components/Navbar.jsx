// import React, { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// const Navbar = () => {
//   const [isOpen, setIsOpen] = useState(false);
//   const { user, logout } = useAuth(); // destructure user and logout
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     logout(); // call your logout function
//     navigate("/login");
//   };

//   const toggleMenu = () => setIsOpen(!isOpen);

//   return (
//     <nav className="bg-white shadow-md">
//       <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
//         <Link to="/" className="text-xl font-bold text-indigo-600">
//           JobPortal
//         </Link>

//         <div className="hidden md:flex space-x-6">
//           <Link to="/" className="hover:text-indigo-600">
//             Home
//           </Link>
//           <Link to="/jobs" className="hover:text-indigo-600">
//             Jobs
//           </Link>
//           <Link to="/about" className="hover:text-indigo-600">
//             About
//           </Link>
//           <Link to="/contact" className="hover:text-indigo-600">
//             Contact
//           </Link>

//           {user ? (
//             <>
//               <Link to="/applications" className="hover:text-indigo-600">
//                 My Applications
//               </Link>
//               <button
//                 onClick={handleLogout}
//                 className="text-red-500 hover:underline"
//               >
//                 Logout
//               </button>
//             </>
//           ) : (
//             <>
//               <Link to="/login" className="hover:text-indigo-600">
//                 Login
//               </Link>
//               <Link to="/register" className="hover:text-indigo-600">
//                 Register
//               </Link>
//             </>
//           )}
//         </div>

//         {/* Mobile Menu Button */}
//         <button
//           className="md:hidden text-indigo-600 focus:outline-none"
//           onClick={toggleMenu}
//         >
//           ☰
//         </button>
//       </div>

//       {/* Mobile Menu */}
//       {isOpen && (
//         <div className="md:hidden px-4 pb-4 space-y-2">
//           <Link to="/" className="block hover:text-indigo-600">
//             Home
//           </Link>
//           <Link to="/jobs" className="block hover:text-indigo-600">
//             Jobs
//           </Link>
//           <Link to="/about" className="block hover:text-indigo-600">
//             About
//           </Link>
//           <Link to="/contact" className="block hover:text-indigo-600">
//             Contact
//           </Link>

//           {user ? (
//             <>
//               <Link to="/applications" className="block hover:text-indigo-600">
//                 My Applications
//               </Link>
//               <button
//                 onClick={handleLogout}
//                 className="text-red-500 hover:underline block"
//               >
//                 Logout
//               </button>
//             </>
//           ) : (
//             <>
//               <Link to="/login" className="block hover:text-indigo-600">
//                 Login
//               </Link>
//               <Link to="/register" className="block hover:text-indigo-600">
//                 Register
//               </Link>
//             </>
//           )}
//         </div>
//       )}
//     </nav>
//   );
// };

// export default Navbar;
