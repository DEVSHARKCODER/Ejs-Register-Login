document.getElementById('LoginForm').addEventListener('submit', async(e)=>{
    e.preventDefault();


    const username = document.getElementById('username').value
    const password = document.getElementById('password').value

    const dataForm = {
        username,
        password
    }
   

    if(!username || !password){
        Swal.fire({
            title:'Notification',
            text:'Please fill in all fields',
            icon:'warning'
        })
        return;
    }

    try{
        const response = await axios.post('/api/login', dataForm);
        console.log(response)
        const data = response.data;

        if(data.status !== 200){
            Swal.fire({
                title:'Error',
                text: data.message ? data.message : 'Response Error try again later',
                icon:'error'
            })
        }else{
            Swal.fire({
                title:'Success',
                text:'Login Success!',
                icon:'success'
            })
            window.location.href='/'
        }
    }
    catch(error){
        console.log(error);

const MessageError = error.message ? error.message : "Something went wrong!";

Swal.fire({
    title: 'Error',
    text: MessageError,
    icon: 'error'
});
    }
})