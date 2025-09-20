import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { MapPin, Phone, User, Home, Loader2, CheckCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { indianStates, getCitiesForState } from '@/data/indianStatesAndCities';

const checkoutSchema = z.object({
    fullName: z.string().min(2, 'Full name must be at least 2 characters'),
    phone: z.string().min(10, 'Phone number must be at least 10 digits'),
    email: z.string().email('Please enter a valid email address'),
    address: z.string().min(10, 'Please enter a complete address'),
    landmark: z.string().optional(),
    city: z.string().min(2, 'City is required'),
    state: z.string().min(2, 'State is required'),
    pincode: z.string().min(6, 'Pincode must be 6 digits').max(6, 'Pincode must be 6 digits'),
    notes: z.string().optional(),
});

type CheckoutFormData = z.infer<typeof checkoutSchema>;

interface CheckoutFormProps {
    isOpen: boolean;
    onClose: () => void;
}

const CheckoutForm = ({ isOpen, onClose }: CheckoutFormProps) => {
    const { cartItems, cartTotal, clearCart } = useCart();
    const { user, createOrder } = useAuth();
    const { toast } = useToast();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [orderSuccess, setOrderSuccess] = useState(false);
    const [orderId, setOrderId] = useState<string | null>(null);
    const [selectedState, setSelectedState] = useState<string>('');
    const [availableCities, setAvailableCities] = useState<string[]>([]);

    const form = useForm<CheckoutFormData>({
        resolver: zodResolver(checkoutSchema),
        defaultValues: {
            fullName: user?.user_metadata?.name || '',
            email: user?.email || '',
            phone: '',
            address: '',
            landmark: '',
            city: '',
            state: '',
            pincode: '',
            notes: '',
        },
    });

    const handleStateChange = (stateValue: string) => {
        setSelectedState(stateValue);
        const cities = getCitiesForState(stateValue);
        setAvailableCities(cities);
        form.setValue('state', stateValue);
        form.setValue('city', ''); // Reset city when state changes
    };

    const onSubmit = async (data: CheckoutFormData) => {
        setIsSubmitting(true);
        try {
            // Create order with address details
            const orderItems = cartItems.map(item => ({
                productId: item.product.id,
                quantity: item.quantity,
                price: item.product.price,
                productName: item.product.name,
                productImage: item.product.image
            }));

            const orderData = {
                items: orderItems,
                total: cartTotal,
                shippingAddress: {
                    fullName: data.fullName,
                    phone: data.phone,
                    email: data.email,
                    address: data.address,
                    landmark: data.landmark,
                    city: data.city,
                    state: data.state,
                    pincode: data.pincode,
                    notes: data.notes,
                },
                orderDate: new Date().toISOString(),
                status: 'pending'
            };

            const newOrderId = await createOrder(orderData);

            if (newOrderId) {
                setOrderId(newOrderId);
                setOrderSuccess(true);
                await clearCart();

                toast({
                    title: "Order placed successfully! 🎉",
                    description: `Order #${newOrderId.slice(0, 8)} has been created.`,
                });
            } else {
                throw new Error('Failed to create order');
            }
        } catch (error) {
            console.error('Checkout error:', error);
            toast({
                title: "Order failed",
                description: "There was an error processing your order. Please try again.",
                variant: "destructive",
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleClose = () => {
        if (orderSuccess) {
            setOrderSuccess(false);
            setOrderId(null);
            form.reset();
        }
        onClose();
    };

    if (orderSuccess) {
        return (
            <Dialog open={isOpen} onOpenChange={handleClose}>
                <DialogContent className="sm:max-w-md">
                    <div className="text-center space-y-4 py-8">
                        <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                            <CheckCircle className="h-8 w-8 text-green-600" />
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold text-gray-900">Order Placed Successfully!</h3>
                            <p className="text-gray-600 mt-2">
                                Your order #{orderId?.slice(0, 8)} has been confirmed and will be processed soon.
                            </p>
                        </div>
                        <div className="space-y-2">
                            <Button onClick={handleClose} className="w-full">
                                Continue Shopping
                            </Button>
                            <Button variant="outline" onClick={() => window.location.href = '/orders'} className="w-full">
                                View My Orders
                            </Button>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        );
    }

    return (
        <Dialog open={isOpen} onOpenChange={handleClose}>
            <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                        <MapPin className="h-5 w-5" />
                        Checkout - Delivery Details
                    </DialogTitle>
                </DialogHeader>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Order Summary */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-lg">Order Summary</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-3 max-h-48 overflow-y-auto">
                                {cartItems.map((item) => (
                                    <div key={item.id} className="flex items-center gap-3 text-sm">
                                        <img
                                            src={item.product.image || "/placeholder.svg"}
                                            alt={item.product.name}
                                            className="w-12 h-12 rounded object-cover"
                                        />
                                        <div className="flex-1">
                                            <p className="font-medium">{item.product.name}</p>
                                            <p className="text-muted-foreground">
                                                {item.quantity} × ₹{item.product.price.toFixed(2)}
                                            </p>
                                        </div>
                                        <p className="font-medium">
                                            ₹{(item.quantity * item.product.price).toFixed(2)}
                                        </p>
                                    </div>
                                ))}
                            </div>
                            <Separator />
                            <div className="space-y-2">
                                <div className="flex justify-between text-sm">
                                    <span>Subtotal</span>
                                    <span>₹{cartTotal.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span>Delivery</span>
                                    <span className="text-green-600">Free</span>
                                </div>
                                <Separator />
                                <div className="flex justify-between font-semibold text-lg">
                                    <span>Total</span>
                                    <span className="text-primary">₹{cartTotal.toFixed(2)}</span>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Delivery Form */}
                    <div>
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                                <div className="grid grid-cols-1 gap-4">
                                    <FormField
                                        control={form.control}
                                        name="fullName"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className="flex items-center gap-2">
                                                    <User className="h-4 w-4" />
                                                    Full Name
                                                </FormLabel>
                                                <FormControl>
                                                    <Input placeholder="Enter your full name" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <FormField
                                            control={form.control}
                                            name="phone"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel className="flex items-center gap-2">
                                                        <Phone className="h-4 w-4" />
                                                        Phone Number
                                                    </FormLabel>
                                                    <FormControl>
                                                        <Input placeholder="10-digit mobile number" {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />

                                        <FormField
                                            control={form.control}
                                            name="email"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Email</FormLabel>
                                                    <FormControl>
                                                        <Input placeholder="your@email.com" type="email" {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>

                                    <FormField
                                        control={form.control}
                                        name="address"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className="flex items-center gap-2">
                                                    <Home className="h-4 w-4" />
                                                    Complete Address
                                                </FormLabel>
                                                <FormControl>
                                                    <Textarea
                                                        placeholder="House/Flat No., Building Name, Street, Area"
                                                        className="min-h-[80px]"
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="landmark"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Landmark (Optional)</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="Near hospital, school, etc." {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                        <FormField
                                            control={form.control}
                                            name="state"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>State</FormLabel>
                                                    <Select onValueChange={handleStateChange} value={field.value}>
                                                        <FormControl>
                                                            <SelectTrigger>
                                                                <SelectValue placeholder="Select State" />
                                                            </SelectTrigger>
                                                        </FormControl>
                                                        <SelectContent>
                                                            {indianStates.map((state) => (
                                                                <SelectItem key={state.value} value={state.value}>
                                                                    {state.label}
                                                                </SelectItem>
                                                            ))}
                                                        </SelectContent>
                                                    </Select>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />

                                        <FormField
                                            control={form.control}
                                            name="city"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>City</FormLabel>
                                                    <Select onValueChange={field.onChange} value={field.value} disabled={!selectedState}>
                                                        <FormControl>
                                                            <SelectTrigger>
                                                                <SelectValue placeholder={selectedState ? "Select City" : "Select State First"} />
                                                            </SelectTrigger>
                                                        </FormControl>
                                                        <SelectContent>
                                                            {availableCities.map((city) => (
                                                                <SelectItem key={city} value={city}>
                                                                    {city}
                                                                </SelectItem>
                                                            ))}
                                                        </SelectContent>
                                                    </Select>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />

                                        <FormField
                                            control={form.control}
                                            name="pincode"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Pincode</FormLabel>
                                                    <FormControl>
                                                        <Input placeholder="123456" {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>

                                    <FormField
                                        control={form.control}
                                        name="notes"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Delivery Instructions (Optional)</FormLabel>
                                                <FormControl>
                                                    <Textarea
                                                        placeholder="Any special instructions for delivery..."
                                                        className="min-h-[60px]"
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>

                                <div className="flex gap-3 pt-4">
                                    <Button type="button" variant="outline" onClick={handleClose} className="flex-1">
                                        Cancel
                                    </Button>
                                    <Button type="submit" disabled={isSubmitting} className="flex-1">
                                        {isSubmitting ? (
                                            <>
                                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                                Placing Order...
                                            </>
                                        ) : (
                                            `Place Order - ₹${cartTotal.toFixed(2)}`
                                        )}
                                    </Button>
                                </div>
                            </form>
                        </Form>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default CheckoutForm;