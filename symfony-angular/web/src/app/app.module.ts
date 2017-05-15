import {BrowserModule} from "@angular/platform-browser";
import {NgModule} from "@angular/core";
import {FormsModule} from "@angular/forms";
import {HttpModule} from "@angular/http";
import {AlertModule} from "ng2-bootstrap";
import {DateTimePickerModule} from "ng2-date-time-picker";
import {ColorPickerModule} from "ngx-color-picker";
import {BootstrapModalModule} from "ng2-bootstrap-modal";

import {AppComponent} from "./app.component";
import {MonthViewComponent} from "./month/calendarMonthView.component";
import {WeekViewComponent} from "./week/weekView.component";
import {NoteComponent} from "./note/note.component";
import {NoteEditorComponent} from "./note-editor/note-editor.component";

@NgModule({
  declarations: [
    AppComponent,
    MonthViewComponent,
    WeekViewComponent,
    NoteComponent,
    NoteEditorComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    DateTimePickerModule,
    ColorPickerModule,
    BootstrapModalModule,
    AlertModule.forRoot()
  ],
  entryComponents: [
    NoteEditorComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
