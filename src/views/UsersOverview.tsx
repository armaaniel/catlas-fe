import { useState, useEffect } from 'react';
import { gql, useQuery, useMutation } from '@apollo/client';
import { useParams } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import StockValue from '../components/StockValue.tsx'
import '../stylesheets/usersoverview.css'

const FETCH_USER_DATA = gql`
query fetchUserData($id: ID!) {
	usersById(id: $id) {
	firstName
	middleName
	lastName
	dateOfBirth
	gender
	email
	balance
	positions {
	symbol
	shares
	currentPrice
}
}	
}`

function UsersOverview() {
	
    const {id} = useParams();
	
	const {loading, error, data} = useQuery(FETCH_USER_DATA, {
		variables: {id},
	});
			
    if (loading || !data?.usersById) return null;
    if (error) return <div>Error: {error.message}</div>;
	
	const userData = data.usersById;	
		
	return (
	
	<>
	
	<div>
	
	<NavLink to={`/users/overview/${id}`} className={ ({ isActive }) => isActive ? "side-button-active" : "side-button"}>
	  Overview
	</NavLink>
	
	<NavLink to={`/users/activity/${id}`} className= { ({ isActive }) => isActive ? "side-button-active" : "side-button"}>
	  Activity
	</NavLink>
	
	<NavLink to={`/users/modifyusers/${id}`} className= { ({ isActive }) => isActive ? "side-button-active" : "side-button"}>
	  Modify User
	</NavLink>
	
	</div>
	
	<div class='home-right-two'>
	<h3 class='catlas-text'>{userData.firstName} {userData.lastName}</h3>
	
		<div class='home-right-two-details-parent'>
		<h3 class='catlas-text'>Details</h3>
	
			<div class='home-right-two-details'>
			
			<p class='details-text'>Email</p>
			<p class='details-text'>{userData.email}</p>
			
			<p class='details-text'>First Name</p>
			<p class='details-text'>{userData.firstName}</p>
			
			<p class='details-text'>Middle Name</p>
			<p class='details-text'>{userData.middleName}</p>
			
			<p class='details-text'>Last Name</p>
			<p class='details-text'>{userData.lastName}</p>
				
			<p class='details-text'>Date of Birth</p>
			<p class='details-text'>{userData.dateOfBirth}</p>
			
			<p class='details-text'>Gender</p>
			<p class='details-text'>{userData.gender}</p>
			
			</div>
	
		</div>
	</div>
	
	<div class='positions-container'>
	<h3 class='catlas-text'>Positions</h3>
	<p class='details-text'>Current Cash Balance: ${userData.balance}</p>
	
	
	<table class='overview-stock-table'>
		<thead>
		<tr class='portfolio-row'>
			<th class='portfolio-row-heading'>Symbol</th>
			<th class='portfolio-row-heading'>Shares</th>
			<th class='portfolio-row-heading'>Current Price</th>
			<th class='portfolio-row-heading'>Market Value</th>	
		</tr>
	</thead>
	
	<tbody>
	{userData.positions.map(position => (
	    <tr key={position.symbol} class ='portfolio-row'>
		
	      <td class='shares-cell'>
		  <p class="details-text">{position.symbol}</p>
	      </td>
		  
		  <td class='shares-cell'>
		  <p class="details-text">{position.shares}</p>
		  </td>
		  
		  <td class='shares-cell'>
		  <p class="details-text">{position.currentPrice}</p>
		  </td>
		  
		  <td class='shares-cell'>
		  <p class="details-text">{position.currentPrice * position.shares}</p>
		  </td>
	
	    </tr>
		
		))}
		
	</tbody>	
	</table>	
	</div>
	</>
		
	)
	
}

export default UsersOverview;

