import { Injectable } from '@angular/core';
import { Consulta } from './consulta';

@Injectable({
  providedIn: 'root'
})
export class ClinicaService {

  private consultas: Consulta[] = [];

  private readonly chaveStorage = 'consultas';

  constructor() {
    this.carregarConsultas();
  }


  private carregarConsultas(): void {
    const dados = sessionStorage.getItem(this.chaveStorage);

    if (dados) {
      this.consultas = JSON.parse(dados) as Consulta[];
    }
  }


  private salvarConsultas(): void {
    sessionStorage.setItem(
      this.chaveStorage,
      JSON.stringify(this.consultas)
    );
  }


  adicionarConsulta(consulta: Consulta): void {
    this.consultas.push(consulta);
    this.salvarConsultas();
  }


  listarConsultas(): Consulta[] {
    return [...this.consultas];
  }


  calcularTotal(): number {
    return this.consultas.reduce(
      (total, consulta) => total + consulta.preco,
      0
    );
  }
}