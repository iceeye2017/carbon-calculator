import { Component, OnInit } from '@angular/core';
import { Router, Event, NavigationEnd } from '@angular/router';
import { NavigationService } from '../shared/navigation.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit{
  
  title: string = "";
  back: string = "";

  constructor(private router: Router, private navigation:NavigationService) {
    this.router.events.subscribe((e: Event) => {

      if(e instanceof NavigationEnd ){

        this.back = e.url.substring(0,e.url.lastIndexOf('/'));

      }
    });
  }


  ngOnInit(): void {

   this.navigation.currentMessage.subscribe(params=>{

    this.title = params

  });

  


  }


}
