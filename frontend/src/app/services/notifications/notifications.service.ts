import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class NotificationsService {
  private messages: any = {
    unauthorized: 'Email or password is not valid.',
    serverError: 'Server error.',
    registrationSuccess: 'Registration successful.',
    missingFields: 'Please fill in all fields.',
    emailAlreadyRegistered: 'An account is already registered with this email.',
    profileUpdated: 'Your profile has been successfully updated.',
    ok: 'Ok',
    close: 'Close',
  };

  getMessage(key: string): string {
    return this.messages[key] || 'Unknown error occurred.';
  }
}
