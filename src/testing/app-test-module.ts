import {TestModuleMetadata} from '@angular/core/testing';
import {provideHttpClient} from '@angular/common/http';
import {provideHttpClientTesting} from '@angular/common/http/testing';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {AppModule} from '../app/app.module';
import {environment} from '../environments/environment';

export const testUser = {
  userid: 'test-user', firstname: 'Test', lastname: 'Member', email: 'member@example.com',
  gender: 'male', country: 'CM', isAdmin: false, accepted_by: 'test-user', temoins: null,
};
export const testDebate = {
  debateid: 'test-debate', theme: 'Test debate', state: 'ACCEPTED', moderators: [], moderatorsdetails: [],
  authorid: 'test-user', authoremail: 'member@example.com', authorname: 'Test Member',
  closureSignataires: [], signataires: [],
};

// These tests render real templates while isolating backend and realtime connections.
export function appTestModule(): TestModuleMetadata {
  environment.userdescriptor = {userDetails: {...testUser}};
  environment.users = [];
  // Keep the third-party Maps API pending; template smoke tests do not contact Google.
  (globalThis as any).google = {maps: {importLibrary: () => new Promise(() => {})}};
  (globalThis as any).Pusher = class {
    subscribe() { return {bind() {}, unbind() {}}; }
    disconnect() {}
  };
  return {
    imports: [AppModule],
    providers: [
      provideHttpClient(), provideHttpClientTesting(),
      {provide: MatDialogRef, useValue: {close: jasmine.createSpy('close')}},
      {provide: MAT_DIALOG_DATA, useValue: {
        ...testUser, user: {...testUser}, debate: {...testDebate},
        comment: {commentid: 'test-comment', textbody: 'Test comment'}, url: 'https://example.com/file.pdf',
      }},
    ],
  };
}
