import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface AnalyticsData {
  // Revenue & Financial
  totalRevenue: number;
  averageTicket: number;
  monthlyGrowth: number;
  profitMargin: number;

  // Customer Analytics
  totalCustomers: number;
  newCustomers: number;
  returningCustomers: number;
  customerSatisfaction: number;

  // Operational Metrics
  totalOrders: number;
  averageOrderTime: number;
  tableUtilization: number;
  staffEfficiency: number;

  // Menu Performance
  popularDishes: DishPerformance[];
  categories: CategoryPerformance[];

  // Time-based Analytics
  hourlyData: HourlyData[];
  weeklyData: WeeklyData[];
  monthlyData: MonthlyData[];
}

interface DishPerformance {
  name: string;
  orders: number;
  revenue: number;
  popularity: number;
  profitMargin: number;
}

interface CategoryPerformance {
  name: string;
  orders: number;
  revenue: number;
  percentage: number;
}

interface HourlyData {
  hour: string;
  orders: number;
  revenue: number;
  customers: number;
}

interface WeeklyData {
  day: string;
  orders: number;
  revenue: number;
  customers: number;
}

interface MonthlyData {
  month: string;
  revenue: number;
  orders: number;
  customers: number;
  growth: number;
}

@Component({
  selector: 'app-analystic',
  imports: [CommonModule, FormsModule],
  templateUrl: './analystic.html',
  styleUrl: './analystic.scss'
})
export class Analystic implements OnInit {
  analytics: AnalyticsData | null = null;

  // Filtros
  selectedPeriod: string = 'week';
  selectedMetric: string = 'revenue';

  // Dados para visualizações
  chartData: any = {};

  // Configurações
  periods: string[] = ['today', 'week', 'month', 'quarter', 'year'];
  metrics: string[] = ['revenue', 'orders', 'customers', 'satisfaction'];

  ngOnInit() {
    this.loadAnalyticsData();
    this.generateChartData();
  }

  loadAnalyticsData() {
    // Simulando dados reais de analytics
    this.analytics = {
      // Revenue & Financial
      totalRevenue: 87540.50,
      averageTicket: 145.75,
      monthlyGrowth: 18.5,
      profitMargin: 32.8,

      // Customer Analytics
      totalCustomers: 1247,
      newCustomers: 189,
      returningCustomers: 1058,
      customerSatisfaction: 4.7,

      // Operational Metrics
      totalOrders: 623,
      averageOrderTime: 28.5,
      tableUtilization: 78.2,
      staffEfficiency: 89.1,

      // Menu Performance
      popularDishes: [
        { name: 'Risotto de Cogumelos Trufados', orders: 87, revenue: 7823.30, popularity: 95, profitMargin: 35.2 },
        { name: 'Salmão Grelhado com Quinoa', orders: 74, revenue: 7067.00, popularity: 88, profitMargin: 38.5 },
        { name: 'Bowl Vegano de Buddha', orders: 65, revenue: 4225.00, popularity: 82, profitMargin: 42.1 },
        { name: 'Bruschetta de Burrata', orders: 92, revenue: 3864.00, popularity: 91, profitMargin: 28.7 },
        { name: 'Tiramisu da Casa', orders: 56, revenue: 1988.00, popularity: 75, profitMargin: 55.3 }
      ],

      categories: [
        { name: 'Pratos Principais', orders: 245, revenue: 35670.25, percentage: 45.2 },
        { name: 'Entradas', orders: 156, revenue: 12450.80, percentage: 20.1 },
        { name: 'Sobremesas', orders: 98, revenue: 8965.30, percentage: 14.3 },
        { name: 'Bebidas', orders: 89, revenue: 6780.50, percentage: 10.8 },
        { name: 'Vinhos', orders: 35, revenue: 7340.00, percentage: 9.6 }
      ],

      // Time-based Analytics
      hourlyData: [
        { hour: '11:00', orders: 12, revenue: 1450.50, customers: 24 },
        { hour: '12:00', orders: 28, revenue: 3890.75, customers: 52 },
        { hour: '13:00', orders: 45, revenue: 6234.25, customers: 78 },
        { hour: '14:00', orders: 32, revenue: 4567.80, customers: 58 },
        { hour: '15:00', orders: 18, revenue: 2340.30, customers: 32 },
        { hour: '18:00', orders: 35, revenue: 4890.50, customers: 62 },
        { hour: '19:00', orders: 58, revenue: 8456.75, customers: 98 },
        { hour: '20:00', orders: 67, revenue: 9875.40, customers: 112 },
        { hour: '21:00', orders: 52, revenue: 7654.25, customers: 89 },
        { hour: '22:00', orders: 28, revenue: 3890.20, customers: 48 }
      ],

      weeklyData: [
        { day: 'Segunda', orders: 78, revenue: 11250.30, customers: 145 },
        { day: 'Terça', orders: 82, revenue: 12340.75, customers: 158 },
        { day: 'Quarta', orders: 95, revenue: 14567.50, customers: 178 },
        { day: 'Quinta', orders: 103, revenue: 15890.25, customers: 195 },
        { day: 'Sexta', orders: 134, revenue: 19875.80, customers: 245 },
        { day: 'Sábado', orders: 156, revenue: 23456.90, customers: 298 },
        { day: 'Domingo', orders: 125, revenue: 18765.40, customers: 235 }
      ],

      monthlyData: [
        { month: 'Jan', revenue: 245670.50, orders: 1567, customers: 2890, growth: 12.5 },
        { month: 'Fev', revenue: 267890.75, orders: 1689, customers: 3120, growth: 9.0 },
        { month: 'Mar', revenue: 289456.30, orders: 1823, customers: 3456, growth: 8.1 },
        { month: 'Abr', revenue: 312780.90, orders: 1978, customers: 3789, growth: 8.0 },
        { month: 'Mai', revenue: 334567.25, orders: 2134, customers: 4023, growth: 7.0 },
        { month: 'Jun', revenue: 356789.40, orders: 2289, customers: 4345, growth: 6.6 },
        { month: 'Jul', revenue: 378456.80, orders: 2456, customers: 4678, growth: 6.1 },
        { month: 'Ago', revenue: 401234.50, orders: 2634, customers: 5012, growth: 6.0 }
      ]
    };
  }

  generateChartData() {
    if (!this.analytics) return;

    this.chartData = {
      revenue: this.analytics.weeklyData.map(d => d.revenue),
      orders: this.analytics.weeklyData.map(d => d.orders),
      customers: this.analytics.weeklyData.map(d => d.customers),
      labels: this.analytics.weeklyData.map(d => d.day)
    };
  }

  onPeriodChange() {
    this.generateChartData();
  }

  onMetricChange() {
    this.generateChartData();
  }

  getGrowthIcon(growth: number): string {
    return growth > 0 ? '📈' : growth < 0 ? '📉' : '➡️';
  }

  getGrowthColor(growth: number): string {
    return growth > 0 ? '#10b981' : growth < 0 ? '#ef4444' : '#6b7280';
  }

  getPerformanceLevel(value: number, max: number): string {
    const percentage = (value / max) * 100;
    if (percentage >= 80) return 'excellent';
    if (percentage >= 60) return 'good';
    if (percentage >= 40) return 'average';
    return 'poor';
  }

  exportData() {
    const dataStr = JSON.stringify(this.analytics, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `restaurant-analytics-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    URL.revokeObjectURL(url);
  }

  // Métodos para gráficos simples (sem bibliotecas externas)
  getBarHeight(value: number, maxValue: number): number {
    return Math.max(5, (value / maxValue) * 100);
  }

  getMaxValue(data: number[]): number {
    return Math.max(...data);
  }
}
