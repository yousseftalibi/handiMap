module.exports.signUpErrors = (err)=>{
    let errors = {pseudo: "", email: "", password: ""};

    if(err.message.includes("pseudo")) errors.pseudo = "Incorrect pseudo or already taken";
    
    if(err.message.includes("email")) errors.email= "Incorrect email";  
    
    if(err.message.includes("password")) errors.password = " 6 minimum characters";
    
    if(err.code===11000 && Object.keys(err.keyValue)[0].includes("pseudo"))
        errors.pseudo = "This pseudo is already taken";

    if(err.code===11000 && Object.keys(err.keyValue)[0].includes("email"))
        errors.email = "This email is registered";
    
    return errors;
};

module.exports.signInErrors = (err) => {
  let errors = { email: '', password: '' };
  
    if (err.message.includes("Email") && err.message.includes("Unknown")) {
      errors.email = "Unknown Email";
    }
  
    if (err.message.includes("Password") && err.message.includes("Incorrect")) {
      errors.password = "Incorrect Password";
    }
  
  return errors;
};


module.exports.uploadErrors = (err) => {
  let errors = { format: '', maxSize:""};

  if(err.message.includes('invalid file')){
    errors.format = "incompatible format";
  }

  if(err.message.includes('max size')){
    errors.maxSize = "Max size : 500ko ";
  }

  return errors
}