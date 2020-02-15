# BookShelf

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 8.3.22.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

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