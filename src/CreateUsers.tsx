import './createusers.css'

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