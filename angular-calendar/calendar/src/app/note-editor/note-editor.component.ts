import {Component, OnChanges, OnInit, SimpleChanges} from "@angular/core";
import {CalendarService} from "../_services/calendar.service";
import {Note} from "../shared/models/note";
import {DialogComponent, DialogService} from "ng2-bootstrap-modal";

@Component({
  selector: 'note-editor',
  providers: [CalendarService],
  templateUrl: './note-editor.component.html',
  styleUrls: ['./note-editor.component.sass']
})
export class NoteEditorComponent extends DialogComponent<Note, any> implements OnInit, OnChanges {

  noteTypes;

  newNote: Note = new Note();

  active: boolean = true;

  constructor(private _cs: CalendarService,
              dialogService: DialogService) {
    super(dialogService);
  }

  ngOnInit() {
    this.noteTypes = this._cs.getNoteTypes();
  }

  ngOnChanges(changes: SimpleChanges) {
  }

  apply() {
    this.result = this.newNote;

    this.newNote = new Note();
    this.active = false;
    setTimeout(() => this.active = true, 0);

    this.close();
  }

}
