# Changelog 1.1.0

### Added

1. [x] Added dummy files
2. [x] Added middleware functions
   - `index.ts` - exports all middleware
   - `isAuthenticated.ts` - checks if the user is authenticated before protected routes
   - `isEmail.ts` - checks if the email used for registration is a valid email
   - `isExists.ts` - checks if the requested item does exist before querying the data, due to make better responses
   - `isPasswordChanged.ts` - checks if the user really changed the password
3. [x] Added registration route

### Removed

1. [x] Removed log files
2. [x] Removed uploads route due to re-factor
