import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

interface Mascota {
  nombre: string;
  nombreDueno: string;
  enfermedad: string;
  edad: number;
  fechaIngreso: string;
  activo: boolean;
}

@Component({
  selector: 'app-agenda-lista',
  templateUrl: './agenda-lista.component.html',
  styleUrls: ['./agenda-lista.component.css']
})


export class AgendaListaComponent {
  formulario: FormGroup;
  mascotas: any[] = [];
  nuevaMascota: Mascota = { nombre: '', nombreDueno: '', enfermedad: '', edad: 0, fechaIngreso: '', activo: true };
  busqueda: string = '';

  constructor(private formBuilder: FormBuilder) {
    this.formulario = this.formBuilder.group({
      nombreMascota: ['', Validators.required],
      nombreDueno: ['', Validators.required],
      enfermedad: ['', Validators.required],
      edad: ['', Validators.required]
    });
  }

  agregarMascota() {
    console.log('Agregando mascota...');
    // Generar la fecha de ingreso actual
    const fechaActual = new Date();
    this.nuevaMascota.fechaIngreso = fechaActual.toISOString();

    // Agregar la nueva mascota al listado
    this.mascotas.push({ ...this.nuevaMascota });
    
    this.formulario.reset();

    // Limpiar los campos del formulario
    this.nuevaMascota = { nombre: '', nombreDueno: '', enfermedad: '', edad: 0, fechaIngreso: '', activo: true };
  }

  buscarMascotas() {
    const busquedaMinusculas = this.busqueda.toLowerCase().trim();
    this.mascotas = this.mascotas.filter(mascota =>
      mascota.nombre.toLowerCase().includes(busquedaMinusculas) ||
      mascota.enfermedad.toLowerCase().includes(busquedaMinusculas) ||
      mascota.fechaIngreso.includes(busquedaMinusculas)
    );
  }

  editarMascota(mascota: Mascota) {
    console.log(mascota.nombre);
  }

  eliminarMascota(mascota: Mascota) {
    const index = this.mascotas.indexOf(mascota); // Obtener el índice de la mascota en la lista
    if (index !== -1) {
      this.mascotas.splice(index, 1); // Eliminar la mascota de la lista
    }
  }
  
}
