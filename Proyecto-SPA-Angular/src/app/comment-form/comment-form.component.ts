import { Component, OnInit } from '@angular/core';
import { CommentService } from '../services/comment.service';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-comment-form',
  templateUrl: './comment-form.component.html',
  styleUrls: ['./comment-form.component.css']
})

export class CommentFormComponent implements OnInit {

  tutorialId: string;
  comments: any;
  newComment: any = {};
  submitted = false;
  commentForm: FormGroup = this.formBuilder.group({
    name: ['', Validators.required],
    text: ['', Validators.required]
  });
  

  constructor(
    private commentService: CommentService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder
  ) {
    this.tutorialId = this.route.snapshot.params['id'];
  }

  ngOnInit(): void {
    this.getComments();
  }

  getComments() {
    this.commentService.getComments(this.tutorialId)
      .subscribe({
          next: data => {
            this.comments = data;
          },
          error: error => {
            console.log(error);
          }
      });
  
  }
  
  submitComment() {
    const comment = {
      name: this.commentForm.get('name')?.value,
      text: this.commentForm.get('text')?.value
    };
    this.commentService.createComment(this.tutorialId, comment)
      .subscribe({
        next: response => {
          console.log(response);
          this.submitted = true;
        },
        error: error => {
          console.log(error);
        }
      });
  }

  onSubmit() {
    const comment = {
      name: this.commentForm.get('name')?.value,
      text: this.commentForm.get('text')?.value
    };
    this.commentService.createComment(this.tutorialId, comment)
      .subscribe({
        next: response => {
          console.log(response);
          this.commentForm.reset();
          this.getComments();
        },
        error: error => {
          console.log(error);
        }
      });
  }
}
