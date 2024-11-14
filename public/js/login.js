document.getElementById('LoginForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    const dataForm = { username, password };

    
    if (!username || !password) {
        return Swal.fire({
            title: 'Notification',
            text: 'Please enter both username and password.',
            icon: 'warning'
        });
    }

    try {
        const response = await axios.post('/api/login', dataForm);

        
        if (response.status === 200) {
            Swal.fire({
                title: 'Success',
                text: response.data.message, 
                icon: 'success'
            }).then(() => {
                window.location.href = '/'; 
            });
        } else {
            Swal.fire({
                title: 'Notification',
                text: response.data.message, 
                icon: 'error'
            });
        }

    } catch (error) {
        Swal.fire({
            title: 'Error',
            text: error.response?.data?.message || "Something went wrong!",
            icon: 'error'
        });
    }
});
