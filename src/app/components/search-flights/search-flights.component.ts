import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FlightService } from '../../services/FlightService/flight.service';

@Component({
  selector: 'app-search-flights',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './search-flights.component.html'
})
export class SearchFlightsComponent {

  searchForm: FormGroup;
  flights: any[] = [];
  loading = false;

  constructor(
    private fb: FormBuilder,
    private flightService: FlightService
  ) {
    this.searchForm = this.fb.group({
      fromPlace: ['', Validators.required],
      toPlace: ['', Validators.required],
      departureDate: ['', Validators.required]
    });
  }

  search() {
    if (this.searchForm.invalid) return;

    this.loading = true;

    this.flightService.searchFlights(this.searchForm.value)
      .subscribe({
        next: res => {
          this.flights = res;
          this.loading = false;
        },
        error: err => {
          console.error(err);
          this.loading = false;
        }
      });
  }
}
