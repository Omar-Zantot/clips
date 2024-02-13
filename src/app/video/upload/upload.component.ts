import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { last, switchMap } from 'rxjs/operators';
import { v4 as uuid } from 'uuid';
import firebase from 'firebase/compat/app';
import { ClipService } from 'src/app/services/clip.service';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss'],
})
export class UploadComponent {
  // & {----- ----- ----- Fields ----- ----- ------}

  // file
  file: File | null = null;

  // drop event
  isDragOver = false;
  // when uploading
  nextStep = false;

  // form
  title = new FormControl('', {
    validators: [Validators.required, Validators.minLength(3)],
    nonNullable: true,
  });
  uploadForm = new FormGroup({
    title: this.title,
  });

  // alert
  showAlert = false;
  alertMsg = 'Pleas wait! Your clip is being uploaded.';
  alertColor = 'blue';
  // btn disabled
  inSubmission = false;

  // progress of upload
  persentage = 0;
  // toggle the precentage
  showPrecentage = false;

  // user
  user: firebase.User | null = null;

  // & {----- ----- ----- Constru ----- ----- ------}

  constructor(
    private storage: AngularFireStorage,
    private auth: AngularFireAuth,
    private clipsService: ClipService
  ) {
    auth.user.subscribe((user) => (this.user = user));
  }

  // & {----- ----- ----- methods ----- ----- ------}

  // get the file(video) title
  storeFile(event: Event) {
    this.isDragOver = false;
    this.file = (event as DragEvent).dataTransfer?.files.item(0) ?? null;

    if (!this.file || this.file.type !== 'video/mp4') {
      return;
    }
    this.title.setValue(this.file.name.replace(/\.[^/.]+$/, ''));
    this.nextStep = true;
  }

  // publish the clip
  uploadfile() {
    // ^ reset alert
    this.showAlert = true;
    this.alertMsg = 'Pleas wait! Your clip is being uploaded.';
    this.alertColor = 'blue';
    this.inSubmission = true; // disable the btn
    this.showPrecentage = true;

    // ^ create unique file name using 3rd party library uuid **********
    const clipFileName = uuid();
    const clipPath = `clips/${clipFileName}.mp4`;

    /** better user experience (progress). */
    const task = this.storage.upload(clipPath, this.file);
    const clipRef = this.storage.ref(clipPath);

    task.percentageChanges().subscribe((progress) => {
      this.persentage = (progress as number) / 100;
    });

    // status
    task
      .snapshotChanges()
      .pipe(
        last(),
        switchMap(() => clipRef.getDownloadURL())
      )
      .subscribe({
        next: (url) => {
          const clip = {
            uid: this.user?.uid as string,
            displayName: this.user?.displayName as string,
            title: this.title.value,
            fileName: `${clipFileName}.mp4`,
            url,
          };

          this.clipsService.createClip(clip);

          this.alertColor = 'green';
          this.alertMsg =
            'Success! Your clip is now ready to share with the world.';
          this.showPrecentage = false;
        },
        error: (error: Error) => {
          this.inSubmission = true;
          this.showPrecentage = false;
          this.alertColor = 'red';
          this.alertMsg = 'Upload failed! Please try again later';
        },
      });
  }
}
