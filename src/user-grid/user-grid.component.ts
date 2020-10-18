import { Component, OnInit } from "@angular/core";
import { User } from "src/_models/user";
import { UserService } from "./../_services/user.service";
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { DeleteConfirmationComponent } from '../app/delete-confirm/delete-confirm.component';

@Component({
  selector: "app-user-grid",
  templateUrl: "../app/user-grid/user-grid.component.html",
  styleUrls: ["../app/user-grid/user-grid.component.css"],
})
export class UserGridComponent implements OnInit {
  constructor(private userService: UserService, private modalService: BsModalService) {}
  bsModalRef: BsModalRef;
  config = {
    animated: true,
    keyboard: true,
    class: 'modal-dialog-centered',
    initialState : {
      idToDelete: '',
      entity: '',
      user: {}
    }
  };
  activeIcon = "../assets/ico_active.svg";
  pendingIcon = "../assets/ico_pending.svg";
  inactiveIcon = "../assets/ico_inactive.svg";
  ngOnInit() {
    this.GetAllUsers();
  }

  GetAllUsers() {
    this.userService.GetAllUsers().subscribe(
      (response) => {
        this.userService.userDetails = response as User[];
        console.log(this.userService.userDetails);
        this.userService.userDetails.forEach(
          (x) => (x = this.MapUserStatus(x))
        );
      },
      (error) => {
        console.log(error);
      }
    );
  }

  MapUserStatus(user: User) {
    if (user.status == 1) {
      user.statusMap = "Active";
      user.statusIcon = this.activeIcon;
      return user;
    } else if (user.status == 2) {
      user.statusMap = "Pending";
      user.statusIcon = this.pendingIcon;
      return user;
    } else {
      user.statusMap = "InActive";
      user.statusIcon = this.inactiveIcon;
      return user;
    }
  }

  FilterSearchResult(searchTerm: string) {
    if (searchTerm == "") {
      this.GetAllUsers();
    }
    this.userService.userDetails = this.userService.userDetails.filter((x) => {
      return (
        x.fullName.toLocaleLowerCase().startsWith(searchTerm) ||
        x.email.toLocaleLowerCase().startsWith(searchTerm)
      );
    });
    console.log(this.userService.userDetails);
  }

  SortData() {
    console.log("here");
    this.userService.userDetails.sort().reverse();
    console.log(this.userService.userDetails);
  }

  DeleteUser(userId: string) {
    console.log(userId);
    // this.userService.DeleteUserById(userId).subscribe(
    //   (response) => {
    //     console.log(response);
    //   },
    //   (error) => {
    //     console.log(error);
    //   }
    // );
  }

  EditUser(userId: string) {

  }

  ShowConfirmationModal(userId: string) {
      this.config.initialState.idToDelete = userId ;
      this.bsModalRef = this.modalService.show(DeleteConfirmationComponent, this.config);
      this.bsModalRef.content.closeBtnName = 'Close';
    }



}
