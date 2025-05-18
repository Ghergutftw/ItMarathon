import {UserService} from "../../service/user.service";
import {FormsModule} from "@angular/forms";
import {User} from "../../models/user.model";
import {NgForOf, NgIf} from "@angular/common";
import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {MessageService} from '../../service/message.service';
import {LoginService} from '../../service/login.service';
import {ConversationService} from '../../service/conversation.service';
import {Conversation} from '../../models/conversation.model';

@Component({
    standalone: true,
    selector: 'app-conversations',
    imports: [
        FormsModule,
        NgIf,
        NgForOf
    ],
    templateUrl: './conversations.component.html',
    styleUrl: './conversations.component.css'
})
export class ConversationsComponent implements OnInit {

    userNameToSearch: string = "";
    foundUser: User | null = null;

    selectedFile: File | null = null;

    messageText: string = '';
    text: string = '';
    messageId: string = '';
    isLoading = false;
    error: string | null = null;
    user!: User;
    groups: Conversation[] = [];
    peoples: Conversation[] = [];

    constructor(private userService: UserService,
                private router: Router,
                private messageService: MessageService,
                private loginService: LoginService,
                private conservationService: ConversationService) {
    }

    ngOnInit(): void {
        if (sessionStorage.getItem('user')) {
            this.user = JSON.parse(sessionStorage.getItem('user')!);
        }

        if (this.user && this.user.name) {
            this.conservationService.getConversationForUser(this.user.name).subscribe({
                next: (response) => {
                    this.groups = response.filter((conversation: Conversation) =>
                        Array.isArray(conversation.users) &&
                        conversation.users.length > 2);

                    this.peoples = response.filter((conversation: Conversation) =>
                        Array.isArray(conversation.users) &&
                        conversation.users.length === 2);

                    const invalidConversations = response.filter((conversation: Conversation) =>
                        !Array.isArray(conversation.users) ||
                        conversation.users.length < 2);

                    if (invalidConversations.length > 0) {
                        console.warn('Found conversations with invalid participant counts:', invalidConversations);
                    }
                },
                error: (err) => {
                    console.error('Error fetching conversations:', err);
                }
            });
        }

    }

    searchUser() {
        this.userService.findByName(this.userNameToSearch).subscribe(response => {
            if (response && response.body) {
                this.foundUser = response.body;
            }
        })
    }

    sendFriendRequest(foundUser: User) {
        foundUser.friendRequest?.push(this.user);
    }

    getParticipantInAPeopleConversation(people: Conversation) {
        if (people.users) {
            if (people.users[0] !== this.user) {
                return people.users[1].name;
            } else {
                return people.users[0].name;
            }
        }
        return '';
    }

    onFileSelected(event: any): void {
        this.selectedFile = event.target.files[0];
    }

    sendMessage(): void {
        if (!this.selectedFile || !this.messageText) {
            this.error = 'Please select an image and enter a message';
            return;
        }

        this.isLoading = true;
        this.error = null;

        if (this.user.name) {
            this.messageService.sendMessage(this.selectedFile, this.messageText, this.user?.name).subscribe({
                next: (response) => {
                    this.isLoading = false;
                    this.messageId = response.id;
                    this.messageText = '';
                    this.selectedFile = null;
                },
                error: (err) => {
                    this.isLoading = false;
                    this.error = err.error?.message || 'Failed to send message';
                }
            });
        }
    }
}
