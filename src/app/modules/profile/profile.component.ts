import { ChangeDetectorRef, Component } from '@angular/core';
import { HomeService } from 'src/app/services/home.service';
import { ActivatedRoute } from '@angular/router';
import { DataSharingService } from 'src/app/services/data-sharing.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class StudentProfileComponent {
  studentDetails: any;
  subscription!: Subscription;
  image='https://www.pakainfo.com/wp-content/uploads/2021/09/sample-image-url-for-testing-300x169.jpg'
  constructor(private homeService: HomeService, private dataSharingService: DataSharingService, private route: ActivatedRoute, private cdr: ChangeDetectorRef) {
    this.subscription = this.dataSharingService.tabChangeEvent$.subscribe(student => {
      this.studentDetails = student;
    });
  }
  ngOnInit() {
    
  }
  
}
