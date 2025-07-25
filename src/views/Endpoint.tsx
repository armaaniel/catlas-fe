import { useOutletContext } from 'react-router-dom';
import { gql, useQuery } from '@apollo/client';
import {useState} from 'react'
import TraceTable from '../components/TraceTable.tsx'
import EndpointNav from '../components/EndpointNav.tsx'
import useEndpoint from '../hooks/useEndpoint';
import useTransition from '../hooks/useTransition.ts'


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
	
    const { method, path, endpoint } = useEndpoint();
	
    const recordsPerPage = 18
	
	const {loading, error, data} = useQuery(GET_TRACES, {
		variables: {endpoint}
	})
	
	const isLoaded = useTransition(loading, data)
	
	const columns = [{key:'createdAt', label:'Created At', sortable:true, render: (trace) => trace.createdAt},
	{key:'endpoint', label:'Endpoint', sortable:false, render: (trace) => trace.endpoint},
	{key:'duration', label:'Duration', sortable:true, render: (trace) => `${trace.duration?.toFixed(0)} ms`},
	{key:'controllerMethod', label: 'Controller Method', sortable:false, render: (trace) => `${trace.controller}#${trace.action}`},
	{key:'status', label: 'Status', sortable:false, render: (trace) => trace.status}]
	
	const traceList = data?.traceList || []
			
	if (error) { return <div>error</div> }
		
	return (
	
	<>
	
	<EndpointNav method={method} path={path} endpoint={endpoint} />
	
	<div class={`positions-container ${isLoaded ? 'loaded' : ''}`}>
	<TraceTable traceData={traceList} columns={columns} selectedTrace={selectedTrace} setSelectedTrace={setSelectedTrace}
	recordsPerPage={recordsPerPage}/>	
	</div>
		
	</>
	
	)

}

export default Endpoint