import { Router } from '@angular/router';
import {
  BreakpointObserver,
  Breakpoints
} from '@angular/cdk/layout';
import {
  AfterViewInit,
  Component,
  OnDestroy,
} from '@angular/core';
import { MDCTopAppBar } from '@material/top-app-bar/index';
import { fadeInOutLarge } from '../_animations/fade-in-out';
import { slideInOutDownSmall } from '../_animations/slide-in-out-down';
import { AuthenticationService } from '../_services';

@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  //styleUrls: ['./template.component.scss'],
  styles: [`
  .mdc-top-app-bar__section{
    width: 50%;
    height: 50px;
  }
  .mdc-top-app-bar__section--align-start{
    float:left;
  }
  .mdc-top-app-bar__section--align-end{
    float:right;
  }
  .header-toggle-icon{ padding:13px;}
  .profile-icon { float: right;}
`],
  
  animations: [
    fadeInOutLarge,
    slideInOutDownSmall
  ]
})
export class TemplateComponent implements OnDestroy, AfterViewInit {
  sidenavWidth:any = 15;
  sidenav = {
    opened: false,
    mode: 'push',
    fixedTopGap: 0,
  };
  mode = 'side';
  handset = false;
  tablet = false;
  web = false;

  sidebarType = 'main';

  constructor(private authService: AuthenticationService, private router : Router) {
    // breakpointObserver.observe(Breakpoints.Handset).subscribe(result => {
    //   if (result.matches) {
    //     setTimeout(() => {
    //       this.handset = true;
    //       this.sidenav.opened = false;
    //       this.sidenav.mode = 'over';
    //       this.sidenav.fixedTopGap = 56;
    //     });
    //   }
    // });

    // breakpointObserver.observe(Breakpoints.Tablet).subscribe(result => {
    //   if (result.matches) {
    //     setTimeout(() => {
    //       this.tablet = true;
    //       this.sidenav.opened = false;
    //       this.sidenav.mode = 'over';
    //       this.sidenav.fixedTopGap = 64;
    //     });
    //   }
    // });

    // breakpointObserver.observe(Breakpoints.Web).subscribe(result => {
    //   if (result.matches) {
    //     setTimeout(() => {
    //       this.web = true;
    //       this.sidenav.opened = true;
    //       this.sidenav.mode = 'side';
    //       this.sidenav.fixedTopGap = 64;
    //     });
    //   }
    // });
  }

  ngOnDestroy(): void {
  }

  ngAfterViewInit() {
    const topAppBarElement = document.querySelector('.mdc-top-app-bar');
    const topAppBar = new MDCTopAppBar(topAppBarElement);
  }

  sideBarToggle(){
    if(this.sidenavWidth == 15){
      this.sidenavWidth = 4
    }else{
      this.sidenavWidth =15;
    }
  }

  logout(){
    this.authService.logout();
    //this.router.navigate(['/']);
    location.reload();
  }
}
