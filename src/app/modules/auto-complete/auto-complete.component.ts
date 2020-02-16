import { Component, OnInit } from '@angular/core';
import { AutoCompleteService } from './auto-complete.service';

@Component({
  selector: 'app-auto-complete',
  templateUrl: './auto-complete.component.html',
  styleUrls: ['./auto-complete.component.scss']
})
export class AutoCompleteComponent implements OnInit {
  moviesList: any;
  searchText: string = '';
  movies: Array<string> = [];
  moviesId: any;
  userMsg = false; /** to display message to the user */
  userNotification: string;
  constructor(private autoCompleteService: AutoCompleteService) { }

  ngOnInit() {
  }

  fetchMovies() {
    this.clearMoviesDataList();
    const options = '&s=' + this.searchText;
    this.autoCompleteService.getData(options).subscribe(data => {
      if (data.error) {
        this.userMsg = true;
        this.displayUserNotification(data.message);
      } else if (data.Search) {
        data.Search.forEach(movie => {
          this.movies.push(movie.Title);
        });
      } else {
        if (data.Response === 'False') {
          this.movies.push(data.Error || data.message);
        }
      }

    });
  }

  debounce(limit) {
    let timer;
    clearTimeout(timer);
    timer = setTimeout(() => {
      if (this.searchText) {
        this.fetchMovies();
      }
    }, limit);
  }

  onKeyUp(e: any) {
    this.searchText = e.target.value;
    this.debounce(300);
  }

  clearMoviesDataList() {
    this.movies = [];
  }

  displayUserNotification(message) {
    let timer;
    this.userNotification = message;
    clearTimeout(timer);
    timer = setTimeout(() => {
      this.userMsg = false;
    }, 5000);
  }
}
