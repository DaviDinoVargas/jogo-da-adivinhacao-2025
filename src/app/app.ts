import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrls: ['./app.scss'],
  standalone: true,
  imports: [FormsModule, CommonModule]
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
    this.pontuacao = 100;
    this.jogoEstaFinalizado = false;
    this.dicaNumeroMaiorQue = 1;
  }

  public adivinhar(): void {
    if (this.jogoEstaFinalizado || !this.dificuldadeSelecionada) return;

    if (this.numeroDigitado === this.numeroSecreto) {
      this.jogoEstaFinalizado = true;
      this.salvarRanking();
      return;
    }

    this.tentativasRestantes--;

    if (this.numeroDigitado < this.numeroSecreto) {
      this.dicaNumeroMaiorQue = this.numeroDigitado;
    } else {
      this.dicaNumeroMenorQue = this.numeroDigitado;
    }

    const diferencaNumerica: number = Math.abs(this.numeroSecreto - this.numeroDigitado);

    if (diferencaNumerica >= 10) this.pontuacao -= 10;
    else if (diferencaNumerica >= 5) this.pontuacao -= 5;
    else this.pontuacao -= 2;

    if (this.tentativasRestantes <= 0) {
      this.jogoEstaFinalizado = true;
      this.salvarRanking();
    }
  }

  public reiniciar(): void {
    this.numeroDigitado = 1;
    this.dicaNumeroMaiorQue = 1;
    this.dicaNumeroMenorQue = 100;
    this.jogoEstaFinalizado = false;
    this.dificuldadeSelecionada = undefined;
    this.tentativasRestantes = 0;
    this.pontuacao = 100;
  }

  private obterNumeroSecreto(max: number): number {
    return Math.floor(Math.random() * max) + 1;
  }

  public salvarRanking(): void {
    if (!this.dificuldadeSelecionada) return;
    const ranking = JSON.parse(localStorage.getItem('ranking') || '[]');
    ranking.push({ dificuldade: this.dificuldadeSelecionada, pontuacao: this.pontuacao });
    localStorage.setItem('ranking', JSON.stringify(ranking));
  }

  public obterRanking(): any[] {
    return JSON.parse(localStorage.getItem('ranking') || '[]')
      .sort((a: any, b: any) => b.pontuacao - a.pontuacao);
  }
}
