import { MatButtonModule } from '@angular/material/button';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatListModule } from '@angular/material/list';
import { MatNativeDateModule, MatRippleModule, MAT_DATE_FORMATS } from '@angular/material/core';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker'
import { TitleService } from 'src/app/services/title.service';
import { PrinterService } from 'src/app/services/printer.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

export const MY_DATE_FORMATS = {
  parse: {
    dateInput: 'DD-MM-YYYY',
  },
  display: {
    dateInput: 'MMM DD, YYYY',
    monthYearLabel: 'MMMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY'
  },
};

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatListModule,
    MatRippleModule,
    MatCardModule,
    MatButtonModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule
  ],
  exports: [
    MatListModule,
    MatRippleModule,
    MatCardModule,
    MatButtonModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule
  ]
})
export class SharesModule {
  static forRoot(): ModuleWithProviders<any> {
    return {
      ngModule: SharesModule,
      providers: [
        TitleService,
        PrinterService,
        // share services
        // {
        //   provide: BREAKPOINT,
        //   useValue: CUSTOM_BREAKPOINTS,
        //   multi: true
        // },
        // DecodeHTMLPipe
        { provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS }
      ],
    };
  }
}
