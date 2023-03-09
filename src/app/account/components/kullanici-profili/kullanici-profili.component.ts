import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { BaseComponent } from '../../../shared/bases/base.component';
import { Gender } from '../../../shared/enums/gender.enum';
import { AccountService } from '../../services/account.service';

@Component({
  selector: 'app-kullanici-profili',
  templateUrl: './kullanici-profili.component.html',
  styleUrls: ['./kullanici-profili.component.css'],
})

export class KullaniciProfiliComponent extends BaseComponent implements OnInit {
  active: boolean;
  avatarPath: string;
  adSoyad: string;

  lineData: any;
  barData: any;
  pieData: any;

  lineOptions: any;
  barOptions: any;
  pieOptions: any;

  constructor(
    public accountService: AccountService
  ) {
    super();
  }

  onClick(event) {
    this.active = !this.active;
    event.preventDefault();
  }

  ngOnInit() {

    const userInfo = this.currentUser;
    this.adSoyad = userInfo.name + ' ' + userInfo.surname;
    if (userInfo.gender === Gender.female) {
      this.avatarPath = '../assets/layout/images/avatar-female.png';
    } else {
      this.avatarPath = '../assets/layout/images/avatar-male.png';
    }

    this.lineData = {
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
      datasets: [
        {
          label: 'First Dataset',
          data: [65, 59, 80, 81, 56, 55, 40],
          fill: false,
          backgroundColor: 'rgb(255, 205, 86)',
          borderColor: 'rgb(255, 205, 86)',
          tension: .4
        },
        {
          label: 'Second Dataset',
          data: [28, 48, 40, 19, 86, 27, 90],
          fill: false,
          backgroundColor: 'rgb(75, 192, 192)',
          borderColor: 'rgb(75, 192, 192)',
          tension: .4
        }
      ]
    };

    this.lineOptions = {
      plugins: {
        legend: {
          labels: {
            fontColor: '#A0A7B5'
          }
        }
      },
      scales: {
        x: {
          ticks: {
            color: '#A0A7B5'
          },
          grid: {
            color: 'rgba(160, 167, 181, .3)',
          }
        },
        y: {
          ticks: {
            color: '#A0A7B5'
          },
          grid: {
            color: 'rgba(160, 167, 181, .3)',
          }
        },
      }
    };

    this.barData = {
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
      datasets: [
        {
          label: 'My First dataset',
          backgroundColor: 'rgb(255, 99, 132)',
          borderColor: 'rgb(255, 99, 132)',
          data: [65, 59, 80, 81, 56, 55, 40]
        },
        {
          label: 'My Second dataset',
          backgroundColor: 'rgb(54, 162, 235)',
          borderColor: 'rgb(54, 162, 235)',
          data: [28, 48, 40, 19, 86, 27, 90]
        }
      ]
    };

    this.barOptions = {
      plugins: {
        legend: {
          labels: {
            fontColor: '#A0A7B5'
          }
        }
      },
      scales: {
        x: {
          ticks: {
            color: '#A0A7B5'
          },
          grid: {
            color: 'rgba(160, 167, 181, .3)',
          }
        },
        y: {
          ticks: {
            color: '#A0A7B5'
          },
          grid: {
            color: 'rgba(160, 167, 181, .3)',
          }
        },
      }
    };

    this.pieData = {
      labels: ['A', 'B', 'C'],
      datasets: [
        {
          data: [540, 325, 702, 421],
          backgroundColor: [
            'rgb(54, 162, 235)',
            'rgb(255, 99, 132)',
            'rgb(255, 205, 86)',
            'rgb(75, 192, 192)'
          ]
        }]
    };

    this.pieOptions = {
      plugins: {
        legend: {
          labels: {
            fontColor: '#A0A7B5'
          }
        }
      }
    };
  }
}
