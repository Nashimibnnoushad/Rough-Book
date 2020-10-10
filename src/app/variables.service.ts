import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class VariablesService {
  public language
  public menureload: boolean
  public profilereload:boolean
  constructor() { }
}
