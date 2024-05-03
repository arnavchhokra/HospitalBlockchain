//validate all user details here
import toast from 'react-hot-toast'

/** validate register form */
export async function registerValidation(values) {
    const errors = firstnameVerify({}, values);
    lastnameVerify(errors, values);
    emailVerify(errors, values);
    mobileVerify(errors, values);
    passwordVerify(errors, values);
    retypePasswordVerify(errors, values);
    return errors;
}

/** validate firstname */
function firstnameVerify(error = {}, values) {
    const RE = new RegExp('!/^[a-zA-Z]*$/g')
    if (!values.firstname) {
        error.firstname = toast.error('First Name Required...!');
    }
    else if (!/^[a-zA-Z]*$/g.test(values.firstname)) {
        error.firstname = toast.error('Invalid firstname...!');
    }
    else if (values.firstname.includes(" ")) {
        error.firstname = toast.error('Invalid firstname...!')
    }
    return error;
}
/** validate lastname */
function lastnameVerify(error = {}, values) {
    if (!values.lastname) {
        error.lastname = toast.error('First Name Required...!');
    }
    else if (!/^[a-zA-Z]*$/g.test(values.lastname)) {
        error.lastname = toast.error('Invalid lastname...!');
    }
    else if (values.lastname.includes(" ")) {
        error.lastname = toast.error('Invalid lastname...!')
    }
    return error;
}

/** validate email */
function emailVerify(error = {}, values) {
    if (!values.email) {
        error.email = toast.error("Email Required...!");
    } else if (values.email.includes(" ")) {
        error.email = toast.error("Wrong Email...!")
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        error.email = toast.error("Invalid email address...!")
    }

    return error;
}
/** validate mobile */
function mobileVerify(error = {}, values) {
    if (!values.mobile) {
        error.mobile = toast.error("Mobile Number Required...!");
    } else if (values.mobile.includes(" ")) {
        error.mobile = toast.error("Wrong Number...!")
    } else if (!/^[6-9]\d{9}$/.test(values.mobile)) {
        error.email = toast.error("Invalid Mobile Number...!")
    }

    return error;
}

/** validate password */
function passwordVerify(errors = {}, values) {
    /* eslint-disable no-useless-escape */
    const specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;

    if (!values.password) {
        errors.password = toast.error("Password Required...!");
    }
    else if (values.password.includes(" ")) {
        errors.password = toast.error("Wrong Password...!");
    } else if (values.password.length < 4) {
        errors.password = toast.error("Password must be more than 4 characters long");
    } else if (!specialChars.test(values.password)) {
        errors.password = toast.error("Password must have special character");
    }

    return errors;
}
/** password same */
function retypePasswordVerify(errors = {}, values) {
    if (values.password !== values.retype) {
        errors.password = toast.error("Passowrd must be same...!");
    } return errors
}

