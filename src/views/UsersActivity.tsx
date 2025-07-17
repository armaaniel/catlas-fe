import {gql, useQuery} from '@apollo/client'
import { useParams } from 'react-router-dom'
import { NavLink } from 'react-router-dom';


const FETCH_TRANSACTIONS = gql` 
query fetchTransactions($id: ID!) {
	transactions(id: $id) {
		transactionType,
		amount,
		quantity,
		createdAt,
		symbol,
		id
	}
}`

function UsersActivity() {
	
	const {id} = useParams();
	
	const {loading, error, data} = useQuery(FETCH_TRANSACTIONS, {
	
		variables: {id},
		
	})
	
    if (loading || !data?.transactions) return null;
    if (error) return <p>Error: {error.message}</p>;
	
	const activityData = data.transactions
	
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
	
	<div class='positions-container'>
	<h3 class='catlas-text'>Activities</h3>
	
	<table class='overview-stock-table'>
		<thead>
			<tr class='portfolio-row'>
			<th class='portfolio-row-heading'>Date</th>
			<th class='portfolio-row-heading'>Type</th>
			<th class='portfolio-row-heading'>Symbol</th>
			<th class='portfolio-row-heading'>Quantity</th>	
			<th class='portfolio-row-heading'>Value</th>	
			</tr>
		</thead>
	
	
		<tbody>
		
		{activityData.map(activity => (
			
			<tr key={activity.id} class ='portfolio-row'>
			
			<td class='shares-cell'>
			<p class="details-text">{activity.createdAt}</p>
			</td>
			
			<td class='shares-cell'>
			<p class="details-text">{activity.transactionType}</p>
			</td>
			
			<td class='shares-cell'>
			<p class="details-text">{activity.symbol}</p>
			</td>
			
			<td class='shares-cell'>
			<p class="details-text">{activity.quantity}</p>
			</td>
			
			<td class='shares-cell'>
			<p class="details-text">{activity.amount}</p>
			</td>
			
			</tr>
		
		))}
		
		</tbody>
		</table>
		</div>
	
	</>
	
	
	)

}

export default UsersActivity;
