import { Component, Input, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { UserService } from './../../_services/user.service';

@Component({
  selector: 'app-delete-confirm',
  templateUrl: './delete-confirm.component.html',
  styleUrls: ['./delete-confirm.component.css'
]
})
export class DeleteConfirmComponent implements OnInit {
  @Input() idToDelete: string;
  constructor(private userService: UserService, public bsModalRef: BsModalRef) { }

  ngOnInit() {
  }

  yes() {
      console.log(this.idToDelete);
      this.userService.DeleteUserById(this.idToDelete).subscribe(
        (response) => {
          this.userService.userDetails.forEach( (item, index) => {
            if(item.userId === this.idToDelete) this.userService.userDetails.splice(index,1);
          });
        },
        (error) => {
          console.log(error);
        }
      );
    this.bsModalRef.hide();

  }

}
