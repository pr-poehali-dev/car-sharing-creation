import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import Icon from '@/components/ui/icon';
import { Badge } from '@/components/ui/badge';

interface Car {
  id: number;
  name: string;
  pricePerHour: number;
  category: 'budget' | 'standard' | 'business';
  image: string;
  features: string[];
}

const cars: Car[] = [
  { id: 1, name: 'Hyundai Solaris', pricePerHour: 350, category: 'budget', image: 'https://cdn.poehali.dev/projects/10ac6135-7fbc-474c-9bdf-e4d557ecc3b8/files/8da4288c-30ba-4c05-a438-55de4896bc86.jpg', features: ['АКПП', 'Кондиционер', 'Bluetooth'] },
  { id: 2, name: 'Kia Rio', pricePerHour: 380, category: 'budget', image: 'https://cdn.poehali.dev/projects/10ac6135-7fbc-474c-9bdf-e4d557ecc3b8/files/ceb494fb-df4c-4c00-901e-70c79c4349de.jpg', features: ['АКПП', 'Климат', 'USB'] },
  { id: 3, name: 'Renault Logan', pricePerHour: 320, category: 'budget', image: 'https://cdn.poehali.dev/projects/10ac6135-7fbc-474c-9bdf-e4d557ecc3b8/files/a251fd91-14ba-4bd1-853f-53ce0884a266.jpg', features: ['МКПП', 'Кондиционер', 'AUX'] },
  { id: 4, name: 'Toyota Camry', pricePerHour: 650, category: 'standard', image: 'https://cdn.poehali.dev/projects/10ac6135-7fbc-474c-9bdf-e4d557ecc3b8/files/3eacadb2-3b39-40aa-ae25-4aa246c07b93.jpg', features: ['АКПП', 'Климат', 'Круиз', 'Подогрев'] },
  { id: 5, name: 'Volkswagen Tiguan', pricePerHour: 700, category: 'standard', image: 'https://cdn.poehali.dev/projects/10ac6135-7fbc-474c-9bdf-e4d557ecc3b8/files/1d249dd8-a7a6-4d6a-a9d7-01fb0e7215b4.jpg', features: ['АКПП', 'Полный привод', 'Парктроник'] },
  { id: 6, name: 'Mazda CX-5', pricePerHour: 680, category: 'standard', image: 'https://cdn.poehali.dev/projects/10ac6135-7fbc-474c-9bdf-e4d557ecc3b8/files/d206fe53-b8c8-4bdf-82cd-ca7cd3baa354.jpg', features: ['АКПП', 'Круиз', 'Камера'] },
  { id: 7, name: 'BMW 5 Series', pricePerHour: 1200, category: 'business', image: 'https://cdn.poehali.dev/projects/10ac6135-7fbc-474c-9bdf-e4d557ecc3b8/files/76e8d363-d852-4c2a-b7cf-baf3827ef5f3.jpg', features: ['АКПП', 'Кожа', 'Премиум аудио', 'Массаж'] },
  { id: 8, name: 'Mercedes E-Class', pricePerHour: 1350, category: 'business', image: 'https://cdn.poehali.dev/projects/10ac6135-7fbc-474c-9bdf-e4d557ecc3b8/files/685732fd-53db-4be0-a281-f8d208cff439.jpg', features: ['АКПП', 'Панорама', 'Автопилот', 'AMG'] },
  { id: 9, name: 'Audi A6', pricePerHour: 1250, category: 'business', image: 'https://cdn.poehali.dev/projects/10ac6135-7fbc-474c-9bdf-e4d557ecc3b8/files/b950f7d8-9d9d-4f48-ba61-875146dbb3d0.jpg', features: ['АКПП', 'Quattro', 'Matrix LED', 'B&O'] },
];

export default function Index() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeCategory, setActiveCategory] = useState<'budget' | 'standard' | 'business'>('budget');
  const [selectedCar, setSelectedCar] = useState<Car | null>(null);
  const [bookingDialogOpen, setBookingDialogOpen] = useState(false);

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsAuthenticated(true);
  };

  const handleRegister = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsAuthenticated(true);
  };

  const handleBooking = (car: Car) => {
    setSelectedCar(car);
    setBookingDialogOpen(true);
  };

  const submitBooking = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    alert(`Бронирование ${selectedCar?.name} успешно оформлено! Мы свяжемся с вами в ближайшее время.`);
    setBookingDialogOpen(false);
  };

  const filteredCars = cars.filter(car => car.category === activeCategory);

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10 flex items-center justify-center p-4">
        <div className="w-full max-w-md animate-scale-in">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-primary to-secondary mb-4">
              <Icon name="Car" size={40} className="text-white" />
            </div>
            <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              DriveFast
            </h1>
            <p className="text-muted-foreground">Современный каршеринг для вас</p>
          </div>

          <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="login">Вход</TabsTrigger>
              <TabsTrigger value="register">Регистрация</TabsTrigger>
            </TabsList>

            <TabsContent value="login">
              <Card>
                <CardHeader>
                  <CardTitle>Вход в аккаунт</CardTitle>
                  <CardDescription>Войдите в свой аккаунт для аренды автомобиля</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleLogin} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="login-email">Логин или Email</Label>
                      <Input id="login-email" type="text" placeholder="ivan@example.com" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="login-password">Пароль</Label>
                      <Input id="login-password" type="password" placeholder="••••••••" required />
                    </div>
                    <Button type="submit" className="w-full bg-gradient-to-r from-primary to-secondary hover:opacity-90 transition-opacity">
                      Войти
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="register">
              <Card>
                <CardHeader>
                  <CardTitle>Создать аккаунт</CardTitle>
                  <CardDescription>Зарегистрируйтесь, чтобы начать пользоваться каршерингом</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleRegister} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="register-name">Полное имя</Label>
                      <Input id="register-name" type="text" placeholder="Иван Иванов" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="register-email">Email</Label>
                      <Input id="register-email" type="email" placeholder="ivan@example.com" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="register-password">Пароль</Label>
                      <Input id="register-password" type="password" placeholder="••••••••" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="register-phone">Телефон</Label>
                      <Input id="register-phone" type="tel" placeholder="+7 (999) 123-45-67" required />
                    </div>
                    <Button type="submit" className="w-full bg-gradient-to-r from-secondary to-accent hover:opacity-90 transition-opacity">
                      Зарегистрироваться
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5">
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
              <Icon name="Car" size={24} className="text-white" />
            </div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              DriveFast
            </h1>
          </div>
          <Button variant="outline" onClick={() => setIsAuthenticated(false)}>
            <Icon name="LogOut" size={18} className="mr-2" />
            Выйти
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-5xl font-extrabold mb-4 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
            Выберите свой автомобиль
          </h2>
          <p className="text-xl text-muted-foreground">Широкий выбор машин для любых задач</p>
        </div>

        <div className="flex justify-center gap-4 mb-10 flex-wrap">
          <Button
            size="lg"
            variant={activeCategory === 'budget' ? 'default' : 'outline'}
            onClick={() => setActiveCategory('budget')}
            className={activeCategory === 'budget' ? 'bg-gradient-to-r from-primary to-secondary' : ''}
          >
            <Icon name="Wallet" size={20} className="mr-2" />
            Бюджет
          </Button>
          <Button
            size="lg"
            variant={activeCategory === 'standard' ? 'default' : 'outline'}
            onClick={() => setActiveCategory('standard')}
            className={activeCategory === 'standard' ? 'bg-gradient-to-r from-primary to-secondary' : ''}
          >
            <Icon name="Star" size={20} className="mr-2" />
            Стандарт
          </Button>
          <Button
            size="lg"
            variant={activeCategory === 'business' ? 'default' : 'outline'}
            onClick={() => setActiveCategory('business')}
            className={activeCategory === 'business' ? 'bg-gradient-to-r from-primary to-secondary' : ''}
          >
            <Icon name="Crown" size={20} className="mr-2" />
            Бизнес
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in">
          {filteredCars.map((car) => (
            <Card key={car.id} className="overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 group">
              <div className="aspect-video overflow-hidden bg-gradient-to-br from-muted to-muted/50">
                <img
                  src={car.image}
                  alt={car.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <CardTitle className="text-2xl">{car.name}</CardTitle>
                  <Badge className="bg-gradient-to-r from-accent to-accent/80">
                    {car.category === 'budget' && 'Эконом'}
                    {car.category === 'standard' && 'Комфорт'}
                    {car.category === 'business' && 'Премиум'}
                  </Badge>
                </div>
                <CardDescription>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {car.features.map((feature, idx) => (
                      <span key={idx} className="text-xs bg-muted px-2 py-1 rounded-full">
                        {feature}
                      </span>
                    ))}
                  </div>
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-end justify-between">
                  <div>
                    <p className="text-3xl font-bold text-primary">{car.pricePerHour} ₽</p>
                    <p className="text-sm text-muted-foreground">за час</p>
                  </div>
                  <Button
                    onClick={() => handleBooking(car)}
                    className="bg-gradient-to-r from-primary to-secondary hover:opacity-90 transition-opacity"
                  >
                    <Icon name="Calendar" size={18} className="mr-2" />
                    Забронировать
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <section className="mt-20 bg-white rounded-2xl p-8 shadow-lg">
          <div className="max-w-2xl mx-auto">
            <h3 className="text-3xl font-bold mb-6 text-center">Контакты и поддержка</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Icon name="Phone" size={24} className="text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Телефон</h4>
                  <p className="text-muted-foreground">+7 (495) 123-45-67</p>
                  <p className="text-sm text-muted-foreground">Круглосуточно</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center flex-shrink-0">
                  <Icon name="Mail" size={24} className="text-secondary" />
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Email</h4>
                  <p className="text-muted-foreground">support@drivefast.ru</p>
                  <p className="text-sm text-muted-foreground">Ответим в течение часа</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0">
                  <Icon name="MessageCircle" size={24} className="text-accent" />
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Онлайн-чат</h4>
                  <p className="text-muted-foreground">Telegram: @drivefast_support</p>
                  <p className="text-sm text-muted-foreground">Быстрые ответы</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Icon name="MapPin" size={24} className="text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Офис</h4>
                  <p className="text-muted-foreground">Армавир, ул. Кирова, 43</p>
                  <p className="text-sm text-muted-foreground">ПН-ПТ: 9:00-18:00</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Dialog open={bookingDialogOpen} onOpenChange={setBookingDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Бронирование автомобиля</DialogTitle>
            <DialogDescription>
              {selectedCar && `${selectedCar.name} — ${selectedCar.pricePerHour} ₽/час`}
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={submitBooking} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="booking-date">Дата начала</Label>
              <Input id="booking-date" type="date" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="booking-time">Время начала</Label>
              <Input id="booking-time" type="time" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="booking-hours">Количество часов</Label>
              <Input id="booking-hours" type="number" min="1" max="168" defaultValue="3" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="booking-phone">Телефон для связи</Label>
              <Input id="booking-phone" type="tel" placeholder="+7 (999) 123-45-67" required />
            </div>
            <Button type="submit" className="w-full bg-gradient-to-r from-primary to-secondary">
              <Icon name="Check" size={18} className="mr-2" />
              Подтвердить бронирование
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}