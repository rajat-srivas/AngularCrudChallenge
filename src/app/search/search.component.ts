import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { UserService } from "../../_services/user.service";
import { CreationComponent } from '../creation/creation.component';

@Component({
  selector: "app-search",
  templateUrl: "./search.component.html",
  styleUrls: ["./search.component.css"],
})
export class SearchComponent implements OnInit {
  searchTerm: string;
  bsModalRef: BsModalRef;
  config = {
    animated: true,
    keyboard: true,
    class: 'modal-dialog-centered modal-sm',
    initialState : {
      idToDelete: '',
      entity: '',
      user: {},
      title :''
    }
  };
  constructor(private userService: UserService, private modalService: BsModalService) {}
  @Output() SearchRecords = new EventEmitter();
  ngOnInit() {}

  searchContent() {
    this.SearchRecords.emit(this.searchTerm);
  }

  ShowAddModal() {
    this.config.initialState.title = 'Add User';
    this.bsModalRef = this.modalService.show(CreationComponent, this.config);
    this.bsModalRef.content.closeBtnName = 'Close';
  }
}
