import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  imports: [FormsModule],
  templateUrl: './app.html',
})
export class App implements OnInit {
  public numeroDigitado: number = 1;
  public numeroSecreto: number = 0;

  public jogoEstaFinalizado: boolean = false;

  public dicaNumeroMaiorQue: number = 1;
  public dicaNumeroMenorQue: number = 100;

  public dificuldadeSelecionada?: string;
  public tentativasRestantes: number = 0;
  public pontuacao: number = 100;

  ngOnInit(): void {}

  public selecionarDificuldade(dificuldade: string): void {
    switch (dificuldade) {
      case 'Fácil':
        this.numeroSecreto = this.obterNumeroSecreto(10);
        this.dicaNumeroMenorQue = 10;
        this.tentativasRestantes = 3;
        break;

      case 'Médio':
        this.numeroSecreto = this.obterNumeroSecreto(50);
        this.dicaNumeroMenorQue = 50;
        this.tentativasRestantes = 6;
        break;

      case 'Difícil':
        this.numeroSecreto = this.obterNumeroSecreto(100);
        this.dicaNumeroMenorQue = 100;
        this.tentativasRestantes = 7;
        break;
    }

    this.dificuldadeSelecionada = dificuldade;
  }

  public adivinhar(): void {
    this.tentativasRestantes--;

    if (this.tentativasRestantes <= 0) {
      this.jogoEstaFinalizado = true;
      return;
    }

    if (this.numeroDigitado < this.numeroSecreto) this.dicaNumeroMaiorQue = this.numeroDigitado;
    else if (this.numeroDigitado > this.numeroSecreto)
      this.dicaNumeroMenorQue = this.numeroDigitado;
    else this.jogoEstaFinalizado = true;

    const diferencaNumerica: number = Math.abs(this.numeroSecreto - this.numeroDigitado);

    if (diferencaNumerica >= 10) this.pontuacao -= 10;
    else if (diferencaNumerica >= 5) this.pontuacao -= 5;
    else this.pontuacao -= 2;
  }

  public reiniciar(): void {
    this.numeroDigitado = 1;
    this.dicaNumeroMaiorQue = 1;
    this.dicaNumeroMenorQue = 100;

    this.jogoEstaFinalizado = false;

    this.dificuldadeSelecionada = undefined;
    this.pontuacao = 100;
  }

  private obterNumeroSecreto(max: number) {
    const numeroAleatorio: number = Math.random() * (max - 1) + 1;

    const numeroSecreto = Math.floor(numeroAleatorio);

    return numeroSecreto;
  }
}
