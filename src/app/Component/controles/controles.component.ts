import { Component, OnChanges, OnInit } from '@angular/core';
import {ArduinoService} from 'src/app/servicio/arduino.service'

@Component({
  selector: 'app-controles',
  templateUrl: './controles.component.html',
  styleUrls: ['./controles.component.css']
})
export class ControlesComponent implements OnChanges {
  temperaturas;

  temperatura={
    estado:0,
    fecha:"",
    temp:0
  }


  constructor(private tempSer:ArduinoService) { }

  ngOnChanges() {
    this.vertempe()
    
  }
  vertempe(){
    let TemperaturaEsta = 0;
    
    this.tempSer.verTemperatura().subscribe(res=>{
      this.temperaturas= res
      console.log(this.temperaturas);
      this.temperatura.temp = res
      if (this.temperaturas <= 26) {
        this.temperatura.estado = 0;
      }
      else
      this.temperatura.estado = 1;

    },err=>{
      console.log(err);
    })
  }
  registrarTemp(){
    
  }

}
