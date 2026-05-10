import React from 'react';

type ButtonVariant = "primary" | "secondary" | "outline" | "ghost";
type ButtonSize = "sm" | "md" | "lg";
interface ButtonProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "onClick"> {
    children?: React.ReactNode;
    onClick?: () => void;
    variant?: ButtonVariant;
    size?: ButtonSize;
    disabled?: boolean;
    fullWidth?: boolean;
    icon?: React.ReactNode;
    iconPosition?: "left" | "right";
    className?: string;
}
declare const Button: React.ForwardRefExoticComponent<ButtonProps & React.RefAttributes<HTMLButtonElement>>;

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

type Props$1 = {
    text?: string;
    onClick?: () => void;
};
declare const ToastButton: React.FC<Props$1>;

type Props = {
    title?: string;
    description?: string;
    price?: number;
    image?: string;
    onClick?: () => void;
};
declare const ProductCard: React.FC<Props>;

export { Button, Card, ProductCard, ToastButton };
