import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IRfbEventAttendance, RfbEventAttendance } from 'app/shared/model/rfb-event-attendance.model';
import { RfbEventAttendanceService } from './rfb-event-attendance.service';
import { IRfbEvent } from 'app/shared/model/rfb-event.model';
import { RfbEventService } from 'app/entities/rfb-event/rfb-event.service';
import { IRfbUser } from 'app/shared/model/rfb-user.model';
import { RfbUserService } from 'app/entities/rfb-user/rfb-user.service';

type SelectableEntity = IRfbEvent | IRfbUser;

@Component({
  selector: 'jhi-rfb-event-attendance-update',
  templateUrl: './rfb-event-attendance-update.component.html',
})
export class RfbEventAttendanceUpdateComponent implements OnInit {
  isSaving = false;
  rfbevents: IRfbEvent[] = [];
  rfbusers: IRfbUser[] = [];
  attendanceDateDp: any;

  editForm = this.fb.group({
    id: [],
    attendanceDate: [],
    rfbEventId: [],
    rfbUserId: [],
  });

  constructor(
    protected rfbEventAttendanceService: RfbEventAttendanceService,
    protected rfbEventService: RfbEventService,
    protected rfbUserService: RfbUserService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ rfbEventAttendance }) => {
      this.updateForm(rfbEventAttendance);

      this.rfbEventService.query().subscribe((res: HttpResponse<IRfbEvent[]>) => (this.rfbevents = res.body || []));

      this.rfbUserService.query().subscribe((res: HttpResponse<IRfbUser[]>) => (this.rfbusers = res.body || []));
    });
  }

  updateForm(rfbEventAttendance: IRfbEventAttendance): void {
    this.editForm.patchValue({
      id: rfbEventAttendance.id,
      attendanceDate: rfbEventAttendance.attendanceDate,
      rfbEventId: rfbEventAttendance.rfbEventId,
      rfbUserId: rfbEventAttendance.rfbUserId,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const rfbEventAttendance = this.createFromForm();
    if (rfbEventAttendance.id !== undefined) {
      this.subscribeToSaveResponse(this.rfbEventAttendanceService.update(rfbEventAttendance));
    } else {
      this.subscribeToSaveResponse(this.rfbEventAttendanceService.create(rfbEventAttendance));
    }
  }

  private createFromForm(): IRfbEventAttendance {
    return {
      ...new RfbEventAttendance(),
      id: this.editForm.get(['id'])!.value,
      attendanceDate: this.editForm.get(['attendanceDate'])!.value,
      rfbEventId: this.editForm.get(['rfbEventId'])!.value,
      rfbUserId: this.editForm.get(['rfbUserId'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IRfbEventAttendance>>): void {
    result.subscribe(
      () => this.onSaveSuccess(),
      () => this.onSaveError()
    );
  }

  protected onSaveSuccess(): void {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError(): void {
    this.isSaving = false;
  }

  trackById(index: number, item: SelectableEntity): any {
    return item.id;
  }
}
