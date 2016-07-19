import {Component} from 'angular2/core';
import {RouteConfig, ROUTER_DIRECTIVES} from 'angular2/router';
import {FORM_PROVIDERS} from 'angular2/common';

import '../style/app.scss';

import {Api} from './services/api/api';
import {Home} from './components/home/home';
import {About} from "./components/about/about";
import {Detail} from "./components/detail/detail";

import {Wakanda} from './services/wakanda';

/*
 * App Component
 * Top Level Component
 */
@Component({
  selector: 'app', // <app></app>
  providers: [...FORM_PROVIDERS, Api, Wakanda],
  directives: [...ROUTER_DIRECTIVES],
  pipes: [],
  styles: [require('./app.scss')],
  template: require('./app.html')
})
@RouteConfig([
  {path: '/', component: Home, name: 'Home'},
  {path: '/About', component: About, name: 'About'},
  {path: '/Detail/:id', component: Detail, name: 'Detail'}
])
export class App {
  url: string = 'https://github.com/preboot/angular2-webpack';
  wakandaClientVersion: string = undefined;
  constructor(public api: Api, public wakanda: Wakanda) {
  	this.wakandaClientVersion = this.wakanda.wakandaClientVersion;
  }
}
