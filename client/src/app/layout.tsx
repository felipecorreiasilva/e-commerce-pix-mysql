
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { CartModalProvider } from "./context/CartModalContext";
import { ProductsProvider } from "./context/CartContext";
import { ContactProvider } from "./context/MyContactContext";
import { PaymentMethodProvider } from "./context/PaymentMethodContext";
import { IdentificationProvider } from "./context/IdentificationContext";
import { DeliveryMethodProvider } from "./context/DeliveryMethodContext";
import { SendingToProvider } from "./context/SendingToContext";
import { AuthContextProvider } from "./context/AuthContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Coofee-shop",
  description: "site de comercialização de produtos",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
      <CartModalProvider>
        <PaymentMethodProvider>
        <IdentificationProvider>
        <DeliveryMethodProvider>
        <SendingToProvider>
        <ContactProvider>
        <AuthContextProvider>
        <ProductsProvider>
        
        {children}
        </ProductsProvider>
        </AuthContextProvider>
        
        </ContactProvider>
        </SendingToProvider>
        </DeliveryMethodProvider>
        </IdentificationProvider>
        </PaymentMethodProvider>
        </CartModalProvider>
        </body>
    </html>
  );
}
