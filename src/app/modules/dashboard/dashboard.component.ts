import { Component, ViewChild, ChangeDetectorRef } from '@angular/core';
import { ConfirmationService, Message } from 'primeng/api';
import { Table } from 'primeng/table';
import { HomeService } from 'src/app/services/home.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataSharingService } from 'src/app/services/data-sharing.service';
import { Router } from '@angular/router';
import { StorageService } from 'src/app/services/storage.service';
interface City {
  name: string;
  value: string;
}
@Component({
  selector: 'app-home',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent {
  @ViewChild('dt') dataTable!: Table;
  studentForm!: FormGroup;
  classTypes: City[] | undefined;
  selectedClassType: any;
  selectedYear: any;
  classes: any;
  selectedClass: any;
  maxDate!: Date;
  isCalenderActive: boolean = true;
  classArray: any;
  isStudentAddModal: boolean = false;
  selectedStudents: any = [];
  students: any = [];
  name: string = '';
  class: string = '';
  year: string = '';
  messages: any;

  constructor(
    private homeService: HomeService,
    private router: Router,
    private dataSharingService: DataSharingService,
    private confirmationService: ConfirmationService,
    private storageService: StorageService,
    private formBuilder: FormBuilder, private cdr: ChangeDetectorRef) {
    const currentYear = new Date().getFullYear();
    this.maxDate = new Date(currentYear, 11, 31);
    console.log(this.maxDate);
  }

  ngOnInit() {
    this.students = this.storageService.getArrayData('students') || [];
    this.studentForm = this.formBuilder.group({
      id: ['', Validators.required],
      name: ['', Validators.required],
      type: ['', Validators.required],
      class: ['', Validators.required],
      year: ['', Validators.required],
      imageUrl: [''],
      subject: this.formBuilder.group({
        math: ['', Validators.required],
        english: ['', Validators.required],
        science: ['', Validators.required]
      })
    });
    this.getClassTypes();
    this.getClassesByclassType();
    console.log(this.students.length == 0);
    if (this.students.length == 0) {
      this.getAllStudents();
    }
  }
  onChangeFilter(ev: any) {
   this.getAllStudents()
    console.log(ev.value);
    if (ev.value != null) {
      const filteredClasses = this.classArray.filter((cls: any) => {
        return cls.type == ev.value.value;
      });
      this.classes = filteredClasses;
      this.isCalenderActive = false;
      this.selectedYear = this.maxDate as any;
    }
  }
  applyFilterGlobal($event: any, stringVal: any) {
    console.log(($event.target as HTMLInputElement).value);
    this.dataTable.filterGlobal(
      ($event.target as HTMLInputElement).value,
      stringVal
    );
  }
  openModal() {
    this.isStudentAddModal = true;
  }



  deleteStudent(event: any, id: any) {
    this.deleteConfirmDialogue(event, id)
  }

  deleteConfirmDialogue(event: Event, id: any) {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'Are you sure that you want to delete?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      acceptIcon: "none",
      rejectIcon: "none",
      rejectButtonStyleClass: "p-button-text",
      accept: () => {
        this.students = this.students.filter((student: any) => student.id !== id);
        this.storageService.saveArrayData('students', this.students);
      },
      reject: () => {
      }
    });
  }
  addStudent() {
    this.studentForm.patchValue({
      id: this.generateRandomString(10),
      type: this.getClassCategory(this.studentForm.value.class)
    })
    if (this.studentForm.valid) {
      this.students.unshift(this.studentForm.value);
      this.storageService.saveArrayData('students', this.students);
      this.studentForm.reset();
      this.isStudentAddModal = false;
      this.cdr.detectChanges();
    } else {
      this.messages = [{ severity: 'error', summary: 'Error', detail: 'Please fill required details' }];
    }


  }

  onYearChange(event: any) {
    // Handle the year change event here
    this.getAllStudents()
    console.log(this.selectedYear);
  }
  onChangeClass(event:any){
    this.getAllStudents()
  }
  onClearFilter(ev: any) {
    console.log(ev);
    this.selectedClassType = undefined;
    this.selectedClass = undefined;
    this.classes = [];
    this.isCalenderActive = true;
    this.selectedYear = undefined;
    this.getAllStudents();
  }

  getClassTypes() {
    this.homeService.getClassType().subscribe({
      next: (response: any) => {
        this.classTypes = response;
      },
    });
  }
  getClassesByclassType() {
    this.homeService.getClasses().subscribe({
      next: (response: any) => {
        this.classArray = response;
      },
    });
  }

  onSubmitFilters() {
    const dateString = this.selectedYear;
    const date = new Date(dateString);
    const year = date.getFullYear();
    console.log(year);

    // this.homeService
    //   .getStudents(
    //     this.selectedClassType.value,
    //     year,
    //     this.selectedClass.classValue
    //   )
    //   .subscribe({
    //     next: (response) => {
    //       console.log(response);
    //       this.students = response;
    //     },
    //     error: (error) => {
    //       console.error('An error occurred:', error);
    //     },
    //   });
    this.students = this.students.filter((student: any) => {
      return student.type == this.selectedClassType.value &&
        student.year == year &&
        student.class == this.selectedClass.classValue;
    });
  }
  getAllStudents() {
    this.homeService.getAllStudents().subscribe({
      next: (res) => {
        this.students = res;
        this.storageService.saveArrayData('students', this.students);
      }, error: (err) => {

      }
    })
  }
  generateRandomString(length: any) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';

    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
    }

    return result;
  }
  getClassCategory(className: any) {
    if (className.toLowerCase().includes('kg')) {
      return 'kgs';
    } else {
      const classNumber = parseInt(className, 10);
      if (classNumber >= 2 && classNumber <= 6) {
        return 'primary';
      } else if (classNumber >= 7 && classNumber <= 10) {
        return 'secondary';
      } else {
        return 'kgs'; // Or you can handle other cases according to your requirement
      }
    }
  }
  viewStudent(student: any) {
    this.router.navigate(['/profile']);
    this.dataSharingService.sendTabChangeEvent(student);
  }
  onEditStart(event: any) {
    console.log('Editing started', event);
    // You can perform any actions you need when editing starts here

  }

  onEditComplete(event: any) {
    console.log('Editing completed', event);
    // You can perform any actions you need when editing completes here
    this.storageService.saveArrayData('students', this.students);
  }
}
