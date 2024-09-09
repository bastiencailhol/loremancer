import {
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  Output,
  ViewChild,
} from '@angular/core'
import { FormControl, FormGroup } from '@angular/forms'
import { NavigationExtras, Params, Router } from '@angular/router'

@Component({
  selector: 'app-settings-button',
  templateUrl: './settings-button.component.html',
  styleUrls: ['./settings-button.component.scss'],
})
export class SettingsButtonComponent {
  @ViewChild('settingsDialog')
  settingsDialog!: ElementRef<HTMLDialogElement>
  @Input() settings
  @Output() onSave = new EventEmitter()

  settingsForm: FormGroup<{
    typeOfRace: FormControl<string>
    includeRace: FormGroup<any>
    showContext: FormControl<boolean>
    showImageRefs: FormControl<boolean>
  }> = new FormGroup({
    typeOfRace: new FormControl(),
    includeRace: new FormGroup({
      anphibians: new FormControl(),
      arthropods: new FormControl(),
      birds: new FormControl(),
      cnidarians: new FormControl(),
      fishes: new FormControl(),
      mammals: new FormControl(),
      molluscs: new FormControl(),
      reptiles: new FormControl(),
      worms: new FormControl(),
    }),
    showContext: new FormControl(),
    showImageRefs: new FormControl(),
  })

  queryParams: Params = {}

  lastcheckedRace = ''

  constructor(private router: Router) {}

  initForm(
    raceArray: Array<string> = [],
    showContext: boolean = false,
    showImageRefs: boolean = false,
  ) {
    if (raceArray.includes('fantasy') || !raceArray.length) {
      return new FormGroup({
        typeOfRace: new FormControl('fantasy'),
        includeRace: new FormGroup({
          anphibians: new FormControl(true),
          arthropods: new FormControl(true),
          birds: new FormControl(true),
          cnidarians: new FormControl(true),
          fishes: new FormControl(true),
          mammals: new FormControl(true),
          molluscs: new FormControl(true),
          reptiles: new FormControl(true),
          worms: new FormControl(true),
        }),
        showContext: new FormControl(showContext),
        showImageRefs: new FormControl(showImageRefs),
      })
    } else {
      return new FormGroup({
        typeOfRace: new FormControl('animals'),
        includeRace: new FormGroup({
          anphibians: new FormControl(raceArray.includes('anphibians')),
          arthropods: new FormControl(raceArray.includes('arthropods')),
          birds: new FormControl(raceArray.includes('birds')),
          cnidarians: new FormControl(raceArray.includes('cnidarians')),
          fishes: new FormControl(raceArray.includes('fishes')),
          mammals: new FormControl(raceArray.includes('mammals')),
          molluscs: new FormControl(raceArray.includes('molluscs')),
          reptiles: new FormControl(raceArray.includes('reptiles')),
          worms: new FormControl(raceArray.includes('worms')),
        }),
        showContext: new FormControl(showContext),
        showImageRefs: new FormControl(showImageRefs),
      })
    }
  }

  isLastCheckedRace(race) {
    return false
  }

  handleCheckboxChange() {
    const formValues = this.settingsForm.getRawValue()
    const checkedRaces = Object.keys(formValues.includeRace).filter(
      key => formValues.includeRace[key],
    )

    if (checkedRaces.length === 1) {
      this.settingsForm.get('includeRace').get(checkedRaces[0]).disable()
      this.lastcheckedRace = checkedRaces[0]
    } else if (this.lastcheckedRace) {
      this.settingsForm.get('includeRace').get(this.lastcheckedRace).enable()
    }
  }

  @HostListener('click', ['$event'])
  onDialogClick(event: MouseEvent) {
    if ((event.target as any).nodeName === 'DIALOG') {
      this.close()
    }
  }

  openDialog() {
    this.settingsForm = this.initForm(
      this.settings.race.split(','),
      this.settings.showContext,
      this.settings.showImageRefs,
    )
    this.settingsDialog.nativeElement.showModal()
  }
  close() {
    this.settingsDialog.nativeElement.close()
    this.settingsForm.reset()
  }
  save() {
    const formValues = this.settingsForm.getRawValue()

    const navigationExtras: NavigationExtras = {
      queryParams: {
        ...this.queryParams,
        race:
          formValues.typeOfRace === 'animals'
            ? Object.keys(formValues.includeRace)
                .filter(key => formValues.includeRace[key])
                .join(',')
            : 'fantasy',
        showContext: formValues.showContext,
        showImageRefs: formValues.showImageRefs,
      },
    }
    this.router.navigate([], navigationExtras)
    this.onSave.emit()
    this.settingsDialog.nativeElement.close()
  }
}
