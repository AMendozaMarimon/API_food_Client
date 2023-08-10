const validation = (userData) => {
    let errors = {};
  
    if (!userData.email) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(userData.email)) {
      errors.email = "Invalid email format";
    } else if (userData.email.length >= 35) {
      errors.email = 'Email should be at least 35 characters long' 
    }
  
    if (!userData.password) {
      errors.password = 'Password is required';
    } else if (userData.password.length >= 6 && userData.password.length > 20) {
      errors.password = 'The password must be between 6 and 20 characters long';
    } 
  
    return errors;
  };
  
  export default validation;
  