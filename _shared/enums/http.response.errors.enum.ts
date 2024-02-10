export enum HttpResponseErrorsEnum {
  Unauthorized = 'Unauthorized',
  InvalidEmailOrPassword = 'Email or password is not valid',
  RegistrationSuccessful = 'Registration successful',
  AlreadyRegistered = 'An account is already registered with this email',
  AlreadyExistingCategory = 'The category with this name already exist',
  MissingFields = 'Please fill in all fields',
  ServerError = 'Server error',
  NotFoundEntry = 'Entry with provided id not found',
}