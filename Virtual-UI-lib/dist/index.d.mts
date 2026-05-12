import React from 'react';

type CardVariant = "elevated" | "outlined" | "filled";
type CardPadding = "none" | "sm" | "md" | "lg";
interface CardProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onClick" | "title"> {
    children: React.ReactNode;
    title?: React.ReactNode;
    subtitle?: React.ReactNode;
    footer?: React.ReactNode;
    variant?: CardVariant;
    padding?: CardPadding;
    hoverable?: boolean;
    clickable?: boolean;
    onClick?: () => void;
    fullWidth?: boolean;
    className?: string;
}
declare const Card: React.ForwardRefExoticComponent<CardProps & React.RefAttributes<HTMLDivElement>>;

type Props$5 = {
    text?: string;
    onClick?: () => void;
};
declare const ToastButton: React.FC<Props$5>;

type Props$4 = {
    title?: string;
    description?: string;
    price?: number;
    image?: string;
    onClick?: () => void;
};
declare const ProductCard: React.FC<Props$4>;

type Props$3 = {
    activeColor?: string;
    inactiveColor?: string;
    initialActive?: boolean;
    onClick?: () => void;
};
declare const NeonToggleButton: React.FC<Props$3>;

type Props$2 = {
    title?: string;
    price?: number;
    features?: string[];
    accent?: string;
    onClick?: () => void;
};
declare const PricingCard: React.FC<Props$2>;

type Props$1 = {
    title?: string;
    description?: string;
    accent?: string;
};
declare const NiceCard: React.FC<Props$1>;

type Props = {
    theme?: "dark" | "light";
    onChange?: (theme: "dark" | "light") => void;
};
declare const ThemeToggle: React.FC<Props>;

export { Card, NeonToggleButton, NiceCard, PricingCard, ProductCard, ThemeToggle, ToastButton };
