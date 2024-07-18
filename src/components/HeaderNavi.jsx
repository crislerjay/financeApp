import { Link, useNavigate } from 'react-router-dom';
import { SignedIn, UserButton } from "@clerk/clerk-react";
import { useState } from 'react';

export default function HeaderNavi() {
  const [isOpen, setIsOpen] = useState(false)
  const navigate = useNavigate()

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  };
  return (
    <>
      <header>
        <div className="flex">
          <h1 className="title" onClick={() => navigate('/')}>Finance App</h1>
          <div className={`burger-menu-icon ${isOpen ? 'open' : ''}`} onClick={toggleMenu}>
            <div></div>
            <div></div>
            <div></div>
          </div>
        </div>
        
        <div className={`menu ${isOpen ? 'open' : ''}`}>
          <ul>
            <li><Link to='/'>Home</Link></li>
            <li><Link to='/transactions'>Transactions</Link></li>
            <li><Link to='/add'>Create Transaction</Link></li>
            <li><Link to='/category'>Categories</Link></li>
            <li><Link to='/statistics'>Monthly Record</Link></li>
            <li>
              <SignedIn>
                <UserButton />
              </SignedIn>
            </li>
          </ul>
        </div>
      </header>
  </>
  )
}
