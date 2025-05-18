import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import './navbar.css'
import Searchbar from './Searchbar'



function Navbar() {
	
    const navigate = useNavigate();
	
    const goHome = () => {
		navigate('/');
		toggleDropdown();
	}
	
	const [isOpen, setIsOpen] = useState(false);
		
	const toggleDropdown = () => {
	
		if (isOpen) {
		
			setIsOpen(false);
			
		} else { 
		
			setIsOpen(true);
		
		}
		
		}
	
	
		
	return (
	
	<>
  		<div className='navbar'>
		
			<div class = 'nav-button-div'>
			<button class ='nav-button' onClick={toggleDropdown}>
			
			<svg width='32' height='32' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
			    <path d="M4 12h16M4 6h16M4 18h16" stroke="#32302F" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
			  </svg>
			
			</button>
			</div>
			
			<div>
			<h2 class='catlas-text'>Catlas</h2>
			</div>
			
			
			<div class='nav-search-div'>
			
			<Searchbar />
			
			</div>
		</div>
		
		{isOpen && (
			
			<div class='nav-dropdown'>
			<button class ='nav-dropdown-button'onClick={goHome} >Dashboard</button>
			<button class ='nav-dropdown-button'onClick={goHome}>Meow</button>
			<button class ='nav-dropdown-button'onClick={goHome}>Meow</button>
			</div>
			
			
			)}		
		
		
		
	</>
			
	
	)

}

export default Navbar