import React from 'react';

const Icon = ({ children, size = 20, ...props }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>
    {children}
  </svg>
);

export const CoffeeIcon = (props) => <Icon {...props}><path d="M5 8h11v6a5 5 0 0 1-5 5H10a5 5 0 0 1-5-5V8Z"/><path d="M16 10h1.5a2.5 2.5 0 0 1 0 5H16M8 4c0 1 1 1.2 1 2M12 3c0 1 1 1.4 1 2.4"/></Icon>;
export const MenuIcon = (props) => <Icon {...props}><path d="M4 7h16M4 12h16M4 17h16"/></Icon>;
export const CloseIcon = (props) => <Icon {...props}><path d="m6 6 12 12M18 6 6 18"/></Icon>;
export const CartIcon = (props) => <Icon {...props}><circle cx="9" cy="20" r="1"/><circle cx="18" cy="20" r="1"/><path d="M3 4h2l2.4 11.2a2 2 0 0 0 2 1.6h7.7a2 2 0 0 0 2-1.6L20.5 8H6"/></Icon>;
export const ArrowRightIcon = (props) => <Icon {...props}><path d="M5 12h14m-5-5 5 5-5 5"/></Icon>;
export const CheckIcon = (props) => <Icon {...props}><path d="m5 12 4 4L19 6"/></Icon>;
export const MapPinIcon = (props) => <Icon {...props}><path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z"/><circle cx="12" cy="10" r="2.5"/></Icon>;
export const PhoneIcon = (props) => <Icon {...props}><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 2 .7 2.8a2 2 0 0 1-.4 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2Z"/></Icon>;
export const MailIcon = (props) => <Icon {...props}><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/></Icon>;
export const ClockIcon = (props) => <Icon {...props}><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></Icon>;
export const InstagramIcon = (props) => <Icon {...props}><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r=".5" fill="currentColor"/></Icon>;
export const FacebookIcon = (props) => <Icon {...props}><path d="M14 8h3V4h-3c-3 0-5 2-5 5v3H6v4h3v6h4v-6h3l1-4h-4V9c0-.7.3-1 1-1Z"/></Icon>;
export const StoreIcon = (props) => <Icon {...props}><path d="M4 10v10h16V10M3 4h18l-2 6H5L3 4Z"/><path d="M9 20v-6h6v6"/></Icon>;
export const BagIcon = (props) => <Icon {...props}><path d="M6 8h12l1 13H5L6 8Z"/><path d="M9 9V6a3 3 0 0 1 6 0v3"/></Icon>;
export const TruckIcon = (props) => <Icon {...props}><path d="M3 5h11v12H3V5Zm11 5h4l3 3v4h-7v-7Z"/><circle cx="7" cy="18" r="2"/><circle cx="18" cy="18" r="2"/></Icon>;
export const CashIcon = (props) => <Icon {...props}><rect x="3" y="6" width="18" height="12" rx="2"/><circle cx="12" cy="12" r="3"/><path d="M7 9H6v1M17 15h1v-1"/></Icon>;
export const CardIcon = (props) => <Icon {...props}><rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 10h18M7 15h3"/></Icon>;
export const ReceiptIcon = (props) => <Icon {...props}><path d="M6 3h12v18l-3-2-3 2-3-2-3 2V3Z"/><path d="M9 8h6M9 12h6M9 16h3"/></Icon>;
