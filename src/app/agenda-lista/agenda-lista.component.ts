import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

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
  mascotas: Mascota[] = [];
  nuevaMascota: Mascota = { nombre: '', nombreDueno: '', enfermedad: '', edad: 0, fechaIngreso: '', activo: true };
  busqueda: string = '';

  agregarMascota() {
    // Generar la fecha de ingreso actual
    const fechaActual = new Date();
    this.nuevaMascota.fechaIngreso = fechaActual.toISOString();

    // Agregar la nueva mascota al listado
    this.mascotas.push({ ...this.nuevaMascota });

    // Limpiar los campos del formulario
    this.nuevaMascota = { nombre: '', nombreDueno: '', enfermedad: '', edad: 0, fechaIngreso: '', activo: true };
  }

  buscarMascotas() {
    // Filtrar las mascotas por nombre, enfermedad o fecha de ingreso
    const busquedaMinusculas = this.busqueda.toLowerCase().trim();
    this.mascotas = this.mascotas.filter(mascota =>
      mascota.nombre.toLowerCase().includes(busquedaMinusculas) ||
      mascota.enfermedad.toLowerCase().includes(busquedaMinusculas) ||
      mascota.fechaIngreso.includes(busquedaMinusculas)
    );
  }

  editarMascota(mascota: Mascota) {
    // Implementar la lógica para editar una mascota
  }

  eliminarMascota(mascota: Mascota) {
    // Implementar la lógica para eliminar una mascota
    mascota.activo = false;
  }
}
