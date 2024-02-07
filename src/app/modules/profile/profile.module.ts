import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudentProfileComponent } from './profile.component';
import { StudentProfileRoutingModule } from './profile-routing.module';



@NgModule({
  declarations: [
    StudentProfileComponent
  ],
  imports: [
    CommonModule,
    StudentProfileRoutingModule
  ]
})
export class ProfileModule { }
