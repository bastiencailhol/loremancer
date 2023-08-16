import {
  Component,
  ElementRef,
  HostListener,
  Input,
  ViewChild,
} from '@angular/core'
import { FormControl, FormGroup } from '@angular/forms'
import {
  ActivatedRoute,
  NavigationExtras,
  Params,
  Router,
} from '@angular/router'

@Component({
  selector: 'app-settings-button',
  templateUrl: './settings-button.component.html',
  styleUrls: ['./settings-button.component.scss'],
})
export class SettingsButtonComponent {
  @ViewChild('settingsDialog')
  settingsDialog!: ElementRef<HTMLDialogElement>
  @Input() settings
  settingsForm: FormGroup<{
    typeOfRace: FormControl<string>
    showContext: FormControl<boolean>
    showImageRefs: FormControl<boolean>
  }> = new FormGroup({
    typeOfRace: new FormControl(),
    showContext: new FormControl(),
    showImageRefs: new FormControl(),
  })
  queryParams: Params = {}

  constructor(
    private route: ActivatedRoute,
    private router: Router,
  ) {}

  initializeForm() {
    this.settingsForm = new FormGroup({
      typeOfRace: new FormControl(this.settings.typeOfRace),
      showContext: new FormControl(this.settings.showContext),
      showImageRefs: new FormControl(this.settings.showImageRefs),
    })
  }

  @HostListener('click', ['$event'])
  onDialogClick(event: MouseEvent) {
    if ((event.target as any).nodeName === 'DIALOG') {
      this.close()
    }
  }

  openDialog() {
    this.initializeForm()
    this.settingsDialog.nativeElement.showModal()
  }
  close() {
    this.settingsDialog.nativeElement.close()
    this.settingsForm.reset()
  }
  save() {
    const navigationExtras: NavigationExtras = {
      queryParams: {
        ...this.queryParams,
        ...this.settingsForm.value,
      },
    }
    this.router.navigate([], navigationExtras)
    this.settingsDialog.nativeElement.close()
  }
}
