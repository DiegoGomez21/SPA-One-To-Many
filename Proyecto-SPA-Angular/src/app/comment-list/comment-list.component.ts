import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Comment } from '../models/comment.model';
import { CommentService } from '../services/comment.service';

@Component({
  selector: 'app-comment-list',
  templateUrl: './comment-list.component.html',
  styleUrls: ['./comment-list.component.css']
})
export class CommentListComponent implements OnInit {

  comments: Comment[] = [];
  commentForm!: FormGroup;
  tutorialId!: string;

  constructor(
    private commentService: CommentService,
    private fb: FormBuilder,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.tutorialId = id;
      this.commentService.getComments(this.tutorialId)
        .subscribe(
          data => {
            this.comments = data;
          },
          error => {
            console.log(error);
          });
    }
    this.commentForm = this.fb.group({
      text: ['', Validators.required]
    });
  }


  addComment() {
    const comment = {
      tutorialId: this.tutorialId,
      text: this.commentForm.value.text
    };
    this.commentService.createComment(this.tutorialId,comment)
      .subscribe(
        response => {
          console.log(response);
          this.comments.push(response);
          this.commentForm.reset();
        },
        error => {
          console.log(error);
        });
  }

}
