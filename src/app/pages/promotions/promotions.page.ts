import { Component, OnInit } from '@angular/core';
import { PromotionsService } from './promotions.service';
import { ModalController } from '@ionic/angular';
import { DetailPromotionComponent } from './detail-promotion/detail-promotion.component';

@Component({
  selector: 'app-promotions',
  templateUrl: './promotions.page.html',
  styleUrls: ['./promotions.page.scss'],
})
export class PromotionsPage implements OnInit {

  loading: boolean = false;
  items: Array<any> = [];

  constructor(
    private promotionsService: PromotionsService,
    public modalController: ModalController
  ) { }

  ngOnInit() {
    this.loadItems()
  }

  loadItems() {
    this.promotionsService.getItems().subscribe((items: any) => {
      this.items = items;
    })
  }

  async presentModal(id) {
    const modal = await this.modalController.create({
      component: DetailPromotionComponent,
      componentProps: {
        id: id
      }
    });
    
    return await modal.present();
  }

}
