import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, of } from "rxjs";
import { concatMap, finalize, tap } from "rxjs/operators";

@Injectable()
export class LoadingService {

  private loadingSubject = new BehaviorSubject<boolean>(false);

  loading$: Observable<boolean> = this.loadingSubject.asObservable();

  showLoaderUntilCompleted<T>(observable$: Observable<T>): Observable<T> {
    return of(null)
      .pipe(
        tap(() => this.startLoading()),
        concatMap(() => observable$),
        finalize(() => this.endLoading())
      );
  }

  startLoading() {
    this.loadingSubject.next(true);
  }

  endLoading() {
    this.loadingSubject.next(false);
  }

}
