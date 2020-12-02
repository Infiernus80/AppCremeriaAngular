import { Component, OnChanges, OnInit } from '@angular/core';
import { ArduinoService } from 'src/app/servicio/arduino.service';


@Component({
  selector: 'app-controles',
  templateUrl: './controles.component.html',
  styleUrls: ['./controles.component.css']
})
export class ControlesComponent implements OnInit {
  temperaturas;
  nada;
  temperatura={
    temp:0
  }

  unaVez = false

  constructor(private tempSer:ArduinoService) { }

  ngOnInit() {
    // setInterval(function(){
    //   this.tempSer.verTemperatura(this.nada).subscribe(res=>{
    //     this.temperaturas= res
    //     console.log(this.temperaturas);
    //     // this.temperatura.temp = res
    //   },err=>{
    //     console.log(err);
    //   })
    // },1000);
    // setInterval(this.vertempe,1000)

    this.vertempe()
    
  }
  vertempe(){
    let TemperaturaEsta = 0;
    
    this.tempSer.verTemperatura().subscribe(res=>{
      this.temperaturas= res
      console.log(this.temperaturas);
      this.temperatura.temp = res

    
      if(this.temperatura.temp > 60 && !this.unaVez){
          this.registrarTemp();
          this.unaVez = true
      }

      if(this.temperatura.temp < 30)
        this.unaVez = false;
     
        
        
       
      

    },err=>{
      console.log(err);
    })
  }
  
  registrarTemp(){
    this.tempSer.regTem(this.temperatura).subscribe(res =>{
      console.log('Se guardo la temperatura')
    })
  }

}
