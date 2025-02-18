

export function validateEmailPassword(email, password) {
   let email_trimmed = email.trim();
   let password_trimmed = password.trim();

   const email_pattern = /^[!A-Z0-9#$&?*^~_%+-]+(\.[A-Z0-9!_%+-^]+)*?@[A-Z0-9-]+([A-Z0-9.-])*\.[A-Z]{2,}$/i;

   if (email_trimmed.length === 0) {
      return {isValid: false, error: 'Your email is required!'};
   }
   if (!email_trimmed.match(email_pattern)) {
      return {isValid: false, error: 'Enter a valid email!'};
   }
   if (password_trimmed.length === 0) {
      return {isValid: false, error: 'Your password is required!'};
   }
   if (password_trimmed.length < 8) {
      return {isValid: false, error: 'A password must be at least 8 characters!'};
   }
   return {isValid: true};
}

export function validateUserInfo(name, email, password) {
   let name_trimmed = name.trim();
   let email_trimmed = email.trim();
   let password_trimmed = password.trim();

   const name_pattern = /^([a-zA-Z]{2,}\s[a-zA-z]{1,}'?-?[a-zA-Z]{1,}\s?([a-zA-Z]{1,})?)(,? (?:[JS]r\.?|II|III|IV))?$/g;
   const email_pattern = /^[!A-Z0-9#$&?*^~_%+-]+(\.[A-Z0-9!_%+-^]+)*?@[A-Z0-9-]+([A-Z0-9.-])*\.[A-Z]{2,}$/i;

   if (name_trimmed.length === 0) {
      return {isValid: false, error: 'Your first and last name are required!'};
   }
   if (!name_trimmed.match(name_pattern)) {
      return {isValid: false, error: 'Enter your first and last name!'};
   }
   if (email_trimmed.length === 0) {
      return {isValid: false, error: 'Your email is required!'};
   }
   if (!email_trimmed.match(email_pattern)) {
      return {isValid: false, error: 'Enter a valid email!'};
   }
   if (password_trimmed.length === 0) {
      return {isValid: false, error: 'Your password is required!'};
   }
   if (password_trimmed.length < 8) {
      return {isValid: false, error: 'Password must be at least 8 characters!'};
   }
   return {isValid: true};
}