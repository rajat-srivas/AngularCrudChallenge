import { Component, Input, OnInit } from "@angular/core";
import { FormsModule, Validators } from "@angular/forms";
import { BsModalRef } from "ngx-bootstrap/modal";
import { User } from "src/_models/user";
import { UserService } from "./../../_services/user.service";

@Component({
  selector: "app-creation",
  templateUrl: "./creation.component.html",
  styleUrls: ["./creation.component.css"],
})
export class CreationComponent implements OnInit {
  modalUser = {} as User;
  @Input() title: string;
  @Input() userToEdit: User;
  newUser: User;
  constructor(
    private userService: UserService,
    public bsModalRef: BsModalRef
  ) {}
  controlDisabled = false;
  ngOnInit() {
    if (this.title == "Edit User") {
      this.modalUser = this.userToEdit;
      this.controlDisabled = true;
    } else {
      this.controlDisabled = false;
    }
  }

  OnSubmit() {
    if (this.modalUser.userId) {
      this.userService.UpdateExistingUser(this.modalUser).subscribe(
        (response) => {
          this.userService.GetAllUsers();
        },
        (error) => {
          console.log(error);
        },
        () => {
          this.userService.GetAllUsers();
          this.bsModalRef.hide();
        }
      );
    } else {
      this.userService.CreateNewUser(this.modalUser).subscribe(
        (response) => {
          console.log(response);
          this.newUser = response as User
          this.newUser.statusMap = "Pending";
          this.newUser.statusIcon = this.userService.pendingIcon;
          this.userService.userDetails.unshift(this.newUser);
        },
        (error) => {
          console.log(error);
        },
        () => {
          this.userService.GetAllUsers();
          console.log("after create");
          console.log(this.userService.userDetails);
          this.bsModalRef.hide();
        }
      );
    }
  }
}
