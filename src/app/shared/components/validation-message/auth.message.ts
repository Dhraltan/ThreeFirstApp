export const auth_messages = {
  email: [
    { type: 'required', message: 'Email is required' },
    {
      type: 'email',
      message: 'This email is not valid',
    },
  ],

  password: [
    { type: 'required', message: 'Password is required' },
    {
      type: 'minlength',
      message: 'Password must be at least 8 characters long',
    },
    {
      type: 'wrongPassword',
      message:
        'Password requires at least one lowercase letter, one uppercase letter, one number and one special character',
    },
  ],

  checkPassword: [
    { type: 'required', message: 'Password confirmation is required' },
    {
      type: 'minlength',
      message: 'Password must be at least 8 characters long',
    },
    {
      type: 'wrongPassword',
      message:
        'Password requires at least one lowercase letter, one uppercase letter, one number and one special character',
    },
    { type: 'NoPassswordMatch', message: 'The passwords do not match' },
  ],

  firstName: [
    { type: 'required', message: 'First Name is required' },
    { type: 'validateName', message: 'This first name is not valid' },
  ],

  lastName: [
    { type: 'required', message: 'Last Name is required' },
    { type: 'validateName', message: 'This last name is not valid' },
  ],

  role: [{ type: 'required', message: 'A role is required for the new user' }],
};
