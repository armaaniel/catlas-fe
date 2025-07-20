import { useOutletContext } from 'react-router-dom';
import { gql, useQuery } from '@apollo/client';
import {useState, useEffect} from 'react'
import TraceTable from '../components/TraceTable.tsx'
import DatacatNav from '../components/DatacatNav.tsx'
import useTransition from '../hooks/useTransition.ts'


const GET_LATENT_TRACES = gql`
query getLatentTraces {
	latentTraces {
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

function Latent() {
	
	const { selectedTrace, setSelectedTrace } = useOutletContext()
		
    const recordsPerPage = 18
		
	const {loading, error, data} = useQuery(GET_LATENT_TRACES)
	
    const isLoaded = useTransition(loading, data);
	
	const columns = [{key:'createdAt', label:'Created At', sortable:true, render: (trace) => trace.createdAt},
	{key:'endpoint', label:'Endpoint', sortable:false, render: (trace) => trace.endpoint},
	{key:'duration', label:'Duration', sortable:true, render: (trace) => `${trace.duration?.toFixed(0)} ms`},
	{key:'controllerMethod', label: 'Controller Method', sortable:false, render: (trace) => `${trace.controller}#${trace.action}`},
	{key:'status', label: 'Status', sortable:false, render: (trace) => trace.status}]
	
	if (error) { return <div>error</div> }
		
	return (
	
	<>
	<DatacatNav />
	
	<div class={`positions-container ${isLoaded ? 'loaded' : ''}`}>
	<TraceTable traceData={data?.latentTraces || []} columns={columns} selectedTrace={selectedTrace} setSelectedTrace={setSelectedTrace}
	recordsPerPage={recordsPerPage}/>	
	</div>
		
	</>
	
	)	
}

export default Latent;