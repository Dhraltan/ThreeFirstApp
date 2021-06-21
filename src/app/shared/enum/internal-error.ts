export enum InternalError {
    
  // auth errors
  A_000 = 'Error: A_000. We were unable to log you in.',
  A_001 = 'Error: A_001. Your account could not be created.',
  A_002 = 'Error: A_002. We could not log you out.',
  A_003 = 'Error: A_003. We could not change your password.',

  // contact errors
  C_000 = 'Error: C_000. We could not send an email, please check back later.',

  // elastic errors
  E_000 = 'Error: E_000. We could not retrieve data from the elastic server.',
  E_001 = 'Error: E_001. The selected date has no data available.',

  // user errors
  U_000 = 'Error: A_000. We could not get your account information.',
}
