import {
  AfterViewInit,
  Component,
  ElementRef,
  HostListener,
  OnInit,
  ViewChild,
} from '@angular/core'
import { FormControl, FormGroup } from '@angular/forms'

@Component({
  selector: 'app-settings-button',
  templateUrl: './settings-button.component.html',
  styleUrls: ['./settings-button.component.scss'],
})
export class SettingsButtonComponent {
  @ViewChild('settingsDialog')
  settingsDialog!: ElementRef<HTMLDialogElement>
  settings = new FormGroup({
    typeOfRace: new FormControl(''),
    showContext: new FormControl(false),
    showImageRefs: new FormControl(false),
  })

  @HostListener('click', ['$event'])
  onDialogClick(event: MouseEvent) {
    if ((event.target as any).nodeName === 'DIALOG') {
      this.close()
    }
  }
  close() {
    console.log('close')
    this.settingsDialog.nativeElement.close()
  }
  save() {
    console.log('save', this.settings.value)
    this.settingsDialog.nativeElement.close()
  }
}
