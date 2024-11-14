
// showPassword
document.getElementById('togglePassword').addEventListener('click', function() {
    const passwordFields = [document.getElementById('password'), document.getElementById('confirm-password')];

    passwordFields.forEach(field => {
        const type = field.type === 'password' ? 'text' : 'password'; 
        field.type = type;
    });

    this.classList.toggle('fa-eye');
    this.classList.toggle('fa-eye-slash');
});

// Registration
document.getElementById('RegisForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const firstname = document.getElementById('firstname').value;
    const lastname = document.getElementById('lastname').value;
    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirm-password').value;

    const dataForm = {
        firstname,
        lastname,
        username,
        email,
        password
    };
    
    if(!firstname || !lastname || !username || !email || !password || !confirmPassword ){
        Swal.fire({
            title:'Notification',
            text:'Please provide all required fields',
            icon: 'warning'
        })
        return;
    }
    
    if(password.length < 6){
        Swal.fire({
            title:'Notification',
            text:'Password must be a minimum of 6 characters',
            icon: 'warning'
        })
        return;
    } 
    if(password !== confirmPassword){
        Swal.fire({
            title:'Notification',
            text:'Password do not match!',
            icon: 'warning'
        })
        document.getElementById('password').value=''
        document.getElementById('confirm-password').value=''
        return;
    }

    try{
        const response = await axios.post('/api/register' , dataForm);
        const data = response.data;
        if(!data.status === 201){
            Swal.fire({
                title:'Notification',
                text:'Something was wrong!',
                icon: 'warning'
            })
          
        }else{
            Swal.fire({
                title:'Success',
                text:'Registration successful',
                icon: 'success'
            }).then(()=>{
                document.getElementById('RegisForm').reset();
                window.location.href='/login'
            })
            
        }
    }
    catch(error){
        const errorMessage = error.response?.data?.message || 'Server error, please try again later';
        Swal.fire({
            title:'Notification',
            text: errorMessage,
            icon: 'error'
        })
    }
});

