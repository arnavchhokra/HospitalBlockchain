nSubmit: async values => {
    const registerPromise = register(values)
    registerPromise.then((result) => {
        if (result === "User Already Exist") {
            toast.warning('User Already Exist', {
                position: toast.POSITION.TOP_RIGHT
            });
        }
        else if (result === "Register Sucessfully") {
            toast.success('Register Sucessfully', {
                position: toast.POSITION.TOP_RIGHT
            });
            navigate('/')

        }
        else {
            toast.error('Internal server error', {
                position: toast.POSITION.TOP_RIGHT
            });
        }
    })

}