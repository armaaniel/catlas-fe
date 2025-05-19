import React from 'react';
import { gql, useQuery } from '@apollo/client';
import { useParams } from 'react-router-dom';



const FETCH_USER_DATA = gql`
query fetchUserData($id: ID!) {
	usersById(id: $id) {
	firstName
	lastName
	age
	gender
	email
}}`

function Users() {
	
    const {id} = useParams();
	
	
	const {loading, error, data} = useQuery(FETCH_USER_DATA, {
		variables: {id},
	    fetchPolicy: 'no-cache'});
	
	
	const userData = data?.usersById;
	
    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;
	
	return (
	
	<div class='home-right-two'>
	<h3 class='catlas-text'>{userData.firstName} {userData.lastName}</h3>
	
		<div class='home-right-two-details-parent'>
		<h3 class='catlas-text'>Details</h3>
	
			<div class='home-right-two-details'>
			<p class='details-text'>First Name</p>
			<p class='details-text'>{userData.firstName}</p>
			
			<p class='details-text'>Last Name</p>
			<p class='details-text'>{userData.lastName}</p>
			
			<p class='details-text'>Age</p>
			<p class='details-text'>{userData.age}</p>
			
			<p class='details-text'>Email</p>
			<p class='details-text'>{userData.email}</p>
			
			<p class='details-text'>Gender</p>
			<p class='details-text'>{userData.gender}</p>
			
			</div>
	
		</div>
	</div>
	
	
	)
	
	
}

export default Users;

