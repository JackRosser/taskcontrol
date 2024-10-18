import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss'
})
export class SearchComponent {

  inputText: string = '';

  @Output() datoRicercato = new EventEmitter<string>()

salvataggio() {
  this.datoRicercato.emit(this.inputText)
}

}
