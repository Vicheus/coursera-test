/**
 * Created by shura on 11.04.17.
 */
import {Component, EventEmitter, Output} from "@angular/core";
import {User1} from "../shared/models/user";

@Component({
    selector: 'user-form',
    styles: [`
        form {
            padding: 10px;
            background: #ecf0f1;
            border-radius: 3px;
            margin-bottom: 30px;
        }
    `],
    template: `
        <form #form="ngForm" (ngSubmit)="onSubmit()" *ngIf="active">

            <div class="form-group" [ngClass]="{ 'has-error': name.invalid && name.touched }">
                <input type="text" class="form-control"
                       name="name" placeholder="Name" required
                       [(ngModel)]="newUser.name" #name="ngModel">

                <span class="help-block" *ngIf="name.invalid && name.touched">Name is required</span>
            </div>

            <div class="form-group" [ngClass]="{ 'has-error': username.invalid && username.touched }">
                <input type="text" class="form-control"
                       name="username" placeholder="Username" required
                       [(ngModel)]="newUser.username" #username="ngModel">

                <span class="help-block" *ngIf="username.invalid && username.touched">Username is required</span>
            </div>

            <button type="submit" class="btn btn-lg btn-block btn-primary"
                    [disabled]="form.invalid">
                Create User
            </button>

        </form>
    `
})

export class UserFormComponent {
    @Output() userCreated = new EventEmitter();
    newUser: User1 = new User1();
    active: boolean = true;

    onSubmit() {
        //show the event that user was created
        this.userCreated.emit({user: this.newUser});

        this.newUser = new User1();
        this.active = false;
        setTimeout(() => this.active = true, 0);
    }
}