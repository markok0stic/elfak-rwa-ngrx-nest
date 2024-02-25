export enum HttpResponseErrorsEnum {
  Unauthorized = 'Unauthorized',
  InvalidEmailOrPassword = 'Email or password is not valid',
  RegistrationSuccessful = 'Registration successful',
  AlreadyRegistered = 'An account is already registered with this email',
  AlreadyExistingCategory = 'The category with this name already exists',
  AlreadyExistingBrand = 'The brand with this name already exists',
  AlreadyExistingModel = 'The model with this name already exists',
  MissingFields = 'Please fill in all fields',
  ServerError = 'Server error',
  NotFoundEntry = 'Entry with provided id not found',
}