import {Component, OnInit} from 'angular2/core';
import {FORM_DIRECTIVES} from 'angular2/common';

import {Api} from '../../services/api/api';
import {Wakanda} from '../../services/wakanda';

@Component({
  selector: 'home',
  directives: [...FORM_DIRECTIVES],
  pipes: [],
  styles: [require('./home.scss')],
  template: require('./home.html')
})
export class Home implements OnInit {

  constructor(public api: Api, public wakanda: Wakanda) {
    var that = this;
  	this.posts = false;
  	this.wakanda.catalog.then(function (ds) {
  		ds.Post.query({ orderBy: 'date desc' })
		.then(function (posts) {
		    that.posts = posts.entities;
		})
		.catch(function (e) {
			console.log(e);
		});
	});
  }

  ngOnInit() {
    //
  }

}
