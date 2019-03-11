import { Component, OnInit } from '@angular/core';
import {PusherService} from '../pusher.service';

interface Comment {
  text: string;
  user: string;
}

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent implements OnInit {

  comments: Array<Comment>;
  constructor(private pusherService: PusherService) {
    this.comments = [];
  }

  ngOnInit() {
    this.pusherService.commentsChannel.bind('client-new-message',(message) => {
      let comment: Comment = {
        user:message.author.firstname + '  ' + message.author.lastname,
        text: message.comment.textbody
      };
      this.comments.push(comment);
    });
    /*
     this.pusherService.messagesChannel.bind('client-new-message', (message) => {
      this.messages.push(message);
    });
     */
  }

  sendMessage(user: string, text: string) {
    const comment: Comment = {
      user: user,
      text: text,
    }
    this.pusherService.commentsChannel.trigger('client-new-message', comment);
    this.comments.push(comment);
  }

}
