import '../stylesheets/datacat.css'
import { gql, useQuery } from '@apollo/client';
import { useNavigate, NavLink } from 'react-router-dom';


const TRACE_SUMMARY = gql `
query fetchTraceSummary {
	traceSummary {
		route
		cleanRoute
		p99
		totalRequests
	}
}`

function Datacat() {
	
	const {loading, error, data} = useQuery(TRACE_SUMMARY)
	
	console.log(data)
	
    const handleSelect = (trace) => {

        navigate(`/datacat/${trace.cleanRoute}`)

    };
	
	let index = 0
	
    const navigate = useNavigate();
	
	if (loading) { return null }
	if (error) { return <div>error</div> }
	
	const traceData = data.traceSummary
		
	return (
	
	<>
	
	<div className='endpoint-header-container'>
	
	
	<NavLink to={`/datacat/`} className={ ({ isActive }) => isActive ? "side-button-active" : "side-button"}>
		Datacat
	</NavLink>
	
	<NavLink to={`/datacat/latent`} className={ ({ isActive }) => isActive ? "side-button-active" : "side-button"}>
	Most Latent
	</NavLink>
	
	</div>
		
	
	<div className='dc-overview'>
	
	<table className='dc-table'>
		<thead>
		<tr>
			<th class='dc-row-heading'>Route</th>
			<th class='dc-row-heading'>p99</th>
			<th class='dc-row-heading'>Total requests</th>
		</tr>
		</thead>
		
		<tbody>
		
		{traceData.map(trace => (
			
			<tr key={trace.route} class='dc-row' onClick={ () => handleSelect(trace) }>
			
			<td class='dc-cell'>
			<p class="details-text">{trace.route}</p>
			</td>
			
			<td class='dc-cell'>
			<p class="details-text">{trace.p99.toFixed(0)} ms</p>
			</td>
			
			<td class='dc-cell'>
			<p class="details-text">{trace.totalRequests}</p>
			</td>
			
			
			</tr>
			
			
			
			))}
		
		</tbody>
	</table>
	
	</div>	
	
	</>
	
	)
	
}

export default Datacat