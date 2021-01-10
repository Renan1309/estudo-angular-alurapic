import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Photo } from '../../photo/photo';

@Component({
  selector: 'ap-photos',
  templateUrl: './photos.component.html',
  styleUrls: ['./photos.component.css']
})
export class PhotosComponent implements OnInit, OnChanges {

  @Input() photos: Photo[] = [];
  rows: any[] = [];

  constructor() { }

  //O OnChanges : recebe como parâmetro todas as possíveis mudanças das inbound properties do nosso componente. 
  ngOnChanges(changes: SimpleChanges): void {
    if (changes.photos)
      this.rows = this.groupColumns(this.photos);

  }

  ngOnInit() {
  }

  groupColumns(photos: Photo[]) {
    const newRows = [];
    //O metodo slice para manipular array :
    // O O slice() sempre recebe a posição inicial que queremos considerar, e a 
    //final não inclusiva, "fatiando" o array. Ou seja, quando o primeiro index é 0, o outro vale 3, e o slice() pegará a fatia de 0 a 2.
    for (let index = 0; index < photos.length; index += 3) {
      newRows.push(photos.slice(index, index + 3));
    }
    return newRows;
  }

}
