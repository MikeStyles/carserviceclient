import { Component, OnInit } from '@angular/core';
import { OwnerService } from '../shared/owner/owner.service';

@Component({
  selector: 'app-owner-list',
  templateUrl: './owner-list.component.html',
  styleUrls: ['./owner-list.component.css']
})
export class OwnerListComponent implements OnInit {
  ownerSelected: any [] = [];
  owners: any []

  constructor(private ownerService:OwnerService) { }

  ngOnInit() {
    this.getOwners()
  }
  
  getOwners(){
    this.ownerService.getAll().subscribe(data => {
      this.owners = data['_embedded']['owners']      
    })
  }

  delete(){    
    for (let index = 0; index < this.ownerSelected.length; index++) {
      const element = this.ownerSelected[index];
      if (element) {       
        let href = this.owners[index]['_links']['self']['href']
        this.ownerService.remove(href).subscribe(data => {console.log(data)
        this.owners.splice(index,1)});
      }
    }
  }

  select(i: number){
    this.ownerSelected[i] = !this.ownerSelected[i]
    console.log(this.ownerSelected);
  }

}
