import { DialogRef, DIALOG_DATA } from '@angular/cdk/dialog'
import {
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Inject,
  Input,
  Output,
  ViewChild,
} from '@angular/core'
import { FormControl, FormGroup } from '@angular/forms'
import { NavigationExtras, Params, Router } from '@angular/router'
import { Settings } from 'src/app/Pages/character-sheet/character-sheet.component'
import { RefImageGalleryComponent } from '../ref-image-gallery/ref-image-gallery.component'

@Component({
  selector: 'app-settings-dialog',
  templateUrl: './settings-dialog.component.html',
  styleUrls: ['./settings-dialog.component.scss'],
})
export class SettingsDialogComponent {
  constructor(
    private router: Router,
    public dialogRef: DialogRef<RefImageGalleryComponent>,
    @Inject(DIALOG_DATA) public data: Settings,
  ) {}

  @Output() onSave = new EventEmitter()

  settingsForm: FormGroup<{
    typeOfRace: FormControl<string>
    includeRace: FormGroup<any>
    showContext: FormControl<boolean>
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
  })

  queryParams: Params = {}

  lastcheckedRace = ''

  ngOnInit() {
    this.settingsForm = this.initForm(
      this.data.race.split(','),
      this.data.showContext,
    )
  }

  initForm(raceArray: Array<string> = [], showContext: boolean = false) {
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
      })
    }
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

  close() {
    this.settingsForm.reset()
    this.dialogRef.close()
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
      },
    }
    this.router.navigate([], navigationExtras)
    this.onSave.emit()
    this.dialogRef.close()
  }
}
