const mockData = {
  signup_user1: {
    firstName: 'Inoocent',
    lastName: 'Ishimwe',
    email: 'innocent@gmail.com',
    password: 'Password@123',
  },
  signup_user2: {
    firstName: 'Anaise',
    lastName: 'aime',
    email: 'anaise@gmail.com',
    password: 'Password@123',
  },

  signup_email_exist: {
    firstName: 'Anaise',
    lastName: 'aime',
    email: 'anaise@gmail.com',
    password: 'Password@123',
  },
  signup_no_firstName: {
    firstName: '',
    lastName: 'aime',
    email: 'bienaime@gmail.com',
    password: 'Password@123',
  },
  signup_no_lastName: {
    firstName: 'bien',
    lastName: '',
    email: 'bengisa@gmail.com',
    password: 'Password@123',
  },
  signup_no_password: {
    firstName: 'aime',
    lastName: 'bien',
    email: 'bengisa@gmail.com',
    password: '',
  },
  signup_no_email: {
    firstName: 'aime',
    lastName: 'bien',
    email: '',
    password: 'Password@123',
  },

};

export default mockData;
