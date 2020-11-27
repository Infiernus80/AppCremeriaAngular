import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SidebarModule } from 'ng-sidebar';
import { HttpClientModule } from '@angular/common/http';

//COMPONENTES
import { LoginComponent } from './Component/login/login.component';
import { HomeComponent } from './Component/home/home.component';
import { SplashScreenComponent } from './Component/splash-screen/splash-screen.component';
import { SidebarComponent } from './Component/sidebar/sidebar.component';
import { PerfilComponent } from './Component/perfil/perfil.component';

//Servicios
import { InicioSesionService } from './servicio/inicio-sesion.service';
import { EmpleadoService } from './servicio/empleado.service';
import {ProductoService} from './servicio/producto.service';

//Escaner
import { BarecodeScannerLivestreamModule } from "ngx-barcode-scanner";




@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SplashScreenComponent,
    HomeComponent,
    SidebarComponent,
    PerfilComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    SidebarModule.forRoot(),
    BarecodeScannerLivestreamModule
  ],
  providers: [
    InicioSesionService,
    EmpleadoService,
    ProductoService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
