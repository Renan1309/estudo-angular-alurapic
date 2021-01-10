import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators'
import { Photo } from '../photo/photo';
import { PhotoService } from '../photo/photo-service';

@Component({
  selector: 'app-photo-list',
  templateUrl: './photo-list.component.html',
  styleUrls: ['./photo-list.component.css']
})
export class PhotoListComponent implements OnInit, OnDestroy {

  photos: Photo[] = [];
  filter: string = '';
  /**
   * O subject apartir do metodo next() podemos emitir um valor para ele ex: next('f').
   * E se tiver alguem que se inscreveu nesse subject nos temos o acesso ao valor emitido.
   * Diferente do Observable que eu so posso me inscrever e obter valor dele um Subject eu posso emitir um valor e escutar esse valor se inscrevendo(subscribe) para ter acesso ao valor
   * O subscribe() será chamado enquanto o valor estiver sendo emitido. Ele é um tanto diferente do HttpClient pois este emite um único valor, e o completa, algo que não ocorre com Subject, por termos criado-o. 
   */
  debounce: Subject<string> = new Subject<string>();
  hasMore: boolean = true;
  currentPage: number = 1;
  userName: string = '';

  constructor(private activatedRoute: ActivatedRoute,
    private photoService: PhotoService) { }

  ngOnInit(): void {
    this.userName = this.activatedRoute.snapshot.params.userName;
    this.photos = this.activatedRoute.snapshot.data.photos;
    this.debounce
      .pipe(debounceTime(300))
      .subscribe(filter => this.filter = filter);
  }

  ngOnDestroy(): void {
    //No ng onDestroy no encerramos a inscrição para não consumir isso é uma boa pratica sempre que temos Subjects sendo emitidos
    this.debounce.unsubscribe();
  }

  load() {
    this.photoService
      .listFromUserPaginated(this.userName, ++this.currentPage)
      .subscribe(photos => {
        /**
         * Não usamos a forma abaixo pq : O problema é que quando fazemos o push(), a cada item incluso ali dentro, o outro componente não sabe que photos é alterado. Isto porque não modificamos a referência this.photos
         */
        // this.photos.push(...photos);
        this.photos = this.photos.concat(photos)
        if (!photos.length) this.hasMore = false;
      });
  }

}
