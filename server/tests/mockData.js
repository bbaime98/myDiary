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
  // signin
  signup_user3: {
    firstName: 'special',
    lastName: 'usre',
    email: 'spaecial@gmail.com',
    password: 'Password@123',
  },
  signin_complete: {
    email: 'anaise@gmail.com',
    password: 'Password@123',
  },
  signin_without_email: {
    email: '',
    password: 'Password@123',
  },
  signin_without_password: {
    email: 'anaise@gmail.com',
    password: '',
  },
  signin_with_wrong_email: {
    email: 'ana@gmail.com',
    password: 'Password@123',
  },
  signin_with_wrong_password: {
    email: 'anaise@gmail.com',
    password: 'Password@',
  },
  signin_with_no_account: {
    email: 'ishimwee@gmail.com',
    password: '8Uhe*password',
  },
};

export default mockData;
