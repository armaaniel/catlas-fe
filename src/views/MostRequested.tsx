import { gql, useQuery } from '@apollo/client';
import DatacatNav from '../components/DatacatNav.tsx'
import TraceOverviewTable from '../components/TraceOverviewTable.tsx'

const MOST_REQUESTED_TRACES = gql`
query mostRequestedTraces {
	mostRequestedTraces {
		route
		cleanRoute
		totalRequests
		p99
	}
}`

function MostRequested() {
	
	const {loading, error, data} = useQuery(MOST_REQUESTED_TRACES)
	
	const recordsPerPage = 10
	
	if (error) { return <div>error</div> }
	
	const traceData = data?.mostRequestedTraces || []
	
	return (
	
	<>
	
	<div className={`endpoint-header-container ${traceData.length > 0 ? 'loaded' : ''}`}>
	<DatacatNav />	
	</div>
	
	<div className={`dc-overview ${traceData.length > 0 ? 'loaded' : ''}`}>
	
	<TraceOverviewTable traceData={traceData} recordsPerPage={recordsPerPage} />
	
	</div>	
	
	</>
	
	)
		
}

export default MostRequested