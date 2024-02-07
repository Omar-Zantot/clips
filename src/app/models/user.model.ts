export default interface IUser {
  email: string;
  password?: string;
  age: number;
  name: string;
  phone_number: string;
}

/** interface Vs classes
• Both can type check data
• Classes are a feature of JavaScript
• Interfaces are a feature of TypeScript
• Interfaces do not get transpiled, while a class does.
  (Interfaces are not so lucky, during transformation they are
  completely deleted from our app. The purpose of an interface is
  to type-check our objects during transportation.)
• Methods can be added to classes
• Keep in mind classes can increase the bundle size of our app.
• interfacesKeep our bundle clean.
 */
