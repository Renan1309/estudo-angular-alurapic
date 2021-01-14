import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from "@angular/core";
import { Subject } from "rxjs";
import { debounceTime } from "rxjs/operators";

@Component({
    selector: 'ap-search',
    templateUrl: './search.component.html'
})
export class SearchComponent implements OnInit, OnDestroy {    
    @Output() onTyping = new EventEmitter<string>();
    @Input() value: string = '';


     /**
   * O subject apartir do metodo next() podemos emitir um valor para ele ex: next('f').
   * E se tiver alguem que se inscreveu nesse subject nos temos o acesso ao valor emitido.
   * Diferente do Observable que eu so posso me inscrever e obter valor dele um Subject eu posso emitir um valor e escutar esse valor se inscrevendo(subscribe) para ter acesso ao valor
   * O subscribe() será chamado enquanto o valor estiver sendo emitido. Ele é um tanto diferente do HttpClient pois este emite um único valor, e o completa, algo que não ocorre com Subject, por termos criado-o. 
   */
  debounce: Subject<string> = new Subject<string>();

  ngOnInit(): void {
    this.debounce
    .pipe(debounceTime(300))
    .subscribe(filter => this.onTyping.emit(filter));
  }

  ngOnDestroy(): void {
    this.debounce.unsubscribe();
  } 
}