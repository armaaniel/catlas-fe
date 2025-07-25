import '../stylesheets/datacat.css'
import { gql, useQuery } from '@apollo/client';
import DatacatNav from '../components/DatacatNav.tsx'
import TraceOverviewTable from '../components/TraceOverviewTable.tsx'


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
	
	const recordsPerPage = 10
			
	if (error) { return <div>error</div> }
	
	const traceData = data?.traceSummary || []
		
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

export default Datacat