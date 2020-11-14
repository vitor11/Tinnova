import { Http, Response } from '@angular/http';
import { HttpModule } from '@angular/http';
import { Component, OnInit } from '@angular/core';
import {FormGroup, FormBuilder, Form, NgForm, Validators} from '@angular/forms';
import {AppService} from 'src/app/app.service';
import { ModalService } from 'src/app/service/modal.service';
import { from, Observable } from 'rxjs';
import { Veiculo } from './model/veiculos.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit{
  title = 'veiculos';
  formAmigo: FormGroup;
  ngForm: Form;
  formVeiculo: FormGroup;
  formVeiculoUpdt: FormGroup;
  veiculoVendido = [];
  roles = [];  

  constructor(
    private formBuilder: FormBuilder,
    private modalService: ModalService,
    private appService: AppService) {
    }
    
    ngOnInit(){
      this.appService.getAll().subscribe(response => {
        this.roles = response;
      });
    }


    getVeiculos(){
      this.appService.getAll().subscribe(response => {
        this.roles = response;
      });
    }

    openModalQtdVendidos(resp, cabecalhos){
      const result$ = this.modalService.showConfirmMessage('Quantidade de veículos vendidos', resp, cabecalhos);
    }

    openModalQtdVeiculosPorDecada(resp, cabecalhos){
      const result$ = this.modalService.showConfirmMessage('Quantidade de veículos fabricados por década', resp, cabecalhos);
    }

    openModalQtdVeiculosPorFabricante(resp, cabecalhos){
      const result$ = this.modalService.showConfirmMessage('Quantidade de veículos por fabricante', resp, cabecalhos);
    }
  

    dataHoje() {
      var data = new Date();
      var dia = data.getDate();
      var mes = data.getMonth() + 1;
      var ano = data.getFullYear();
      return [ano, mes, dia].join('-');
    }

    createFormVeiculo(form: NgForm){
      this.formVeiculo = this.formBuilder.group({
        veiculo: [form.value.pVeiculo ? form.value.pVeiculo : Validators.required],
        marca: [form.value.pMarca ? form.value.pMarca :  Validators.required],
        ano: [form.value.pAno ? form.value.pAno : Validators.required],
        descricao: [form.value.pDescricao ? form.value.pDescricao : Validators.required],
        vendido: [form.value.pVendido ? form.value.pVendido : false],
        created: this.dataHoje(),
        updated: ''
      });
    }

    createFormVeiculoUpdt(veiculo, marca, ano, descricao, vendido){
      this.formVeiculoUpdt = this.formBuilder.group({
        veiculo: [veiculo ? veiculo : '', Validators.required],
        marca: [marca ? marca : '', Validators.required],
        ano: [ano ? ano : '', Validators.required],
        descricao: [descricao ? descricao : '', Validators.required],
        vendido: [vendido ? vendido : '', Validators.required],
        updated: this.dataHoje()
      });
    }

    qtdVeiculosVendidos(){
      var qtdVeiculosVendidos = 0;
      this.roles.forEach( (currentValue, index) => {
        if(currentValue.vendido)
          qtdVeiculosVendidos += 1;
      });
      this.openModalQtdVendidos([{"resultado": qtdVeiculosVendidos}], [{"cabecalho":"Quantidade de venda"}]);
      console.log(this.veiculoVendido);
    }

    qtdVeiculosPorDecadaFabricado(){
      var ano;
      var decada;
      var i=0;
      var veiculosPorDecada = [];
      var veiculoDecada = [];
      this.roles.forEach( (currentValue, index) => {
        ano = currentValue.ano;
        decada = ano.toString();
        decada = decada.substring(0,3)+'0';
        
        if(i == 0)
          veiculosPorDecada[decada] = {"acao":decada, "veiculo": 1};
        else{
          
          if(typeof veiculosPorDecada[decada] == 'undefined')
            veiculosPorDecada[decada] = {"acao":decada, "veiculo": 1};
          else{
            var qtd = veiculosPorDecada[decada].veiculo;
            veiculosPorDecada[decada] = {"acao":decada, "veiculo": qtd+1};
          }
            
        }
        i++;

      });

      veiculosPorDecada.forEach( (currentValue, index) => {
        veiculoDecada.push({"acao": currentValue.acao, "veiculo": currentValue.veiculo}); 
      });

      this.openModalQtdVeiculosPorDecada(veiculoDecada, [{"cabecalho":"Década"}, {"cabecalho":"Quantidade de Veiculos"}]);

    }


    qtdVeiculosPorFabricante(){
      var marca;
      var veiculosPorMarca = [];
      var veiculosMarca = [];     
      var i=0;
      
      this.roles.forEach( (currentValue, index) => {
        marca = currentValue.marca;

        if(i == 0){
          veiculosPorMarca[marca] = {"acao":marca, "veiculo": 1};
        }          
        else{
          if(typeof veiculosPorMarca[marca] == 'undefined'){
            veiculosPorMarca[marca] = {"acao":marca, "veiculo": 1};
          }
          else{
            var qtd = veiculosPorMarca[marca].veiculo;
            veiculosPorMarca[marca] = {"acao":marca, "veiculo": qtd+1};
          }
            
        }
        i +=1;

      });

      for (let key in veiculosPorMarca) {
          let value = veiculosPorMarca[key];
          console.log(value);
          veiculosMarca.push({"acao":value.acao, "veiculo":value.veiculo});
      }


      this.openModalQtdVeiculosPorFabricante(veiculosMarca, [{"cabecalho":"Marca"}, {"cabecalho":"Quantidade de Veiculos"}]);

    }


    save(form: NgForm){
      console.log(form.value.pVeiculo);
      this.createFormVeiculo(form);
      this.appService.postAdd(this.formVeiculo.value).subscribe(response => {
        alert("Usuário adicionado");
        this.getVeiculos();
      }, error => {
          alert("Erro ao Cadastrar");
      });
    }

    update(id: any, veiculo, marca, ano, descricao, vendido){
      this.createFormVeiculoUpdt(veiculo, marca, ano, descricao, vendido);
      this.appService.updateInfo(id, this.formVeiculoUpdt.value).subscribe(response => {
        alert("Atualizado com sucesso");
        this.getVeiculos();
      }, error => {
        alert("Erro ao Atualizar");
      });
    }

    delete(id: any){
      this.appService.deleteFriend(id).subscribe(response => {
        alert("Deletado com sucesso");
        this.getVeiculos();
      }, error => {
        alert("Erro ao excluir");
      });
    }
}
