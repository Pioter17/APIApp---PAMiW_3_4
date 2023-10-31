import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { PATHS } from 'src/app/core/constants/api-paths.const';


@Injectable()
export class AccuweatherInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let clone = req.clone();

    if (clone.url.startsWith(PATHS.API_WEATHER_BASE_PATH)) {
      clone = clone.clone({
        params: clone.params.appendAll(
          {apikey: PATHS.API_WEATHER_KEY, language: PATHS.LANGUAGE}
        )
      });
    }

    return next.handle(clone);
  }
}
