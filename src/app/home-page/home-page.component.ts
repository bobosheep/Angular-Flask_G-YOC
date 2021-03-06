import { Component, OnInit, Input } from '@angular/core';
import { Query } from '@angular/compiler/src/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { trigger, state, style, animate, transition } from '@angular/animations';

import { AppComponent } from '../app.component';
import { SearchQuery , QueryBody } from '../query' ;
import { parse } from 'querystring';



@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css'],

  animations:[
      
  ]
})
export class HomePageComponent implements OnInit {
  


  httpOptions = {
    headers: new HttpHeaders({
      'Access-Control-Allow-Origin':'*'
    })
  }

  gender: string = 'Women';
  Women: string = 'is-active';
  Men: string = '';

  clothesquerystring: string="site:lativ AND category:衣服 AND gender:";
  pantsquerystring: string="site:lativ AND category:褲裙 AND gender:";
  shoesquerystring: string="site:lativ AND category:鞋 AND gender:";

  queryClothes = {
    query : {
      query_string:{
        query: ""
      }
    },
    from : Math.floor( Math.random() * 10),
    size : 1
  }
  queryPants  = {
    query : {
      query_string:{
        query: ""
      }
    },
    from : Math.floor(Math.random() * 10 ),
    size : 1
  }
  queryShoes = {
    query : {
      query_string:{
        query: ""
      }
    },
    from : Math.floor(Math.random() * 10),
    size : 1
  }

  

  resClothes : any ={
    url:'',
    img_url:'',
    price:''
  };
  resPants : any ={
    url:'',
    img_url:'',
    price:''
  };
  resShoes : any ={
    url:'',
    img_url:'',
    price:''
  };
  package_price : number ;

  constructor(private http:HttpClient) { 
    
  }

  getRandomMatch = () =>{
    this.queryClothes.from = Math.floor(Math.random() * 300);
    this.queryPants.from = Math.floor(Math.random() * 100);
    this.queryShoes.from = Math.floor(Math.random() * 20);
    this.package_price = 0;

    let womenOrmen:string = (this.gender === 'Women' ? '女' : '男');

    this.queryClothes.query.query_string.query = this.clothesquerystring + womenOrmen;
    this.queryPants.query.query_string.query = this.pantsquerystring + womenOrmen;
    this.queryShoes.query.query_string.query = this.shoesquerystring + womenOrmen;

    this.http.post(`/search`, this.queryClothes) //this.http.post(`http://localhost:5100/search`, this.queryClothes, this.httpOptions)
    .subscribe(
      (datas:any) =>{
        let data = datas.hits.hits;
        //console.log(data);
        if(data.length > 0){
          this.resClothes = data[0]._source;
          this.resClothes.price = this.resClothes.price
          //console.log(this.resClothes);
        }
      }
    )

    this.http.post(`/search`, this.queryPants)
    .subscribe(
      (datas:any) =>{
        let data = datas.hits.hits;
        //console.log(data);
        if(data.length > 0){
          this.resPants = data[0]._source;
          this.resPants.price = this.resPants.price
          //console.log(this.resClothes);
        }
      }
    )

    this.http.post(`/search`, this.queryShoes)
    .subscribe(
      (datas:any) =>{
        let data = datas.hits.hits;
        //console.log(data);
        if(data.length > 0){
          this.resShoes = data[0]._source;
          this.resShoes.price = this.resShoes.price
          //console.log(this.resClothes);
        }
      }
    )

    
    this.package_price += parseInt(this.resClothes.price);
    this.package_price += parseInt(this.resPants.price);
    this.package_price += parseInt(this.resShoes.price);

  }


  ngOnInit() {
    this.getRandomMatch();
    this.package_price = 0;
    this.package_price += parseInt(this.resClothes.price);
    this.package_price += parseInt(this.resPants.price);
    this.package_price += parseInt(this.resShoes.price);
  }

}
