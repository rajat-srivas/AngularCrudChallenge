import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { User } from "src/_models/user";
import { environment } from "./../environments/environment";

@Injectable()
export class UserService {
  userDetails: User[];
  selectedUser = {} as User;
  itemCount: number;
  baseUrl = environment.baseUrl;
  selectedPage: number;
  activeIcon = "../assets/ico_active.svg";
  pendingIcon = "../assets/ico_pending.svg";
  inactiveIcon = "../assets/ico_inactive.svg";
  constructor(private http: HttpClient) {}

  GetAllUsers() {
    return this.http.get(this.baseUrl);
  }

  GetUserById(id: string) {
    return   this.http.get(this.baseUrl + id);
  }

  DeleteUserById(id: string) {
    return this.http.delete(this.baseUrl + "delete/" + id);
  }

  CreateNewUser(user: User) {
    console.log("in create user");
    console.log(user);
    return this.http.post(this.baseUrl + "create", user);
  }

  UpdateExistingUser(user: User) {
    return this.http.patch(this.baseUrl + "update", user);
  }
}
