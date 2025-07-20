import { useOutletContext } from 'react-router-dom';
import useEndpoint from '../hooks/useEndpoint';
import EndpointNav from '../components/EndpointNav.tsx'
import { gql, useQuery } from '@apollo/client';
import TraceTable from '../components/TraceTable.tsx'
import useTransition from '../hooks/useTransition.ts'


const TRACE_BREAKDOWN = gql`
query getTraceBreakdown($endpoint: String!) {
	traceBreakdown(endpoint: $endpoint) {
		redisQuery {
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
		}
		dbApiQuery {
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
		}
	}}	
`

function Cache() {
	
	const { selectedTrace, setSelectedTrace } = useOutletContext()
	
	const {method, path, endpoint} = useEndpoint();
	
    const recordsPerPage = 18
	
	const {loading, error, data} = useQuery(TRACE_BREAKDOWN, {
		variables: {endpoint}
	})
	
	const isLoaded = useTransition(loading, data)
	
	const columns = [{key:'createdAt', label: 'Created At', sortable: true, render: (trace) => trace.createdAt},
	{key:'duration', label:'Duration', sortable: true, render: (trace) => trace.duration}]
	
	const redisQuery = data?.traceBreakdown?.redisQuery || []
	const dbApiQuery = data?.traceBreakdown?.dbApiQuery || []
	
	if (error) { return <div>error</div> }
	
	if (data?.traceBreakdown?.redisQuery?.length === 0 && data?.traceBreakdown?.dbApiQuery?.length === 0) {
		
		return (
		<>
		<EndpointNav method={method} path={path} endpoint={endpoint} />
	
		<div class='no-records'>
		<p class='details-text'>No Cache or API records</p>
		</div>
		</>
	)}
		
	return (
	
	<>
	
	<EndpointNav method={method} path={path} endpoint={endpoint} />
	
	<div class={`cache-parent-container ${isLoaded ? 'loaded' : ''}`}>
	
	<div class='cache-container'>	
	<TraceTable traceData={redisQuery} columns={columns} selectedTrace={selectedTrace} setSelectedTrace={setSelectedTrace}
	recordsPerPage={recordsPerPage} />
	<p class='cache-text'>redis: {redisQuery.length} traces</p>	
	</div>	
	
	<div class='cache-container'>
	<TraceTable traceData={dbApiQuery} columns={columns} selectedTrace={selectedTrace} setSelectedTrace={setSelectedTrace}
	recordsPerPage={recordsPerPage} />
	<p class='cache-text'>api: {dbApiQuery.length} traces</p>	
	</div>
	
	</div>
		
	</>
	
	)
	
}

export default Cache;