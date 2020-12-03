import { Component, OnInit } from '@angular/core';
import { CiudadanoService } from './services/ciudadano.service';
import {Ciudadano} from './models/ciudadano';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'Validación de datos de dominicanos';

  fecha: string;
  edad: string;
  
  dia: string;
  mes: string;
  yr: string;
  month: number;
  day: number;
  signozodiacal: string;

  dAc: number;
  mAc: number;
  aAc: number;

  dNac: number;
  mNac: number;
  aNac: number;

  sign=['Capricornio','Acuario','Piscis', 'Aries','Taurus','Gemini','Cancer','Leo','Virgo','Libra','Escorpio','Sagitario'];
  dates=[20, 19, 20, 20, 21, 21, 22, 22, 22, 22, 22, 21];


  notFound = false;
  ciudadano: Ciudadano

  constructor(private CiudadanoService: CiudadanoService) { }

  ngOnInit() {
    
  }

  campos: any;
  x: number;
  clean(){
    this.campos = document.getElementsByTagName('input');
    for (this.x = 0; this.x < this.campos.length; this.x++){
      this.campos[this.x].value = '';
    }
  }


  getCiudadano(id:string){
    this.notFound = false;
    this.ciudadano = null;

    this.CiudadanoService.getCiudadano(id).subscribe((ciudadanoFromTheAPI: Ciudadano) => {
      this.ciudadano = ciudadanoFromTheAPI;
      if (ciudadanoFromTheAPI.Cedula == null) {
        alert("Cédula no registrada o cédula de menor de edad o extranjero");
        location.reload();
      }else{

      
        this.ciudadano = ciudadanoFromTheAPI;

        this.yr = (this.ciudadano.FechaNacimiento[0]+this.ciudadano.FechaNacimiento[1]+this.ciudadano.FechaNacimiento[2]+this.ciudadano.FechaNacimiento[3]);

        //Signo Zodiacal
        this.dia=(this.ciudadano.FechaNacimiento[8]+this.ciudadano.FechaNacimiento[9]);
        this.mes=(this.ciudadano.FechaNacimiento[5]+this.ciudadano.FechaNacimiento[6]);
        this.month=parseInt(this.mes);
        this.day=parseInt(this.dia);

        this.month = this.month-1
        if (this.day>this.dates[this.month]){
          this.month=this.month+1;
        }
        if (this.month==12){
          this.month=0
        }
        this.signozodiacal=this.sign[this.month];

        //Edad
        var today = new Date();
        this.dAc = parseInt(String(today.getDate()).padStart(2, '0'));
        this.mAc = parseInt(String(today.getMonth() + 1).padStart(2, '0'));
        this.aAc = today.getFullYear();

        this.dNac = parseInt(this.dia);
        this.mNac = parseInt(this.mes);
        this.aNac = parseInt(this.ciudadano.FechaNacimiento[0]+this.ciudadano.FechaNacimiento[1]+this.ciudadano.FechaNacimiento[2]+this.ciudadano.FechaNacimiento[3]);
        this.edad = String(today.getFullYear() - this.aNac);
        this.fecha = (this.dia +"/"+this.mes+"/"+this.yr);

        this.ciudadano.FechaNacimiento = this.fecha;
        this.ciudadano.Edad = this.edad;
        this.ciudadano.SignoZodiacal = this.signozodiacal;
      }
      
    }, (err: any) => {
      console.error(err);
      this.notFound = true;
    });
  }

}