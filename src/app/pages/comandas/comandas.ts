import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface ComandaItem {
  id: number;
  dishName: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  observations: string;
  status: 'pedido' | 'preparando' | 'pronto' | 'entregue';
  timeOrdered: Date;
}

interface Comanda {
  id: number;
  tableNumber: number;
  waiterName: string;
  customerName: string;
  items: ComandaItem[];
  totalAmount: number;
  status: 'aberta' | 'fechada' | 'paga';
  openTime: Date;
  closeTime?: Date;
}

interface MenuItem {
  id: number;
  name: string;
  price: number;
  category: string;
  available: boolean;
}

@Component({
  selector: 'app-comandas',
  imports: [CommonModule, FormsModule],
  templateUrl: './comandas.html',
  styleUrl: './comandas.scss'
})
export class Comandas implements OnInit {
  comandas: Comanda[] = [];
  menuItems: MenuItem[] = [];

  // Filtros e controles
  selectedTable: number | null = null;
  selectedWaiter: string = '';
  filterStatus: string = 'todas';

  // Modal states
  showNewComandaModal: boolean = false;
  showEditComandaModal: boolean = false;
  showAddItemModal: boolean = false;
  selectedComanda: Comanda | null = null;

  // Form data
  newComanda: Partial<Comanda> = {};
  newItem: Partial<ComandaItem> = {};

  // Garçons disponíveis
  waiters: string[] = ['Carlos Silva', 'Ana Costa', 'Pedro Santos', 'Maria Oliveira', 'João Ferreira'];

  // Estatísticas
  stats = {
    openComandas: 0,
    totalRevenue: 0,
    averageTicket: 0,
    totalItems: 0
  };

  ngOnInit() {
    this.loadMenuItems();
    this.loadComandas();
    this.calculateStats();
  }

  loadMenuItems() {
    // Simulando menu de pratos disponíveis
    this.menuItems = [
      { id: 1, name: 'Risotto de Cogumelos Trufados', price: 89.90, category: 'Pratos Principais', available: true },
      { id: 2, name: 'Salmão Grelhado com Quinoa', price: 95.50, category: 'Pratos Principais', available: true },
      { id: 3, name: 'Bowl Vegano de Buddha', price: 65.00, category: 'Pratos Principais', available: true },
      { id: 4, name: 'Bruschetta de Burrata', price: 42.00, category: 'Entradas', available: true },
      { id: 5, name: 'Carpaccio de Salmão', price: 48.50, category: 'Entradas', available: true },
      { id: 6, name: 'Tiramisu da Casa', price: 35.50, category: 'Sobremesas', available: true },
      { id: 7, name: 'Cheesecake de Frutas Vermelhas', price: 32.00, category: 'Sobremesas', available: true },
      { id: 8, name: 'Água Mineral', price: 8.50, category: 'Bebidas', available: true },
      { id: 9, name: 'Refrigerante', price: 12.00, category: 'Bebidas', available: true },
      { id: 10, name: 'Vinho Tinto Casa', price: 85.00, category: 'Vinhos', available: true }
    ];
  }

  loadComandas() {
    // Simulando comandas existentes
    this.comandas = [
      {
        id: 1,
        tableNumber: 5,
        waiterName: 'Carlos Silva',
        customerName: 'Sr. Roberto',
        totalAmount: 287.90,
        status: 'aberta',
        openTime: new Date(2024, 7, 6, 19, 30),
        items: [
          {
            id: 1,
            dishName: 'Risotto de Cogumelos Trufados',
            quantity: 2,
            unitPrice: 89.90,
            totalPrice: 179.80,
            observations: 'Sem queijo para um dos pratos',
            status: 'preparando',
            timeOrdered: new Date(2024, 7, 6, 19, 35)
          },
          {
            id: 2,
            dishName: 'Vinho Tinto Casa',
            quantity: 1,
            unitPrice: 85.00,
            totalPrice: 85.00,
            observations: '',
            status: 'entregue',
            timeOrdered: new Date(2024, 7, 6, 19, 32)
          },
          {
            id: 3,
            dishName: 'Bruschetta de Burrata',
            quantity: 1,
            unitPrice: 42.00,
            totalPrice: 42.00,
            observations: 'Entrada',
            status: 'entregue',
            timeOrdered: new Date(2024, 7, 6, 19, 33)
          }
        ]
      },
      {
        id: 2,
        tableNumber: 12,
        waiterName: 'Ana Costa',
        customerName: 'Família Sousa',
        totalAmount: 185.50,
        status: 'aberta',
        openTime: new Date(2024, 7, 6, 20, 15),
        items: [
          {
            id: 4,
            dishName: 'Salmão Grelhado com Quinoa',
            quantity: 2,
            unitPrice: 95.50,
            totalPrice: 191.00,
            observations: 'Bem passado',
            status: 'pedido',
            timeOrdered: new Date(2024, 7, 6, 20, 18)
          }
        ]
      },
      {
        id: 3,
        tableNumber: 8,
        waiterName: 'Pedro Santos',
        customerName: 'Casal Martins',
        totalAmount: 156.50,
        status: 'fechada',
        openTime: new Date(2024, 7, 6, 18, 45),
        closeTime: new Date(2024, 7, 6, 20, 30),
        items: [
          {
            id: 5,
            dishName: 'Bowl Vegano de Buddha',
            quantity: 1,
            unitPrice: 65.00,
            totalPrice: 65.00,
            observations: '',
            status: 'entregue',
            timeOrdered: new Date(2024, 7, 6, 18, 50)
          },
          {
            id: 6,
            dishName: 'Carpaccio de Salmão',
            quantity: 1,
            unitPrice: 48.50,
            totalPrice: 48.50,
            observations: '',
            status: 'entregue',
            timeOrdered: new Date(2024, 7, 6, 18, 52)
          },
          {
            id: 7,
            dishName: 'Tiramisu da Casa',
            quantity: 2,
            unitPrice: 35.50,
            totalPrice: 71.00,
            observations: '',
            status: 'entregue',
            timeOrdered: new Date(2024, 7, 6, 19, 45)
          }
        ]
      }
    ];
  }

  calculateStats() {
    this.stats.openComandas = this.comandas.filter(c => c.status === 'aberta').length;
    this.stats.totalRevenue = this.comandas.reduce((sum, c) => sum + c.totalAmount, 0);
    this.stats.averageTicket = this.comandas.length > 0 ? this.stats.totalRevenue / this.comandas.length : 0;
    this.stats.totalItems = this.comandas.reduce((sum, c) => sum + c.items.length, 0);
  }

  getFilteredComandas() {
    return this.comandas.filter(comanda => {
      if (this.selectedTable && comanda.tableNumber !== this.selectedTable) return false;
      if (this.selectedWaiter && comanda.waiterName !== this.selectedWaiter) return false;
      if (this.filterStatus !== 'todas' && comanda.status !== this.filterStatus) return false;
      return true;
    });
  }

  openNewComandaModal() {
    this.newComanda = {
      tableNumber: undefined,
      waiterName: '',
      customerName: '',
      items: [],
      totalAmount: 0,
      status: 'aberta',
      openTime: new Date()
    };
    this.showNewComandaModal = true;
  }

  closeNewComandaModal() {
    this.showNewComandaModal = false;
    this.newComanda = {};
  }

  createComanda() {
    if (this.newComanda.tableNumber && this.newComanda.waiterName && this.newComanda.customerName) {
      const comanda: Comanda = {
        id: this.comandas.length + 1,
        tableNumber: this.newComanda.tableNumber,
        waiterName: this.newComanda.waiterName,
        customerName: this.newComanda.customerName,
        items: [],
        totalAmount: 0,
        status: 'aberta',
        openTime: new Date()
      };

      this.comandas.unshift(comanda);
      this.calculateStats();
      this.closeNewComandaModal();
    }
  }

  openAddItemModal(comanda: Comanda) {
    this.selectedComanda = comanda;
    this.newItem = {
      quantity: 1,
      observations: '',
      status: 'pedido',
      timeOrdered: new Date()
    };
    this.showAddItemModal = true;
  }

  closeAddItemModal() {
    this.showAddItemModal = false;
    this.selectedComanda = null;
    this.newItem = {};
  }

  addItemToComanda() {
    if (this.selectedComanda && this.newItem.dishName && this.newItem.quantity) {
      const menuItem = this.menuItems.find(item => item.name === this.newItem.dishName);
      if (menuItem) {
        const item: ComandaItem = {
          id: Date.now(),
          dishName: this.newItem.dishName,
          quantity: this.newItem.quantity,
          unitPrice: menuItem.price,
          totalPrice: menuItem.price * this.newItem.quantity,
          observations: this.newItem.observations || '',
          status: 'pedido',
          timeOrdered: new Date()
        };

        this.selectedComanda.items.push(item);
        this.selectedComanda.totalAmount = this.selectedComanda.items.reduce((sum, i) => sum + i.totalPrice, 0);
        this.calculateStats();
        this.closeAddItemModal();
      }
    }
  }

  updateItemStatus(comanda: Comanda, itemId: number, newStatus: ComandaItem['status']) {
    const item = comanda.items.find(i => i.id === itemId);
    if (item) {
      item.status = newStatus;
    }
  }

  removeItem(comanda: Comanda, itemId: number) {
    const index = comanda.items.findIndex(i => i.id === itemId);
    if (index > -1) {
      comanda.items.splice(index, 1);
      comanda.totalAmount = comanda.items.reduce((sum, i) => sum + i.totalPrice, 0);
      this.calculateStats();
    }
  }

  closeComanda(comanda: Comanda) {
    comanda.status = 'fechada';
    comanda.closeTime = new Date();
    this.calculateStats();
  }

  markAsPaid(comanda: Comanda) {
    comanda.status = 'paga';
    this.calculateStats();
  }

  getStatusIcon(status: string): string {
    switch (status) {
      case 'pedido': return '📝';
      case 'preparando': return '👨‍🍳';
      case 'pronto': return '✅';
      case 'entregue': return '🍽️';
      case 'aberta': return '🟢';
      case 'fechada': return '🟡';
      case 'paga': return '💰';
      default: return '❓';
    }
  }

  getStatusColor(status: string): string {
    switch (status) {
      case 'pedido': return '#ef4444';
      case 'preparando': return '#f59e0b';
      case 'pronto': return '#10b981';
      case 'entregue': return '#6b7280';
      case 'aberta': return '#10b981';
      case 'fechada': return '#f59e0b';
      case 'paga': return '#8b5cf6';
      default: return '#6b7280';
    }
  }

  getAvailableTables(): number[] {
    const usedTables = this.comandas.filter(c => c.status === 'aberta').map(c => c.tableNumber);
    const allTables = Array.from({length: 20}, (_, i) => i + 1);
    return allTables.filter(table => !usedTables.includes(table));
  }

  getTotalItemsByStatus(status: ComandaItem['status']): number {
    return this.comandas.reduce((sum, comanda) => {
      return sum + comanda.items.filter(item => item.status === status).length;
    }, 0);
  }

  getMenuItemsByCategory(category: string): MenuItem[] {
    return this.menuItems.filter(item => item.category === category && item.available);
  }
}
