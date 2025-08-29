import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface TableData {
  id: number;
  number: string;
  capacity: number;
  location: string;
  status: 'available' | 'occupied' | 'reserved' | 'maintenance';
  shape: 'round' | 'square' | 'rectangular';
  isVip: boolean;
  hasView: boolean;
  description: string;
  createdAt: string;
  updatedAt: string;
}

@Component({
  selector: 'app-management',
  imports: [CommonModule, FormsModule],
  templateUrl: './management.html',
  styleUrl: './management.scss'
})
export class Management implements OnInit {
  tables: TableData[] = [];
  filteredTables: TableData[] = [];

  // Filtros
  searchTerm: string = '';
  filterLocation: string = '';
  filterStatus: string = '';
  filterCapacity: string = '';

  // Modal/Form
  showModal: boolean = false;
  isEditing: boolean = false;
  currentTable: TableData = this.getEmptyTable();

  // Stats
  totalTables: number = 0;
  availableTables: number = 0;
  occupiedTables: number = 0;
  totalCapacity: number = 0;

  // Configurações
  locations: string[] = ['Salão Principal', 'Terraço', 'Área VIP', 'Jardim', 'Segundo Andar', 'Área Externa'];
  shapes: string[] = ['round', 'square', 'rectangular'];
  capacityRanges: string[] = ['1-2', '3-4', '5-6', '7-8', '9+'];

  ngOnInit() {
    this.loadMockTables();
    this.calculateStats();
  }

  getEmptyTable(): TableData {
    return {
      id: 0,
      number: '',
      capacity: 2,
      location: '',
      status: 'available',
      shape: 'round',
      isVip: false,
      hasView: false,
      description: '',
      createdAt: '',
      updatedAt: ''
    };
  }

  loadMockTables() {
    this.tables = [
      {
        id: 1,
        number: 'Mesa 01',
        capacity: 2,
        location: 'Salão Principal',
        status: 'available',
        shape: 'round',
        isVip: false,
        hasView: false,
        description: 'Mesa para casal próxima à entrada',
        createdAt: '2025-08-01 10:00',
        updatedAt: '2025-08-06 14:30'
      },
      {
        id: 2,
        number: 'Mesa 02',
        capacity: 4,
        location: 'Salão Principal',
        status: 'occupied',
        shape: 'square',
        isVip: false,
        hasView: false,
        description: 'Mesa central com boa visibilidade',
        createdAt: '2025-08-01 10:15',
        updatedAt: '2025-08-06 19:20'
      },
      {
        id: 3,
        number: 'Mesa 03',
        capacity: 2,
        location: 'Terraço',
        status: 'reserved',
        shape: 'round',
        isVip: false,
        hasView: true,
        description: 'Mesa romântica com vista para o jardim',
        createdAt: '2025-08-01 11:00',
        updatedAt: '2025-08-06 18:45'
      },
      {
        id: 4,
        number: 'Mesa VIP 01',
        capacity: 6,
        location: 'Área VIP',
        status: 'available',
        shape: 'rectangular',
        isVip: true,
        hasView: true,
        description: 'Mesa VIP com vista panorâmica e serviço exclusivo',
        createdAt: '2025-08-01 12:30',
        updatedAt: '2025-08-05 16:10'
      },
      {
        id: 5,
        number: 'Mesa 05',
        capacity: 8,
        location: 'Salão Principal',
        status: 'available',
        shape: 'rectangular',
        isVip: false,
        hasView: false,
        description: 'Mesa grande para grupos e celebrações',
        createdAt: '2025-08-02 09:15',
        updatedAt: '2025-08-06 11:30'
      },
      {
        id: 6,
        number: 'Mesa 06',
        capacity: 4,
        location: 'Jardim',
        status: 'maintenance',
        shape: 'square',
        isVip: false,
        hasView: true,
        description: 'Mesa externa com vista para o jardim - em manutenção',
        createdAt: '2025-08-02 14:20',
        updatedAt: '2025-08-06 08:15'
      },
      {
        id: 7,
        number: 'Mesa 07',
        capacity: 2,
        location: 'Terraço',
        status: 'available',
        shape: 'round',
        isVip: false,
        hasView: true,
        description: 'Mesa íntima no terraço com vista da cidade',
        createdAt: '2025-08-03 16:45',
        updatedAt: '2025-08-06 12:00'
      },
      {
        id: 8,
        number: 'Mesa VIP 02',
        capacity: 4,
        location: 'Área VIP',
        status: 'occupied',
        shape: 'square',
        isVip: true,
        hasView: true,
        description: 'Mesa VIP premium com atendimento personalizado',
        createdAt: '2025-08-03 18:30',
        updatedAt: '2025-08-06 20:15'
      }
    ];
    this.filteredTables = [...this.tables];
  }

  calculateStats() {
    this.totalTables = this.tables.length;
    this.availableTables = this.tables.filter(t => t.status === 'available').length;
    this.occupiedTables = this.tables.filter(t => t.status === 'occupied').length;
    this.totalCapacity = this.tables.reduce((sum, table) => sum + table.capacity, 0);
  }

  applyFilters() {
    this.filteredTables = this.tables.filter(table => {
      const matchesSearch = !this.searchTerm ||
        table.number.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        table.description.toLowerCase().includes(this.searchTerm.toLowerCase());

      const matchesLocation = !this.filterLocation || table.location === this.filterLocation;
      const matchesStatus = !this.filterStatus || table.status === this.filterStatus;

      let matchesCapacity = true;
      if (this.filterCapacity) {
        switch (this.filterCapacity) {
          case '1-2':
            matchesCapacity = table.capacity >= 1 && table.capacity <= 2;
            break;
          case '3-4':
            matchesCapacity = table.capacity >= 3 && table.capacity <= 4;
            break;
          case '5-6':
            matchesCapacity = table.capacity >= 5 && table.capacity <= 6;
            break;
          case '7-8':
            matchesCapacity = table.capacity >= 7 && table.capacity <= 8;
            break;
          case '9+':
            matchesCapacity = table.capacity >= 9;
            break;
        }
      }

      return matchesSearch && matchesLocation && matchesStatus && matchesCapacity;
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
    this.filterLocation = '';
    this.filterStatus = '';
    this.filterCapacity = '';
    this.filteredTables = [...this.tables];
  }

  openModal(table?: TableData) {
    this.showModal = true;
    if (table) {
      this.isEditing = true;
      this.currentTable = { ...table };
    } else {
      this.isEditing = false;
      this.currentTable = this.getEmptyTable();
    }
  }

  closeModal() {
    this.showModal = false;
    this.currentTable = this.getEmptyTable();
  }

  saveTable() {
    if (this.isEditing) {
      const index = this.tables.findIndex(t => t.id === this.currentTable.id);
      if (index !== -1) {
        this.currentTable.updatedAt = new Date().toLocaleString('pt-BR');
        this.tables[index] = { ...this.currentTable };
      }
    } else {
      this.currentTable.id = Math.max(...this.tables.map(t => t.id)) + 1;
      this.currentTable.createdAt = new Date().toLocaleString('pt-BR');
      this.currentTable.updatedAt = new Date().toLocaleString('pt-BR');
      this.tables.push({ ...this.currentTable });
    }

    this.calculateStats();
    this.applyFilters();
    this.closeModal();
  }

  deleteTable(table: TableData) {
    if (confirm(`Tem certeza que deseja excluir a "${table.number}"?`)) {
      this.tables = this.tables.filter(t => t.id !== table.id);
      this.calculateStats();
      this.applyFilters();
    }
  }

  changeTableStatus(table: TableData, newStatus: string) {
    table.status = newStatus as 'available' | 'occupied' | 'reserved' | 'maintenance';
    table.updatedAt = new Date().toLocaleString('pt-BR');
    this.calculateStats();
  }

  getStatusText(status: string): string {
    const texts = {
      available: 'Disponível',
      occupied: 'Ocupada',
      reserved: 'Reservada',
      maintenance: 'Manutenção'
    };
    return texts[status as keyof typeof texts] || status;
  }

  getStatusColor(status: string): string {
    const colors = {
      available: '#10b981',
      occupied: '#ef4444',
      reserved: '#f59e0b',
      maintenance: '#6b7280'
    };
    return colors[status as keyof typeof colors] || '#6b7280';
  }

  getShapeIcon(shape: string): string {
    const icons = {
      round: '⭕',
      square: '⬜',
      rectangular: '▬'
    };
    return icons[shape as keyof typeof icons] || '⬜';
  }

  getShapeText(shape: string): string {
    const texts = {
      round: 'Redonda',
      square: 'Quadrada',
      rectangular: 'Retangular'
    };
    return texts[shape as keyof typeof texts] || shape;
  }

  trackByTableId(index: number, table: TableData): number {
    return table.id;
  }
}
