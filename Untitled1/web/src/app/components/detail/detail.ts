import {Component, Inject, OnInit} from 'angular2/core';
import {FormBuilder, Validators} from 'angular2/common';
import {RouteParams} from 'angular2/router';
import {Api} from '../../services/api/api';
import {Wakanda} from '../../services/wakanda';

@Component({
  selector: 'detail',
  template: require('./detail.html'),
  styles: [require('./detail.scss')],
  providers: [],
  directives: [],
  pipes: []
})
export class Detail implements OnInit {

  constructor(@Inject(RouteParams) params: RouteParams, public api: Api, public wakanda: Wakanda, fb: FormBuilder) {
    var that = this;
  	this.post = undefined;
  	this.prev = undefined;
  	this.next = undefined;
  	this.commentForm = fb.group({
      name: ['', Validators.required],
      comment: ['', Validators.required]
    });
  	this.wakanda.catalog.then(function (ds) {
  		ds.Post.find(params.get('id'))
		.then(function (post) {
			post.comments.fetch().then(function () {
				post.comments.entities.sort(function (a, b) {
					if (a.date < b.date) {
						return 1;
					}
					return -1;
				});
		    	that.post = post;
			});
			ds.Post.query({
			  filter: 'date > :1',
			  params: [post.date],
			  orderBy: 'date asc'
			})
			.then(function (next) {
				if (next._count > 0) {
					that.next = next.entities[0];
				}
			})
			.catch(function (e) {
				console.log(e);
			});
			ds.Post.query({
			  filter: 'date < :1',
			  params: [post.date],
			  orderBy: 'date desc'
			})
			.then(function (prev) {
				if (prev._count > 0) {
					that.prev = prev.entities[0];
				}
			})
			.catch(function (e) {
				console.log(e);
			});
		})
		.catch(function (e) {
			console.log(e);
		});
	});
  }

  addComment(event) {
    var that = this;
    if (this.commentForm.value.name.trim() !== '' && this.commentForm.value.comment.trim() !== '') {
    	this.wakanda.catalog.then(function (ds) {
    		var newComment = ds.Comment.create();
			newComment.author = that.commentForm.value.name.trim();
			newComment.content = that.commentForm.value.comment.trim();
			newComment.date = new Date();
			newComment.post = that.post;
			newComment.save();
		});
    } else {
    	// @TODO error
	}
    event.preventDefault();
  }
  ngOnInit() {
    //
  }

}
