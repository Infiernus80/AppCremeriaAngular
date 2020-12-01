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
    estado:"",
    fecha:"",
    temp:""
  }


  constructor(private tempSer:ArduinoService) { }

  ngOnChanges() {
    this.vertempe()
    
  }
  vertempe(){
    
    this.tempSer.verTemperatura().subscribe(res=>{
      this.temperaturas= res
      console.log(this.temperaturas);
      // this.temperatura.temp = res.temperatura
    },err=>{
      console.log(err);
    })
  }

}
