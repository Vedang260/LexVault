import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { initializeFontAwesome } from './app/fontawesome';

bootstrapApplication(AppComponent, appConfig).then(appRef => {
  const iconLibrary = appRef.injector.get(FaIconLibrary);
  initializeFontAwesome(iconLibrary);
}).catch(err => console.error(err));
