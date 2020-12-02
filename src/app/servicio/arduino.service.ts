import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class ArduinoService {
  private urlControl = 'http://localhost:3000/arduinos';
  

constructor(private http : HttpClient) { }

verTemperatura(){
  return this.http.get<any>(this.urlControl+"/vertemperatura")
}

regTem(temp){
  return this.http.post<any>(this.urlControl, temp);
}


}
