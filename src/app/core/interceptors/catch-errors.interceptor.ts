import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { catchError, throwError } from 'rxjs';

export const catchErrorsInterceptor: HttpInterceptorFn = (req, next) => {

  const Toastr = inject(ToastrService);
  return next(req).pipe(catchError((err) => {
    Toastr.error(err.error.message);
    // throw err;
    return throwError(()=> err);
  }));


  return next(req);
};
