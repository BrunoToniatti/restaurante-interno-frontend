import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface DishData {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
  isVegan: boolean;
  isAvailable: boolean;
  preparationTime: number; // em minutos
  ingredients: string[];
  createdAt: string;
  updatedAt: string;
}

@Component({
  selector: 'app-menu',
  imports: [CommonModule, FormsModule],
  templateUrl: './menu.html',
  styleUrl: './menu.scss'
})
export class Menu implements OnInit {
  dishes: DishData[] = [];
  filteredDishes: DishData[] = [];

  // Filtros
  searchTerm: string = '';
  filterCategory: string = '';
  filterVegan: string = '';
  filterAvailable: string = '';

  // Modal/Form
  showModal: boolean = false;
  isEditing: boolean = false;
  currentDish: DishData = this.getEmptyDish();

  // Stats
  totalDishes: number = 0;
  veganDishes: number = 0;
  availableDishes: number = 0;
  categories: string[] = ['Entradas', 'Pratos Principais', 'Sobremesas', 'Bebidas', 'Vinhos'];

  ngOnInit() {
    this.loadMockDishes();
    this.calculateStats();
  }

  getEmptyDish(): DishData {
    return {
      id: 0,
      name: '',
      description: '',
      price: 0,
      category: '',
      image: '',
      isVegan: false,
      isAvailable: true,
      preparationTime: 0,
      ingredients: [],
      createdAt: '',
      updatedAt: ''
    };
  }

  loadMockDishes() {
    this.dishes = [
      {
        id: 1,
        name: 'Risotto de Cogumelos Trufados',
        description: 'Cremoso risotto arbóreo com mix de cogumelos selvagens, óleo de trufa e parmesão envelhecido',
        price: 89.90,
        category: 'Pratos Principais',
        image: 'https://images.unsplash.com/photo-1574484284002-952d92456975?w=500',
        isVegan: false,
        isAvailable: true,
        preparationTime: 25,
        ingredients: ['Arroz arbóreo', 'Cogumelos shiitake', 'Cogumelos portobello', 'Óleo de trufa', 'Parmesão', 'Caldo de legumes'],
        createdAt: '2025-08-01 10:00',
        updatedAt: '2025-08-06 14:30'
      },
      {
        id: 2,
        name: 'Salmão Grelhado com Quinoa',
        description: 'Filé de salmão grelhado na crosta de ervas, acompanha quinoa tricolor e legumes no vapor',
        price: 95.50,
        category: 'Pratos Principais',
        image: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=500',
        isVegan: false,
        isAvailable: true,
        preparationTime: 20,
        ingredients: ['Salmão fresco', 'Quinoa tricolor', 'Brócolis', 'Cenoura', 'Abobrinha', 'Ervas finas'],
        createdAt: '2025-08-01 10:15',
        updatedAt: '2025-08-05 16:20'
      },
      {
        id: 3,
        name: 'Bowl Vegano de Buddha',
        description: 'Tigela nutritiva com grão-de-bico assado, quinoa, abacate, tomate cereja e tahine',
        price: 65.00,
        category: 'Pratos Principais',
        image: 'https://images.unsplash.com/photo-1546793665-c74683f339c1?w=500',
        isVegan: true,
        isAvailable: true,
        preparationTime: 15,
        ingredients: ['Grão-de-bico', 'Quinoa', 'Abacate', 'Tomate cereja', 'Rúcula', 'Tahine', 'Sementes de girassol'],
        createdAt: '2025-08-02 09:30',
        updatedAt: '2025-08-06 11:45'
      },
      {
        id: 4,
        name: 'Bruschetta de Burrata',
        description: 'Pão artesanal tostado com burrata fresca, tomate confit e basilicão',
        price: 42.00,
        category: 'Entradas',
        image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=500',
        isVegan: false,
        isAvailable: true,
        preparationTime: 10,
        ingredients: ['Pão artesanal', 'Burrata', 'Tomate confit', 'Basilicão fresco', 'Azeite extra virgem'],
        createdAt: '2025-08-01 11:00',
        updatedAt: '2025-08-04 15:10'
      },
      {
        id: 5,
        name: 'Tiramisu da Casa',
        description: 'Clássico tiramisu italiano com café expresso, mascarpone e cacau em pó',
        price: 35.50,
        category: 'Sobremesas',
        image: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=500',
        isVegan: false,
        isAvailable: false,
        preparationTime: 5,
        ingredients: ['Mascarpone', 'Café expresso', 'Biscoito savoiardi', 'Ovos', 'Açúcar', 'Cacau em pó'],
        createdAt: '2025-08-01 12:30',
        updatedAt: '2025-08-06 08:15'
      },
      {
        id: 6,
        name: 'Vinho Cabernet Sauvignon',
        description: 'Vinho tinto encorpado com notas de frutas vermelhas e especiarias',
        price: 120.00,
        category: 'Vinhos',
        image: 'https://images.unsplash.com/photo-1547595628-c61a29f496f0?w=500',
        isVegan: true,
        isAvailable: true,
        preparationTime: 0,
        ingredients: ['Uvas Cabernet Sauvignon'],
        createdAt: '2025-08-03 14:00',
        updatedAt: '2025-08-06 10:30'
      }
    ];
    this.filteredDishes = [...this.dishes];
  }

  calculateStats() {
    this.totalDishes = this.dishes.length;
    this.veganDishes = this.dishes.filter(d => d.isVegan).length;
    this.availableDishes = this.dishes.filter(d => d.isAvailable).length;
  }

  applyFilters() {
    this.filteredDishes = this.dishes.filter(dish => {
      const matchesSearch = !this.searchTerm ||
        dish.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        dish.description.toLowerCase().includes(this.searchTerm.toLowerCase());

      const matchesCategory = !this.filterCategory || dish.category === this.filterCategory;
      const matchesVegan = !this.filterVegan ||
        (this.filterVegan === 'vegan' && dish.isVegan) ||
        (this.filterVegan === 'non-vegan' && !dish.isVegan);
      const matchesAvailable = !this.filterAvailable ||
        (this.filterAvailable === 'available' && dish.isAvailable) ||
        (this.filterAvailable === 'unavailable' && !dish.isAvailable);

      return matchesSearch && matchesCategory && matchesVegan && matchesAvailable;
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
    this.filterCategory = '';
    this.filterVegan = '';
    this.filterAvailable = '';
    this.filteredDishes = [...this.dishes];
  }

  openModal(dish?: DishData) {
    this.showModal = true;
    if (dish) {
      this.isEditing = true;
      this.currentDish = { ...dish };
    } else {
      this.isEditing = false;
      this.currentDish = this.getEmptyDish();
    }
  }

  closeModal() {
    this.showModal = false;
    this.currentDish = this.getEmptyDish();
  }

  saveDish() {
    if (this.isEditing) {
      const index = this.dishes.findIndex(d => d.id === this.currentDish.id);
      if (index !== -1) {
        this.currentDish.updatedAt = new Date().toLocaleString('pt-BR');
        this.dishes[index] = { ...this.currentDish };
      }
    } else {
      this.currentDish.id = Math.max(...this.dishes.map(d => d.id)) + 1;
      this.currentDish.createdAt = new Date().toLocaleString('pt-BR');
      this.currentDish.updatedAt = new Date().toLocaleString('pt-BR');
      this.dishes.push({ ...this.currentDish });
    }

    this.calculateStats();
    this.applyFilters();
    this.closeModal();
  }

  deleteDish(dish: DishData) {
    if (confirm(`Tem certeza que deseja excluir o prato "${dish.name}"?`)) {
      this.dishes = this.dishes.filter(d => d.id !== dish.id);
      this.calculateStats();
      this.applyFilters();
    }
  }

  toggleAvailability(dish: DishData) {
    dish.isAvailable = !dish.isAvailable;
    dish.updatedAt = new Date().toLocaleString('pt-BR');
    this.calculateStats();
  }

  addIngredient() {
    this.currentDish.ingredients.push('');
  }

  removeIngredient(index: number) {
    this.currentDish.ingredients.splice(index, 1);
  }

  trackByDishId(index: number, dish: DishData): number {
    return dish.id;
  }
}
