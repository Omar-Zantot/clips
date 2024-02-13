import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/compat/firestore';
import IUser from '../models/user.model';
import { Observable, of } from 'rxjs';
import { delay, map, filter, switchMap } from 'rxjs/operators';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  /** #### AngularFirestoreCollection
   * - This class is a helper class for annotating properties in our services to a collection.
   * - We are telling TypeScript this property will hold a reference to a collection.
   * - We can specify the type of data stored in the collection by adding a generic.
   */

  private usersCollection: AngularFirestoreCollection<IUser>;

  public isAuthenticated$: Observable<boolean>;

  public isAuthenticatedwithDelay$: Observable<boolean>;

  public redirect = false;

  constructor(
    private _auth: AngularFireAuth,
    private _db: AngularFirestore,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.usersCollection = _db.collection<IUser>('users');
    this.isAuthenticated$ = _auth.user.pipe(map((user) => Boolean(user)));
    this.isAuthenticatedwithDelay$ = this.isAuthenticated$.pipe(delay(1000));
    this.router.events
      .pipe(
        filter((e) => e instanceof NavigationEnd),
        map((e) => this.route.firstChild),
        switchMap((route) => route?.data ?? of({ authOnly: false }))
      )
      .subscribe((data) => {
        this.redirect = data.authOnly ?? false;
      });
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

    // same id
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

  public async logout($event?: Event) {
    if ($event) {
      $event.preventDefault();
    }
    await this._auth.signOut();
    if (this.redirect) {
      await this.router.navigateByUrl('/');
    }
  }
}
