import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { map, shareReplay } from "rxjs/operators";
import { Course, LoadAllCoursesResponse } from "../model/course";

@Injectable({
    providedIn: 'root',
})
export class CoursesService {

    constructor(private http: HttpClient) {}

    loadAllCourses(): Observable<Course[]> {
        return this.http.get<LoadAllCoursesResponse>('/api/courses')
            .pipe(
                map(res => res.payload),
                shareReplay()
            );
    }

    saveCourse(courseId: string, changes: Partial<Course>): Observable<any> {
        return this.http.put(`/api/courses/${courseId}`, changes)
            .pipe(
                shareReplay()
            );
    }

}