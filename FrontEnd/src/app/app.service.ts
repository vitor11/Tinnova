import { Injectable } from "@angular/core";
import { Http, Response } from '@angular/http';
import { HttpModule } from '@angular/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';


import { Observable } from 'rxjs';
import { Veiculo } from './model/veiculos.model';


@Injectable({
    providedIn: "root"
})
export class AppService{
    constructor(private http: HttpClient){

    }

    getHttpHeaders(){
        return {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Allow-Methods': 'GET, POST'
            })
        };
    }


    getAll(): Observable<Veiculo[]>{
        const getVeiculosUrl = "http://localhost:3000/veiculos";
        // const getFriendsUrl = "http://localhost:3000/veiculos";
        // const getFriendsUrl = "http://127.0.0.1:3000/amigos";
        return this.http.get<Veiculo[]>(getVeiculosUrl, this.getHttpHeaders())
        // return '{a}';
    }

    postAdd(veiculo: Veiculo): any{
        const postFriendUrl = "http://localhost:3000/veiculos/";
        return this.http.post(postFriendUrl, veiculo);
    }
    
    /*postAdd(amigo: Amigo): any{
        const postFriendUrl = "http://localhost:3000/add/";
        return this.http.post(postFriendUrl, amigo);
    }*/

    updateInfo(id: any, veiculo: Veiculo): Observable<string>{
        const getFriendsUrl = "http://localhost:3000/veiculos/"+id;
        return this.http.put<string>(getFriendsUrl, veiculo);
        // return this.http.get<string>(getFriendsUrl, this.getHttpHeaders())
    }

    deleteFriend(id: any): Observable<string>{
        const getFriendsUrl = "http://localhost:3000/veiculos/"+id;
        return this.http.delete<string>(getFriendsUrl, this.getHttpHeaders());
        // return this.http.get<string>(getFriendsUrl, this.getHttpHeaders())
    }
}