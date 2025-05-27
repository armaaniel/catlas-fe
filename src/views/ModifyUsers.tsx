import { useState, useEffect } from 'react';
import { gql, useQuery, useMutation } from '@apollo/client';
import { useParams } from 'react-router-dom';
import { NavLink } from 'react-router-dom';



const FETCH_USER_DATA = gql`
query fetchUserData($id: ID!) {
	usersById(id: $id) {
	firstName
	middleName
	lastName
	dateOfBirth
	gender
	email
	balance
	
}}`

const MODIFY_USER = gql`
mutation ModifyUser($firstName: String!, $middleName: String!, $lastName: String!, $dateOfBirth: ISO8601Date!, $gender: String!, 
$email: String!, $balance: Float!) {
	
modifyUser(input: { 
	firstName: $firstName, middleName: $middleName, lastName: $lastName, dateOfBirth: $dateOfBirth, gender: $gender, email: $email,
	balance: $balance 
}) {
	user {
		firstName
		middleName
		lastName
		dateOfBirth
		gender
		email
		balance
	}
}
}`

function ModifyUsers() {
	
    const {id} = useParams();
	
	const [userData, setUserData] = useState({
		firstName:'',
		middleName:'',
		lastName:'',
		email:'',
		gender:'',
		dateOfBirth:'',
		balance:''
	})
	
	const [formData, setFormData] = useState({
	
		email:'',
		firstName:'',
		middleName:'',
		lastName:'',
		dateOfBirth:'',
		gender:'',
		balance:'',
	})
	
	const {loading, error, data} = useQuery(FETCH_USER_DATA, {
		variables: {id},
	    fetchPolicy: 'no-cache'});
		
	const [modifyUser, { loading: modifyLoading, error: modifyError, data: modifyData }] = useMutation(MODIFY_USER);
			
	useEffect( () => {
		
		if (data) {
			
			const user = data.usersById
			
			setUserData({
				firstName:user.firstName,
				middleName:user.middleName,
				lastName:user.lastName,
				email:user.email,
				dateOfBirth:user.dateOfBirth,
				gender:user.gender,
				balance:user.balance
			});
			
			setFormData({
				firstName:user.firstName,
				middleName:user.middleName,
				lastName:user.lastName,
				email:user.email,
				gender:user.gender,
				dateOfBirth:user.dateOfBirth,
				balance:user.balance
			})
		}
	}, [data]);
		
    if (loading || !data) return null;
    if (error) return <div>Error: {error.message}</div>;
	
	const handleChange = (e) => {

		const {name, value} = e.target

		setFormData({...formData, [name]: value})
	}

	const handleSubmit = async (e) => {

		e.preventDefault();
	
		try {
	
			const result = await modifyUser({
				variables: {
					firstName: formData.firstName, 
					middleName:formData.middleName,
					lastName: formData.lastName,
					email: formData.email,
					dateOfBirth: formData.dateOfBirth,
					gender:formData.gender,
					balance:parseFloat(formData.balance)
				}			
				})
				
			    setUserData({...formData});
				
	
		} catch (err) {
		
			console.error(err)
	
		}

	}
	
    
	
	return (
	
	<>
	
	<div>
	
	<NavLink to={`/users/overview/${id}`} className={ ({ isActive }) => isActive ? "side-button-active" : "side-button"}>
	  Overview
	</NavLink>
	
	<NavLink to={`/users/activity/${id}`} className= { ({ isActive }) => isActive ? "side-button-active" : "side-button"}>
	  Activity
	</NavLink>
	
	<NavLink to={`/users/modifyusers/${id}`} className= { ({ isActive }) => isActive ? "side-button-active" : "side-button"}>
	  Modify User
	</NavLink>
	
	</div>
	
	<div class='home-right-two'>
	<h3 class='catlas-text'>{userData.firstName} {userData.lastName}</h3>
	
		<div class='home-right-two-details-parent'>
		<h3 class='catlas-text'>Details</h3>
	
			<div class='home-right-two-details'>
			
			<p class='details-text'>Email</p>
			<p class='details-text'>{userData.email}</p>
			
			<p class='details-text'>First Name</p>
			<p class='details-text'>{userData.firstName}</p>
			
			<p class='details-text'>Middle Name</p>
			<p class='details-text'>{userData.middleName}</p>
			
			<p class='details-text'>Last Name</p>
			<p class='details-text'>{userData.lastName}</p>
			
			<p class='details-text'>Balance</p>
			<p class='details-text'>{userData.balance}</p>
			
			<p class='details-text'>Date of Birth</p>
			<p class='details-text'>{userData.dateOfBirth}</p>
			
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
	<h4 class='catlas-text-two'>Email</h4>
	<input type = 'email' name='email' className='create-input' value={formData.email} onChange={handleChange}
	required/>
	</div>

	<div>
	<h4 class='catlas-text-two'>First Name</h4>
	<input type='text' class='create-input' name='firstName' value={formData.firstName} onChange={handleChange} required/>
	</div>
	
	<div>
	<h4 class='catlas-text-two'>Middle Name </h4>
	<input type = 'text' name= 'middleName' placeholder='optional' className='create-input' value={formData.middleName}
	onChange={handleChange} />
	</div>

	<div>
	<h4 class='catlas-text-two'>Last Name</h4>
	<input type='text' class='create-input' name='lastName' value={formData.lastName} onChange={handleChange} required/>
	</div>

	<div>
	<h4 class='catlas-text-two'>Date of Birth</h4>
	<input type='date' class='date-email-pass' name='dateOfBirth' onChange={handleChange} value={formData.dateOfBirth}/>
	</div>

	<div>
	<h4 class='catlas-text-two'>Gender</h4>
	<select name='gender' class ='email-pass' onChange={handleChange} value={formData.gender} required>
    	<option value="" disabled>Choose gender</option>
		<option value='male'>Male</option>
		<option value='female'>Female</option>
		<option value='non_binary'>Non-Binary</option>
		<option value='fluid'>Fluid</option>
		<option value='prefer_not_to_say'>Prefer Not To Say</option>
	</select>
	</div>
	
	<div>
	<h4 class='catlas-text-two'>Balance</h4>
	<input type='number' class='create-input' name='balance' value={formData.balance} onChange={handleChange} required/>
	</div>

	<div>
	<input type='submit' class='create-users-submit' disabled={loading} value='submit'/>
	</div>


	</form>
	</div>
	
	</>
		
	
	)
	
	
}

export default ModifyUsers;

