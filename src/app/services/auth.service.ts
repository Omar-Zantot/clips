import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/compat/firestore';
import IUser from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  /**
   * #### AngularFirestoreCollection
   * - This class is a helper class for annotating properties in our services to a collection.
   * - We are telling TypeScript this property will hold a reference to a collection.
   * - We can specify the type of data stored in the collection by adding a generic.
   */
  private usersCollection: AngularFirestoreCollection<IUser>;

  constructor(private _auth: AngularFireAuth, private _db: AngularFirestore) {
    this.usersCollection = _db.collection<IUser>('users');
  }

  public async createUser(userData: IUser) {
    const userCred = await this._auth.createUserWithEmailAndPassword(
      userData.email as string,
      userData.password as string
    );

    /** 'userCred.user' is possibly 'null'.*/
    // if (!userCred.user) {
    //   throw new Error("User can't be found");
    // }

    await this.usersCollection.doc(userCred.user?.uid).set({
      name: userData.name,
      email: userData.email,
      age: userData.age,
      phone_number: userData.phone_number,
    });

    await userCred.user?.updateProfile({
      displayName: userData.name,
    });
  }
}
