import { provideHttpClient, withFetch } from '@angular/common/http';
import { ApplicationConfig, ApplicationRef } from '@angular/core';
import { provideClientHydration } from '@angular/platform-browser';
import { provideFileRouter } from '@analogjs/router';

export const appConfig: ApplicationConfig = {
  providers: [
    {
      provide: ApplicationRef
    },
    provideFileRouter(),
    provideHttpClient(withFetch()),
    provideClientHydration(),
  ],
};
