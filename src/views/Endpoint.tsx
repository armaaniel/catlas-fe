import { useParams, useOutletContext } from 'react-router-dom';
import { gql, useQuery } from '@apollo/client';
import {useState} from 'react'
import { NavLink } from 'react-router-dom';

import '../stylesheets/endpoint.css'

const GET_TRACES = gql`
query getTraces($endpoint: String!) {
	traceList(endpoint: $endpoint) {
		id
		createdAt
		endpoint
		duration
		controller
		action
		status
		dbRuntime
		viewRuntime
		breakdown
	}}
`

function Endpoint() {
	
	const { selectedTrace, setSelectedTrace } = useOutletContext()
	
	const [sorted, setSorted] = useState(false)
	
	const [direction, setDirection] = useState('desc')
	
	const [sortField, setSortField] = useState('createdAt')
	
	const [currentPage, setCurrentPage] = useState(1)
	
    const recordsPerPage = 18
		
	const back = () => {
		setCurrentPage(currentPage - 1)
	}
	
	const forward = () => {
		setCurrentPage(currentPage + 1)
	}
	
    const startRecord = (currentPage - 1) * recordsPerPage;
	
    const endRecord = startRecord + recordsPerPage;
	
	const params = useParams()
	
	const method = params.method
	
	const path = params['*']
	
	const endpoint = `${method.toUpperCase()} /${path}`
	
	const {loading, error, data} = useQuery(GET_TRACES, {
		variables: {endpoint}
	})
			
	const handleSelect = (trace) => {
		setSelectedTrace(trace)
		console.log(trace)
	}
		
	if (loading) { return null }
	if (error) { return <div>error</div> }
	
	const traceList = data.traceList
				
	const sortTraces = () => {
		
		if (!sorted) return traceList;
		
		return [...traceList].sort(function(a,b) {
			
			let aValue, bValue;
			
			if (sortField ==='createdAt') {
				aValue = new Date(a.createdAt);
				bValue = new Date(b.createdAt);
			} else {
				aValue = a.duration;
				bValue = b.duration;
			}
			
			if (direction === 'asc') {
				return aValue - bValue
			} else {
				return bValue - aValue
			}
		})
	}
	
	const sortedTraces = sortTraces()
	
	const totalPages = Math.ceil(sortedTraces.length / recordsPerPage);
		
	const currentPageTraces = sortedTraces.slice(startRecord, endRecord)
	
	const handleSort = (field) => {
		setSorted(true)
		
		if (sortField === field) {
			if (direction === 'asc') {
				setDirection('desc')
			} else {
				setDirection('asc')
			}
		} else {
			setSortField(field)
			setDirection('desc')
		}
		
	}
	
	return (
	
	<>
	<div className='endpoint-header-container'>
	
	<NavLink to={`/datacat/${method}/${path}`} className={ ({ isActive }) => isActive ? "side-button-active" : "side-button"}>
		{endpoint}
	</NavLink>
	
	<NavLink to={`/datacat/cache/${method}/${path}`} className={ ({ isActive }) => isActive ? "side-button-active" : "side-button"}>
		Cache vs DB/API
	</NavLink>
	
	<NavLink to={`/datacat/${path}`} className={ ({ isActive }) => isActive ? "side-button-active" : "side-button"}>
		Most requested
	</NavLink>
	
	</div>
	<div class='positions-container'>
	
	<table class='overview-stock-table'>
		<thead>
			<tr >
			<th class={sorted && sortField === 'createdAt' ? (direction === 'asc' ? 'portfolio-row-heading-asc' : 'portfolio-row-heading-desc') : 'portfolio-row-heading'} 
			onClick={() => handleSort('createdAt')}>Created At</th>
			<th class='portfolio-row-heading'>Endpoint</th>
			<th class={sorted && sortField === 'duration' ? (direction === 'asc' ? 'portfolio-row-heading-asc' : 'portfolio-row-heading-desc') : 'portfolio-row-heading'} 
			onClick={() => handleSort('duration')}>Duration</th>
			<th class='portfolio-row-heading'>Controller Method</th>
			<th class='portfolio-row-heading'>Status</th>	
				
			</tr>
		</thead>
	
	
		<tbody>
		
		{currentPageTraces.map(trace => (
			
			<tr key={trace.id} className={selectedTrace?.id === trace.id ? 'portfolio-row-selected' : 'portfolio-row'} onClick={() => handleSelect(trace)}>
			
			<td class='shares-cell'>
			<p class="details-text">{trace.createdAt}</p>
			</td>
			
			<td class='shares-cell'>
			<p class="details-text">{trace.endpoint}</p>
			</td>
			
			<td class='shares-cell'>
			<p class="details-text">{trace.duration.toFixed(0)} ms</p>
			</td>
			
			<td class='shares-cell'>
			<p class="details-text">{trace.controller}#{trace.action}</p>
			</td>
			
			<td class='shares-cell'>
			<p class="details-text">{trace.status}</p>
			</td>
			
			</tr>
		
		))}
		
		</tbody>
		</table>
		
		<div className='pagination-container'>
			<button className='page-button' onClick={back} disabled={currentPage === 1}> Previous </button>
			<span className='page-span'>Page {currentPage} of {totalPages}</span>
			<button className='page-button' onClick={forward} disabled={currentPage === totalPages}> Next </button>
		</div>
			
		
		</div>
		
		</>
	
	)

}

export default Endpoint