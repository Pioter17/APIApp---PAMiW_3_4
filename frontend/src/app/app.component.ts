import { Component, ElementRef, OnInit, Renderer2 } from '@angular/core';
import { BgcolorManagerService } from './core/services/bgcolor-manager.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'WeatherForecast';
  backgroundColor: string;

  constructor(
    private bgcolor: BgcolorManagerService,
    private renderer: Renderer2,
    private el: ElementRef
  ) {}

  ngOnInit(): void {
    this.bgcolor.getBackgroundColor().subscribe((color) => {
      this.backgroundColor = color;
      this.renderer.setStyle(this.el.nativeElement.ownerDocument.body, 'background-color', color);
    });
  }
}
