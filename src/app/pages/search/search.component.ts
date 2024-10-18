import { Component } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss'
})
export class SearchComponent {

  inputText: string = '';


  onSubmit() {
    console.log('Input Text:', this.inputText);
  }

}
