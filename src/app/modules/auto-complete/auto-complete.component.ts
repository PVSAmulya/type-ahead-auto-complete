import { Component, OnInit, OnDestroy } from '@angular/core';
import { AutoCompleteService } from './auto-complete.service';
import { TitleInfo } from './auto-complete.model';

@Component({
  selector: 'app-auto-complete',
  templateUrl: './auto-complete.component.html',
  styleUrls: ['./auto-complete.component.scss']
})
export class AutoCompleteComponent implements OnInit, OnDestroy {
  moviesList: any;
  searchText: string = '';
  movies: Array<TitleInfo> = [];
  moviesId: any;
  userMsg = false; /** to display message to the user */
  userNotification: string;
  isSelectionValid = false;
  selectedMoviesObj = {};
  selectedMovies = [];
  constructor(private autoCompleteService: AutoCompleteService) { }

  ngOnInit() {
    this.clearMoviesDataList();
  }

  fetchMovies() {
    this.clearMoviesDataList();
    const options = '&s=' + this.searchText;
    this.autoCompleteService.getData(options).subscribe(data => {
      if (data.error) {
        this.isSelectionValid = false;
        this.displayUserNotification(data.message);
      } else if (data.Search) {
        this.addMoviesListFromAPI(data.Search);
      } else {
        this.isSelectionValid = false;
        if (data.Response === 'False') {
          this.addCustomMoviesList('Please improve your search', data.Error);
        }
      }
    });
  }

  addMoviesListFromAPI(moviesList) {
    this.isSelectionValid = true;
    moviesList.forEach(movie => {
      const titleInfo = {
        title: movie.Title,
        year: movie.Year
      };
      this.movies.push(titleInfo);
    });
  }

  addCustomMoviesList(titleParam, yearParam) {
    const titleInfo = {
      title: titleParam,
      year: yearParam
    };
    this.movies.push(titleInfo);
  }

  onMovieSelect(options) {
    const selectedMovieTitle = options.target.value;
    /** if selected the same movie */
    if (this.isSelectionValid && !this.selectedMoviesObj[selectedMovieTitle]) {
      this.selectedMoviesObj[selectedMovieTitle] = selectedMovieTitle;
      if (this.selectedMovies.length && this.selectedMovies.length > 4) {
        this.displayUserNotification('Search count exceeded. Please delete to add the new movies');
      } else {
        this.selectedMovies.push({ selectedMovie: selectedMovieTitle });
      }
    }
    this.searchText = this.isSelectionValid ? '' : this.searchText;
  }

  removeSelectedMovie(options) {
    delete this.selectedMoviesObj[options.target.name];
    this.selectedMovies.forEach((movie, index) => {
      if (movie.selectedMovie === options.target.name) {
        if (this.selectedMovies.length > 1) {
          delete this.selectedMovies[index];
        } else {
          this.selectedMovies = [];
        }
      }
    });
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
    this.userMsg = true;
    this.userNotification = message;
    clearTimeout(timer);
    timer = setTimeout(() => {
      this.userMsg = false;
    }, 5000);
  }

  ngOnDestroy() {
    this.clearMoviesDataList();
  }
}
