import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Consulta } from '../consulta';
import { ClinicaService } from '../clinica-service';

@Component({
  selector: 'app-consultas',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './consultas.html'
})
export class Consultas implements OnInit {
  
  formulario: FormGroup;

  consultas: Consulta[] = [];

  total: number = 0;
  
  constructor(
    private fb: FormBuilder,
    private clinicaService: ClinicaService
  ) {
    this.formulario = this.fb.group({
      nomePaciente: ['', Validators.required],
      preco: [0, [Validators.required, Validators.min(0.01)]],
      data: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.atualizarLista();
  }

  atualizarLista(): void {
    this.consultas = this.clinicaService.listarConsultas();
    this.total = this.clinicaService.calcularTotal();
  }

  cadastrarConsulta(): void {
    if (this.formulario.invalid) {
      this.formulario.markAllAsTouched();
      return;
    }

    const consulta: Consulta = {
      nomePaciente: this.formulario.value.nomePaciente!,
      preco: Number(this.formulario.value.preco),
      data: this.formulario.value.data!
    };

    this.clinicaService.adicionarConsulta(consulta);
    this.atualizarLista();

    this.formulario.reset({
      nomePaciente: '',
      preco: 0,
      data: ''
    });
  }
}