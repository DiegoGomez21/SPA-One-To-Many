import { Component, Input, OnInit } from '@angular/core';
import { TutorialService } from 'src/app/services/tutorial.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Tutorial } from 'src/app/models/tutorial.model';
import { CommentService } from 'src/app/services/comment.service';

@Component({
  selector: 'app-tutorial-details',
  templateUrl: './tutorial-details.component.html',
  styleUrls: ['./tutorial-details.component.css']
})
export class TutorialDetailsComponent implements OnInit {

  @Input() viewMode = false;

  @Input() currentTutorial: Tutorial = {
    title: '',
    description: '',
    published: false
  };

  comments: any;

  comment = {
    name: '',
    text: ''
  };

  message = '';

  constructor(private tutorialService: TutorialService, private commentService: CommentService, private route: ActivatedRoute, private router: Router) {
    this.currentTutorial = new Tutorial();
  }



  id = '';
  ngOnInit(): void {
    if (!this.viewMode) {
      this.message = '';
      this.route.params.subscribe(params => {
        const id = this.currentTutorial.id;
        if (id) { // comprueba que id no sea null o undefined
          this.id = id;
          this.getComments(id);
        }
      });
    }
  }
  
  ngOnChanges(): void {
    this.id = this.currentTutorial.id;
    if (this.id) {
      this.getComments(this.id);
    }
  }

  getComments(id: any): void {
    this.commentService.getComments(id)
      .subscribe({
        next: data => {
          this.comments = data;
          console.log(data);
          if (this.comments.length === 0) {
            console.log('No comments available.');
          }
        },
        error: error => {
          console.log(error);
        }
      });
  }

  updatePublished(status: boolean): void {
    const data = {
      title: this.currentTutorial.title,
      description: this.currentTutorial.description,
      published: status
    };

    this.message = '';

    this.tutorialService.update(this.currentTutorial.id, data)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.currentTutorial.published = status;
          this.message = res.message ? res.message : 'The status was updated successfully!';
        },
        error: (e) => console.error(e)
      });
  }

  updateTutorial(): void {
    this.message = '';

    this.tutorialService.update(this.currentTutorial.id, this.currentTutorial)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.message = res.message ? res.message : 'This tutorial was updated successfully!';
        },
        error: (e) => console.error(e)
      });
  }

  deleteTutorial(): void {
    this.tutorialService.delete(this.currentTutorial.id)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.router.navigate(['/tutorials']);
        },
        error: (e) => console.error(e)
      });
  }

  addComment(): void {
    const data = {
      name: this.comment.name,
      text: this.comment.text
    };
  
    this.commentService.createComment(this.currentTutorial.id, data)
      .subscribe({
        next: response => {
          console.log(response);
          this.comment.name = '';
          this.comment.text = '';
          this.getComments(this.currentTutorial.id);
        },
        error: error => {
          console.log(error);
        }
      });
  }
}

