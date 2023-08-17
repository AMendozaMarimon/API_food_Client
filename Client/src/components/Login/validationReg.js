const validationReg = (userDataReg) => {
  let errorsR = {};

  if (!userDataReg.email) {
    errorsR.email = "Email is required";
  } else if (!/\S+@\S+\.\S+/.test(userDataReg.email)) {
    errorsR.email = "Invalid email format";
  } else if (userDataReg.email.length >= 35) {
    errorsR.email = "Email should be at least 35 characters long";
  }

  if (!userDataReg.password) {
    errorsR.password = "Password is required";
  } else if (
    userDataReg.password.length >= 6 &&
    userDataReg.password.length > 20
  ) {
    errorsR.password = "The password must be between 6 and 20 characters long";
  }

  return errorsR;
};

export default validationReg;
