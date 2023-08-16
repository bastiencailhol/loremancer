import {
  AfterViewInit,
  Component,
  ElementRef,
  HostListener,
  OnInit,
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
export class SettingsButtonComponent implements OnInit {
  @ViewChild('settingsDialog')
  settingsDialog!: ElementRef<HTMLDialogElement>
  settings: FormGroup<{
    typeOfRace: FormControl<string>
    showContext: FormControl<boolean>
    showImageRefs: FormControl<boolean>
  }>
  queryParams: Params = {}

  constructor(
    private route: ActivatedRoute,
    private router: Router,
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe((queryParams: Params) => {
      this.queryParams = queryParams
      this.settings = new FormGroup({
        typeOfRace: new FormControl(this.queryParams.typeOfRace || ''),
        showContext: new FormControl(this.queryParams.showContext === 'true'),
        showImageRefs: new FormControl(
          this.queryParams.showImageRefs === 'true',
        ),
      })
    })
  }

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
    const newQueryParams = {
      ...this.queryParams,
      ...this.settings.value,
    }
    const navigationExtras: NavigationExtras = {
      queryParams: newQueryParams,
    }
    this.router.navigate([], navigationExtras)
    this.settingsDialog.nativeElement.close()
  }
}
