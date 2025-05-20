import { React, useState, useEffect } from 'react';
import { gql, useQuery, useMutation } from '@apollo/client';
import { useParams } from 'react-router-dom';
import ModifyUser from '../components/ModifyUser.tsx'



const FETCH_USER_DATA = gql`
query fetchUserData($id: ID!) {
	usersById(id: $id) {
	firstName
	lastName
	age
	gender
	email
}}`

const MODIFY_USER = gql`
mutation ModifyUser($firstName: String!, $lastName: String!, $age: String!, $gender: String!, $email: String!) {
	
modifyUser(input: { 
	firstName: $firstName, lastName: $lastName, age: $age, gender: $gender, email: $email 
}) {
	user {
		firstName
		lastName
		age
		gender
		email
	}
	errors
}
}`

function Users() {
	
    const {id} = useParams();
	
	
	const {loading, error, data} = useQuery(FETCH_USER_DATA, {
		variables: {id},
	    fetchPolicy: 'no-cache'});
	
	
	const [userData, setUserData] = useState({
		firstName:'',
		lastName:'',
		email:'',
		gender:'',
		age:''
	})
	
	useEffect(() => {
		if (data?.usersById) {
			setUserData({
				firstName:data.usersById.firstName,
				lastName:data.usersById.lastName,
				email:data.usersById.email,
				age:data.usersById.age,
				gender:data.usersById.gender
			})
		}
	}, [data]);		
	
	const [modifyUser, { loading: modifyLoading, error: modifyError, data: modifyData }] = useMutation(MODIFY_USER);
	
	const [formData, setFormData] = useState({
	
		firstName:'',
		lastName:'',
		age:'',
		gender:'',
		email:'',
	})
	
	useEffect(() => {
		if (userData) {
		
			setFormData({
		
			firstName:userData.firstName,
			lastName:userData.lastName,
			email:userData.email,
			gender:userData.gender,
			age:userData.age
		})
	}
	}, [userData]);
	
	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {

		const {name, value} = e.target

		setFormData({...formData, [name]: value})
	}

	const handleSubmit = async (e) => {

		e.preventDefault();
	
		try {
	
			const result = await modifyUser({
				variables: {firstName: formData.firstName, 
					lastName: formData.lastName,
					email: formData.email,
					age: formData.age,
					gender:formData.gender}			
				})
				
			    setUserData({...formData});
				
	
		} catch (err) {
		
			console.error(err)
	
		}

	}
	
    if (loading || !data?.usersById) return null;
    if (error) return <div>Error: {error.message}</div>;
	
	return (
	
	<>
	
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
	
	<div class='create-main'>

	<h3 class='catlas-text'>Modify User</h3>

	{modifyData && <p className="catlas-text-two">User modified successfully!</p>}

	<form class='create-form' onSubmit={handleSubmit}>

	<div>
	<h4 class='catlas-text-two'>First Name</h4>
	<input type='text' class='create-input' name='firstName' value={formData.firstName} onChange={handleChange} required/>
	</div>

	<div>
	<h4 class='catlas-text-two'>Last Name</h4>
	<input type='text' class='create-input' name='lastName' value={formData.lastName} onChange={handleChange} required/>
	</div>

	<div>
	<h4 class='catlas-text-two'>Email</h4>
	<input type='email' class='create-input' name='email' value={formData.email} onChange={handleChange} required/>
	</div>

	<div>
	<h4 class='catlas-text-two'>Age</h4>
	<input type='number' class='create-input' name='age' value={formData.age} onChange={handleChange} required/>
	</div>

	<div>
	<h4 class='catlas-text-two'>Gender</h4>
	<input type='text' class='create-input' name='gender' value={formData.gender} onChange={handleChange} required/>
	</div>

	<div>
	<input type='submit' class='create-users-submit' disabled={loading} value='submit'/>
	</div>


	</form>
	</div>
	
	</>
		
	
	)
	
	
}

export default Users;

