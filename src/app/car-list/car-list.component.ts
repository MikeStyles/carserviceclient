import { Component, OnInit } from '@angular/core';
import { CarService } from '../shared/car/car.service';
import { GiphyService } from '../shared/giphy/giphy.service';
import { OwnerService } from '../shared/owner/owner.service';

@Component({
  selector: 'app-car-list',
  templateUrl: './car-list.component.html',
  styleUrls: ['./car-list.component.css']
})
export class CarListComponent implements OnInit {
  cars: Array<any>;
  owners: any[] = [];

  constructor(private carService: CarService, private giphyService: GiphyService,
    private ownerService: OwnerService) { }

  ngOnInit() {
    this.ownerService.getAll().subscribe(data => {
      this.owners = data['_embedded']['owners'];
      console.log(this.owners);
      this.getCarList();
    });
  }

  getCarList() {
    this.carService.getAll().subscribe(data => {
      this.cars = data;
      console.log(this.cars);
      this.giveName();
    });
  }

  giveName() {
    for (const car of this.cars) {
      this.giphyService.get(car.name).subscribe(url => car.giphyUrl = url);
      if (car.ownerDni) {
        console.log(car.ownerDni);
        car.ownerName = this.searchOwner(car.ownerDni);
        console.log(car.ownerName);

      } else {
        car.ownerName = 'Without Owner';
      }
    }
  }


  searchOwner(id: string) {
    for (let index = 0; index < this.owners.length; index++) {
      const element = this.owners[index].dni;
      if (element == id) {
        console.log(element, 'es igual a', id);
        return this.owners[index].name;
      } else {
      }
    }
    console.log('No se encontró para: ', id);

    return 'Without Owner';
  }


}
