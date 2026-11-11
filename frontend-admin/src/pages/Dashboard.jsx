import React, { useEffect, useMemo, useState } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';
import { Bar, Doughnut } from 'react-chartjs-2';
import { FiDollarSign, FiPackage, FiShoppingBag, FiTruck } from 'react-icons/fi';
import { getProducts } from '../api/products';
import { getOrders } from '../api/orders';
import { getUsers } from '../api/users';

// ចុះឈ្មោះ Components របស់ Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const statusLabel = {
  pending: 'កំពុងរង់ចាំ',
  paid: 'បានទូទាត់',
  cancelled: 'បានបោះបង់',
};

const Dashboard = () => {
  const [data, setData] = useState({ products: [], orders: [], users: [] });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      getProducts({ limit: 1000 }),
      getOrders({ limit: 1000 }),
      getUsers({ limit: 1000 }),
    ])
      .then(([products, orders, users]) => setData({ products, orders, users }))
      .catch((error) => console.error('Error fetching dashboard:', error))
      .finally(() => setLoading(false));
  }, []);

  // គណនាទិន្នន័យ Grab និងទូទៅ
  const metrics = useMemo(() => {
    const orders = data.orders || [];
    // ឆែកលក្ខខណ្ឌ Grab
    const grabOrders = orders.filter((o) => {
      const str = JSON.stringify(o).toLowerCase();
      return (
        o.channel === 'grab' ||
        o.order_type === 'grab' ||
        o.source === 'grab' ||
        str.includes('grab')
      );
    });
    const storeOrders = orders.filter((o) => !grabOrders.includes(o));

    const totalRevenue = orders
      .filter((o) => o.status === 'paid')
      .reduce((sum, o) => sum + Number(o.total_amount || 0), 0);

    const grabRevenue = grabOrders
      .filter((o) => o.status === 'paid')
      .reduce((sum, o) => sum + Number(o.total_amount || 0), 0);

    const storeRevenue = storeOrders
      .filter((o) => o.status === 'paid')
      .reduce((sum, o) => sum + Number(o.total_amount || 0), 0);

    return {
      totalRevenue,
      grabRevenue,
      storeRevenue,
      grabCount: grabOrders.length,
      storeCount: storeOrders.length,
      pending: orders.filter((o) => o.status === 'pending').length,
      paid: orders.filter((o) => o.status === 'paid').length,
      cancelled: orders.filter((o) => o.status === 'cancelled').length,
    };
  }, [data.orders]);

  // ១. ទិន្នន័យសម្រាប់ Bar Chart (Overview Statistics)
  const barChartData = {
    labels: ['Grab Delivery', 'លក់នៅហាង', 'កំពុងរង់ចាំ', 'ទូទាត់រួច', 'បានបោះបង់'],
    datasets: [
      {
        label: 'ចំនួនប្រតិបត្តិការ',
        data: [
          metrics.grabCount,
          metrics.storeCount,
          metrics.pending,
          metrics.paid,
          metrics.cancelled,
        ],
        backgroundColor: [
          '#00b14f', // ពណ៌បៃតង Grab
          '#4f46e5', // ពណ៌ខៀវ Indigo
          '#f59e0b', // ពណ៌លឿងទុំ
          '#10b981', // ពណ៌បៃតង
          '#ef4444', // ពណ៌ក្រហម
        ],
        borderRadius: 6,
      },
    ],
  };

  // ២. ទិន្នន័យសម្រាប់ Donut Chart (ការបែងចែកចំណូល Grab vs ហាង)
  const donutChartData = {
    labels: ['ចំណូល Grab ($)', 'ចំណូលហាងផ្ទាល់ ($)'],
    datasets: [
      {
        data: [metrics.grabRevenue, metrics.storeRevenue],
        backgroundColor: ['#00b14f', '#3b82f6'],
        hoverBackgroundColor: ['#009643', '#2563eb'],
        borderWidth: 2,
      },
    ],
  };

  const cards = [
    { label: 'ចំណូលសរុប', value: `$${metrics.totalRevenue.toFixed(2)}`, detail: 'ពីការទូទាត់រួច', icon: <FiDollarSign />, tone: 'brown' },
    { label: 'ការបញ្ជាទិញសរុប', value: data.orders.length, detail: `${metrics.pending} កំពុងរង់ចាំ`, icon: <FiShoppingBag />, tone: 'blue' },
    { label: 'Grab Delivery', value: metrics.grabCount, detail: `$${metrics.grabRevenue.toFixed(2)} ចំណូលពី Grab`, icon: <FiTruck />, tone: 'grab' },
    { label: 'ផលិតផលក្នុងស្តុក', value: data.products.length, detail: 'មុខទំនិញសរុប', icon: <FiPackage />, tone: 'amber' },
  ];

  return (
    <div className="dashboard" style={{ padding: '24px' }}>
      <div className="dashboard-heading" style={{ marginBottom: '24px' }}>
        <div>
          <span className="dashboard-eyebrow">COFFEE SHOP ANALYTICS</span>
          <h1>ផ្ទាំងគ្រប់គ្រងទិន្នន័យ</h1>
          <p>ស្ថិតិការលក់ និងការដឹកជញ្ជូនតាម Grab</p>
        </div>
      </div>

      {/* Stats Cards */}
      <section className="stats-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px', marginBottom: '24px' }}>
        {cards.map((card) => (
          <article className="stat-card" key={card.label} style={{ background: '#fff', padding: '16px', borderRadius: '12px', boxShadow: '0 1px 3px rgba(0,0,0,0.08)', display: 'flex', gap: '12px', alignItems: 'center' }}>
            <div style={{ fontSize: '24px', padding: '12px', borderRadius: '10px', background: card.tone === 'grab' ? '#e8f8f0' : '#f3f4f6', color: card.tone === 'grab' ? '#00b14f' : '#333' }}>
              {card.icon}
            </div>
            <div>
              <span style={{ fontSize: '13px', color: '#6b7280', display: 'block' }}>{card.label}</span>
              <strong style={{ fontSize: '20px' }}>{card.value}</strong>
              <small style={{ display: 'block', color: '#9ca3af', fontSize: '11px' }}>{card.detail}</small>
            </div>
          </article>
        ))}
      </section>

      {/* Charts Grid (រៀបចំដូចក្នុងរូបភាព Screenshot របស់បង) */}
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '20px', marginBottom: '24px' }}>
        {/* Graph ខាងឆ្វេង: Overview Statistics */}
        <div style={{ background: '#fff', padding: '20px', borderRadius: '12px', boxShadow: '0 1px 3px rgba(0,0,0,0.08)' }}>
          <h3 style={{ margin: '0 0 16px 0', fontSize: '16px', color: '#374151' }}>Overview Statistics (ទិន្នន័យទូទៅ & Grab)</h3>
          <div style={{ height: '260px' }}>
            <Bar
              data={barChartData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: { legend: { display: false } },
              }}
            />
          </div>
        </div>

        {/* Graph ខាងស្តាំ: Donut Chart បែងចែក Grab និង ហាង */}
        <div style={{ background: '#fff', padding: '20px', borderRadius: '12px', boxShadow: '0 1px 3px rgba(0,0,0,0.08)' }}>
          <h3 style={{ margin: '0 0 16px 0', fontSize: '16px', color: '#374151', textAlign: 'center' }}>ចំណូលតាមប្រភព (Revenue Source)</h3>
          <div style={{ height: '260px', display: 'flex', justifyContent: 'center' }}>
            <Doughnut
              data={donutChartData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: { position: 'bottom' },
                },
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;