import '../stylesheets/createusers.css'
import { gql, useMutation } from '@apollo/client';
import { useState } from 'react';



const CREATE_USER = gql`
mutation CreateUsers($firstName: String!, $middleName: String!, $lastName: String!, $email: String!, $dateOfBirth: ISO8601Date!, 
$gender: String!, $password: String!) {
	
	createUser(input: {
	firstName: $firstName,
	middleName: $middleName,
	lastName: $lastName,
	email: $email,
	password: $password,
	dateOfBirth: $dateOfBirth,
	gender: $gender,
}) {
	user {
	firstName
	middleName
	lastName
	}
}
}`;


function CreateUsers() {
	
	const [formData, setFormData] = useState({
	
		email:'',
		password:'',
		firstName:'',
		middleName:'',
		lastName:'',
		dateOfBirth:'',
		gender:'',
	
	})
	
	const [createUser, {loading, data}] = useMutation(CREATE_USER);

	const handleChange = (e) => {

		const {name, value} = e.target
	
		setFormData({...formData, [name]: value})
	}

	const handleSubmit = async (e) => {
	    e.preventDefault();

		try {
			const result = await createUser({ 
				variables: {
				email:formData.email,
				password:formData.password,	
				firstName:formData.firstName,
				middleName:formData.middleName,
				lastName:formData.lastName,
				dateOfBirth:formData.dateOfBirth,
				gender:formData.gender }})
				
				setFormData({
					
					email:'',
					password:'',
					firstName:'',
					middleName:'',
					lastName:'',
					dateOfBirth:'',
					gender:''
				
				})
	
		} catch (err) {
		
			console.error(err)
	}
	}
	
	
	return (
	
	
	<div class='create-main'>
	
	<h3 class='catlas-text'>Create User</h3>
	
    {data && <p className="catlas-text-two">{data.createUser.user.firstName} {data.createUser.user.lastName} created successfully!</p>}
	
	<form class='create-form' onSubmit={handleSubmit}>
	
	<div>
	<h4 class='catlas-text-two'>Email</h4>
	<input type = 'email' name='email' className='create-input' value={formData.email} onChange={handleChange}
	required/>
	</div>
	
	<div>
	<h4 class='catlas-text-two'>Password</h4>
	<input type = 'password' name= 'password' className='create-input' value={formData.password}
	onChange={handleChange} required/>
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
	<input type='submit' class='create-users-submit' disabled={loading} value='submit'/>
	</div>
	
	
	</form>
	</div>
	
	)





}

export default CreateUsers;