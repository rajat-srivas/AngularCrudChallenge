import { Injectable } from '@angular/core';
import { UserService } from 'src/_services/user.service';

@Injectable({
  providedIn: 'root'
})
export class UtilityServiceService {
  startIndex: number = 0;
  endIndex: number = 5;
  itemCount: number;
  pageCount: number;
  pages: any;
constructor(private userService: UserService) { }
GeneratePageCountArray() {
  this.userService.itemCount = this.userService.userDetails.length;
  this.pageCount = Math.ceil(this.userService.itemCount / 5);
  this.pages = new Array();
  if (this.pageCount > 0) {
    var i;
    for (i = 0; i < this.pageCount; i++) {
      var isSelected = false;
      if (i == 0) isSelected = true;
      var paginator = {
        isSelected: isSelected,
        pageNumber: i + 1,
      };
      this.pages.push(paginator);
    }
  }
}


SelectPage(page) {
  console.log(this.pages);
  console.log(page);
  this.pages.forEach((element) => {
    if (element.pageNumber == page.pageNumber) {
      element.isSelected = true;
    } else {
      element.isSelected = false;
    }
  });
  if(page.pageNumber == 1)
  {
    this.startIndex = 0;
  }
  else
  {
    this.startIndex = (5 * (page.pageNumber - 1));
  }
  this.endIndex = this.startIndex + 5;
  console.log(this.startIndex);
  console.log(this.endIndex);
}


}
