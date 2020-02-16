import { Component, OnInit } from '@angular/core';
import { AutoCompleteService } from './auto-complete.service';
import { TitleInfo } from './auto-complete.model';

@Component({
  selector: 'app-auto-complete',
  templateUrl: './auto-complete.component.html',
  styleUrls: ['./auto-complete.component.scss']
})
export class AutoCompleteComponent implements OnInit {
  moviesList: any;
  searchText: string = '';
  movies: Array<TitleInfo> = [];
  moviesId: any;
  userMsg = false; /** to display message to the user */
  userNotification: string;
  constructor(private autoCompleteService: AutoCompleteService) { }

  ngOnInit() {
    this.clearMoviesDataList();
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
          const titleInfo = {
            title: movie.Title,
            year: movie.Year
          };
          this.movies.push(titleInfo);
        });
      } else {
        this.clearMoviesDataList();
        if (data.Response === 'False') {
          const titleInfo = {
            title: 'Please improve your search',
            year: data.Error
          };
          this.movies.push(titleInfo);
        }
      }

    });
  }

  onMovieSelect(options) {
    console.log(options);
  }

  debounce(limit) {
    let timer;
    clearTimeout(timer);
    timer = setTimeout(() => {
      if (this.searchText.length) {
        this.fetchMovies();
      } else {
        this.clearMoviesDataList();
      }
    }, limit);
  }

  onKeyUp(e: any) {
    this.searchText = e.target.value;
    this.debounce(400);
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
