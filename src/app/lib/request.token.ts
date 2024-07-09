import { InjectionToken } from "@angular/core";
import { Request, Response } from 'express';

export const REQUEST = new InjectionToken<Request>('REQUEST');
export const RESPONSE = new InjectionToken<Response>('RESPONSE');

// https://www.angularspace.com/angular-ssr-platform-provider-pattern/