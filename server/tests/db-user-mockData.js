const mockData = {
  signup_user1: {
    firstName: 'Inoocent',
    lastName: 'Ishimwe',
    email: 'signup98@gmail.com',
    password: 'Pass$#Gword@123',
  },
  signup_no_incomplete: {
    firstName: '',
    lastName: 'aime',
    email: 'bienaime@gmail.com',
    password: 'Pass$#Gword@123',
  },
  signup_no_email: {
    firstName: 'aime',
    lastName: 'bien',
    email: '',
    password: 'Pass$#Gword@123',
  },
  signup_min_name: {
    firstName: 'In',
    lastName: 'Ishimwe',
    email: 'signup98@gmail.com',
    password: 'Pass$#Gword@123',
  },
  signup_min_password: {
    firstName: 'bienaime',
    lastName: 'Ishimwe',
    email: 'signup98@gmail.com',
    password: '123456',
  },
  signup_bad_email_format: {
    firstName: 'Inoocent',
    lastName: 'Ishimwe',
    email: 'signup98  @gmail.com',
    password: 'Pass$#Gword@123',
  },

  // signin
  login_user_1: {
    email: 'signup98@gmail.com',
    password: 'Pass$#Gword@123',
  },
  login_user_wrong_email: {
    email: 'signup11@gmail.com',
    password: 'Pass$#Gword@123',
  },
  login_user_no_password: {
    email: 'signup1@gmail.com',
    password: '',
  },
  login_user_no_email: {
    emal: 'signup1@gmail.com',
    password: 'Pass$#Gword@123',
  },
  login_user_bad_email_format: {
    email: 'signup1  @gmail.com',
    password: 'Pass$#Gword@123',
  },

};

export default mockData;
