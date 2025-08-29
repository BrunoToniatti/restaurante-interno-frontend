import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface ReservationData {
  id: number;
  customerName: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  guests: number;
  table: string;
  status: 'pending' | 'confirmed' | 'arrived' | 'cancelled';
  notes?: string;
  createdAt: string;
}

@Component({
  selector: 'app-reservation',
  imports: [CommonModule, FormsModule],
  templateUrl: './reservation.html',
  styleUrl: './reservation.scss'
})
export class Reservation implements OnInit {
  reservations: ReservationData[] = [];
  filteredReservations: ReservationData[] = [];

  // Filtros
  searchTerm: string = '';
  filterDate: string = '';
  filterStatus: string = '';

  // Stats
  totalReservations: number = 0;
  todayReservations: number = 0;
  arrivedReservations: number = 0;
  confirmedReservations: number = 0;

  ngOnInit() {
    this.loadMockReservations();
    this.calculateStats();
  }

  loadMockReservations() {
    this.reservations = [
      {
        id: 1,
        customerName: 'Maria Silva',
        email: 'maria.silva@email.com',
        phone: '(11) 99999-1234',
        date: '2025-08-06',
        time: '19:00',
        guests: 4,
        table: 'Mesa 12',
        status: 'arrived',
        notes: 'Aniversário da filha',
        createdAt: '2025-08-05 14:30'
      },
      {
        id: 2,
        customerName: 'João Santos',
        email: 'joao.santos@email.com',
        phone: '(11) 98888-5678',
        date: '2025-08-06',
        time: '20:30',
        guests: 2,
        table: 'Mesa 05',
        status: 'confirmed',
        notes: 'Jantar romântico',
        createdAt: '2025-08-06 09:15'
      },
      {
        id: 3,
        customerName: 'Ana Costa',
        email: 'ana.costa@email.com',
        phone: '(11) 97777-9012',
        date: '2025-08-06',
        time: '18:30',
        guests: 6,
        table: 'Mesa 08',
        status: 'arrived',
        notes: 'Reunião de negócios',
        createdAt: '2025-08-04 16:45'
      },
      {
        id: 4,
        customerName: 'Pedro Oliveira',
        email: 'pedro.oliveira@email.com',
        phone: '(11) 96666-3456',
        date: '2025-08-07',
        time: '19:30',
        guests: 3,
        table: 'Mesa 15',
        status: 'confirmed',
        notes: '',
        createdAt: '2025-08-05 11:20'
      },
      {
        id: 5,
        customerName: 'Carla Mendes',
        email: 'carla.mendes@email.com',
        phone: '(11) 95555-7890',
        date: '2025-08-07',
        time: '21:00',
        guests: 8,
        table: 'Mesa 20',
        status: 'cancelled',
        notes: 'Festa de formatura - cancelada por motivo pessoal',
        createdAt: '2025-08-06 10:30'
      },
      {
        id: 6,
        customerName: 'Roberto Lima',
        email: 'roberto.lima@email.com',
        phone: '(11) 94444-2468',
        date: '2025-08-08',
        time: '20:00',
        guests: 2,
        table: 'Mesa 03',
        status: 'confirmed',
        notes: 'Mesa próxima à janela',
        createdAt: '2025-08-06 08:45'
      }
    ];

    this.filteredReservations = [...this.reservations];
  }

  calculateStats() {
    this.totalReservations = this.reservations.length;

    const today = new Date().toISOString().split('T')[0];
    this.todayReservations = this.reservations.filter(r => r.date === today).length;

    this.arrivedReservations = this.reservations.filter(r => r.status === 'arrived').length;
    this.confirmedReservations = this.reservations.filter(r => r.status === 'confirmed').length;
  }

  applyFilters() {
    this.filteredReservations = this.reservations.filter(reservation => {
      const matchesSearch = !this.searchTerm ||
        reservation.customerName.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        reservation.email.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        reservation.phone.includes(this.searchTerm);

      const matchesDate = !this.filterDate || reservation.date === this.filterDate;
      const matchesStatus = !this.filterStatus || reservation.status === this.filterStatus;

      return matchesSearch && matchesDate && matchesStatus;
    });
  }

  onSearchChange() {
    this.applyFilters();
  }

  onFilterChange() {
    this.applyFilters();
  }

  clearFilters() {
    this.searchTerm = '';
    this.filterDate = '';
    this.filterStatus = '';
    this.filteredReservations = [...this.reservations];
  }

  trackByReservationId(index: number, reservation: ReservationData): number {
    return reservation.id;
  }

  markAsArrived(reservation: ReservationData) {
    reservation.status = 'arrived';
    this.calculateStats();
  }

  cancelReservation(reservation: ReservationData) {
    reservation.status = 'cancelled';
    this.calculateStats();
  }

  getStatusColor(status: string): string {
    switch (status) {
      case 'confirmed': return '#10b981';
      case 'arrived': return '#3b82f6';
      case 'cancelled': return '#ef4444';
      default: return '#6b7280';
    }
  }

  getStatusText(status: string): string {
    switch (status) {
      case 'confirmed': return 'Confirmada';
      case 'arrived': return 'Cliente Chegou';
      case 'cancelled': return 'Cancelada';
      default: return status;
    }
  }
}
