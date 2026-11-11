import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';

const translations = {
  en: {
    announcement: 'Now open in Siem Reap · Enjoy 20% off your first order', findCoffee: 'Find coffee',
    branches: 'Branches', home: 'Home', menu: 'Menu', orders: 'Orders', cart: 'Cart', login: 'Log in',
    register: 'Create account', logout: 'Log out', openMenu: 'Open menu',
    loading: 'Loading...', freshCoffee: 'Fresh coffee · Every day', heroTitle: 'Good coffee<br />starts a good day',
    promoTag: 'Cambodia Signature Collection', promoTitle: 'Kampot Palm Sugar Iced Latte',
    promoCopy: 'Made with organic palm sugar from Kampot, dark espresso, and sweet local condensed milk.',
    specialPrice: 'Special price', branchesTitle: 'Visit a Coffice near you',
    branchesCopy: 'Enjoy fast Wi-Fi, air-conditioned co-working spaces, and warm Cambodian hospitality.',
    phnomPenh: 'Phnom Penh · BKK1 Flagship', bkkAddress: 'Street 288, Boeung Keng Kang 1, Phnom Penh',
    toulKork: 'Phnom Penh · TK Avenue', toulAddress: 'Toul Kork, Street 315, Phnom Penh',
    siemReap: 'Siem Reap · Pub Street', siemAddress: 'Street 08, Mondul 1 Village, Siem Reap',
    size: 'Size', regular: 'Regular', large: 'Large', sweetness: 'Sweetness',
    milk: 'Milk preference', wholeMilk: 'Whole milk', condensedMilk: 'Khmer condensed milk',
    oatMilk: 'Oat milk', toppings: 'Add-ons & toppings', boba: 'Brown sugar boba',
    creamFoam: 'Cream cheese foam', extraShot: 'Extra espresso shot', customize: 'Customize',
    addOrder: 'Add to order',
    heroCopy: 'Enjoy fresh coffee made from carefully selected quality beans, prepared with care just for you.',
    artisanMenu: 'Our Artisanal Menu', artisanMenuCopy: 'Selected single-origin beans, Cambodian signature brews, and freshly baked pastries.', productsFound: 'products found',
    viewMenu: 'View menu', qualityBeans: 'Quality beans', freshlyMade: 'Freshly made', easyOrdering: 'Easy ordering',
    chooseImage: 'Choose image', favourites: 'Our favourites', popularProducts: 'Popular products',
    favouritesCopy: 'Customer favourites for your morning or your next break.', loadingMenu: 'Loading menu...',
    noProducts: 'No products available yet', cannotLoadProducts: 'Unable to load products', tryAgainLater: 'Please try again later.', exploreMenu: 'Explore our menu',
    chooseCoffee: 'Choose your favourite coffee', menuCopy: 'Search and filter by category to make ordering easier.',
    searchProducts: 'Search products...', allCategories: 'All categories', notFound: 'No products found',
    tryAnother: 'Try another search term or category.', welcomeBack: 'Welcome back',
    loginCopy: 'Log in to continue your order', username: 'Username', password: 'Password',
    loggingIn: 'Logging in...', noAccount: "Don't have an account?", joinCoffice: 'Join Coffice',
    createAccount: 'Create a new account', underMinute: 'Takes less than a minute', fullName: 'Full name',
    email: 'Email', creating: 'Creating...', haveAccount: 'Already have an account?',
    emptyCart: 'Your cart is empty', emptyCartCopy: 'Find your favourite drink and add it here.',
    yourOrder: 'Your order', yourCart: 'Your cart', itemsInOrder: 'items in your order',
    orderSummary: 'Order summary', total: 'Total', checkout: 'Proceed to checkout', remove: 'Remove',
    quantityFor: 'Quantity for', secureCheckout: 'Secure checkout', confirmOrder: 'Confirm your order',
    backToCart: 'Back to cart', howReceive: 'How would you like to receive it?',
    chooseOption: 'Choose the option that works best for you', dineIn: 'Dine in',
    dineInDetail: 'Enjoy it at the café', takeaway: 'Takeaway', takeawayDetail: 'Pick it up at the café',
    delivery: 'Delivery', deliveryDetail: 'Send it to your location', tableNumber: 'Table number',
    paymentMethod: 'Payment method', choosePayment: 'Choose how you would like to pay',
    cash: 'Cash', card: 'Card', online: 'Online', itemSummary: 'Order summary',
    quantity: 'Quantity', itemPrice: 'Item total', service: 'Service', orderNow: 'Place order now',
    ordering: 'Placing order...', securePayment: 'Your payment is secure',
    loadingOrders: 'Loading orders...', orderHistory: 'Order history', myOrders: 'My orders',
    orderHistoryCopy: 'Track status and view details of your orders.', noOrders: 'No orders yet',
    ordersAppear: 'Your orders will appear here.', startOrdering: 'Start ordering', orderNumber: 'Order number',
    receiveMethod: 'Receive method', orderTotal: 'Order total', pending: 'Pending', paid: 'Paid',
    cancelled: 'Cancelled', stock: 'In stock', outOfStock: 'Out of stock', view: 'View',
    addCart: '+ Cart', backToMenu: 'Back to menu', noDescription: 'No description available',
    left: 'left', soldOut: 'Out of stock', addToCart: 'Add to cart', quickLinks: 'Quick links',
    information: 'Information', aboutUs: 'About us', privacy: 'Privacy policy', terms: 'Terms of use',
    customerSupport: 'Customer support', contact: 'Contact', everyDay: 'Every day 7:00–21:00',
    allRights: 'All rights reserved.', freshBrewed: 'Freshly brewed · Simply served',
    loginSuccess: 'Logged in successfully!', loginFailed: 'Login failed',
    registerSuccess: 'Registered successfully! Please log in', registerFailed: 'Registration failed',
    logoutSuccess: 'Logged out successfully', addedToCart: 'added to cart', removedFromCart: 'Removed from cart',
    orderSuccess: 'Order placed successfully', orderFailed: 'Unable to place order',
    cannotLoadOrders: 'Unable to load order history', productNotFound: 'Product not found',
    loadingProduct: 'Loading...', noItems: 'No items to order', productFallback: 'Freshly prepared coffee for you.',
  },
  km: {
    announcement: 'បើកសាខាថ្មីនៅសៀមរាប · បញ្ចុះតម្លៃ ២០% សម្រាប់ការបញ្ជាទិញដំបូង', findCoffee: 'ស្វែងរកកាហ្វេ',
    branches: 'សាខា', home: 'ទំព័រដើម', menu: 'ម៉ឺនុយ', orders: 'ការបញ្ជាទិញ', cart: 'កន្ត្រក', login: 'ចូលប្រព័ន្ធ',
    register: 'បង្កើតគណនី', logout: 'ចាកចេញ', openMenu: 'បើកម៉ឺនុយ', loading: 'កំពុងផ្ទុក...',
    freshCoffee: 'កាហ្វេស្រស់ · រាល់ថ្ងៃ', heroTitle: 'កាហ្វេល្អ<br />ចាប់ផ្តើមថ្ងៃល្អ',
    artisanMenu: 'ម៉ឺនុយកាហ្វេពិសេសរបស់យើង', artisanMenuCopy: 'គ្រាប់កាហ្វេប្រភពតែមួយ ភេសជ្ជៈពិសេសរបស់កម្ពុជា និងនំដុតថ្មីៗ។', productsFound: 'ផលិតផល',
    promoTag: 'ផលិតផលពិសេសរបស់កម្ពុជា', promoTitle: 'ឡាតេទឹកកកស្ករត្នោតកំពត',
    promoCopy: 'ផលិតពីស្ករត្នោតសរីរាង្គខេត្តកំពត អេសប្រេសសូខ្មៅ និងទឹកដោះគោខាប់ខ្មែរ។',
    specialPrice: 'តម្លៃពិសេស', branchesTitle: 'ស្វែងរក Coffice នៅជិតអ្នក',
    branchesCopy: 'រីករាយជាមួយ Wi-Fi លឿន កន្លែងធ្វើការមានម៉ាស៊ីនត្រជាក់ និងបដិសណ្ឋារកិច្ចខ្មែរដ៏កក់ក្តៅ។',
    phnomPenh: 'ភ្នំពេញ · សាខាធំ BKK1', bkkAddress: 'ផ្លូវ ២៨៨ បឹងកេងកង១ ភ្នំពេញ',
    toulKork: 'ភ្នំពេញ · TK Avenue', toulAddress: 'ទួលគោក ផ្លូវ ៣១៥ ភ្នំពេញ',
    siemReap: 'សៀមរាប · ផ្លូវ Pub Street', siemAddress: 'ផ្លូវលេខ ០៨ ភូមិមណ្ឌល១ សៀមរាប',
    size: 'ទំហំ', regular: 'ធម្មតា', large: 'ធំ', sweetness: 'កម្រិតផ្អែម',
    milk: 'ជម្រើសទឹកដោះគោ', wholeMilk: 'ទឹកដោះគោធម្មតា', condensedMilk: 'ទឹកដោះគោខាប់ខ្មែរ',
    oatMilk: 'ទឹកដោះគោអូត', toppings: 'បន្ថែម និងគ្រឿងផ្សំ', boba: 'បូបាស្ករត្នោត',
    creamFoam: 'ក្រែមឈីស', extraShot: 'អេសប្រេសសូបន្ថែម', customize: 'ជ្រើសរើសជម្រើស',
    addOrder: 'បន្ថែមទៅការបញ្ជាទិញ',
    heroCopy: 'រីករាយជាមួយកាហ្វេស្រស់ដែលជ្រើសរើសពីគ្រាប់កាហ្វេមានគុណភាព រៀបចំយ៉ាងយកចិត្តទុកដាក់សម្រាប់អ្នក។',
    viewMenu: 'មើលម៉ឺនុយ', qualityBeans: 'គ្រាប់កាហ្វេគុណភាព', freshlyMade: 'រៀបចំថ្មីៗ', easyOrdering: 'បញ្ជាទិញងាយស្រួល',
    chooseImage: 'ជ្រើសរើសរូបភាព', favourites: 'ផលិតផលពេញនិយម', popularProducts: 'ផលិតផលពេញនិយម',
    favouritesCopy: 'ជម្រើសដែលអតិថិជនស្រឡាញ់ សម្រាប់ពេលព្រឹក ឬពេលសម្រាករបស់អ្នក។', loadingMenu: 'កំពុងផ្ទុកម៉ឺនុយ...',
    noProducts: 'មិនទាន់មានផលិតផលទេ', cannotLoadProducts: 'មិនអាចទាញផលិតផលបាន', tryAgainLater: 'សូមព្យាយាមម្តងទៀតនៅពេលក្រោយ។', exploreMenu: 'ស្វែងរកម៉ឺនុយ',
    chooseCoffee: 'ជ្រើសរើសកាហ្វេដែលអ្នកចូលចិត្ត', menuCopy: 'ស្វែងរក និងជ្រើសរើសតាមប្រភេទ ដើម្បីឱ្យការបញ្ជាទិញកាន់តែងាយស្រួល។',
    searchProducts: 'ស្វែងរកផលិតផល...', allCategories: 'ប្រភេទទាំងអស់', notFound: 'រកមិនឃើញផលិតផល',
    tryAnother: 'សាកល្បងពាក្យស្វែងរក ឬប្រភេទផ្សេងទៀត។', welcomeBack: 'ស្វាគមន៍មកវិញ',
    loginCopy: 'ចូលប្រព័ន្ធដើម្បីបន្តការបញ្ជាទិញ', username: 'ឈ្មោះអ្នកប្រើ', password: 'ពាក្យសម្ងាត់',
    loggingIn: 'កំពុងចូល...', noAccount: 'មិនទាន់មានគណនី?', joinCoffice: 'ចូលរួមជាមួយ Coffice',
    createAccount: 'បង្កើតគណនីថ្មី', underMinute: 'ចំណាយពេលតិចជាងមួយនាទី', fullName: 'ឈ្មោះពេញ',
    email: 'អ៊ីមែល', creating: 'កំពុងបង្កើត...', haveAccount: 'មានគណនីហើយ?',
    emptyCart: 'កន្ត្រករបស់អ្នកនៅទទេ', emptyCartCopy: 'ស្វែងរកភេសជ្ជៈដែលអ្នកចូលចិត្ត ហើយបន្ថែមវានៅទីនេះ។',
    yourOrder: 'ការបញ្ជាទិញរបស់អ្នក', yourCart: 'កន្ត្រករបស់អ្នក', itemsInOrder: 'មុខក្នុងការបញ្ជាទិញរបស់អ្នក',
    orderSummary: 'សង្ខេបការបញ្ជាទិញ', total: 'សរុប', checkout: 'បន្តទៅការទូទាត់', remove: 'លុប',
    quantityFor: 'ចំនួន', secureCheckout: 'ការទូទាត់មានសុវត្ថិភាព', confirmOrder: 'បញ្ជាក់ការបញ្ជាទិញ',
    backToCart: 'ត្រឡប់ទៅកន្ត្រក', howReceive: 'របៀបទទួលទំនិញ', chooseOption: 'ជ្រើសរើសជម្រើសដែលសមស្របសម្រាប់អ្នក',
    dineIn: 'ញ៉ាំនៅហាង', dineInDetail: 'ទទួលទាននៅទីតាំងហាង', takeaway: 'ខ្ចប់យកទៅ', takeawayDetail: 'មកទទួលនៅហាង',
    delivery: 'ដឹកជញ្ជូន', deliveryDetail: 'ផ្ញើទៅកាន់ទីតាំងអ្នក', tableNumber: 'លេខតុ',
    paymentMethod: 'វិធីទូទាត់', choosePayment: 'ជ្រើសរើសវិធីដែលអ្នកចង់បង់ប្រាក់', cash: 'សាច់ប្រាក់', card: 'កាត', online: 'អនឡាញ',
    itemSummary: 'សង្ខេបការបញ្ជាទិញ', quantity: 'ចំនួន', itemPrice: 'តម្លៃទំនិញ', service: 'សេវាកម្ម',
    orderNow: 'បញ្ជាទិញឥឡូវនេះ', ordering: 'កំពុងបញ្ជាទិញ...', securePayment: 'ការទូទាត់របស់អ្នកមានសុវត្ថិភាព',
    loadingOrders: 'កំពុងផ្ទុកការបញ្ជាទិញ...', orderHistory: 'ប្រវត្តិបញ្ជាទិញ', myOrders: 'ការបញ្ជាទិញរបស់ខ្ញុំ',
    orderHistoryCopy: 'តាមដានស្ថានភាព និងមើលព័ត៌មានលម្អិតនៃការបញ្ជាទិញរបស់អ្នក។', noOrders: 'មិនទាន់មានការបញ្ជាទិញទេ',
    ordersAppear: 'ការបញ្ជាទិញរបស់អ្នកនឹងបង្ហាញនៅទីនេះ។', startOrdering: 'ចាប់ផ្តើមបញ្ជាទិញ', orderNumber: 'លេខការបញ្ជាទិញ',
    receiveMethod: 'របៀបទទួល', orderTotal: 'សរុបការបញ្ជាទិញ', pending: 'កំពុងរង់ចាំ', paid: 'បានទូទាត់', cancelled: 'បានបោះបង់',
    stock: 'មានក្នុងស្តុក', outOfStock: 'អស់ពីស្តុក', view: 'មើល', addCart: '+ កន្ត្រក', backToMenu: 'ត្រឡប់ទៅមុខម្ហូប',
    noDescription: 'មិនមានការពិពណ៌នា', left: 'នៅសល់', soldOut: 'អស់ពីស្តុក', addToCart: 'ដាក់ក្នុងកន្ត្រក',
    quickLinks: 'តំណរហ័ស', information: 'ព័ត៌មាន', aboutUs: 'អំពីយើង', privacy: 'គោលការណ៍ឯកជនភាព',
    terms: 'លក្ខខណ្ឌប្រើប្រាស់', customerSupport: 'ជំនួយអតិថិជន', contact: 'ទំនាក់ទំនង', everyDay: 'រៀងរាល់ថ្ងៃ 7:00–21:00',
    allRights: 'រក្សាសិទ្ធិគ្រប់យ៉ាង។', freshBrewed: 'ឆុងថ្មីៗ · បម្រើយ៉ាងសាមញ្ញ', loginSuccess: 'ចូលប្រព័ន្ធដោយជោគជ័យ!',
    loginFailed: 'ចូលប្រព័ន្ធបរាជ័យ', registerSuccess: 'ចុះឈ្មោះដោយជោគជ័យ! សូមចូលប្រព័ន្ធ', registerFailed: 'ចុះឈ្មោះបរាជ័យ',
    logoutSuccess: 'ចាកចេញពីប្រព័ន្ធដោយជោគជ័យ', addedToCart: 'បានបន្ថែមទៅក្នុងកន្ត្រក', removedFromCart: 'បានដកចេញពីកន្ត្រក',
    orderSuccess: 'ការបញ្ជាទិញបានជោគជ័យ', orderFailed: 'មិនអាចបញ្ជាទិញបាន', cannotLoadOrders: 'មិនអាចទាញប្រវត្តិបញ្ជាទិញបាន',
    productNotFound: 'រកមិនឃើញផលិតផល', loadingProduct: 'កំពុងផ្ទុក...', noItems: 'មិនមានទំនិញសម្រាប់បញ្ជាទិញទេ',
    productFallback: 'កាហ្វេរៀបចំថ្មីៗសម្រាប់អ្នក។',
  },
};

const LanguageContext = createContext(null);

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(() => localStorage.getItem('language') || 'km');

  useEffect(() => {
    localStorage.setItem('language', language);
    document.documentElement.lang = language;
  }, [language]);

  const value = useMemo(() => ({
    language,
    setLanguage,
    toggleLanguage: () => setLanguage((current) => (current === 'km' ? 'en' : 'km')),
    t: (key) => translations[language][key] || translations.en[key] || key,
  }), [language]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) throw new Error('useLanguage must be used within a LanguageProvider');
  return context;
};
