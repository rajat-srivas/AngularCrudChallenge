import { Component, OnInit } from "@angular/core";
import { User } from "src/_models/user";
import { UserService } from "../../_services/user.service";
import { BsModalService, BsModalRef } from "ngx-bootstrap/modal";
import { DeleteConfirmComponent } from "../delete-confirm/delete-confirm.component";
import { CreationComponent } from "./../creation/creation.component";
import { UtilityServiceService } from './../../_helper/utilityService.service';

@Component({
  selector: "app-user-grid",
  templateUrl: "./user-grid.component.html",
  styleUrls: ["./user-grid.component.css"],
})
export class UserGridComponent implements OnInit {
  // itemCount: number;
  // pageCount: number;
  // // startIndex: number = 0;
  // // endIndex: number = 5;
  // pages: any;
  isSelected: boolean;
  constructor(
    private userService: UserService,
    private modalService: BsModalService,
    private utilityService: UtilityServiceService
  ) {}
  bsModalRef: BsModalRef;
  configDelete = {
    animated: true,
    keyboard: true,
    class: "modal-dialog-centered modal-sm",
    initialState: {
      idToDelete: "",
      entity: "",
      user: {},
    },
  };
  configEdit = {
    animated: true,
    keyboard: true,
    class: "modal-dialog-centered modal-sm",
    initialState: {
      userToEdit: {},
      title: "",
    },
  };

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
      },
      () => {
        this.utilityService.GeneratePageCountArray();
      }
    );
  }



  // SelectPage(page) {
  //   console.log(this.pages);
  //   console.log(page);
  //   this.pages.forEach((element) => {
  //     if (element.pageNumber == page.pageNumber) {
  //       element.isSelected = true;
  //     } else {
  //       element.isSelected = false;
  //     }
  //   });
  //   if(page.pageNumber == 1)
  //   {
  //     this.startIndex = 0;
  //   }
  //   else
  //   {
  //     this.startIndex = (5 * (page.pageNumber - 1));
  //   }
  //   this.endIndex = this.startIndex + 5;
  //   console.log(this.startIndex);
  //   console.log(this.endIndex);
  // }

  MapUserStatus(user: User) {
    if (user.status == 1) {
      user.statusMap = "Active";
      user.statusIcon = this.userService.activeIcon;
      return user;
    } else if (user.status == 2) {
      user.statusMap = "Pending";
      user.statusIcon = this.userService.pendingIcon;
      return user;
    } else {
      user.statusMap = "InActive";
      user.statusIcon = this.userService.inactiveIcon;
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
    this.userService.userDetails.sort().reverse();
    console.log(this.userService.userDetails);
  }

  EditUser(user: User) {
    this.configEdit.initialState.userToEdit = user;
    this.configEdit.initialState.title = "Edit User";
    this.bsModalRef = this.modalService.show(
      CreationComponent,
      this.configEdit
    );
    this.bsModalRef.content.closeBtnName = "Close";
  }

  ShowConfirmationModal(userId: string) {
    this.configDelete.initialState.idToDelete = userId;
    this.bsModalRef = this.modalService.show(
      DeleteConfirmComponent,
      this.configDelete
    );
    this.bsModalRef.content.closeBtnName = "Close";
  }
}
