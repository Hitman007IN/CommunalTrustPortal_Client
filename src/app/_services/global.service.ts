import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '@environments/environment';

@Injectable({ providedIn: 'root' })
export class GlobalService{
    users: any[];
    
    constructor(){
      this.users = [];
      console.log("My global variable value: " + this.users);
      alert("My intial global variable value is: " + this.users);
    }
    
    setMyGV(val: any[]){
      console.log("Setting FV to: " + val);
      this.users = val;
    }
    
    getMyGV(val: any[]){
      return this.users;
    }
}