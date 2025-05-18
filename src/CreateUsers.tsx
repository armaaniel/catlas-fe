import './createusers.css'
import { gql, useMutation } from '@apollo/client';
import { useState } from 'react';



const CREATE_USER = gql`
mutation CreateUsers($firstName: String!, $lastName: String!, $email: String!, $age: String!, $gender: String!) {
	
	createUser(input: {
	firstName: $firstName,
	lastName: $lastName,
	email: $email,
	age: $age,
	gender: $gender,
}) {
	user {
	firstName
	lastName
	}
	errors
}
}`;

interface UserFormData {

	firstName:string,
	lastName:string,
	age:string,
	gender:string,
	email:string

}

interface CreateUserResponse {
	
	firstName:string,
	lastName:string,
	age:string,
	gender:string,
	email:string
}


function CreateUsers() {
	
	const [formData, setFormData] = useState<UserFormData>({
	
		firstName:'',
		lastName:'',
		age:'',
		gender:'',
		email:''
	
	})
	
	const [createUser, {loading, data}] = useMutation<CreateUserResponse>(CREATE_USER);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {

		const {name, value} = e.target
	
		setFormData({...formData, [name]: value})
	}

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
	    e.preventDefault();

		try {
			const result = await createUser({ 
				variables: {
				firstName:formData.firstName,
				lastName:formData.lastName,
				email:formData.email,
				age:formData.age,
				gender:formData.gender }
			
		})
	
		if (result.data) {
	
			console.log(result.data)
	        setFormData({
	          firstName: '',
	          lastName: '',
	          email: '',
	          age: '',
	          gender: ''
	        });
		}
	
		} catch (err) {
		
			console.error(err)
	}
	}
	
	
	return (
	
	
	<div class='create-main'>
	
	<h3 class='catlas-text'>Create User</h3>
	
    {data && <p className="catlas-text-two">User created successfully!</p>}
	
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
	
	)





}

export default CreateUsers;