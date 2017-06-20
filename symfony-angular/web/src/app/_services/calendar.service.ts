import {Injectable} from "@angular/core";
import {Note} from "../shared/models/note";
import {NoteTypes} from "../shared/models/noteTypes";
import {Http, Response, Headers, RequestOptions} from "@angular/http";
import {environment} from "../../environments/environment";
import {Observable} from "rxjs/Rx";
import {BehaviorSubject} from "rxjs/BehaviorSubject";

import "rxjs/add/operator/map";
import "rxjs/add/operator/catch";

@Injectable()
export class CalendarService {

  private _notesSource = new BehaviorSubject<any>(null);

  private baseUrl: string = environment.production ? document.location.origin : document.location.origin + '/app_dev.php';
  private getNotesUrl: string = '/notes';
  private createNewNoteUrl: string = '/notes';

  constructor(private http: Http) {
  }

  notes: Note[] = [
    {
      id: 1,
      noteTitle: 'string',
      color: '#e920e9',
      type: 'Home',
      text: 'string',
      date: new Date(),
      deletedAt: false
    },
    {
      id: 2,
      noteTitle: 'string',
      color: '#fff500',
      type: 'Home',
      text: 'string',
      date: new Date(),
      deletedAt: false
    },
    {
      id: 3,
      noteTitle: 'string',
      color: '#2889e9',
      type: 'Home',
      text: 'string',
      date: new Date(),
      deletedAt: false
    },
    {
      id: 4,
      noteTitle: 'string',
      color: '#e920e9',
      type: 'Home',
      text: 'string',
      date: new Date(),
      deletedAt: false
    },
    {
      id: 5,
      noteTitle: 'string',
      color: '#2889e9',
      type: 'Home',
      text: 'string',
      date: new Date(),
      deletedAt: false
    },
    {
      id: 6,
      noteTitle: 'string',
      color: '#2889e9',
      type: 'Home',
      text: 'string',
      date: new Date(),
      deletedAt: false
    }
  ];

  changeNote(data) {
    this._notesSource.next(data);
  }

  noteItem$ = this._notesSource.asObservable();

  getNoteTypes() {
    return NoteTypes;
  }

  protected handleError(error: any) {
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }

  getNewNotes() {

    return this.http.get(this.baseUrl + this.getNotesUrl)
      .map((res: Response) => res.json())
      .catch(this.handleError);
  }

  addNewNote(note: Note) {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    let formattedNote = {
      'color': note.color,
      'date': note.date.toLocaleString(),
      'note_title': note.noteTitle,
      'text': note.text,
      'type': note.type
    };
    let body = JSON.stringify(formattedNote);
    let url = this.baseUrl + this.createNewNoteUrl;

    console.log(body);
    return this.http.post(url, body, options)
                    .map((res: Response) => {res.json(); console.log(res.json())})
                    .subscribe(
                      (data) => console.log(data),
                      (err)  => this.handleError,
                      ()     => console.log('complete')
                    );
  }

  editNote(posFrom, posTo, note) {
    this.notes.splice(posFrom, posTo, note);
  }

  deleteNote(posFrom, count) {
    this.notes.splice(posFrom, count);
  }

}
