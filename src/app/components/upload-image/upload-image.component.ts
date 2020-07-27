import { Component, ChangeDetectorRef, ElementRef, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { UploadImageService } from './upload-image.service';
import { Ng2ImgMaxService } from 'ng2-img-max';

@Component({
  selector: 'app-upload-image',
  templateUrl: './upload-image.component.html',
  styleUrls: ['./upload-image.component.scss'],
  providers: [UploadImageService]
})
export class UploadImageComponent {

  /*########################## File Upload ########################*/
  @ViewChild('fileInput', {static: true}) el: ElementRef;
  imageUrl: any = '/assets/img/dummy.jpg';
  editFile: boolean = true;
  removeUpload: boolean = false;
  showControls: boolean = true;
  public datosFormulario = new FormData();
  public nombreArchivo = '';
  public porcentaje = 0;
  public finalizado = false;

  bucketImage: string = '';
  @Input('bucket')
	set content( varsBucket ) {
    // console.log(varsBucket)
    this.bucketImage = varsBucket;
  }

  @Input('image')
	set image( varsImage ) {
    // console.log('varsImage ', varsImage);
    if (varsImage && varsImage != ''){
      // this.getImage(varsImage);
      this.imageUrl = varsImage;
    }
  }

  @Input('controls')
	set controls( val: boolean ) {
    // console.log('controls ', val);
    this.showControls = val;
  }

  @Output() eventUrlFile  = new EventEmitter();

  constructor(
    private cd: ChangeDetectorRef,
    private uploadImageService: UploadImageService,
    private ng2ImgMax: Ng2ImgMaxService
  ) {}

  /*##################### Registration Form #####################*/
  uploadFile(event) {
    if (event.target.files && event.target.files[0] && event.target.files.length > 0) {
      // When file uploads set it to file formcontrol
      this.nombreArchivo = event.target.files[0].name;
      // console.log(event.target.files[0])
      this.ng2ImgMax.resizeImage(event.target.files[0], 700, 700).subscribe(file => {
        // console.log(file)
        this.datosFormulario.delete('file');
        this.datosFormulario.append('file', file, this.nombreArchivo)
        this.subirArchivo()
      })

      // ChangeDetectorRef since file is loading outside the zone
      this.cd.markForCheck();
    }
  }

  // Function to remove uploaded file
  removeUploadedFile() {
    // let newFileList = Array.from(this.el.nativeElement.files);
    this.eventUrlFile.emit(undefined);
    this.imageUrl = '/assets/img/dummy.jpg';
    this.editFile = true;
    this.removeUpload = false;
  }

  //Sube el archivo a Cloud Storage
  public subirArchivo() {
    let archivo = this.datosFormulario.get('file');
    // console.log(archivo)
    this.uploadImageService.uploadFile(this.datosFormulario).subscribe(urlFile => {
      // console.log(urlFile)
      this.eventUrlFile.emit(urlFile);
      // this.imageUrl = urlFile;
      this.getImage(urlFile)
      this.editFile = false;
      this.removeUpload = true;
    })
    
  }

  getImage(file) {
    this.uploadImageService.getFile(file).toPromise().then(res => {
      // console.log(res)
      this.imageUrl = res
    })
  }

}
