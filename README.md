# BookShelf

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 8.3.22.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

# create module

ng g module modules/module-name

# create module with routing

ng g module modules/module-name --routing

## following files will be added inside modules/module-name folder

      module-name.module.ts
      module-name-routing.module.ts

# create component

ng g component modules/component-name --styleext scss

## following files will be added inside modules/module-name folder

      component-name.component.html
      component-name.component.spec.ts
      component-name.component.ts
      component-name.component.scss

# can add model, service, constants helpers and pipes inside modules/module-name folder if required any

      component-name.model.ts
      component-name.service.ts
      component-name.constants.ts
      component-name.helper.ts
      component-name.pipe.ts

# Lazy Loading
This is a design pattern that causes Angular to only load the modules as needed. To achieve this we need to setup the app module and give each module it’s own routing file:

The key here is developing a structure of routes, such that sub-components are accessed by child routes. Child routes only load their respective components when the parent requests them. i.e. AppModule requests child MainModule, which gets loaded. MainModule then requests other children (pay-report, chat, etc) which are loaded as needed.

Lazy Loading Syntax (i.e. inside the main-routing.module.ts):
const routes: Routes = [
  {
    path: '', component: MainComponent,
    children: [
      { path: 'placeholder', loadChildren: () => import('../placeholder/placeholder.module').then(mod => mod.PlaceholderModule) }
    ]
  }
];

AppRoutingModule should have:
	imports: [RouterModule.forRoot(routes)]

The MainRoutingModule will have:
	imports: [RouterModule.forChild(routes)]

Notice that forRoot sets up the routes to be loaded by the root application. The forChild sets up the routes to only be loaded when requested by the parent. It’s also important that AppModule only declares the AppComponent. Any component declared in AppModule will be loaded with the site and will not be lazy loaded.

Instructions to run this project:

Step 1: Please make sure your environment include Node.js and an npm package manager
Step 2: Please change API key in src/environments/environment.prod and src/environments/environment.ts files
Step 2: open the project in command prompt or any code editor say Visual Studio code and perform the following steps:
          a) npm i
          b) ng serve
Tested in Google Chrome, Internet Explorer 10, Microsoft Edge. IE and Edge 
Please run the project in production mode to test in Internet Explorer:
Step 3: Production mode:
          a) ng build --prod
          b) node server.js

Assumptions:

* Used Angular framework. Whereas written the code entirely from scratch.
* I developed half project until type ahead auto complete using plain javascript, html, css. Please find my code in using-plain-javascript folder. Due to time factors, I switched my project to Angular. Apologies in advance for sharing half project.
* Tried implementing all the features mentioned in the take home project.
* Currently if user types first few letters, if the API call returns movies list. If user clicks enter, saving those few letters as a movie pill. I am taking few letters as a pill because: API call can fetch a specific movie just by giving first few letters of the movie title. Therefore, I kept it as is. If we think that looks like a bug or hinders the user performance, We can fix it.
* If there is any technical error, say API error or API key error and if user searching for sixth movie title. Created a user notification message.
* We can delete the selected pills from the search bar. Also, backspace works to remove the selected movie. Whereas, I believe, backspace works only on windows. I haven't tested in Mac Book.
