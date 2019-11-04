const mockData = {
  signup_user1: {
    firstName: 'Inoocent',
    lastName: 'Ishimwe',
    email: 'signup98@gmail.com',
    password: 'Password@123',
  },
  signup_no_incomplete: {
    firstName: '',
    lastName: 'aime',
    email: 'bienaime@gmail.com',
    password: 'Password@123',
  },
  signup_no_email: {
    firstName: 'aime',
    lastName: 'bien',
    email: '',
    password: 'Password@123',
  },
};

export default mockData;
