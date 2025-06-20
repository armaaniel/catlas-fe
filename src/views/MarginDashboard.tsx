import {gql, useQuery} from '@apollo/client'
import { NavLink } from 'react-router-dom';
import {useState} from 'react'

const FETCH_MARGIN_STATUS = gql `
query fetchMarginStatus {
	marginCallStatus {
		id
		firstName
		lastName
		email
		marginCallStatus
		equityRatio
	}
}`

function MarginDashboard() {
	
	const {loading, error, data} = useQuery(FETCH_MARGIN_STATUS);
	
	if (loading) return null
	if (error) return <p>Error</p>
	
	const marginData = data.marginCallStatus
	
	return (
	
	<>
	
	<div class='positions-container'>
	<h3 class='catlas-text'>Margin Dashboard</h3>
	
	<table class='overview-stock-table'>
		<thead>
			<tr class='portfolio-row'>
			<th class='portfolio-row-heading'>Name</th>
			<th class='portfolio-row-heading'>Email</th>
			<th class='portfolio-row-heading'>Margin Call Status</th>
			<th class='portfolio-row-heading'>Equity Ratio</th>
			<th class='portfolio-row-heading'>User Profile</th>	
				
			</tr>
		</thead>
	
	
		<tbody>
		
		{marginData.map(user => (
			
			<tr key={user.id} class ='portfolio-row'>
			
			<td class='shares-cell'>
			<p class="details-text">{user.firstName} {user.lastName}</p>
			</td>
			
			<td class='shares-cell'>
			<p class="details-text">{user.email}</p>
			</td>
			
			<td class='shares-cell'>
			<p class="details-text">{user.marginCallStatus}</p>
			</td>
			
			<td class='shares-cell'>
			<p class="details-text">{user.equityRatio}</p>
			</td>
			
			<td class='shares-cell'>
			<NavLink to={`/users/overview/${user.id}`}>
			  View
			</NavLink>
			</td>
			
			</tr>
		
		))}
		
		</tbody>
		</table>
		</div>
	
		</>
	
	)

}

export default MarginDashboard;