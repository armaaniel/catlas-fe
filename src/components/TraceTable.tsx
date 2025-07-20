import {useState} from 'react'

const TraceTable = ({traceData, columns, selectedTrace, setSelectedTrace, recordsPerPage}) => {
	
	const [sorted, setSorted] = useState(false)
	
	const [direction, setDirection] = useState('desc')
	
	const [sortField, setSortField] = useState('createdAt')
	
	const [currentPage, setCurrentPage] = useState(1)
		
	const back = () => {
		setCurrentPage(currentPage - 1)
	}
	
	const forward = () => {
		setCurrentPage(currentPage + 1)
	}
	
    const startRecord = (currentPage - 1) * recordsPerPage;
	
    const endRecord = startRecord + recordsPerPage;
	
	const handleSelect = (trace) => {
		setSelectedTrace(trace)
	}
						
	const sortTraces = () => {
		
		if (!sorted) return traceData;
		
		return [...traceData].sort(function(a,b) {
			
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
	
	<table className='overview-stock-table'>
		<thead>
			<tr>
			{columns.map(column => (
			<th key ={column.key} class={column.sortable && sorted && sortField === `${column.key}` ? 
			(direction === 'asc' ? 'portfolio-row-heading-asc' : 'portfolio-row-heading-desc') : 'portfolio-row-heading'} 
			onClick={column.sortable ? () => handleSort(column.key) : undefined}>{column.label}</th>
			))}
			</tr>
		</thead>
		
		<tbody>
		{currentPageTraces.map(trace => (
			<tr key={trace.id} className={selectedTrace?.id === trace.id ? 'portfolio-row-selected' : 'portfolio-row'} 
			onClick={() => handleSelect(trace)}>
			
			{columns.map(column => (
			
			<td key={column.key} class='shares-cell'>
			<p class="details-text">{column.render(trace)}</p>
			</td>
				
			))}
			</tr>
			))}
		</tbody>
	</table>
	
	<div className='pagination-container'>
		<button className='page-button' onClick={back} disabled={currentPage === 1}> Previous </button>
		<span className='page-span'>Page {currentPage} of {totalPages}</span>
		<button className='page-button' onClick={forward} disabled={currentPage === totalPages}> Next </button>
	</div>
	
	</>
	
	)
	
}

export default TraceTable;
