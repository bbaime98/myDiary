const mockData = {
  signupComplete1: {
    firstName: 'Bran',
    lastName: 'Stark',
    email: 'bstark@gmail.com',
    password: 'Password@123',
  },
  signupComplete2: {
    firstName: 'Ben',
    lastName: 'Gisa',
    email: 'bengisa@gmail.com',
    password: 'Password@123',

  },
  baraka: {
    firstName: 'Baraka',
    lastName: 'Mugisha',
    email: 'mugishaje@gmail.com',
    password: 'Password@123',

  },
  james: {
    firstName: 'James',
    lastName: 'Nyagatare',
    email: 'jimnyagtr@gmail.com',
    password: 'Password@123',
  },
  signupIncomplete: {
    firstName: 'Bran',
    lastName: 'stark',
    email: 'bstark@gmail.com',
    password: 'Password@123',
  },
  signupShortPwd: {
    firstName: 'Bran',
    lastName: 'stark',
    email: 'bstark@gmail.com',
    password: 'Pass@1',
  },
  signupNoNumPwd: {
    firstName: 'Bran',
    lastName: 'stark',
    email: 'bstark@gmail.com',
    password: 'Passwowow@!oword',
  },
  signupNoCharPwd: {
    firstName: 'Bran',
    lastName: 'stark',
    email: 'bstark@gmail.com',
    password: 'Password123',
  },
  signupNoUcasePwd: {
    firstName: 'Bran',
    lastName: 'stark',
    email: 'bstark@gmail.com',
    password: 'password@123',
  },
  signupNumFname: {
    firstName: '1234',
    lastName: 'stark',
    email: 'bstark@gmail.com',
    password: 'Password@123',
  },
  signupNumLname: {
    firstName: 'Bran',
    lastName: '1234',
    email: 'bstark@gmail.com',
    password: 'Password@123',
  },
  signupSpaceFname: {
    firstName: 'Bran Bob',
    lastName: 'stark',
    email: 'bstark@gmail.com',
    password: 'Password@123',
  },
  signupSpaceLname: {
    firstName: 'Bran',
    lastName: 'Stark Man',
    email: 'bstark@gmail.com',
    password: 'Password@123',
  },
  signupGenderUnclear: {
    firstName: 'Bran',
    lastName: 'stark',
    email: 'bstark@gmail.com',
    password: 'Password@123',
  },
  loginComplete: {
    email: 'bengisa@gmail.com',
    password: 'Password@123'
  },
  loginWrongPwd: {
    email: 'bengisa@gmail.com',
    password: 'Password@345'
  },
  loginNoAccount: {
    email: 'brucesangwa@gmail.com',
    password: 'Password@123'
  },
};
export default mockData;