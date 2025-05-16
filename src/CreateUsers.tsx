import './createusers.css'

const CREATE_USER = gql`
mutation CreateUsers($firstName: String!, $lastName: String!, $email: String!, $age: String!, $gender: String!) {
	
	createUser(input: {
	firstName: $firstName,
	lastName: $lastName,
	email: $email,
	age: $age,
	gender: $gender,
}) {
	name
	}
}`;

interface UserFormData {

	firstName:string,
	lastName:string,
	age:number,
	gender:string,
	email:string,

}


const [formData, setFormData] = useState<UserFormData>({
	
	firstName:'',
	lastName:'',
	age:0,
	gender:'',
	email:''
	
})

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
          age: 0,
          gender: ''
        });
	}
	
	} catch (err) {
		
		console.error(err)
}
}



function CreateUsers() {
	

	
	return (
	
	
	<div class='create-main'>
	
	<h3 class='catlas-text'>Create User</h3>
	
	<form class='create-form'>
	
	<div>
	<h4 class='catlas-text-two'>First Name</h4>
	<input type='text' class='create-input'/>
	</div>
	
	<div>
	<h4 class='catlas-text-two'>Last Name</h4>
	<input type='text' class='create-input'/>
	</div>
	
	<div>
	<h4 class='catlas-text-two'>Email</h4>
	<input type='email' class='create-input'/>
	</div>
	
	<div>
	<h4 class='catlas-text-two'>Age</h4>
	<input type='number' class='create-input'/>
	</div>
	
	<div>
	<h4 class='catlas-text-two'>Gender</h4>
	<input type='text' class='create-input'/>
	</div>
	
	<div>
	<input type='submit' class='create-users-submit'/>
	</div>
	
	
	</form>
	</div>
	
	)





}

export default CreateUsers;