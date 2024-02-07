import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class HomeService {
    constructor(private http: HttpClient) { }

    getStudents(classType: any, classYear: any, studentClass: any): Observable<any> {
        // console.log(classType, classYear, studentClass);

        return this.http.get<any>('./assets/data/students.json').pipe(
            map((data: any) => {
                // console.log(data);

                // Filter students based on provided parameters
                return data.filter((student: any) => {
                    return student.type == classType &&
                        student.year == classYear &&
                        student.class == studentClass;
                });
            })
        );
    }
    getAllStudents(): Observable<any> {
        return this.http.get<any>('./assets/data/students.json').pipe(
            map((data: any) => {
                return data;
            })
        );
    }
    getStudentById(userId: any): Observable<any> {
        // console.log(classType, classYear, studentClass);

        return this.http.get<any>('./assets/data/students.json').pipe(
            map((data: any) => {
                return data.filter((student: any) => {
                    return student.id == userId
                });
            })
        );
    }
    getClassType(): Observable<any> {
        return this.http.get<any>('./assets/data/typeFilterData.json').pipe(
            map((data: any) => {
                return data;
            }))
    }
    getClasses(): Observable<any> {
        return this.http.get<any>('./assets/data/classData.json').pipe(
            map((data: any) => {
                return data;
            }))
    }
}