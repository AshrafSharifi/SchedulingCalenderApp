import { Component, ViewChild, ChangeDetectorRef } from '@angular/core';
import { DayPilot, DayPilotSchedulerComponent } from "daypilot-pro-angular";
import { DataService } from './data.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { CreateNewSchedulingComponent } from '../create-new-scheduling/create-new-scheduling.component';


@Component({
  selector: 'app-appointment-form',
  templateUrl: './appointment-form.component.html',
  styleUrls: ['./appointment-form.component.css']
})

export class AppointmentFormComponent {

  @ViewChild('scheduler') scheduler!: DayPilotSchedulerComponent;

  events: DayPilot.EventData[] = [];

  constructor(private ds: DataService, private changeDetectorRef: ChangeDetectorRef, public dialog: MatDialog) {}
  
  ngOninit() {};

  ngAfterViewInit(): void {
    this.ds.getResources().subscribe(result => this.config.resources = result);
    this.changeDetectorRef.detectChanges();
    const from = this.scheduler.control.visibleStart();
    const to = this.scheduler.control.visibleEnd();
    this.ds.getEvents(from, to).subscribe(result => {
      this.scheduler.events = result;
      this.changeDetectorRef.detectChanges();
    });
  }

  config: DayPilot.SchedulerConfig = {
    timeHeaders: [{ "groupBy": "Month" }, { "groupBy": "Day", "format": "d" }],
    scale: "Day",
    days: DayPilot.Date.today().daysInMonth(),
    startDate: DayPilot.Date.today().firstDayOfMonth(),
    timeRangeSelectedHandling: "Enabled",
    onTimeRangeSelected: async (args) => {
      const dp = args.control;
      const modal = await DayPilot.Modal.prompt("Create a new event:", "Event 1");
      dp.clearSelection();
      if (modal.canceled) { return; }
      var data: any = {
        start: args.start,
        end: args.end,
        id: DayPilot.guid(),
        resource: args.resource,
        text: modal.result,
        barColor: this.setColor(args.resource.toString())
      };
      dp.events.add(data);


    },
    eventMoveHandling: "Update",
    onEventMoved: (args) => {
      args.control.message("Event moved: " + args.e.text());
    },
    eventResizeHandling: "Update",
    onEventResized: (args) => {
      args.control.message("Event resized: " + args.e.text());
    },
    eventDeleteHandling: "Update",
    onEventDeleted: (args) => {
      args.control.message("Event deleted: " + args.e.text());
    },
    eventClickHandling: "Disabled",
    eventHoverHandling: "Bubble",
    bubble: new DayPilot.Bubble({
      onLoad: (args) => {
        args.html = "Event details";
      }
    }),
    treeEnabled: true,
  };

  openDialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = true;
    dialogConfig.hasBackdrop = false;
    dialogConfig.data = {
      width: '700px',
      data: { title: 'Create New Event' }
    };
    const dialogRef = this.dialog.open(CreateNewSchedulingComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(result => {
      var data: any = {
        start: this.updateDOB(result.form['pickerstartdate']),
        end: this.updateDOB(result.form['pickerenddate']),
        id: DayPilot.guid(),
        resource: result.form['time'],
        text: result.form['title'],
        barColor: this.setColor(result.form['time']),
      };
      this.scheduler.events.push(data);
    });
  }
  updateDOB(dateObject: any) {
    // convert object to string then trim it to yyyy-mm-dd
    const stringified = JSON.stringify(dateObject);
    const dob = stringified.substring(1, 11);
    return (dob);
  }
  setColor(time: string) {
    var barcolor: string = '';
    switch (time) {
      case 'H1': {
        barcolor = '#8E44AD';
        break;
      }
      case 'H2': {
        barcolor = '#5DADE2';
        break;
      }
      case 'H3': {
        barcolor = '#52BE80';
        break;
      }
      case 'H4': {
        barcolor = '#F7DC6F';
        break;
      }
      case 'H5': {
        barcolor = '#C0392B';
        break;
      }
      case 'H6': {
        barcolor = '#5D6D7E';
        break;
      }
      case 'H7': {
        barcolor = '#784212';
        break;
      }

    }
    return barcolor;
  }
}
