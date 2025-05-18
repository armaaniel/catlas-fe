import React, { useState, useEffect } from 'react';
import { gql, useLazyQuery } from '@apollo/client';
import { useDebounce } from 'use-debounce';
import { useNavigate } from 'react-router-dom';
import './searchbar.css'


const SEARCH_USERS = gql`

query Search_Users($term:String!) {
	usersByEmailOrName(term: $term) {
		email
		firstName	
		id
	}
}
`

const Searchbar = () => {
	
	const [searchTerm, setSearchTerm] = useState('');
	
	const [debouncedSearchTerm] = useDebounce(searchTerm, 250)
	
	const [searchUsers, {loading, data}] = useLazyQuery(SEARCH_USERS, {
		
		variables: {term: debouncedSearchTerm},
		fetchPolicy: 'cache-and-network',
	
	});
	
	const navigate = useNavigate();
	
	const searchResults = data?.usersByEmailOrName || [];
	
	const handleSearchChange = (e) => {
		
		setSearchTerm(e.target.value);
	
	};
	
	const handleUserSelect = (user) => {
		
		navigate(`/users/${user.id}`)
		setSearchTerm('');
	
	};
	
	useEffect( () => { 
	
		if (debouncedSearchTerm) {
			searchUsers();
		}
	}, [debouncedSearchTerm, searchUsers]);
	

	return (
	
	<>
	
	<div class='nav-search-div-two'>
	
	<div class='search-svg-div'>
	
	<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="24" height="24">
	      <path 
	        d="m14 14-2.867-2.867m1.534-3.8A5.333 5.333 0 1 1 2 7.333a5.333 5.333 0 0 1 10.667 0Z" 
	        stroke="#32302F" 
	        stroke-width="1.8" 
	        stroke-linecap="round" 
	        stroke-linejoin="round"
	        fill="none">
	      </path>
	    </svg>
		
	</div>
	
	<div class='search-parent'>
	
    <input type='search' className='searchbar' placeholder='User Search' value={searchTerm} onChange={handleSearchChange} />
	
  </div>
  </div>
  
    {debouncedSearchTerm && searchResults.length > 0 && (
		<div className="search-results-container">
		<h3 className='results-text'>results</h3>
			<ul className="search-results">
			{searchResults.map((user) => (
				<li key={user.id} className="search-result-item" onClick={ () => handleUserSelect(user) }>
				<div>{user.firstName}</div>
				<div>{user.email}</div>
		        </li>
				
		            ))}
					
		          </ul>
		        </div>
		      )}
			  
		      {debouncedSearchTerm && searchResults.length === 0 && (
		        <div className="search-results-container">
				<h3 className='results-text'>results</h3>
		          <div className="search-result-item">No users found</div>
		        </div>
		      )}
		    </>
		  );
		};

		export default Searchbar;

