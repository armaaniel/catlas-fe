import {useState} from 'react'
import { useNavigate } from 'react-router-dom';


const TraceOverviewTable = ({traceData, recordsPerPage}) => {
	
	const [sorted, setSorted] = useState(false)
	
	const [direction, setDirection] = useState('desc')
	
	const [sortField, setSortField] = useState('totalRequests')
	
	const [currentPage, setCurrentPage] = useState(1)
	
    const navigate = useNavigate();
		
	const back = () => {
		setCurrentPage(currentPage - 1)
	}
	
	const forward = () => {
		setCurrentPage(currentPage + 1)
	}
	
    const startRecord = (currentPage - 1) * recordsPerPage;
	
    const endRecord = startRecord + recordsPerPage;
	
    const handleSelect = (trace) => {

        navigate(`/datacat/${trace.cleanRoute}`)

    };
					
	const sortTraces = () => {
		
		if (!sorted) return traceData;
		
		return [...traceData].sort(function(a,b) {
			
			let aValue, bValue;
			
			if (sortField ==='totalRequests') {
				aValue = a.totalRequests;
				bValue = b.totalRequests;
			} else {
				aValue = a.p99;
				bValue = b.p99;
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
				setCurrentPage(1)
			} else {
				setDirection('asc')
				setCurrentPage(1)
			}
		} else {
			setSortField(field)
			setDirection('desc')
			setCurrentPage(1)
		}
	}
	
	return (
	
	<>
	
	<table className='dc-table'>
		<thead>
		<tr>
			<th class='dc-row-heading' onClick={() => setSorted(false)}>Route</th>
			<th class={sorted && sortField === 'p99' ? (direction === 'asc' ? 'dc-row-heading-asc' : 
			'dc-row-heading-desc') : 'dc-row-heading'} onClick={() => handleSort('p99')}>p99</th>
			<th class={sorted && sortField === 'totalRequests' ? (direction === 'asc' ? 'dc-row-heading-asc' : 
			'dc-row-heading-desc') : 'dc-row-heading'} onClick={() => handleSort('totalRequests')}>Total requests</th>
		</tr>
		</thead>
		
		<tbody>
		
		{currentPageTraces.map(trace => (
			
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
	
	<div className='dc-pagination-container'>
		<button className='page-button' onClick={back} disabled={currentPage === 1}> Previous </button>
		<span className='page-span'>Page {currentPage} of {totalPages}</span>
		<button className='page-button' onClick={forward} disabled={currentPage === totalPages}> Next </button>
	</div>
	
	</>
	
	)
	
}

export default TraceOverviewTable;
