import { Component, OnInit, Input } from '@angular/core';
import { environment } from 'src/environments/environment';
import * as Mapboxgl from 'mapbox-gl';
import { PromotionsService } from '../promotions.service';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-detail-promotion',
  templateUrl: './detail-promotion.component.html',
  styleUrls: ['./detail-promotion.component.scss'],
})
export class DetailPromotionComponent implements OnInit {

  @Input() id;
  item;
  loading: boolean = false;
  mapa: Mapboxgl.Map;
  marker: Mapboxgl.Marker;
  coords: Mapboxgl.LngLatLike = [-74.1384612, 4.6385116];

  constructor(
    private promotionsService: PromotionsService,
    public modalController: ModalController
  ) { }
  
  ngOnInit() {
    this.loadMap();
    this.loadPromotion();
  }

  loadPromotion() {
    this.loading = true;
    this.promotionsService.getItem(this.id).subscribe((res: any) => {
      this.loading = false;
      this.item = res.data;
      this.coords = [Number(this.item.longitude), Number(this.item.latitude)]
      this.setMap();
    }, error => {
      console.error(error)
      this.loading = false;
    })
  }

  loadMap() {
    (Mapboxgl as any).accessToken = environment.mapboxKey;

    this.mapa = new Mapboxgl.Map({
      container: 'mapa-mapbox', // container id
      style: 'mapbox://styles/luismera92/ck69vzmt92c2r1ip78337eft5',
      center: this.coords, // LNG, LAT
      zoom: 12 // starting zoom
    });

    // this.mapa.on('load', () => {
    //   this.mapa.resize();
    // })
  }

  setMap() {

    this.mapa.addControl(
      new Mapboxgl.GeolocateControl({
        positionOptions: {
          enableHighAccuracy: true
        },
        trackUserLocation: true
      })
    );

    this.marker = new Mapboxgl.Marker().setLngLat(this.coords).addTo(this.mapa);

    setTimeout(() => {
      this.mapa.flyTo({
        center: this.coords,
        essential: true // this animation is considered essential with respect to prefers-reduced-motion
      });
    }, 1000)

  }

  dismissModal() {
    this.modalController.dismiss({status: 'DISMISS'});
  }

}
