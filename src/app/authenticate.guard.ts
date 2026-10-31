import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import { Observable } from 'rxjs';
import {environment} from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthenticateGuard implements CanActivate {
  constructor(private router: Router){}
  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    //console.log('Passing auth guard: \n\n' + JSON.stringify(appStore.getState().loginResponse) + '\n\n');
    let booleen:boolean = !(environment.oauth_client.token === '');
    //console.log(booleen);
    if (booleen) {
      //this.cookiesService.set(LOGIN_RESPONSE, JSON.stringify(appStore.getState().loginResponse));
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}


/*let a = {
  "_success":1,
  "_faillure":0,
  "_response":{
      "applications":{
        "_projectid":"4136c8b5-11e0-11e9-a1f3-ac2b6ee888a2",
        "_name":"Solidarite Sans limite",
        "_description":"Solidarite Sans limite",
        "_enablement":1,
        "_email":null,
        "_phones":null
      },
      "user":{
        "_userid":"dcb7a830-1417-11e9-8967-211421fc3472",
        "_firstname":"Ehawe",
        "_lastname":"Nkalla",
        "_email":"didnkallaehawe@gmail.com",
        "_phone":"671747568",
        "_enablement":1
      },
    "token":{
        "_token_type":"Bearer",
      "_expires_in":86399,
      "_access_token":"eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6Ijc5OGJhNTU5MGYwMmRlYTQ0MTllNjE2Y2ExNjYyMTFhOWFlN2YyMGVhMWE4MGEzZWI2NTMyZWVmYzU0NDdjN2Q3ODg1YTViODc0M2Y5ZjQ5In0.eyJhdWQiOiIzIiwianRpIjoiNzk4YmE1NTkwZjAyZGVhNDQxOWU2MTZjYTE2NjIxMWE5YWU3ZjIwZWExYTgwYTNlYjY1MzJlZWZjNTQ0N2M3ZDc4ODVhNWI4NzQzZjlmNDkiLCJpYXQiOjE1NDgwOTAyNjQsIm5iZiI6MTU0ODA5MDI2NCwiZXhwIjoxNTQ4MTc2NjYzLCJzdWIiOiIzMiIsInNjb3BlcyI6WyJQUk9NT1RFX1BST0pFQ1QiXX0.tzzKBYDxcZ2kh6Tc-idUtp2PteCivqJDPKy9cWbLgWpnXkVR8GL6i83gq3hO6vB-9ecVxfreX58J-JcBW5e7XdC1xL1n4qIpglLX_2vnoJOAiYQik0EDnvxCKs591-8teMcbsVtqu_NtS0jC3hLw_ob2GDqs3Gpvi-1d7yA40G25Wie8ORA3UA9Zlf7I2viOV4YIyrEet_6ZfyeUtViN1Sk2qIXmSWUNtpFoaqDSN9jd790E4i6RaVVgRJrQzELRt9lkcEBXW85ZZEclQjdCDkFpemjxmqllN14PtvscvLda7EMmn22VMb9L5rC-__2jDKW4OzcbjH4krtAzRJDLY83GLd4AwaBm34oYauaVki1G9LuQgC-ZjVc92wGdEVcxbWDbuwdZ4JkY5XZ6LgHIrOzqwxVoO_lklhEHgbaKue9F3pIwhDjr81XVrTf-mSUygi2UtgTb70P4Nd6zTIXfQteisq0WqpcIYxarAwMvngtzlaPtRx5i02xZB3VjjJOe52GRQGLHq9XxP6LX3YWaJrlIuq0Am3JwxsnNfDswh4Le9q-VEWF_G6xpgciSoxJfSCUsE3nOXzMxe61LcFnijAa2f6w2V5_Bl1eLCUSpyU3kXGwCL1XIo27B2IiE-SmIWTK97oGTveqeaR8xklfA64IsgRS3X9l9vqjplYgskjM",
      "_refresh_token":"def5020048270a6da351ea825fb7f645724110556385de1635c6ec55a6e0d4dc63b690b582272e52d1da73a770d27378046a4e76728803ebbc41964b6440203045f0ae740fcf8e0a084eac6212f732d71cceec8fa89a5c3acb4e9f841acdf74667ebcdda9a51e6f6bcf5ffa99df52a296d8b1e6a78328c593fbebe0ad6b7be97240819afeaf87010a4e309d509faafb1132ea66413347be0e3ac350fb6bb4f87ba493ffec7c313e930c7cd5343c76808b630102bf87efe28feef7e5871cc9de51efcffc9535deb104b2b1539f66a129277877054be45cb060a59d952aded5b87b5970b8e909b80bb3b88a4e5ec2085127cf013659a623e5c7fb6fb9b4e70f2a1387965964ce157d1c84db16afc5cc0305024b1b4a3c509d451a5887b654762975ded98b05f9066a90967d818dd37928929cff8036f635d37a2cd604bfadb9e54551bcf64fcfb0d4aac51cc62449bd307521e93e191616ff34f07a6dcbeca66040b90e1dc29f6ecdb5adc5952750c1acf33b074"
      }
    },
  "_raison":null
};*/
