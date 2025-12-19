import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  Observable,
  Subject,
  switchMap,
  take,
  startWith
} from 'rxjs';

import { TicketService } from '../../services/TicketService/ticket-service';
import { Ticket } from '../../models/Ticket';
import { AuthService } from '../../services/Authentication/auth.service';
import { UserResponse } from '../../models/UserResponse';

@Component({
  selector: 'app-ticket-booking',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './ticket-booking.html',
  styleUrl: './ticket-booking.css',
})
export class TicketBooking implements OnInit {

  tickets$!: Observable<Ticket[]>;
  private refresh$ = new Subject<void>();

  flightId!: number;
  passengerId!: number;
  seatNo!: string;

  constructor(
    private readonly ticketService: TicketService,
    private readonly authService: AuthService
  ) {}

  ngOnInit(): void {
  this.flightId = history.state?.flightId;
  console.log('Flight ID:', this.flightId);

  this.tickets$ = this.refresh$.pipe(
    startWith(void 0),
    switchMap(() =>
      this.authService.currentUser.pipe(
        take(1),
        switchMap((user): Observable<Ticket[]> => {
          if (!user) {
            throw new Error('User not logged in');
          }
          const typedUser = user as UserResponse;

          this.passengerId = typedUser.id;
          return this.ticketService.getTicketsByEmail(typedUser.email);
        })
      )
    )
  );
}


  bookTicket() {
    this.ticketService
      .bookTicketByPassengerIdandFlightId(
        this.flightId,
        this.passengerId,
        this.seatNo
      )
      .subscribe({
        next: () => {
          console.log('Ticket booked');
          this.refresh$.next();
          this.seatNo = '';
        },
        error: err => console.error('Booking failed', err),
      });
  }
}
