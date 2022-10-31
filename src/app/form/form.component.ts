import { Component, OnInit } from '@angular/core';
import { GithubService } from '../services/github.service';
import { HttpClient } from '@angular/common/http';
import {FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  users: any[];
  q = "";

  createFormGroup(){
    return new FormGroup({
      fieldfind: new FormControl('', [Validators.required, Validators.minLength(4)])
    });
  }
  contactForm: FormGroup;
  constructor(private githubService: GithubService, private httpClient: HttpClient) {
    this.contactForm = this.createFormGroup();
  }

  ngOnInit() {
    this.githubService.get(this.q).subscribe((data: any[]) =>{
      this.users = this.filterUsers(data['items']);
      // console.log(data);
    },
    (error)=>{
      console.log(error);
    });
  }

  onFindForm() {
    if(this.contactForm.valid){
      this.q = this.contactForm.value.fieldfind;
      this.githubService.get(this.q).subscribe((data: any[]) =>{
        this.users = this.filterUsers(data['items']);
      },
      (error)=>{
        console.log(error);
      });

    }else{
      alert('Por favor diligenciar completo el formulario');
    }
  }

  filterUsers(data){
    let element = [];
    for (let index = 0; index < data.length; index++) {
      if (index<10) {
        element[index] = data[index];
      }
    }
    return element;
  }
}
